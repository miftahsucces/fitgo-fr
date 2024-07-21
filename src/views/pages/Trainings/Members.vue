<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader class="d-flex justify-content-between align-items-center">
                    <strong>Members</strong>
                    <CButton color="primary btn-sm" @click="openAddModal" class="ml-auto">Add Member</CButton>
                </CCardHeader>
                <CCardBody>
                    <ag-grid-vue class="ag-theme-quartz" style="height: 300px;" :rowData="users"
                        :columnDefs="columnDefs" :defaultColDef="defaultColDef" :paginationAutoPageSize="true" :pagination="pagination"
                        :paginationPageSize="paginationPageSize"
                        :paginationPageSizeSelector="paginationPageSizeSelector" @grid-ready="onGridReady"
                        :frameworkComponents="frameworkComponents" :context="gridContext"></ag-grid-vue>
                </CCardBody>
            </CCard>
        </CCol>

        <CModal alignment="center" :visible="visibleModalCerti" @close="() => { visibleModalCerti = false }"
            aria-labelledby="VerticallyCenteredExample">
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredExample">Member</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow class="mb-3">
                    <CFormLabel for="inputMember" class="col-sm-4 col-form-label">Member Name</CFormLabel>
                    <div class="col-sm-8">
                        <CFormInput type="hidden" id="hiddenId" v-model="formData.hiddenId" />
                        <v-select :options="members" v-model="formData.inputMember" id="inputMember" :reduce="(option) => option.id"></v-select>
                    </div>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton class="btn-sm" color="secondary" @click="() => { visibleModalCerti = false }">Close</CButton>
                <CButton class="btn-sm" color="primary" @click="saveMember">Save changes</CButton>
            </CModalFooter>
        </CModal>
    </CRow>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import ButtonMbrRenderer from './ButtonMbrRenderer.vue';

export default {
    name: 'users',
    components: {
        'ag-grid-vue': AgGridVue,
        'v-select': VueSelect,
        ButtonMbrRenderer
    },
    data() {
        return {
            users: [],
            members: [],
            columnDefs: [
                { headerName: 'No.', field: 'no', flex: 1, sortable: true, filter: true },
                { headerName: 'Member Name', field: 'name', flex: 4, sortable: true, filter: true },
                { headerName: 'Gender', field: 'jenis_kelamin', flex: 4, sortable: true, filter: true },
                { headerName: 'Age (year)', field: 'umur', flex: 4, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    flex: 2,
                    cellRenderer: 'ButtonMbrRenderer'
                },
            ],
            defaultColDef: {
                resizable: true,
                sortable: true,
                filter: true
            },
            visibleModalCerti: false,
            formData: {
                hiddenId: '',
                inputMember: '',
            },
            pagination: true,
            paginationPageSize: 10,
            paginationPageSizeSelector: [10, 20, 50],
            gridContext: {
                componentParent: this
            }
        };
    },
    computed: {
        memberOptions() {
            return this.members.map(member => ({ id: member.id, name: member.name }));
        }
    },
    mounted() {
        this.fetchCertification();
        this.fetchMembers();
    },
    methods: {
        async fetchCertification() {
            try {
                const response = await axios.get(`http://localhost:8000/api/schedule/member/${this.$route.params.id}`);
                const { data } = response;
                if (data.status === 'success') {
                    this.users = data.data.map((user, index) => ({ ...user, no: index + 1 }));
                } else {
                    console.error('Error fetching users:', data.status);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async fetchMembers() {
            try {
                const response = await axios.get('http://localhost:8000/api/clients');
                const { data } = response;
                if (data.status === 'success') {
                    this.members = data.data.map(member => ({
                        label: member.name,
                        id: member.id
                    }));
                } else {
                    console.error('Error fetching members:', data.status);
                }
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        },
        async saveMember() {
            try {
                const response = await axios.post('http://localhost:8000/api/schedule/member', {
                    id: this.formData.hiddenId,
                    id_schedule : this.$route.params.id,
                    id_client: this.formData.inputMember,
                });
                console.log('Data successfully saved:', response.data);
                this.$swal({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                });
                this.fetchCertification();
                this.visibleModalCerti = false; // Close the modal after saving
            } catch (error) {
                console.error('Error saving data:', error);
            }
        },
        openAddModal() {
            this.resetFormData();
            this.visibleModalCerti = true;
        },
        resetFormData() {
            this.formData.hiddenId = '';
            this.formData.inputMember = '';
        },
        handleEditMember(data) {
            this.formData.hiddenId = data.id;
            this.formData.inputMember = data.id_client;
            this.visibleModalCerti = true;
        },
        async handleDeleteCerti(data) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/coaches/certification/${data.id}`);
                console.log('successfully deleted:', response.data);
                this.$swal({
                    title: "Deleted!",
                    text: "successfully deleted",
                    icon: "success"
                });
                this.fetchCertification();
                this.visibleModalCerti = false; // Close the modal after saving
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
        }
    }
}
</script>

<style>
.custom-photo {
    width: 200px;
    height: 200px;
    object-fit: cover;
}
</style>
<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader class="d-flex justify-content-between align-items-center">
                    <strong>Certification</strong>
                    <CButton color="primary btn-sm" @click="openAddModal" class="ml-auto">Add Certification</CButton>
                </CCardHeader>
                <CCardBody>
                    <ag-grid-vue class="ag-theme-quartz" style="height: 300px;" :rowData="users"
                        :columnDefs="columnDefs" :defaultColDef="defaultColDef" :paginationAutoPageSize="true"
                        :pagination="pagination" :paginationPageSize="paginationPageSize"
                        :paginationPageSizeSelector="paginationPageSizeSelector" @grid-ready="onGridReady"
                        :frameworkComponents="frameworkComponents" :context="gridContext">
                    </ag-grid-vue>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <CModal alignment="center" :visible="visibleModalCerti" @close="() => { visibleModalCerti = false }"
        aria-labelledby="VerticallyCenteredExample">
        <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Certification</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow class="mb-3">
                <CFormLabel for="inputOrg" class="col-sm-3 col-form-label">Organization</CFormLabel>
                <div class="col-sm-9">
                    <CFormInput type="hidden" id="hiddenId" v-model="formData.hiddenId" />
                    <CFormInput type="text" id="inputOrg" v-model="formData.inputOrg" />
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="inputProgram" class="col-sm-3 col-form-label">Program</CFormLabel>
                <div class="col-sm-9">
                    <CFormInput type="text" id="inputProgram" v-model="formData.inputProgram" />
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="inputYear" class="col-sm-3 col-form-label">Year</CFormLabel>
                <div class="col-sm-9">
                    <CFormInput type="text" id="inputYear" v-model="formData.inputYear" />
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="inputLoc" class="col-sm-3 col-form-label">Location</CFormLabel>
                <div class="col-sm-9">
                    <CFormInput type="text" id="inputLoc" v-model="formData.inputLoc" />
                </div>
            </CRow>
        </CModalBody>
        <CModalFooter>
            <CButton class="btn-sm" color="secondary" @click="() => { visibleModalCerti = false }">Close
            </CButton>
            <CButton class="btn-sm" color="primary" @click="saveCertification">Save changes</CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import BtnCrtRender from './BtnCrtRender.vue';

export default {
    name: 'users',
    components: {
        'ag-grid-vue': AgGridVue,
        BtnCrtRender,
    },
    data() {
        return {
            users: [],
            columnDefs: [
                { headerName: '#', field: 'no', width: 60, sortable: true, filter: true },
                { headerName: 'Organization', field: 'organization', width: 160, sortable: true, filter: true },
                { headerName: 'Program', field: 'program', width: 400, sortable: true, filter: true },
                { headerName: 'Year', field: 'year', width: 100, sortable: true, filter: true },
                { headerName: 'Location', field: 'location', width: 150, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    width: 200,
                    cellRenderer: 'BtnCrtRender'
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
                inputCertification: '',
            },
            pagination: true,
            paginationPageSize: 10,
            paginationPageSizeSelector: [10, 20, 50],
            gridContext: {
                componentParent: this
            }
        };
    },
    mounted() {
        this.fetchCertification();
    },
    methods: {
        async fetchCertification() {
            try {
                const response = await axios.get(`http://localhost:8000/api/xyz/coaches/certification/${this.$route.params.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    },
                })
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
        async saveCertification() {
            try {
                const response = await axios.post('http://localhost:8000/api/xyz/coaches/certification', {
                    id: this.formData.hiddenId,
                    id_user: this.$route.params.id,
                    organization: this.formData.inputOrg,
                    program: this.formData.inputProgram,
                    year: this.formData.inputYear,
                    location: this.formData.inputLoc,
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                        },
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
            this.formData.inputCertification = '';
        },
        handleEditCerti(data) {
            this.formData.hiddenId = data.id;
            this.formData.inputOrg = data.organization;
            this.formData.inputProgram = data.program;
            this.formData.inputYear = data.year;
            this.formData.inputLoc = data.location;
            this.visibleModalCerti = true;
        },
        async handleDeleteCerti(data) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/xyz/coaches/certification/${data.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    },
                })
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

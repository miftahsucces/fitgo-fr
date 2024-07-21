<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader class="d-flex justify-content-between align-items-center">
                    <strong>Spesialist</strong>
                    <CButton color="primary btn-sm" @click="openAddModal" class="ml-auto">Add Spesialist</CButton>
                </CCardHeader>
                <CCardBody>
                    <ag-grid-vue class="ag-theme-quartz" style="height: 300px;" :rowData="users"
                        :columnDefs="columnDefs" :defaultColDef="defaultColDef" :paginationAutoPageSize="true" :pagination="pagination"
                        :paginationPageSize="paginationPageSize"
                        :paginationPageSizeSelector="paginationPageSizeSelector" @grid-ready="onGridReady"
                        :frameworkComponents="frameworkComponents" :context="gridContext">
                    </ag-grid-vue>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <CModal alignment="center" :visible="visibleVerticallyCenteredDemo"
        @close="() => { visibleVerticallyCenteredDemo = false }" aria-labelledby="VerticallyCenteredExample">
        <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Spesialist</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow class="mb-3">
                <CFormLabel for="inputSpesialist" class="col-sm-2 col-form-label">Spesialist</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput type="hidden" id="hiddenId" v-model="formData.hiddenId" />
                    <CFormTextarea id="inputSpesialist" v-model="formData.inputSpesialist" rows="3" required>
                    </CFormTextarea>
                </div>
            </CRow>
        </CModalBody>
        <CModalFooter>
            <CButton class="btn-sm" color="secondary" @click="() => { visibleVerticallyCenteredDemo = false }">Close
            </CButton>
            <CButton class="btn-sm" color="primary" @click="saveSpesialist">Save changes</CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import EditBtnSpsRender from './BtnSpsRender.vue';

export default {
    name: 'users',
    components: {
        'ag-grid-vue': AgGridVue,
        EditBtnSpsRender,
    },
    data() {
        return {
            users: [],
            columnDefs: [
                { headerName: '#', field: 'no', width: 60, sortable: true, filter: true },
                { headerName: 'Spesialist', field: 'spesialis', width: 550, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    width: 160,
                    cellRenderer: 'EditBtnSpsRender'
                },
            ],
            defaultColDef: {
                resizable: true,
                sortable: true,
                filter: true
            },
            visibleVerticallyCenteredDemo: false,
            formData: {
                hiddenId: '',
                inputSpesialist: '',
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
        this.fetchSpesialis();
    },
    methods: {
        async fetchSpesialis() {
            try {
                const response = await axios.get(`http://localhost:8000/api/coaches/spesialis/${localStorage.getItem('id')}`);
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
        async saveSpesialist() {
            try {
                const response = await axios.post('http://localhost:8000/api/coaches/spesialis', {
                    id: this.formData.hiddenId,
                    id_user: localStorage.getItem('id'),
                    spesialis: this.formData.inputSpesialist,
                });
                console.log('Data successfully saved:', response.data);
                this.$swal({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                });
                this.fetchSpesialis();
                this.visibleVerticallyCenteredDemo = false; // Close the modal after saving
            } catch (error) {
                console.error('Error saving data:', error);
            }
        },
        openAddModal() {
            this.resetFormData();
            this.visibleVerticallyCenteredDemo = true;
        },
        resetFormData() {
            this.formData.hiddenId = '';
            this.formData.inputSpesialist = '';
        },
        handleEditSpesialis(data) {
            this.formData.hiddenId = data.id;
            this.formData.inputSpesialist = data.spesialis;
            this.visibleVerticallyCenteredDemo = true;
        },
        async handleDeleteSpesialis(data) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/coaches/spesialis/${data.id}`);
                console.log('successfully deleted:', response.data);
                this.$swal({
                    title: "Deleted!",
                    text: "successfully deleted",
                    icon: "success"
                });
                this.fetchSpesialis();
                this.visibleVerticallyCenteredDemo = false; // Close the modal after saving
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

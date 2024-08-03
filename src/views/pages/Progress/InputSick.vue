<template>
    <div>
        <CRow>
            <CCol :xs="12">
                <CCard class="mb-4">
                    <CCardHeader class="d-flex justify-content-between align-items-center">
                        <strong>Data penyakit, cidera atau keluhan</strong>
                        <CButton v-if="role != 3" color="primary btn-sm" @click="openAddModal" class="ml-auto">Add Data
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <ag-grid-vue class="ag-theme-quartz" style="height: 300px;" :rowData="sickGrid"
                            :columnDefs="columnDefs" :defaultColDef="defaultColDef" :paginationAutoPageSize="true"
                            :pagination="pagination" :paginationPageSize="paginationPageSize"
                            :paginationPageSizeSelector="paginationPageSizeSelector" :context="gridContext">
                        </ag-grid-vue>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CModal alignment="center" :visible="visibleModalCerti" size="lg" @close="() => { visibleModalCerti = false }"
            aria-labelledby="VerticallyCenteredExample">
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredExample">Data penyakit, cidera atau keluhan</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow class="mb-3">
                    <CFormLabel for="desc" class="col-sm-4 col-form-label">Data penyakit, cidera atau keluhan
                    </CFormLabel>
                    <div class="col-sm-8">
                        <CFormTextarea id="desc" v-model="formDataIllness.desc" rows="3">
                        </CFormTextarea>
                    </div>
                </CRow>

            </CModalBody>
            <CModalFooter>
                <CButton class="btn-sm" color="secondary" @click="() => { visibleModalCerti = false }">Close
                </CButton>
                <CButton class="btn-sm" color="primary" @click="saveIllness">Save changes</CButton>
            </CModalFooter>
        </CModal>
    </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import { eventBus } from '@/eventBus.js';
import BtnRender from './BtnRender.vue';

export default {
    props: ['paramID', 'sickGrid'],
    components: {
        'ag-grid-vue': AgGridVue,
        BtnRender
    },
    data() {
        return {
            role: localStorage.getItem('roles'),
            columnDefs: [
                { headerName: '#', field: 'no', width: 60, sortable: false, filter: false },
                { headerName: 'Data penyakit, cidera atau keluhan', field: 'desc', width: 600, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    width: 300,
                    cellRenderer: 'BtnRender', sortable: false, filter: false
                },
            ],
            defaultColDef: {
                resizable: true,
                sortable: true,
                filter: true
            },
            visibleModalCerti: false,
            formDataIllness: {
                id: '',
                id_client: this.paramID,
                desc: '',
            },
            pagination: true,
            paginationPageSize: 10,
            paginationPageSizeSelector: [10, 20, 50],
            gridContext: {
                componentParent: this
            }
        };
    },
    methods: {
        async saveIllness() {
            try {
                const formDataIllness = new FormData();
                for (const key in this.formDataIllness) {
                    formDataIllness.append(key, this.formDataIllness[key]);
                }

                const response = await axios.post('http://localhost:8000/api/xyz/progress/illness', formDataIllness, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    }
                });

                console.log('Data successfully saved:', response.data);
                this.$swal({
                    title: "Good job!",
                    text: "Successfully!",
                    icon: "success"
                });
                const userId = response.data.data.id;
                eventBus.emit('illnessUpdated');
                this.visibleModalCerti = false;
                // this.resetForm();
            } catch (error) {
                console.error('Error saving data:', error);
                this.$swal({
                    title: "Error!",
                    text: "There was an error saving the user data.",
                    icon: "error"
                });
            }
        },
        async handleDelete(data) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/xyz/progress/sick/${data.id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    }
                });
                console.log('successfully deleted:', response.data);
                this.$swal({
                    title: "Deleted!",
                    text: "Successfully deleted",
                    icon: "success"
                });
                
                eventBus.emit('illnessUpdated');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
        handleEdit(data) {
            this.formDataIllness.id = data.id;
            this.formDataIllness.desc = data.desc;
            this.visibleModalCerti = true;
        },
        openAddModal() {
            this.resetformDataIllness();
            this.visibleModalCerti = true;
        },
        resetformDataIllness() {
            this.formDataIllness.id = '';
            this.formDataIllness.desc = '';
        },
    }
}
</script>

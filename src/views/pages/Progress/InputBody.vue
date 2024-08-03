<template>
    <div>
        <CRow>
            <CCol :xs="12">
                <CCard class="mb-4">
                    <CCardHeader class="d-flex justify-content-between align-items-center">
                        <strong>Body Composition</strong>
                        <CButton v-if="role != 3" color="primary btn-sm" @click="openAddModal" class="ml-auto">Add Data
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <div class="table-responsive">
                            <ag-grid-vue class="ag-theme-quartz" style="height: 300px; width: 100%;" :rowData="gridBody"
                                :columnDefs="columnDefs" :defaultColDef="defaultColDef" :paginationAutoPageSize="true"
                                :pagination="pagination" :paginationPageSize="paginationPageSize"
                                :paginationPageSizeSelector="paginationPageSizeSelector" :context="gridContext">
                            </ag-grid-vue>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CModal alignment="center" :visible="visibleModalCerti" @close="() => { visibleModalCerti = false }"
            aria-labelledby="VerticallyCenteredExample">
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredExample">Body Composition</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-3 mb-3">
                    <CCol xs="6">
                        <CFormLabel for="weigth">Berat Badan</CFormLabel>
                        <CFormInput type="text" id="weigth" v-model="formData.weigth" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="body_fat">% Body Fat</CFormLabel>
                        <CFormInput type="text" id="body_fat" v-model="formData.body_fat" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="body_water">% Body Water</CFormLabel>
                        <CFormInput type="text" id="body_water" v-model="formData.body_water" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="muscle_mass">Muscle Mass</CFormLabel>
                        <CFormInput type="text" id="muscle_mass" v-model="formData.muscle_mass" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="physical_rating">Phsyical Rating</CFormLabel>
                        <CFormInput type="text" id="physical_rating" v-model="formData.physical_rating" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="bmr">BMR</CFormLabel>
                        <CFormInput type="text" id="bmr" v-model="formData.bmr" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="metabolic_age">Metabolic Age</CFormLabel>
                        <CFormInput type="text" id="metabolic_age" v-model="formData.metabolic_age" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="bone_mass">Bone Mass</CFormLabel>
                        <CFormInput type="text" id="bone_mass" v-model="formData.bone_mass" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="visceral_fat">Visceral Fat</CFormLabel>
                        <CFormInput type="text" id="visceral_fat" v-model="formData.visceral_fat" required />
                    </CCol>
                    <CCol xs="6">
                        <CFormLabel for="date_actual">Date</CFormLabel>
                        <CFormInput type="date" id="date_actual" v-model="formData.date_actual" required />
                    </CCol>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton class="btn-sm" color="secondary" @click="() => { visibleModalCerti = false }">Close</CButton>
                <CButton class="btn-sm" color="primary" @click="saveBody">Save changes</CButton>
            </CModalFooter>
        </CModal>
    </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import BtnInputRender from './BtnRender.vue';
import { eventBus } from '@/eventBus.js';

export default {
    props: ['paramID', 'gridBody'],
    name: 'users',
    components: {
        'ag-grid-vue': AgGridVue,
        BtnInputRender: BtnInputRender
    },
    data() {
        return {
            users: [],
            role: localStorage.getItem('roles'),
            columnDefs: [
                { headerName: '#', field: 'no', width: 45, sortable: false, filter: false },
                { headerName: 'Berat Badan', field: 'weigth', width: 100, sortable: true, filter: true },
                { headerName: '% Body Fat', field: 'body_fat', width: 100, sortable: true, filter: true },
                { headerName: '% Body Water', field: 'body_water', width: 100, sortable: true, filter: true },
                { headerName: 'Muscle Mass', field: 'muscle_mass', width: 100, sortable: true, filter: true },
                { headerName: 'Phsyical Rating', field: 'physical_rating', width: 110, sortable: true, filter: true },
                { headerName: 'BMR', field: 'bmr', width: 80, sortable: true, filter: true },
                { headerName: 'Metabolic Age', field: 'metabolic_age', width: 120, sortable: true, filter: true },
                { headerName: 'Bone Mass', field: 'bone_mass', width: 100, sortable: true, filter: true },
                { headerName: 'Visceral Fat', field: 'visceral_fat', width: 110, sortable: true, filter: true },
                { headerName: 'Date', field: 'date_actual', width: 120, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    width: 140,
                    cellRenderer: 'BtnInputRender', sortable: false, filter: false
                },
            ],
            defaultColDef: {
                resizable: true,
                sortable: true,
                filter: true,
                wrapHeaderText: true,
                autoHeaderHeight: true,
            },
            visibleModalCerti: false,
            formData: {
                id: '',
                id_client: this.paramID,
                weigth: '',
                body_fat: '',
                body_water: '',
                muscle_mass: '',
                physical_rating: '',
                bmr: '',
                metabolic_age: '',
                bone_mass: '',
                visceral_fat: '',
                date_actual: '',
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
        async saveBody() {
            try {
                const formData = new FormData();
                for (const key in this.formData) {
                    formData.append(key, this.formData[key]);
                }

                const response = await axios.post('http://localhost:8000/api/xyz/progress/body', formData, {
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

                eventBus.emit('bodyUpdated');
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
        openAddModal() {
            this.resetFormData();
            this.visibleModalCerti = true;
        },
        resetFormData() {
            this.formData.id = '';
            this.formData.weigth = '';
            this.formData.body_fat = '';
            this.formData.body_water = '';
            this.formData.muscle_mass = '';
            this.formData.physical_rating = '';
            this.formData.bmr = '';
            this.formData.metabolic_age = '';
            this.formData.bone_mass = '';
            this.formData.visceral_fat = '';
            this.formData.bone_mass = '';
            this.formData.date_actual = '';
        },
        handleEdit(data) {
            this.formData.id = data.id;
            this.formData.weigth = data.weigth;
            this.formData.body_fat = data.body_fat;
            this.formData.body_water = data.body_water;
            this.formData.muscle_mass = data.muscle_mass;
            this.formData.physical_rating = data.physical_rating;
            this.formData.bmr = data.bmr;
            this.formData.metabolic_age = data.metabolic_age;
            this.formData.bone_mass = data.bone_mass;
            this.formData.visceral_fat = data.visceral_fat;
            this.formData.bone_mass = data.bone_mass;
            this.formData.date_actual = data.date_actual;
            this.visibleModalCerti = true;
        },
        async handleDelete(data) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/xyz/progress/body/${data.id}`, {
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
                
                eventBus.emit('bodyUpdated');
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

<template>
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
                        <ag-grid-vue class="ag-theme-quartz" style="height: 300px; width: 100%;" :rowData="users"
                            :columnDefs="columnDefs" :defaultColDef="defaultColDef" :paginationAutoPageSize="true"
                            :pagination="pagination" :paginationPageSize="paginationPageSize"
                            :paginationPageSizeSelector="paginationPageSizeSelector" @grid-ready="onGridReady"
                            :frameworkComponents="frameworkComponents" :context="gridContext">
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
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import BtnInputRender from './BtnInputRender.vue';

export default {
    name: 'users',
    components: {
        'ag-grid-vue': AgGridVue,
        BtnInputRender,
    },
    data() {
        return {
            users: [],
            role: 0,
            columnDefs: [
                { headerName: '#', field: 'no', width: 40, sortable: false, filter: false },
                { headerName: 'Berat Badan', field: 'weight', width: 100, sortable: true, filter: true },
                { headerName: '% Body Fat', field: 'body_fat', width: 100, sortable: true, filter: true },
                { headerName: '% Body Water', field: 'body_water', width: 100, sortable: true, filter: true },
                { headerName: 'Muscle Mass', field: 'muscle_mass', width: 100, sortable: true, filter: true },
                { headerName: 'Phsyical Rating', field: 'physical_rating', width: 110, sortable: true, filter: true },
                { headerName: 'BMR', field: 'bmr', width: 80, sortable: true, filter: true },
                { headerName: 'Metabolic Age', field: 'metabolic_age', width: 120, sortable: true, filter: true },
                { headerName: 'Bone Mass', field: 'bone_mass', width: 100, sortable: true, filter: true },
                { headerName: 'Visceral Fat', field: 'visceral_fat', width: 110, sortable: true, filter: true },
                { headerName: 'Date', field: 'date_actual', width: 220, sortable: true, filter: true },
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
                id_client:localStorage.getItem('id'),
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
    mounted() {
        this.fetchBody();
        this.fetchUserRole();
    },
    methods: {
        async fetchUserRole() {
            this.role = localStorage.getItem('roles');
        },
        async fetchBody() {
            try {
                const response = await axios.get(`http://localhost:8000/api/xyz/progress/body/${this.formData.id_client}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    }
                });
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
    }
}
</script>

<style scoped>
.table-responsive {
    overflow-x: auto;
}
</style>
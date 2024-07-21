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
                            :columnDefs="columnDefs" :defaultColDef="defaultColDef" :paginationAutoPageSize="true" :pagination="pagination"
                            :paginationPageSize="paginationPageSize"
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
                    <CFormLabel for="fullName">Berat Badan</CFormLabel>
                    <CFormInput type="text" id="fullName" v-model="formData.fullName" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="email">% Body Fat</CFormLabel>
                    <CFormInput type="email" id="email" v-model="formData.email" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="fullName">% Body Water</CFormLabel>
                    <CFormInput type="text" id="fullName" v-model="formData.fullName" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="email">Muscle Mass</CFormLabel>
                    <CFormInput type="email" id="email" v-model="formData.email" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="fullName">Phsyical Rating</CFormLabel>
                    <CFormInput type="text" id="fullName" v-model="formData.fullName" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="email">BMR</CFormLabel>
                    <CFormInput type="email" id="email" v-model="formData.email" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="fullName">Metabolic Age</CFormLabel>
                    <CFormInput type="text" id="fullName" v-model="formData.fullName" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="email">Bone Mass</CFormLabel>
                    <CFormInput type="email" id="email" v-model="formData.email" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="fullName">Visceral Fat</CFormLabel>
                    <CFormInput type="text" id="fullName" v-model="formData.fullName" required />
                </CCol>
                <CCol xs="6">
                    <CFormLabel for="email">Date</CFormLabel>
                    <CFormInput type="email" id="email" v-model="formData.email" required />
                </CCol>
            </CForm>
        </CModalBody>
        <CModalFooter>
            <CButton class="btn-sm" color="secondary" @click="() => { visibleModalCerti = false }">Close</CButton>
            <CButton class="btn-sm" color="primary" @click="saveSchedule">Save changes</CButton>
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
                { headerName: '', field: 'no', flex: 1, sortable: true, filter: true },
                { headerName: 'Berat Badan', field: 'date_schedule', flex: 2, sortable: true, filter: true },
                { headerName: '% Body Fat', field: 'time_start', flex: 2, sortable: true, filter: true },
                { headerName: '% Body Water', field: 'time_end', flex: 2, sortable: true, filter: true },
                { headerName: 'Muscle Mass', field: 'location', flex: 2, sortable: true, filter: true },
                { headerName: 'Phsyical Rating', field: 'location', flex: 2, sortable: true, filter: true },
                { headerName: 'BMR', field: 'location', flex: 2, sortable: true, filter: true },
                { headerName: 'Metabolic Age', field: 'location', flex: 2.5, sortable: true, filter: true },
                { headerName: 'Bone Mass', field: 'location', flex: 2, sortable: true, filter: true },
                { headerName: 'Visceral Fat', field: 'location', flex: 2, sortable: true, filter: true },
                { headerName: 'Date', field: 'location', flex: 2, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    flex: 2,
                    cellRenderer: 'BtnInputRender'
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
                hiddenId: '',
                inputDate: '',
                inputStartTime: '',
                inputEndTime: '',
                inputLoc: '',
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
        this.fetchSchedules();
        this.fetchUserRole();
    },
    methods: {
        async fetchUserRole() {
            this.role = localStorage.getItem('roles');
        },
        async fetchSchedules() {
            try {
                const response = await axios.get(`http://localhost:8000/api/schedule/detail/`);
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
        async saveSchedule() {
            try {
                const response = await axios.post('http://localhost:8000/api/schedule/detail', {
                    id: this.formData.hiddenId,
                    date_schedule: this.formData.inputDate,
                    time_start: this.formData.inputStartTime,
                    time_end: this.formData.inputEndTime,
                    location: this.formData.inputLoc,
                });
                console.log('Data successfully saved:', response.data);
                this.$swal({
                    title: "Good job!",
                    text: "Schedule saved successfully!",
                    icon: "success"
                });
                this.fetchSchedules();
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
            this.formData.inputDate = '';
            this.formData.inputStartTime = '';
            this.formData.inputEndTime = '';
            this.formData.inputLoc = '';
        },
        handleEditSch(data) {
            this.formData.hiddenId = data.id;
            this.formData.inputDate = data.date;
            this.formData.inputStartTime = data.time_start;
            this.formData.inputEndTime = data.time_end;
            this.formData.inputLoc = data.location;
            this.visibleModalCerti = true;
        },
        async handleDeleteSch(data) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/schedules/detail/${data.id}`);
                console.log('successfully deleted:', response.data);
                this.$swal({
                    title: "Deleted!",
                    text: "Schedule successfully deleted",
                    icon: "success"
                });
                this.fetchSchedules();
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

<style scoped>
.table-responsive {
    overflow-x: auto;
}
</style>
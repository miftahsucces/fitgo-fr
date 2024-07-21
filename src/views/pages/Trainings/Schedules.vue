<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader class="d-flex justify-content-between align-items-center">
                    <strong>Schedules</strong>
                    <CButton color="primary btn-sm" @click="openAddModal" class="ml-auto">Add Schedule</CButton>
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
    <CModal alignment="center" :visible="visibleModalCerti"
        @close="() => { visibleModalCerti = false }" aria-labelledby="VerticallyCenteredExample">
        <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Schedule</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow class="mb-3">
                <CFormLabel for="inputDate" class="col-sm-3 col-form-label">Date</CFormLabel>
                <div class="col-sm-9">
                    <CFormInput type="hidden" id="hiddenId" v-model="formData.hiddenId" />
                    <CFormInput type="date" id="inputDate" v-model="formData.inputDate" />
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="inputStartTime" class="col-sm-3 col-form-label">Start Time</CFormLabel>
                <div class="col-sm-9">
                    <CFormInput type="time" id="inputStartTime" v-model="formData.inputStartTime" />
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="inputEndTime" class="col-sm-3 col-form-label">End Time</CFormLabel>
                <div class="col-sm-9">
                    <CFormInput type="time" id="inputEndTime" v-model="formData.inputEndTime" />
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
            <CButton class="btn-sm" color="primary" @click="saveSchedule">Save changes</CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import ButtonSchRenderer from './ButtonSchRenderer.vue';

export default {
    name: 'users',
    components: {
        'ag-grid-vue': AgGridVue,
        ButtonSchRenderer,
    },
    data() {
        return {
            users: [],
            columnDefs: [
                { headerName: 'No.', field: 'no', flex: 1, sortable: true, filter: true },
                { headerName: 'Date', field: 'date_schedule', flex: 2, sortable: true, filter: true },
                { headerName: 'Start Time', field: 'time_start', flex: 2, sortable: true, filter: true },
                { headerName: 'End Time', field: 'time_end', flex: 2, sortable: true, filter: true },
                { headerName: 'Location', field: 'location', flex: 2, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    flex: 2,
                    cellRenderer: 'ButtonSchRenderer'
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
    },
    methods: {
        async fetchSchedules() {
            try {
                const response = await axios.get(`http://localhost:8000/api/schedule/detail/${this.$route.params.id}`);
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
                    id_schedule : this.$route.params.id,
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

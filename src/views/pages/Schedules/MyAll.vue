<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader class="d-flex justify-content-between align-items-center">
                    <strong>Schedules Soon</strong>
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
    
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import BtnRender from './BtnRender.vue';

export default {
    name: 'users',
    components: {
        'ag-grid-vue': AgGridVue,
        BtnRender,
    },
    data() {
        return {
            users: [],
            columnDefs: [
                { headerName: '#', field: 'no', width: 60, sortable: true, filter: true },
                { headerName: 'Date', field: 'date_schedule', width: 200, sortable: true, filter: true },
                { headerName: 'Start Time', field: 'time_start', width: 200, sortable: true, filter: true },
                { headerName: 'End Time', field: 'time_end', width: 200, sortable: true, filter: true },
                { headerName: 'Location', field: 'location', width: 200, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    width: 200,
                    cellRenderer: 'BtnRender'
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
                const response = await axios.get(`http://localhost:8000/api/xyz/schedule/allday/${localStorage.getItem('id')}`, {
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

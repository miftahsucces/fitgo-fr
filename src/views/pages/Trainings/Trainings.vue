<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader class="d-flex justify-content-between align-items-center">
                    <strong>Trainings</strong>
                    <CButton color="primary" @click="openAddData" class="ml-auto">Add Training</CButton>
                </CCardHeader>
                <CCardBody>
                    <ag-grid-vue class="ag-theme-quartz" style="height: 550px;" :rowData="programs"
                        :columnDefs="columnDefs" :defaultColDef="defaultColDef" :pagination="pagination"
                        :paginationPageSize="paginationPageSize"
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
import EditButtonRenderer from './ButtonRenderer.vue';

export default {
    name: 'programs',
    components: {
        'ag-grid-vue': AgGridVue,
        EditButtonRenderer,
    },
    data() {
        return {
            programs: [],
            columnDefs: [
                { headerName: 'No.', field: 'no', flex: 1, sortable: true, filter: true },
                { headerName: 'Program', field: 'program', flex: 2, sortable: true, filter: true },
                { headerName: 'Trainer', field: 'name', flex: 2, sortable: true, filter: true },
                { headerName: 'Start Date', field: 'start_date', flex: 2, sortable: true, filter: true },
                { headerName: 'End Date', field: 'end_date', flex: 2, sortable: true, filter: true },
                { headerName: 'Days Total', field: 'total_days', flex: 2, sortable: true, filter: true },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    cellRenderer: 'EditButtonRenderer'
                },
            ],
            defaultColDef: {
                resizable: true,
                sortable: true,
                filter: true
            },
            visibleVerticallyCenteredDemo: false,
            formData: {
                inputId: '',
                inputProgram: '',
                inputDesc: ''
            },
            pagination: true,
            paginationPageSize: 10,
            paginationPageSizeSelector: [10, 20, 50],
            frameworkComponents: {
                EditButtonRenderer,
            },
            gridContext: {
                componentParent: this
            }
        };
    },
    mounted() {
        this.fetchPrograms();
    },
    methods: {
        async fetchPrograms() {
            try {
                const response = await axios.get('http://localhost:8000/api/schedule');
                this.programs = response.data.data.map((program, index) => ({
                    no: index + 1,
                    ...program
                }));
            } catch (error) {
                console.error('Error fetching Programs:', error);
            }
        },
        openAddData() {
            this.$router.push({ path: '/pages/add-trainings' });
        },
        async saveChanges() {
            try {
                const response = await axios.post('http://localhost:8000/api/programs', {
                    id: this.formData.inputId,
                    program: this.formData.inputProgram,
                    desc: this.formData.inputDesc,
                });
                console.log('Data successfully saved:', response.data);
                this.$swal({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                });
                this.formData.inputId = '';
                this.formData.inputProgram = '';
                this.formData.inputDesc = '';
                this.visibleVerticallyCenteredDemo = false;
                this.fetchPrograms();
            } catch (error) {
                console.error('Error saving data:', error);
            }
        },
        handleEditProgram(data) {
            console.log(data);
            this.$router.push({ name: 'Edit Training', params: { id: data.id } });
        },
        async handleDeleteProgram(data) {
            console.log('Delete Program:', data);
            // try {
            //   const response = await axios.delete(`http://localhost:8000/api/Programs/${data.id}`);
            //   console.log('Program successfully deleted:', response.data);
            //   this.$swal({
            //     title: "Deleted!",
            //     text: "The Program has been deleted.",
            //     icon: "success"
            //   });
            //   this.fetchPrograms();
            // } catch (error) {
            //   console.error('Error deleting Program:', error);
            // }
        },
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
        }
    }
}
</script>
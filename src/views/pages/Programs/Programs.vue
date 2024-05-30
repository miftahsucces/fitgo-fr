<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <strong>Programs</strong>
          <CButton color="primary" @click="openAddDataModal" class="ml-auto">Add Data</CButton>
        </CCardHeader>
        <CCardBody>
          <ag-grid-vue class="ag-theme-quartz" style="height: 550px;" :rowData="programs" :columnDefs="columnDefs"
            :defaultColDef="defaultColDef" :pagination="pagination" :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector" @grid-ready="onGridReady"
            :frameworkComponents="frameworkComponents" :context="gridContext">
          </ag-grid-vue>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CModal alignment="center" :visible="visibleVerticallyCenteredDemo" size="lg"
    @close="() => { visibleVerticallyCenteredDemo = false }" aria-labelledby="VerticallyCenteredExample">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Programs</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow class="mb-3">
        <CFormLabel for="inputProgram" class="col-sm-4 col-form-label">Program Name</CFormLabel>
        <div class="col-sm-8">
          <CFormInput type="hidden" id="inputId" v-model="formData.inputId" />
          <CFormInput type="text" id="inputProgram" v-model="formData.inputProgram" />
        </div>
      </CRow>
      <CRow class="mb-3">
        <CFormLabel for="inputDesc" class="col-sm-4 col-form-label">Description</CFormLabel>
        <div class="col-sm-8">
          <CFormTextarea id="inputDesc" v-model="formData.inputDesc" rows="3"></CFormTextarea>
        </div>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { visibleVerticallyCenteredDemo = false }">Close</CButton>
      <CButton color="primary" @click="saveChanges">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import EditButtonRenderer from './EditButtonRenderer.vue';

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
        { headerName: 'Program', field: 'program', flex: 4, sortable: true, filter: true },
        { headerName: 'Description', field: 'desc', flex: 4, sortable: true, filter: true },
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
        const response = await axios.get('http://localhost:8000/api/programs');
        this.programs = response.data.data.map((program, index) => ({
          no: index + 1,
          ...program
        }));
      } catch (error) {
        console.error('Error fetching Programs:', error);
      }
    },
    openAddDataModal() {
      // Reset formData fields
      this.formData.inputId = '';
      this.formData.inputProgram = '';
      this.formData.inputDesc = '';
      // Show the modal
      this.visibleVerticallyCenteredDemo = true;
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
      this.formData.inputId = data.id;
      this.formData.inputProgram = data.program;
      this.formData.inputDesc = data.desc;
      this.visibleVerticallyCenteredDemo = true;
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

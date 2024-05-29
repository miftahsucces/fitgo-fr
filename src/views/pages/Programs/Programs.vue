<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader class="d-flex justify-content-between align-items-center">
            <strong>Users</strong>
            <CButton color="primary" @click="() => { visibleVerticallyCenteredDemo = true }" class="ml-auto">Add Data</CButton>
          </CCardHeader>
          <CCardBody>
            <ag-grid-vue
              class="ag-theme-quartz"
              style="height: 550px;"
              :rowData="users"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :pagination="pagination"
              :paginationPageSize="paginationPageSize"
              :paginationPageSizeSelector="paginationPageSizeSelector"
              @grid-ready="onGridReady"
              :frameworkComponents="frameworkComponents"
              :context="gridContext">
            </ag-grid-vue>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CModal alignment="center" :visible="visibleVerticallyCenteredDemo"
      @close="() => { visibleVerticallyCenteredDemo = false }" aria-labelledby="VerticallyCenteredExample">
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Users</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow class="mb-3">
          <CFormLabel for="inputNama" class="col-sm-2 col-form-label">Nama</CFormLabel>
          <div class="col-sm-10">
            <CFormInput type="text" id="inputNama" v-model="formData.nama" />
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="inputEmail" class="col-sm-2 col-form-label">Email</CFormLabel>
          <div class="col-sm-10">
            <CFormInput type="text" id="inputEmail" v-model="formData.email" />
          </div>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="inputPassword" class="col-sm-2 col-form-label">Password</CFormLabel>
          <div class="col-sm-10">
            <CFormInput type="password" id="inputPassword" v-model="formData.password" />
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
  import DeleteButtonRenderer from './DeleteButtonRenderer.vue';
  
  export default {
    name: 'users',
    components: {
      'ag-grid-vue': AgGridVue,
      EditButtonRenderer,
      DeleteButtonRenderer
    },
    data() {
      return {
        users: [],
        columnDefs: [
          { headerName: '#', field: 'id', flex: 1, sortable: true, filter: true },
          { headerName: 'Nama', field: 'name', flex: 4, sortable: true, filter: true },
          { headerName: 'Email', field: 'email', flex: 4, sortable: true, filter: true },
          {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: 'EditButtonRenderer'
          },
          {
            headerName: '',
            field: '',
            cellRenderer: 'DeleteButtonRenderer',
          }
        ],
        defaultColDef: {
          resizable: true,
          sortable: true,
          filter: true
        },
        visibleVerticallyCenteredDemo: false,
        formData: {
          nama: '',
          email: '',
          password: ''
        },
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 20, 50],
        frameworkComponents: {
          EditButtonRenderer,
          DeleteButtonRenderer
        },
        gridContext: {
          componentParent: this
        }
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:8000/api/users');
          this.users = response.data.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async saveChanges() {
        try {
          const response = await axios.post('http://localhost:8000/api/users', {
            name: this.formData.nama,
            email: this.formData.email,
            password: this.formData.password
          });
          console.log('Data successfully saved:', response.data);
          this.$swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });
          this.formData.nama = '';
          this.formData.email = '';
          this.formData.password = '';
          this.visibleVerticallyCenteredDemo = false;
          this.fetchUsers();
        } catch (error) {
          console.error('Error saving data:', error);
        }
      },
      handleEditUser(data) {
        this.formData.nama = data.name;
        this.formData.email = data.email;
        this.formData.password = ''; // Password should not be pre-filled
        this.visibleVerticallyCenteredDemo = true;
      },
      async handleDeleteUser(data) {
        console.log('Delete user:', data);
        // try {
        //   const response = await axios.delete(`http://localhost:8000/api/users/${data.id}`);
        //   console.log('User successfully deleted:', response.data);
        //   this.$swal({
        //     title: "Deleted!",
        //     text: "The user has been deleted.",
        //     icon: "success"
        //   });
        //   this.fetchUsers();
        // } catch (error) {
        //   console.error('Error deleting user:', error);
        // }
      },
      onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      }
    }
  }
  </script>
  
  
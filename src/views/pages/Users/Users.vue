<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader class="d-flex justify-content-between align-items-center">
            <strong>Users</strong>
            <CButton color="primary" class="ml-auto" @click="navigateToAddUser">Add Data</CButton>
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
      navigateToAddUser() {
        this.$router.push({ name: 'add-user' });
      },
      onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      }
    }
  }
  </script>
  
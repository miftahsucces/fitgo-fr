<template>
    <div>
      <CButton color="warning" size="sm" @click="onClickEdit">Edit</CButton>
      <CButton color="danger" size="sm" @click="onClickDelete">Delete</CButton>
    </div>
  
  </template>
  
  <script>
  export default {
    name: 'EditBtnSpsRender',
    props: {
      data: Object,
      context: Object
    },
    methods: {
      onClickEdit() {
        if (this.params.context && this.params.context.componentParent && this.params.context.componentParent.handleEditSpesialis) {
          this.params.context.componentParent.handleEditSpesialis(this.params.data);
        } else {
          console.error('Context or handleEditSpesialis method is undefined');
        }
      },
      onClickDelete() {
        if (this.params.context && this.params.context.componentParent && this.params.context.componentParent.handleEditSpesialis) {
          this.params.context.componentParent.handleDeleteSpesialis(this.params.data);
        } else {
          console.error('Context or handleDeleteUser method is undefined');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  button {
    margin: 0 5px;
  }
  </style>
  
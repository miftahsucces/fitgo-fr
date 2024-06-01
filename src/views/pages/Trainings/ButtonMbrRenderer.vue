<template>
    <div>
      <CButton color="warning" size="sm" @click="onClickEdit">Edit</CButton>
      <CButton color="danger" size="sm" @click="onClickDelete">Delete</CButton>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ButtonMbrRenderer',
    props: {
      data: Object,
      context: Object
    },
    methods: {
      onClickEdit() {
        if (this.params.context && this.params.context.componentParent && this.params.context.componentParent.handleEditMember) {
          this.params.context.componentParent.handleEditMember(this.params.data);
        } else {
          console.error('Context or handleEditMember method is undefined');
        }
      },
      onClickDelete() {
        if (this.params.context && this.params.context.componentParent && this.params.context.componentParent.handleEditMember) {
          this.params.context.componentParent.handleDeleteMember(this.params.data);
        } else {
          console.error('Context or handleDeleteMember method is undefined');
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
  
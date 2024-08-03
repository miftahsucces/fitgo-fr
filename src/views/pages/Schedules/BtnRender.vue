<template>
    <div>
      <CButton color="warning" size="sm" @click="onClickDetail">Detail</CButton>
    </div>
  
  </template>
  
  <script>
  export default {
    name: 'BtnCrtRender',
    props: {
      data: Object,
      context: Object
    },
    methods: {
      onClickDetail() {
        if (this.params.context && this.params.context.componentParent && this.params.context.componentParent.handleDetail) {
          this.params.context.componentParent.handleDetail(this.params.data);
        } else {
          console.error('Context or handleDetail method is undefined');
        }
      },
    }
  }
  </script>
  
  <style scoped>
  button {
    margin: 0 5px;
  }
  </style>
  
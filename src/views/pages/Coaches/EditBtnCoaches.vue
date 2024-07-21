<template>
  <div>
    <CButton color="warning" size="sm" @click="onClickEdit">Edit</CButton>
    <CButton color="danger" size="sm" @click="onClickDelete">Delete</CButton>
  </div>
</template>

<script>
export default {
  name: 'EditButtonRenderer',
  props: {
    data: Object,
    context: Object
  },
  methods: {
    onClickEdit() {
      if (this.params.context && this.params.context.componentParent && this.params.context.componentParent.handleEditUser) {
        this.params.context.componentParent.handleEditUser(this.params.data);
      } else {
        console.error('Context or handleEditUser method is undefined');
      }
    },
    onClickDelete() {
      if (this.params.context && this.params.context.componentParent && this.params.context.componentParent.handleEditUser) {
        this.params.context.componentParent.handleDeleteUser(this.params.data);
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
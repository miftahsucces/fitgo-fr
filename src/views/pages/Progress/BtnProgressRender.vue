<template>
  <div>
    <CButton color="warning" size="sm" @click="onClickEdit">Input Progress</CButton>
  </div>
</template>

<script>
export default {
  name: 'BtnProgressRender',
  props: {
    data: Object,
    context: Object
  },
  methods: {
    onClickEdit() {
      if (this.params.context && this.params.context.componentParent && this.params.context.componentParent.handleEditProgress) {
        this.params.context.componentParent.handleEditProgress(this.params.data);
      } else {
        console.error('Context or handleEditProgress method is undefined');
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
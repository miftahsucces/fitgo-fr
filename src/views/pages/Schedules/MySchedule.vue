<template>
  <CRow>
    <CCol :xs="12">
      <TableToday class="mt-3" />
      <TableAllJadwal class="mt-3" />
    </CCol>
  </CRow>
</template>
  
  <script>
  import TableToday from './MyToday.vue'
  import TableAllJadwal from './MyAll.vue'
  
  export default {
    components: {
      TableToday,
      TableAllJadwal
    }
  }
  </script>
  
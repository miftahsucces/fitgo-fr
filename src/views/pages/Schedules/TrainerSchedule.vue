<template>
  <CRow>
    <CCol :xs="12">
      <TableToday class="mt-3" />
      <TableAllJadwal class="mt-3" />
    </CCol>
  </CRow>
</template>
  
  <script>
  import TableToday from './TrainerToday.vue'
  import TableAllJadwal from './TrainerAll.vue'
  
  export default {
    components: {
      TableToday,
      TableAllJadwal
    }
  }
  </script>
  
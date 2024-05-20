<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
            <CCardHeader class="d-flex justify-content-between align-items-center">
            <strong>Coaches</strong> 
            <CButton color="primary" @click="tambahData" class="ml-auto">Add Data</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Jenis Kelamin</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tanggal Lahir</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Pengalaman (Tahun)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Lokasi Kerja</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="(coach, index) in coaches" :key="coach.id">
                  <CTableDataCell>{{ index + 1 }}</CTableDataCell>
                  <CTableDataCell>{{ coach.nama }}</CTableDataCell>
                  <CTableDataCell>{{ coach.jenis_kelamin }}</CTableDataCell>
                  <CTableDataCell>{{ coach.tanggal_lahir }}</CTableDataCell>
                  <CTableDataCell>{{ coach.pengalaman_tahun }}</CTableDataCell>
                  <CTableDataCell>{{ coach.lokasi_kerja }}</CTableDataCell>
                  <CTableDataCell>{{ coach.email }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Coaches',
  data() {
    return {
      coaches: [],
    };
  },
  mounted() {
    this.fetchCoaches();
  },
  methods: {
    async fetchCoaches() {
      try {
        const response = await axios.get('http://localhost:8000/api/coaches');
        this.coaches = response.data.data;
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    },
  },
}
</script>

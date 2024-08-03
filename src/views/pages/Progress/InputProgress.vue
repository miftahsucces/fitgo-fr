<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Data Progress</strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableBody>
              <CTableRow>
                <CTableDataCell style="width: 15%;"><strong>Nama</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.full_name }}</CTableDataCell>
                <CTableDataCell style="width: 15%;"><strong>Tanggal Lahir</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.tanggal_lahir }}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style="width: 15%;"><strong>Email</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.email }}</CTableDataCell>
                <CTableDataCell style="width: 15%;"><strong>Usia</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.umur_tahun }}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style="width: 15%;"><strong>Nomor Hp</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.telepon }}</CTableDataCell>
                <CTableDataCell style="width: 15%;"><strong>Tanggal Start</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.tanggalStart }}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style="width: 15%;"><strong>Gender</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.jenis_kelamin }}</CTableDataCell>
                <CTableDataCell style="width: 15%;"><strong>Tinggi Badan</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.tinggi_badan }}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style="width: 15%;"><strong>Fitness Goal</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.tujuan }}</CTableDataCell>
                <CTableDataCell style="width: 15%;"><strong>Aktifitas Harian</strong></CTableDataCell>
                <CTableDataCell style="width: 35%;">{{ formData.aktifitas }}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <InputBody class="mt-3" :paramID="$route.params.id" :gridBody="dataBody" />
      <InputSick class="mt-3" :paramID="$route.params.id" :sickGrid="dataSick" />
      <InputOther class="mt-3" :paramID="$route.params.id" :fitnessGrid="dataFitness" />
      <InputDaily class="mt-3" :paramID="$route.params.id" :dailyGrid="dataDaily" />
    </CCol>
  </CRow>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import InputBody from './InputBody.vue';
import InputOther from './InputOther.vue';
import InputSick from './InputSick.vue';
import InputDaily from './InputDaily.vue';
import { eventBus } from '@/eventBus.js';


export default {
  components: {
    'ag-grid-vue': AgGridVue,
    InputBody,
    InputOther,
    InputSick,
    InputDaily,
  },
  data() {
    return {
      formData: {
        full_name: '',
        tanggalLahir: '',
        email: '',
        usia: '',
        nomorHp: '',
        tanggalStart: '',
        gender: '',
        tinggiBadan: '',
        fitnessGoal: '',
        aktifitasHarian: ''
      },
      programs: [],
      trainers: [],
      trainingSessions: [],
      dataBody: [],
      dataSick: [],
      dataFitness: [],
      dataDaily: [],
    };
  },
  created() {
    this.getRouteParamsData(this.$route.params.id);
  },
  mounted() {
    this.fetchBody();
    this.fetchIllness();
    this.fetchFitness();
    this.fetchDaily();
    eventBus.on('bodyUpdated', this.fetchBody);
    eventBus.on('illnessUpdated', this.fetchIllness);
    eventBus.on('fitnessUpdated', this.fetchFitness);
    eventBus.on('dailyUpdated', this.fetchDaily);
  },
  beforeUnmount() {
    eventBus.off('illnessUpdated', this.fetchIllness);
    eventBus.off('bodyUpdated', this.fetchBody);
    eventBus.off('fitnessUpdated', this.fetchFitness);
    eventBus.off('dailyUpdated', this.fetchDaily);
  },
  methods: {
    async getRouteParamsData(id) {
      try {
        const response = await axios.get(`http://localhost:8000/api/xyz/clients/${id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        this.formData = response.data.data; // Sesuaikan dengan struktur data dari API Anda
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchBody() {
      try {
        const response = await axios.get(`http://localhost:8000/api/xyz/progress/body/${this.$route.params.id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        const { data } = response;
        if (data.status === 'success') {
          this.dataBody = data.data.map((user, index) => ({ ...user, no: index + 1 }));
        } else {
          console.error('Error fetching users:', data.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchIllness() {
      try {
        const response = await axios.get(`http://localhost:8000/api/xyz/progress/illness/${this.$route.params.id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        const { data } = response;
        if (data.status === 'success') {
          this.dataSick = data.data.map((user, index) => ({ ...user, no: index + 1 }));
        } else {
          console.error('Error fetching users:', data.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchFitness() {
      try {
        const response = await axios.get(`http://localhost:8000/api/xyz/progress/fitness/${this.$route.params.id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        const { data } = response;
        if (data.status === 'success') {
          this.dataFitness = data.data.map((user, index) => ({ ...user, no: index + 1 }));
        } else {
          console.error('Error fetching users:', data.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchDaily() {
      try {
        const response = await axios.get(`http://localhost:8000/api/xyz/progress/daily/${this.$route.params.id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        const { data } = response;
        if (data.status === 'success') {
          this.dataDaily = data.data.map((user, index) => ({ ...user, no: index + 1 }));
        } else {
          console.error('Error fetching users:', data.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  }
};
</script>

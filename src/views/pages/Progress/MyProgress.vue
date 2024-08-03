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
      <InputBody class="mt-3" />
      <InputSick class="mt-3" />
      <InputOther class="mt-3" />
      <InputDaily class="mt-3" />
    </CCol>
  </CRow>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import InputBody from './ViewBody.vue';
import InputOther from './InputOther.vue';
import InputSick from './InputSick.vue';
import InputDaily from './InputDaily.vue';

import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    'ag-grid-vue': AgGridVue,
    'v-select': VueSelect,
    InputBody,
    InputOther,
    InputSick,
    InputDaily,
  },
  data() {
    return {
      formData: {
        nama: '',
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
      trainingSessions: []
    };
  },
  created() {
    this.fetchPrograms();
    this.fetchTrainers();
    this.getRouteParamsData(localStorage.getItem('id'));
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
    async fetchPrograms() {
      try {
        const response = await axios.get('http://localhost:8000/api/xyz/programs', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        const { data } = response;
        this.programs = data.data.map(program => ({
          label: program.program,
          id: program.id
        }));
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    },
    async fetchTrainers() {
      try {
        const response = await axios.get('http://localhost:8000/api/xyz/coaches', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        const { data } = response;
        this.trainers = data.data.map(trainer => ({
          label: trainer.name,
          id: trainer.id
        }));
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    },
    async saveChanges() {
      try {
        const response = await axios.post('http://localhost:8000/api/xyz/schedule', {
          id_program: this.formData.program,
          id_trainer: this.formData.trainer,
        },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
          });
        console.log('Data successfully saved:', response.data);
        this.$swal({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success"
        });
        this.visibleModalCerti = false;
      } catch (error) {
        console.error('Error saving data:', error);
      }
    },
    navigateToUser() {
      this.$router.push({ name: 'Trainings' });
    }
  }
};
</script>

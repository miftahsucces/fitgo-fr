<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Training</strong>
        </CCardHeader>
        <CCardBody>
          <CFormGroup>
            <CForm class="row g-3 mb-3">
              <CCol md="6">
                <CFormLabel for="program">Program</CFormLabel>
                <v-select :options="programs" v-model="formData.program" id="program"
                  :reduce="(option) => option.id"></v-select>
              </CCol>
              <CCol md="6">
                <CFormLabel for="trainer">Trainer</CFormLabel>
                <v-select :options="trainers" v-model="formData.trainer" id="trainer"
                  :reduce="(option) => option.id"></v-select>
              </CCol>
              <CCol md="12">
                <CFormLabel for="desc">Description</CFormLabel>
                <CFormTextarea id="desc" v-model="formData.desc" rows="3"></CFormTextarea>
              </CCol>
            </CForm>
            <CButton type="button" color="primary" @click="saveChanges">Save</CButton>&nbsp;
            <CButton type="button" color="warning" @click="navigateToUser">Back</CButton>
          </CFormGroup>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <Members class="mt-3" />
      <Schedules class="mt-3" />
    </CCol>
  </CRow>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from 'axios';
import Members from './Members.vue';
import Schedules from './Schedules.vue';

import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";


export default {
  components: {
    'ag-grid-vue': AgGridVue,
    Schedules,
    Members,
    'v-select': VueSelect
  },
  data() {
    return {
      formData: {
        program: '',
        trainer: '',
        desc: ''
      },
      programs: [],
      trainers: [],
      trainingSessions: []
    };
  },
  created() {
    this.fetchPrograms();
    this.fetchTrainers();
  },
  mounted() {
    this.getScheduleData(this.$route.params.id);
  },
  methods: {
    async getScheduleData(idSchedule) {
      try {
        const response = await axios.get(`http://localhost:8000/api/schedule/${idSchedule}`);
        this.schedule = response.data.data;
        this.formData = {
          program: this.schedule.id_program,
          trainer: this.schedule.id_trainer,
          desc: this.schedule.desc,
        };
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchPrograms() {
      try {
        const response = await axios.get('http://localhost:8000/api/programs');
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
        const response = await axios.get('http://localhost:8000/api/coaches');
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

        const response = await axios.post('http://localhost:8000/api/schedule', {
          id_program: this.formData.program,
          id_trainer: this.formData.trainer,
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
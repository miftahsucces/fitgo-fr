<template>
  <CRow>
    <CCol :xs="12" :md="4">
      <CCard class="profile-card">
        <CCardBody class="text-center">
          <div class="profile-photo mb-3">
            <img :src="profilePhotoUrl" alt="Profile Photo" class="img-fluid rounded-circle custom-photo" />
          </div>
          <h5 class="card-title">{{ formData.fullName }}</h5>
          <p class="card-text text-muted">{{ formData.position }}</p>
          <div class="row mb-3">
            <div class="col">
              <h6>Height</h6>
              <p class="danger-box">{{ formData.height }} cm</p>
            </div>
            <div class="col">
              <h6>Weight</h6>
              <p class="danger-box">{{ formData.weight }} kg</p>
            </div>
            <div class="col">
              <h6>Age</h6>
              <p  class="danger-box">{{ formData.age }}</p>
            </div>
          </div>
          <h6>Monthly Goals</h6>
          <div class="goal mb-4">
            <p>Sleep <span>{{ formData.sleep }} / 300 hours</span></p>
            <CProgress color="info" :value="formData.sleep">
              <CProgressBar class="text-dark">50%</CProgressBar>
            </CProgress>
          </div>
          <div class="goal mb-4">
            <p>Steps <span>{{ formData.running }} / 12000</span></p>
            <CProgress color="info" :value="formData.running">
              <CProgressBar class="text-dark">50%</CProgressBar>
            </CProgress>
          </div>
          <div class="goal mb-5">
            <p>Lose Weight <span>{{ formData.loseWeight }} / 6 kilos</span></p>
            <CProgress color="info" :value="formData.loseWeight">
              <CProgressBar class="text-dark">50%</CProgressBar>
            </CProgress>
          </div>
          <h6>Scheduled</h6>
          <ul class="list-group">
            <li v-for="task in formData.tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
              {{ task.name }}
              <span class="badge bg-info rounded-pill">{{ task.date }} {{ task.time }}</span>
            </li>
          </ul>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12" :md="8">
      <GreetingCard :name="formData.fullName" :date="currentDate" />
      <WidgetsStatsD class="mb-4 mt-1" />
      <CCard class="mb-4 mt-4">
        <CCardBody>
          <WorkOutDashboard class="mb-4" />
        </CCardBody>
      </CCard>
      <CCard class="mb-4 mt-4">
        <CCardBody>
          <EventDashboard class="mb-4" />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>




<script>
import axios from 'axios';
import MainChart from './MainChart'
import WidgetsStatsA from './../widgets/WidgetsStatsTypeA.vue'
import WidgetsStatsD from './../widgets/WidgetsStatsTypeD.vue'
import EventDashboard from './EventDashboard.vue';
import GreetingCard from './GreetingCard.vue'
import WorkOutDashboard from './WorkOutDashboard.vue';

export default {
  components: {
    EventDashboard,
    MainChart,
    WidgetsStatsA,
    WidgetsStatsD,
    WorkOutDashboard,
    GreetingCard
  },
  data() {
    return {
      formData: {
        fullName: localStorage.getItem("name"),
        position: 'Athletic Coach',
        height: 185,
        weight: 65,
        age: 38,
        sleep: 100,
        running: 20,
        loseWeight: 3,
        tasks: [
          { id: 1, name: 'Gymnastic', date: '18/8/2020', time: '4:00 pm' },
          { id: 2, name: 'Running', date: '24/8/2020', time: '3:00 pm' },
        ],
      },
      profilePhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tom_Cruise_by_Gage_Skidmore.jpg/1200px-Tom_Cruise_by_Gage_Skidmore.jpg', // Default profile photo URL
      currentDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  },
};
</script>


<style>
.profile-card {
  display: flex;
}

.profile-section {
  padding: 20px;
}

.custom-photo {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.profile-details {
  border-left: 1px solid #ccc;
  padding-left: 20px;
}
</style>

<style scoped>
.profile-card {
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  padding: 20px;
}

.profile-photo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.goal {
  text-align: left;
  margin-bottom: 10px;
}

.goal p {
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.danger-box {
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #ff6f61;
    border-radius: 16px;
    background-color: #e55353;
    color: white;
  }
</style>

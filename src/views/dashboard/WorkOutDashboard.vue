<template>
    <div>
     
      
      <div class="latest-activities mt-3">
        <h6>Latest Activities</h6>
        <table class="table" style="font-size: 14px;">
          <thead>
            <tr>
              <th>Class</th>
              <th>Target Areas</th>
              <th>Instructor</th>
              <th>Duration</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in latestActivities" :key="activity.id">
              <td>{{ activity.class }}</td>
              <td>
                <span class="badge badge-secondary">{{ activity.targetArea }}</span>
              </td>
              <td class="d-flex align-items-center">
                <img :src="activity.instructorAvatar" alt="Instructor Avatar" class="avatar me-2" />
                {{ activity.instructor }}
              </td>
              <td>{{ activity.duration }}</td>
              <td>
                <div class="difficulty-bar">
                  <span v-for="(level, index) in 5" :key="index" :class="{'active': index < activity.difficulty}" class="difficulty-dot"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        workouts: [
          {
            id: 1,
            time: '10:15am',
            gymType: 'Private',
            name: 'Hatha Yoga',
            team: 'Flexibility',
            avatars: [
              'https://via.placeholder.com/30',
              'https://via.placeholder.com/30',
              'https://via.placeholder.com/30',
            ],
          },
          {
            id: 2,
            time: '11:30am',
            gymType: 'Shared',
            name: 'Thai Boxing',
            team: 'Cardio',
            avatars: [
              'https://via.placeholder.com/30',
              'https://via.placeholder.com/30',
              'https://via.placeholder.com/30',
            ],
          },
        ],
        latestActivities: [
          {
            id: 1,
            class: 'Cross Country Run',
            targetArea: 'Endurance',
            instructor: 'Ann Rosser',
            instructorAvatar: 'https://via.placeholder.com/30',
            duration: '30 min',
            difficulty: 3,
          },
          // Add more activities as needed
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .workout-card {
    border: 1px solid #e7e7e7;
    border-radius: 8px;
  }
  
  .workout-time {
    font-size: 14px;
    font-weight: bold;
  }
  
  .badge {
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .badge-success {
    background-color: #28a745;
    color: white;
  }
  
  .badge-danger {
    background-color: #dc3545;
    color: white;
  }
  
  .workout-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .workout-team {
    font-size: 14px;
    color: #6c757d;
  }
  
  .avatars img.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: -10px;
    border: 2px solid white;
  }
  
  .add-workout {
    border: 2px dashed #e7e7e7;
    background-color: #f8f9fa;
  }
  
  .see-all {
    font-size: 14px;
    color: #6c757d;
    text-decoration: none;
  }
  
  .see-all:hover {
    text-decoration: underline;
  }
  
  .latest-activities {
    margin-top: 2rem;
  }
  
  .table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
  }
  
  .table th, .table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  
  .table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }
  
  .difficulty-bar {
    display: flex;
  }
  
  .difficulty-dot {
    width: 10px;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 50%;
    margin-right: 4px;
  }
  
  .difficulty-dot.active {
    background-color: #000;
  }
  </style>
  
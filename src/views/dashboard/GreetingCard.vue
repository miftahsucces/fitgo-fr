<template>
    <div class="greeting-card">
      <div class="greeting-text">
        <h1>Hello, {{ name }}</h1>
        <p>Keep Moving & Stay Healthy</p>
      </div>
      <div class="date-box">
        <span>{{ date }}</span>
        <i class="calendar-icon"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        default: 'Gilbert'
      },
      date: {
        type: String,
        default: '18 August 2020'
      }
    }
  }
  </script>
  
  <style scoped>
  .greeting-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  
  .greeting-text {
    display: flex;
    flex-direction: column;
  }
  
  .greeting-text h1 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }
  
  .greeting-text p {
    margin: 0;
    font-size: 16px;
    color: #777;
  }
  
  .date-box {
    /* display: flex; */
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #ff6f61;
    border-radius: 16px;
    background-color: #ffe5e0;
    color: #ff6f61;
  }
  
  .calendar-icon {
    margin-left: 8px;
    width: 16px;
    height: 16px;
    background: url('/path-to-your-calendar-icon.svg') no-repeat center center;
    background-size: contain;
  }
  </style>
  
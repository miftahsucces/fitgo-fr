<template>
  
  <CRow :xs="{ gutter: 4 }">
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsD
        style="--cui-card-cap-bg: #3b5998"
        :values="[
          { title: 'Calories Burn', value: '305' },
        ]"
      >
        <template #icon><CIcon icon="cilBurn" height="52" class="my-4 text-white" /></template>
      
      </CWidgetStatsD>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsD
        style="--cui-card-cap-bg: #00aced"
        :values="[
          { title: 'steps', value: '973k' },
        ]"
      >
        <template #icon><CIcon icon="cilWalk" height="52" class="my-4 text-white" /></template>
        
      </CWidgetStatsD>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsD
        style="--cui-card-cap-bg: #4875b4"
        :values="[
          { title: 'distance', value: '500K' },
        ]"
      >
        <template #icon><CIcon icon="cilCursor" height="52" class="my-4 text-white" /></template>
        
      </CWidgetStatsD>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsD
        color="warning"
        :values="[
          { title: 'sleep', value: '7H25M' },
        ]"
      >
        <template #icon><CIcon icon="cilAlarm" height="52" class="my-4 text-white" /></template>
        
      </CWidgetStatsD>
    </CCol>
  </CRow>
</template>

<script>
import { CChart } from '@coreui/vue-chartjs'
export default {
  name: 'WidgetsStatsD',
  components: {
    CChart,
  },
  setup() {
    const options = {
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    }

    return {
      options,
    }
  },
}
</script>

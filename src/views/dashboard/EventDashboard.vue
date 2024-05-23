<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardBody>
            <h6 class="mb-3">Event</h6>
            <table class="table table-bordered" style="font-size: 14px;">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(event, index) in events" :key="event.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ event.name }}</td>
                  <td>{{ event.date }}</td>
                  <td>{{ event.location }}</td>
                  <td>
                    <button class="btn btn-primary btn-sm me-2">Join</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: [
          { id: 1, name: 'Event Alpha', date: '2024-06-01', location: 'New York' },
          { id: 2, name: 'Event Beta', date: '2024-07-15', location: 'Los Angeles' },
          { id: 3, name: 'Event Gamma', date: '2024-08-10', location: 'Chicago' },
        ],
      };
    },
  };
  </script>
  
  <style>
  .table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
  }
  
  .table-bordered {
    border: 1px solid #dee2e6;
  }
  
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #dee2e6;
  }
  
  .table-bordered thead th {
    background-color: #f8f9fa;
  }
  </style>
  
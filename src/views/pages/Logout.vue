<template>
    <div>
      <!-- Konten halaman logout -->tes
    </div>
  </template>
  
  <script>
  import { authStore } from '@/store/authstore' // Sesuaikan dengan struktur proyek Anda

  const useAuth = authStore();
  
  export default {
    created() {
      // Panggil metode logOut dari authStore saat komponen dibuat
      useAuth.logOut()
        .then(() => {
          // Redirect ke halaman lain jika diperlukan setelah logout
          this.$router.push('/pages/login') // Misalnya, redirect ke halaman utama
        })
        .catch(error => {
          // Handle error jika logout gagal
          console.error('Failed to logout:', error)
        })
    }
  }
  </script>
  
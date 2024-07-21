<template>
  <div>
    <!-- Konten halaman logout -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'

const store = useAuthStore()
const router = useRouter() 

const handleLogout = async () => {
  try {
    await store.logout()
    router.push({ name: 'Login' }) // Gunakan router instance untuk navigasi
  } catch (error) {
    console.error('Logout failed', error)
    router.push({ name: 'Login' })
  }
}

onMounted(() => {
  handleLogout()
})
</script>
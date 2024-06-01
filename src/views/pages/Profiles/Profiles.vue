<template>
    <div>
        <div v-if="role === 1 || role === 2">
            <CoachProfile />
        </div>
        <div v-else-if="role === 3">
            <ClientProfile />
        </div>
        <div v-else>
            <p>Unknown role</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CoachProfile from './CoachProfile.vue'
import ClientProfile from './ClientProfile.vue'

export default {
    name: 'Profile',
    components: {
        CoachProfile,
        ClientProfile
    },
    setup() {
        const role = ref(null)

        onMounted(() => {
            role.value = parseInt(localStorage.getItem('roles'))
        })

        return {
            role
        }
    }
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>
import {defineStore} from 'pinia'
import {
  updateProfile,
  changePassword,
  logOut,
  forgotPasswordRequest,
  forgotPassword,
  markNotificationComplete,
  markAllNotificationComplete,
} from '../services/auth_service'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: {},
      isLoggedIn: false,
    }
  },
  actions: {
    setUser(user) {
      this.user = user
      this.isLoggedIn = true
      localStorage.setItem('id', user.id)
      localStorage.setItem('tipe', user.tipe_user)
      localStorage.setItem('fullName', user.full_name )
    },
    getUserId() {
      return this.user ? this.user.id : null
    },
    setToken(token) {
      localStorage.setItem('access_token', token)
    },
    getToken() {
      let token = localStorage.getItem('access_token')
      if (token) {
        return token
      }
      return null
    },
    async handleUpdateProfile(data) {
      const response = await updateProfile(data)
      this.user = response.data.data
    },
    async handleChangePassword(data) {
      await changePassword(data)
    },
    async logout() {
      await logOut()
      this.user = {}
      this.isLoggedIn = false
      localStorage.setItem('access_token', '')
      localStorage.setItem('id', '')
    },
    async handleForgotPasswordRequest(data) {
      await forgotPasswordRequest(data)
    },
    async handleForgotPassword(data) {
      await forgotPassword(data)
    },
    async handleNotificationMarkComplete(id) {
      await markNotificationComplete(id)
      this.user.notifications = this.user.notifications.filter((n) => n.id != id)
    },
    async handleAllNotificationMarkComplete() {
      await markAllNotificationComplete()
      this.user.notifications = []
    },
  },
  persist: {
    enabled: true,
  },
})

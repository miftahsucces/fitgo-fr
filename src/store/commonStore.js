import {defineStore} from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: () => {
    return {
      mediaUrl: 'https://api.siasif.com/storage/',
    }
  },
})

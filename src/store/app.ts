// stores/counter.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      actorId: '641811add41a3f2f91247aea',
      avatarId: 'avatar_2158',
      token: ' 1',
    }
  },
  actions: {
  
    setAvatarId(avatar: string) {
      this.avatarId = avatar
    },
  },
})

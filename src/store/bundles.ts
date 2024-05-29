import { defineStore } from 'pinia'
import type { BundleData } from '@nextcas/stream'

export const useBundlesStore = defineStore('bundles', {
  state: () => {
    return {
      list: [
        { name: '套装', category: 'coverall', list: [] },
        { name: '头发', category: 'hair', list: [] },
        { name: '鞋子', category: 'shoes', list: [] },
      ],
      category: 'coverall',
    } as {
      list: {
        name: string
        category: string
        list: BundleData[]
      }[]
      category: string
    }
  },

  getters: {
    categoryList(state) {
      return state.list.find(item => item.category === state.category)?.list ?? []
    },
  },

  actions: {
    async setCategoryList(category: string, list: BundleData[]) {
      const index = this.list.findIndex(item => item.category === category)
      if (index === -1)
        return
      this.list[index].list = list
    },
    async setCategory(category: string) {
      this.category = category
    },
  },
})

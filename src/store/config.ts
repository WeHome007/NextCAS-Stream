import { defineStore } from 'pinia'
import { PresetCameraConfig } from '@nextcas/stream'
import type { CameraConfig } from '@nextcas/stream'

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      currentCameraIndex: null,
      cameraList: [
        {
          name: '全身',
          value: PresetCameraConfig.Full,
        },
        {
          name: '脸部',
          value: PresetCameraConfig.Face,
        },
        {
          name: '上半身',
          value: PresetCameraConfig.Upper,
        },
        {
          name: '下半身',
          value: PresetCameraConfig.Lower,
        },
        {
          name: '脚部',
          value: PresetCameraConfig.Footer,
        },
      ],
    } as {
      currentCameraIndex: number | null
      cameraList: {
        name: string
        value: CameraConfig
      }[]
    }
  },

  getters: {
    currentLocation(state): null | CameraConfig {
      if (state.currentCameraIndex === null)
        return null
      return state.cameraList[state.currentCameraIndex].value
    },
  },

  actions: {
    setCurrentCameraIndex(index: number | null) {
      this.currentCameraIndex = index
    },
  },
})

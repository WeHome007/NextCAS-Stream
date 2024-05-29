<script lang="ts" setup>
import { useConfigStore } from '../store/config'

const config = useConfigStore()
</script>

<template>
  <div class=" flex flex-wrap w-full justify-between p-4">
    <div
      v-for="(locaition, i) in config.cameraList"
      :key="i" class=" h-10 rounded w-[calc(100%/3-12px)] flex-center bg-[#eee] "
      :class="{
        'text-blue': config.currentCameraIndex === i,
      }" @click="config.setCurrentCameraIndex(i)"
    >
      <img v-show="config.currentCameraIndex === i" class=" w-5 h-5 mr-2" src="@/assets/selected.png">
      <span>{{
        locaition.name
      }}</span>
    </div>
  </div>
</template>

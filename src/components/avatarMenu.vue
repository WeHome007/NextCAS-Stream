<script lang="ts" setup>
import { inject, reactive, ref } from 'vue'
import type { NextStream } from '@nextcas/stream'
import { useAppStore } from '../store/app'

const streamCall = inject<() => NextStream | null>('streamSDK', () => null)
const appStore = useAppStore()
const avatarList = reactive([
  {
    name: '女',
    id: 'avatar_2158',
  },
  {
    name: '男',
    id: 'avatar_1986',
  },
])
const currentAvatar = ref(avatarList[0].id)

function changeAvatar(id: string) {
  const stream = streamCall()
  if (!stream)
    return

  currentAvatar.value = id
  stream.setAvatar(currentAvatar.value)
  appStore.setAvatarId(currentAvatar.value)
}
</script>

<template>
  <div class=" flex flex-wrap w-full justify-between p-4">
    <div
      v-for="a in avatarList" :key="a.id" class=" h-10 rounded w-[calc(100%/3-12px)] flex-center bg-[#eee] " :class="{
        'text-blue': currentAvatar === a.id,
      }" @click="changeAvatar(a.id)"
    >
      <img v-show="currentAvatar === a.id" class=" w-5 h-5 mr-2" src="@/assets/selected.png">
      <span>{{
        a.name
      }}</span>
    </div>
  </div>
</template>

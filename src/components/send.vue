<script lang="ts" setup>
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { Record } from '@nextcas/voice'
import { useAppStore } from '../store/app'

const emits = defineEmits(['send'])
const inVoice = ref(false)

const recordBtn = ref<HTMLButtonElement>()
const recording = ref(false)

const inputText = ref('')

// const recordInstance = shallowRef<Record>()/

const appStore = useAppStore()
const record = new Record(appStore.token, appStore.actorId)

useEventListener(recordBtn, 'long-press', (_e) => {
  startRecord()
})

useEventListener(recordBtn, 'mouseup', () => {
  stopRecord()
})

function startRecord() {
  record.start()
    .then(() => {
      recording.value = true
    })
}

function stopRecord() {
  record.stopToText()
    .then((res) => {
      recording.value = false
      emits('send', res)
    })
}

useEventListener('keyup', (e) => {
  if (e.key === 'Enter')
    sendText()
})

function sendText() {
  if (inputText.value) {
    // return
    emits('send', inputText.value)
    inputText.value = ''
  }
}
</script>

<template>
  <div class="w-full h-11 bg-white flex rounded-full overflow-hidden">
    <div class="pl-1 flex ">
      <div class="w-11 flex items-center justify-center h-full cursor-pointer" @click="inVoice = !inVoice">
        <i v-if="inVoice" class="i-assets:keyboard text-6" />
        <i v-else class="i-assets:voice text-6" />
      </div>
      <div class="h-full flex items-center ">
        <div class="divider-line h-1/2" />
      </div>
    </div>

    <template v-if="inVoice">
      <div class="flex-grow flex">
        <button ref="recordBtn" data-long-press-delay="500" class="w-full relative border-none outline-none bg-white">
          <div class="w-full font-medium leading-11 text-center relative select-none">
            {{ recording ? '正在录音' : '按住说话' }}
          </div>
        </button>
      </div>
    </template>
    <template v-else>
      <div class="flex-grow px-3 flex items-center">
        <input v-model="inputText" class="w-full h-6 !border-none !outline-none caret-green text-[16px]">
      </div>

      <div class="w-11 h-full flex justify-center items-center" @click="sendText">
        <div class="i-assets:send2 text-8" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.divider-line {
  width: 2px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 3.96%, rgba(0, 0, 0, .2) 30%, rgba(0, 0, 0, .2) 68.02%, rgba(0, 0, 0, 0) 95.62%);
}
</style>

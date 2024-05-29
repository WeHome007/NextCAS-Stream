<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  message: string
  type: 'send' | 'receive'
}>()

const showText = ref('')

let frameEnable = false
watch(() => props.message, () => {
  if (props.type === 'send') {
    showText.value = props.message
  }
  else {
    if (frameEnable)
      return
    const animation = () => {
      if (props.message.length > showText.value.length) {
        frameEnable = true
        showText.value += props.message[showText.value.length]
        requestAnimationFrame(animation)
      }
      else {
        frameEnable = false
      }
    }
    animation()
  }
}, {
  immediate: true,
})
</script>

<template>
  <div class="flex w-full" :class="[type === 'send' ? 'justify-end' : '']">
    <div
      :class="[
        type === 'send'
          ? 'bg-[rgba(82,188,226,0.85)]'
          : 'bg-[rgba(30,34,35,0.8)]',
      ]"
      class=" py-3 px-4 rounded-[1.25rem] text-white inline-block text-sm break-words leading-6  max-w-100%"
    >
      <div class="test">
        {{ showText }}
      </div>
    </div>
  </div>
</template>

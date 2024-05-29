<script lang="ts" setup>
import type { MessageType } from '../store/messages'
import Message from './message.vue'

const props = defineProps<{
  messages: MessageType[]
  open?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <div class="relative h-full">
    <div
      class="absolute top-[calc(50%-3rem)] right-0 top-1/2 translate-y-[-50%] translate-x-[100%] rounded-r-5 overflow-hidden"
    >
      <div class="w-[1.875rem] h-9 bg-[rgba(255,255,255,.2)] flex-center " @click="emits('update:open', !props.open)">
        <div :class="[open ? ' rotate-180 ' : '']" class="i-tabler:chevron-right text-[#e3e3e3] text-xl" />
      </div>
    </div>

    <!-- board -->
    <div class="top-0 left-0 px-3 h-full w-full ">
      <div
        v-show="!messages.length"
        class="flex-center w-full h-full rounded-[1.25rem] bg-[rgba(34,34,34,0.5)]"
      >
        <div class="flex flex-col items-center">
          <img class=" w-16 h-16" src="@/assets/imgs/empty-chat.png">
          <span class=" text-[0.75rem] text-[rgba(255,255,255,0.8)]">
            空
          </span>
        </div>
      </div>
      <div class="w-full h-full overflow-hidden">
        <div class="pb-8">
          <div v-for="(msg, i) in messages" :key="i" class="mt-4">
            <Message :message="msg.content" :type="msg.from === 'user' ? 'send' : 'receive'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

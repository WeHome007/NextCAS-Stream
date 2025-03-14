<script lang="ts" setup>
import { nextTick, onMounted, provide, ref, shallowRef, watch } from 'vue'
import { NextStream, PresetCameraConfig } from '@nextcas/stream'
import gsap from 'gsap'
import Send from './components/send.vue'
import MessageBoard from './components/messageBoard.vue'
import { useAppStore } from './store/app'
import { useMessageStore } from './store/messages'
import Menus from './components/menus.vue'
import { useConfigStore } from './store/config'
import 'webrtc-adapter'

const container = ref()

const ready = ref(false)
const started = ref(false)
const closed = ref(false)
const app = useAppStore()

const config = useConfigStore()

onMounted(async () => {
  init()
  // window.addEventListener('keypress', (e) => {
  //   console.log(e)
  // })
})

const stream = shallowRef<NextStream>()
const openMessage = ref(false)
const messageBoard = ref<HTMLElement>()

const messageBoardTween = shallowRef<gsap.core.Tween>()

watch(openMessage, (v) => {
  if (!messageBoard.value)
    return

  const width = messageBoard.value.clientWidth
  if (!messageBoardTween.value) {
    messageBoardTween.value = gsap.to(messageBoard.value, {
      translateX: width,
      duration: 0.5,
      ease: 'power2.out',
    })
  }
  if (v)
    messageBoardTween.value.play()

  else
    messageBoardTween.value.reverse()
})

watch(() => config.currentLocation, (v) => {
  if (v)
    stream.value?.setCamera(v)
})

async function init() {
  try {
    closed.value = false
    await nextTick()
    stream.value = await NextStream.createLocal({
      ip: '192.168.20.157',
      actorId: 'actor_102217',
      container: container.value,
      avatarId: 'avatar_63edcef5ea719833f2b1eaff',
      scene: 'transparent',
      // scene: {
      //   id: '64f9343e335fdd204dd527e3',
      //   type: 'nus',
      // },
      autoRender:true
    })

    ready.value = true

    stream.value.on('close', () => {
      closed.value = true
      ready.value = false
      started.value = false
    })
    stream.value?.setCamera(PresetCameraConfig.Full)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

function _startRender() {
  if (stream.value)
    stream.value.start()

  // 如果autoRender设置为false，则在用户点击之后调用start()；如果autoRender设置为true，则在用户点击之后调用unMute()
  // stream.value?.start()
  // stream.value?.unMute()

  nextTick(() => {
    started.value = true
  })
}

function _closeRender() {

}

const messageStore = useMessageStore()

function sendText(text: string) {
  if (stream.value) {
    const { observer, reqId } = stream.value.ask(text)
    messageStore.sendMessage(text, reqId)
    if (!openMessage.value)
      openMessage.value = true

    observer?.subscribe((res) => {
      messageStore.onReply(res.content, res.reqId)
    })
  }
}

provide('streamSDK', () => stream.value)
</script>

<template>
  <div class="w-full h-full relative flex ">
    <template v-if="closed">
      <div class=" flex-center ">
        <button @click="init">
          重新启动
        </button>
        <span>客户端已关闭</span>
      </div>
    </template>
    <template v-else>
      <div ref="container" class="w-full h-full bg-red absolute" />
      <template v-if="started">
        <div v-if="ready && app.token" class="h-full z-100 w-full relative">
          <div ref="messageBoard" class="h-full absolute bottom-0 left-[-50%] w-1/2 py-18">
            <MessageBoard v-model:open="openMessage" :messages="messageStore.messages" />
          </div>
          <div class="w-16 top-0 bottom-0 absolute right-4">
            <Menus />
          </div>

          <div class=" absolute bottom-0 left-0 w-full p-4">
            <Send @send="sendText" />
          </div>
        </div>
      </template>
      <div v-else class=" w-full h-full z-100">
        <div v-if="!ready">
          正在加载
        </div>
        <button v-else @click="_startRender">
          启动
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.conatiner {
  width: 800px;
  height: 1200px;
  background-color: red;
}
</style>

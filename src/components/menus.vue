<script lang="ts" setup>
import { computed, ref } from 'vue'
import CameraMenu from './cameraMenu.vue'
import BundleMenu from './bundleMenu.vue'
import AvatarMenu from './avatarMenu.vue'

const sheetShow = ref(false)
const sheetTitle = ref('视角')

const menus = [
  {
    icon: 'menu-camera',
    key: 'camera',
    component: CameraMenu,
  },
  {

    icon: 'menu-cloth',
    key: 'bundle',
    component: BundleMenu,
  },
  // {

  //   icon: 'menu-gender',
  //   key: 'avatar',
  //   component: AvatarMenu,
  // },
]

function getIconUrl(name: string) {
  return new URL(`/src/assets/imgs/${name}.png`, import.meta.url).href
}

const currentMenu = ref(0)

function showMenu(index: number) {
  currentMenu.value = index
  sheetShow.value = true
//  await nextTick()
}

const currentCom = computed(() => {
  return menus[currentMenu.value].component
})
</script>

<template>
  <div class="w-full h-full flex-center flex-col gap-6">
    <div
      v-for=" (menu, index) in menus" :key="index"
      class=" flex-center cursor-pointer w-10 h-10 rounded-full overflow-hidden bg-[rgba(255,255,255,0.15)]"
      @click="showMenu(index)"
    >
      <img class="w-7 h-7" :src="getIconUrl(menu.icon ?? 'camera')">
    </div>
  </div>

  <van-action-sheet v-model:show="sheetShow" :overlay-style="{ backgroundColor: 'rgba(0,0,0,0.35)' }" :title="sheetTitle">
    <component :is="currentCom" @close="sheetShow = false" />
  </van-action-sheet>
</template>

<script lang="ts" setup>
import { inject, onMounted, reactive, ref, shallowRef } from 'vue'
// import { showDialog } from 'vant'
import type { BundleData, NextStream } from '@nextcas/stream'

const emits = defineEmits(['close'])

const streamCall = inject<() => NextStream | null>('streamSDK', () => null)

const list = reactive([
  { name: '套装', category: 'coverall' },
  { name: '头发', category: 'hair' },
  { name: '鞋子', category: 'shoes' },
])

const bundles = shallowRef<BundleData[]>([])
const category = ref(list[0].category)
async function updateCurrentList() {
  const stream = streamCall()
  if (stream) {
    const _list = await stream.fetchCurrentBundles(category.value)
    // bundlesStore.setCategoryList(bundlesStore.category, list ?? [])
    bundles.value = _list?.content ?? []
  }
}

const showLoading = ref(false)

onMounted(() => {
  updateCurrentList()
})

function changeCategory(_category: string) {
  category.value = _category
  updateCurrentList()
}

async function selectBundle(bundle: BundleData) {
  const stream = streamCall()
  showLoading.value = true
  await stream?.addBundle(bundle.id, category.value)
  showLoading.value = false
  emits('close')
}
</script>

<template>
  <div class=" flex flex-wrap w-full justify-between flex-col">
    <div class=" p-2 flex ">
      <div
        v-for="(c) in list" :key="c.category" class=" px-2" :class="{
          'text-blue': category === c.category,
        }" @click="changeCategory(c.category)"
      >
        {{
          c.name
        }}
      </div>
    </div>
    <div class="h-60 overflow-y-scroll p-2">
      <div class=" flex-wrap flex gap-3">
        <div v-for=" bundle in bundles" :key="bundle.id" class=" w-20  flex flex-col" @click="selectBundle(bundle)">
          <div class=" w-20 h-20 overflow-hidden rounded">
            <img :src="bundle.icon" class="w-full object-cover">
          </div>

          <div class="text-sm w-full overflow-hidden ">
            {{ bundle.name }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <van-overlay style="background:rgba(0,0,0,0.1)" :show="showLoading">
    <div class="top-1/2 left-1/2 translate-x-[-50%] translate-y-1/2 absolute bg-white p-4 rounded" @click.stop>
      <van-loading color="#1989fa" />
    </div>
  </van-overlay>
</template>

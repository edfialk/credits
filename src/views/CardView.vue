<template>
  <div class="grid grid-cols-1 gap-2 p-4" v-if="card">
    <div class="tabs" ref="tabs">
      <ul class="tab-links" @click="onTabSelect">
        <li>
          <button data-tabs-target="#features" type="button">Features</button>
        </li>
        <li>
          <button class="active" data-tabs-target="#bonuses" type="button">Bonuses</button>
        </li>
        <li>
          <button data-tabs-target="#offers" type="button">Offers</button>
        </li>
      </ul>
      <div class="tab-content">
        <div id="features">
          <a :href="card.link">
            <button type="button" class="border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800">
              Card website
            </button>
          </a>

          <p class="text text-gray-400">
            {{ card.text }}
          </p>
          <hr class="my-2 border-gray-600" />
          <p class="mt-2 text-sm text-gray-400">
            Foreign transaction fee: {{ card.foreign_fee }}
          </p>
          <p class="mt-2 text-sm text-gray-400">
            Annual fee: ${{ card.fee }}
          </p>
        </div>
        <div id="bonuses" class="active">
          <template v-for="bonus in bonuses" :key="bonus.id">
            <div class="flex justify-between">
              <p class="text-lg text-white text-bold">
                {{ bonus.places.name }}
              </p>
              <p>
                {{ bonus.value }}
              </p>
            </div>
            <p class="text-sm text-gray-400">{{ bonus.text }}</p>
          </template>
        </div>
        <div id="offers">
          <p class="text-sm text-gray-400">
            This is some placeholder content the
            <strong class="font-medium text-white">Settings tab's associated content</strong>.
            Clicking another tab will toggle the visibility of this one for the next. The tab
            JavaScript swaps classes to control the content visibility and styling.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCardsStore } from '@/stores/cards'
import { useAppStore } from '@/stores/app'
import { usePlacesStore } from '@/stores/places'
import { useBonusesStore } from '@/stores/bonuses'
import { storeToRefs } from 'pinia'
import { watch, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { initFlowbite } from 'flowbite'

const cardsStore = useCardsStore()
const appStore = useAppStore()
const placesStore = usePlacesStore()
const bonusesStore = useBonusesStore()
const route = useRoute()

const card = computed(() => cardsStore.getCardById(route.params.id))
const bonuses = computed(() =>
  bonusesStore
    .getBonusesByCard(route.params.id)
    .sort((a, b) => a.places.name.localeCompare(b.places.name))
)

onMounted(() => {
  initFlowbite()
  if (cardsStore.ready) {
    appStore.setTitle(card.value.name)
  } else {
    appStore.setTitle('')

    watch(
      () => cardsStore.ready,
      () => {
        appStore.setTitle(card.value.name)
      }
    )
  }
})

const tabs = ref(null)

const onTabSelect = (e) => {
  const target = e.target.dataset.tabsTarget
  tabs.value.querySelectorAll('.active').forEach((e) => e.classList.remove('active'))
  tabs.value.querySelector(target).classList.toggle('active')
  e.target.classList.toggle('active')
}
</script>

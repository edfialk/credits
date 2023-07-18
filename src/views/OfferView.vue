<template>
  <div class="px-2">
    <div class="card" v-if="loaded">
      <h1>{{ myOffer.cards.name }}</h1>
      <h3>{{ myOffer.title }} - ${{ myOffer.current_value }} remaining</h3>
      <div class="flex items-center">
        <p>0</p>
        <input
          type="range"
          :value="myOffer.current_value"
          :max="myOffer.max_value"
          class="w-full mx-2 h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
          @change="onOfferValueChange"
          @input="onOfferValueInput"
        />
        <p>{{ myOffer.max_value }}</p>
      </div>

      <p class="text-sm">
        Expires: {{ dayjs(myOffer.reset).format('MMMM D') }}, resets {{ myOffer.frequency }}
      </p>

      <p class="text-sm mt-2">{{ myOffer.text }}</p>
    </div>
  </div>
</template>

<script setup>
import { useOffersStore } from '@/stores/offers'
import { useAppStore } from '@/stores/app'
import { reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

const offersStore = useOffersStore()
const appStore = useAppStore()
const route = useRoute()

const myOffer = reactive({})
const loaded = ref(false)
appStore.setTitle('Offer Details')

if (offersStore.ready) {
  Object.assign(myOffer, offersStore.offers[route.params.id])
  loaded.value = true
} else {
  watch(
    () => offersStore.ready,
    () => {
      if (!loaded.value) {
        Object.assign(myOffer, offersStore.offers[route.params.id])
        loaded.value = true
      }
    }
  )
}

const onOfferValueChange = (e) => {
  const isActive = e.target.value != 0
  offersStore.updateValue(route.params.id, e.target.value, isActive)
}

const onOfferValueInput = (e) => {
  // const offer = myOffers.value.find((i) => i.id == e.target.dataset.offerId)
  myOffer.current_value = e.target.value
}
</script>

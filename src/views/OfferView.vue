<template>
  <div class="px-2">
    <div class="card" v-if="myOffer.card">
      <h1>{{ myOffer.card }}</h1>
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
    <div class="card" v-if="loaded && !myOffer.card">
      somethin fked up, tell Ed offer {{ route.params.id }} is broke
    </div>
  </div>
</template>

<script setup>
import { useOffersStore } from '@/stores/offers'
import { useAppStore } from '@/stores/app'
import { reactive, watch, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

const offersStore = useOffersStore()
const appStore = useAppStore()
const route = useRoute()

const myOffer = reactive({})
const loaded = ref(false)
appStore.setTitle('Offer Details')


watchEffect(() => {
  if (offersStore.ready) {
    const offer = offersStore.getOfferById(route.params.id);
    Object.assign(myOffer, offer);
    loaded.value = true;
  }
});

const onOfferValueChange = (e) => {
  const isActive = e.target.value != 0
  offersStore.updateValue(route.params.id, e.target.value, isActive)
}

const onOfferValueInput = (e) => {
  // const offer = myOffers.value.find((i) => i.id == e.target.dataset.offerId)
  myOffer.current_value = e.target.value
}
</script>

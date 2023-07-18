<template>
  <div class="grid grid-cols-1 gap-2 px-2 pb-20">
    <template v-for="offer in myOffers">
      <router-link :to="'/offer/' + offer.id">
        <div class="card" :class="{ inactive: offer.current_value == 0 }">
          <h1>{{ offer.title }} - ${{ offer.current_value }}</h1>
          <h3>{{ offer.cards.name }}</h3>

          <!-- <label
            for="default-range"
            class="block text-sm font-medium text-white"
            >Used</label
          > -->
          <!-- <div class="flex items-center">
            <p>0</p>
            <input
              :data-offer-id="offer.id"
              type="range"
              :value="offer.current_value"
              :max="offer.max_value"
              class="w-full mx-2 h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
              @change="onOfferValueChange"
              @input="onOfferValueInput"
            />
            <p>{{ offer.max_value }}</p>
          </div> -->

          <p class="text-sm">
            Expires: {{ dayjs(offer.reset).format('MMMM D') }}, resets {{ offer.frequency }}
          </p>

          <!-- <p class="text-sm mt-2">{{ offer.text }}</p> -->
        </div>
      </router-link>
    </template>

    <div class="fixed bottom-24 right-6">
      <button
        type="button"
        @click="openModal"
        class="flex items-center justify-center text-white rounded-full w-14 h-14 hover:bg-blue-800 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800"
      >
        <svg
          class="w-5 h-5 transition-transform group-hover:rotate-45"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>

    <!-- Main modal -->
    <div
      id="offerModal"
      ref="modalEl"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative rounded-lg shadow bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">New Offer</h3>
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="closeModal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="px-6 py-6 lg:px-8">
            <form class="space-y-6" action="#" @submit.prevent="onNewOfferSubmit">
              <div>
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Title</label
                >
                <input
                  type="text"
                  name="title"
                  id="title"
                  v-model="form.title"
                  placeholder="Airline Credit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label for="card" class="block mb-2 text-sm font-medium text-white">Card</label>
                <select
                  id="card"
                  v-model="form.card_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <template v-for="(card, i) in cards">
                    <option :value="card.id">{{ card.name }}</option>
                  </template>
                </select>
              </div>
              <div>
                <label for="place" class="block mb-2 text-sm font-medium text-white">Place</label>
                <select
                  id="place"
                  v-model="form.place_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <template v-for="place in places">
                    <option :value="place.id">{{ place.name }}</option>
                  </template>
                </select>
              </div>
              <div>
                <label for="frequency" class="block mb-2 text-sm font-medium text-white"
                  >Frequency</label
                >
                <select
                  id="frequency"
                  v-model="form.frequency"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
									<option value="semiannual">Semiannually</option>
									<option value="4years">4 Years</option>
                </select>
              </div>
              <div>
                <label
                  for="reset"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Next Reset <span class="text-xs text-gray-400">(MM/DD/YY)</span></label
                >
                <input
                  type="text"
                  name="reset"
                  id="reset"
                  v-model="form.reset"
                  placeholder="01/01/24"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  for="maxValue"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >MaxValue</label
                >
                <input
                  type="text"
                  name="maxValue"
                  id="maxValue"
                  v-model="form.max_value"
                  placeholder="100"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  for="frequency"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Description</label
                >
                <input
                  type="text"
                  name="description"
                  id="description"
                  v-model="form.text"
                  placeholder="Each year receive $100 airline credit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOffersStore } from '@/stores/offers'
import { useCardsStore } from '@/stores/cards'
import { useAppStore } from '@/stores/app'
import { usePlacesStore } from '@/stores/places'
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { Modal } from 'flowbite'
import dayjs from 'dayjs'

let modal, loaded
const offersStore = useOffersStore()
const cardsStore = useCardsStore()
const appStore = useAppStore()
const placesStore = usePlacesStore()

const cards = computed(() => cardsStore.cards.sort((a, b) => a.name.localeCompare(b.name)))
const offers = computed(() => offersStore.offers)
const places = computed(() => placesStore.places.sort((a, b) => a.name.localeCompare(b.name)))

const myOffers = ref([])

if (offersStore.ready) {
  myOffers.value = Object.values(offersStore.offers).sort((a, b) => {
    if (a.is_active == b.is_active) return a.cards.name.localeCompare(b.cards.name)
    return b.is_active - a.is_active
  })
} else {
  watch(
    () => offersStore.offers,
    () => {
      myOffers.value = Object.values(offersStore.offers).sort((a, b) => {
        if (a.is_active == b.is_active) return a.cards.name.localeCompare(b.cards.name)
        return b.is_active - a.is_active
      })
    }
  )
}

const form = reactive({
  title: null,
  card_id: null,
  place_id: null,
  frequency: 'monthly',
  reset: null,
  max_value: null,
  text: null
})

const modalEl = ref(null)

onMounted(() => {
  modal = new Modal(modalEl.value)
  appStore.setTitle('Offers')
})

const onNewOfferSubmit = () => {
  offersStore.saveOffer(form)
  // offersStore.fetch()
  modal.hide()
}

const onOfferValueChange = (e) => {
  const isActive = e.target.value == 0
  offersStore.updateValue(e.target.dataset.offerId, e.target.value, isActive)
}

const onOfferValueInput = (e) => {
  const offer = myOffers.value.find((i) => i.id == e.target.dataset.offerId)
  offer.current_value = e.target.value
}

const openModal = () => {
  form.title = null
  form.card_id = cards.value[0].id
  // form.place_id = places.value[0].id
  form.reset = null
  form.max_value = null
  form.text = null
  modal.show()
}

const closeModal = () => {
  modal.hide()
}
</script>

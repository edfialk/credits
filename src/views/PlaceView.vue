<template>
  <div>
    <div class="grid grid-cols-1 gap-2 px-2" v-if="bonuses">
      <template v-for="(bonus, i) in bonuses" v-key="card.id">
        <router-link :to="'/card/' + bonus.card.id">
          <div class="card" :class="{ 'best-card': i == 0 }">
            <h1>{{ bonus.card.name }}</h1>
            <p>Value: {{ bonus.value }}</p>
            <p class="sub">{{ bonus.text }}</p>
          </div>
        </router-link>
      </template>
    </div>

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
      id="actionModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-md max-h-full" v-if="place">
        <!-- Modal content -->
        <div class="relative rounded-lg shadow bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              New Card Interaction
            </h3>
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
            <form class="space-y-6" action="#" @submit.prevent="onNewActionSubmit">
              <div>
                <label for="card" class="block mb-2 text-sm font-medium text-white"
                  >Card</label
                >
                <select
                  id="card"
                  v-model="newCardId"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <template v-for="card in unusedCards">
                    <option :value="card.id">{{ card.name }}</option>
                  </template>
                </select>
              </div>
              <div>
                <label
                  for="value"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Value</label
                >
                <input
                  type="text"
                  name="value"
                  id="value"
                  v-model="newValue"
                  placeholder="1.0"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  for="text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Text optional</label
                >
                <input
                  type="text"
                  name="text"
                  id="text"
                  v-model="newText"
                  :placeholder="'1 point per dollar for ' + place.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
import { usePlacesStore } from "@/stores/places";
import { useCardsStore } from "@/stores/cards";
import { useBonusesStore } from "@/stores/bonuses";
import { computed, watch, onMounted, ref } from "vue";
import { initFlowbite, Modal } from "flowbite";
import { useRoute } from "vue-router";

let modal;

onMounted(() => {
  initFlowbite();
  modal = new Modal(document.getElementById("actionModal"));
});

const route = useRoute();
const placesStore = usePlacesStore();
const cardsStore = useCardsStore();
const bonusesStore = useBonusesStore();

const id = route.params.id;
const place = computed(() => placesStore.getPlaceById(id));
const newCardId = ref(null);
const newValue = ref(null);
const newText = ref(null);

const bonuses = computed(() =>
  bonusesStore.getBonusesByPlace(id).sort((a, b) => b.value - a.value)
);

const unusedCards = computed(() => {
  if (cardsStore.ready) {
    const cards = cardsStore.getCards;
    return cards
      .filter((c) => bonuses.value.findIndex((i) => i.id == c.id) == -1)
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  return [];
});

const onNewActionSubmit = () => {
  bonusesStore.saveBonus(place.value.id, newCardId.value, newValue.value, newText.value);
  placesStore.fetchCards(route.params.id);
  modal.hide();
};

const openModal = () => {
  newCardId.value = unusedCards.value[0].id;
  modal.show();
};

const closeModal = () => {
  modal.hide();
};
</script>

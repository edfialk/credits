<template>
  <main class="p-2">
    <!-- <div class="items-center justify-between w-full">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-navbar"
          class="block w-full p-2 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-200 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
    </div> -->

    <!-- <div
      id="alert-additional-content-1"
      class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
      role="alert"
    >
      <div class="flex items-center">
        <svg
          class="flex-shrink-0 w-4 h-4 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">This is a info alert</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">
        More info about this info alert goes here. This example text is going to run a bit longer so
        that you can see how spacing within an alert works with this kind of content.
      </div>
      <div class="flex">
        <button
          type="button"
          class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="-ml-0.5 mr-2 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path
              d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
            />
          </svg>
          View more
        </button>
        <button
          type="button"
          class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
          data-dismiss-target="#alert-additional-content-1"
          aria-label="Close"
        >
          Dismiss
        </button>
      </div>
    </div> -->

    <template v-for="offer in myOffers">
      <router-link :to="'/offer/' + offer.id">
        <div class="card">
          <h1>{{ offer.title }} - {{ offer.current_value }}</h1>
          <h3>{{ offer.cards.name }}</h3>
          <p>Use by {{ dayjs(offer.reset).format('MMMM DD, YYYY') }}</p>
        </div>
      </router-link>
    </template>

    <!-- <div class="card">
      <h1>Amex</h1>
      <p>
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </p>
    </div>
    <div class="card">
      <h1>Amex</h1>
      <p>
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </p>
    </div>
    <div class="card">
      <h1>Amex</h1>
      <p>
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </p>
    </div> -->
  </main>
</template>


<script setup>

import { useAppStore } from '@/stores/app'
import { useOffersStore } from '@/stores/offers'
import { computed } from 'vue'
import dayjs from 'dayjs'

const appStore = useAppStore()
appStore.setTitle('Rewards')

const offersStore = useOffersStore()
const offers = computed(() => offersStore.offers)

const myOffers = computed(() => Object.values(offersStore.offers).filter(o => o.is_active).sort((a,b) => {
  return dayjs(a.reset).isBefore(dayjs(b.reset)) ? -1 : 1
}))

</script>
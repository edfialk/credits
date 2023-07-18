<template>
  <nav
    class="fixed z-20 top-0 left-0 w-full border-b border-gray-600 flex items-center mx-auto p-4 bg-primary"
  >
    <button
      type="button"
      class="p-2 w-10 h-10 text-sm text-gray-400 rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600"
      aria-controls="navbar-search"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
    <router-link to="/" class="flex items-center">
      <span class="text-2xl font-semibold whitespace-nowrap text-white ms-3">{{ store.title }}</span>
    </router-link>
  </nav>
</template>

<script setup>

import { useAppStore } from '@/stores/app'

const store = useAppStore()

</script>
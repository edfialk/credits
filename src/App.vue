<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

import Nav from './components/Nav.vue'
import NavFooter from './components/NavFooter.vue'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <header>
    <Nav />
  </header>

  <div style="padding-top: 73px; padding-bottom: 90px;">
    <RouterView />
  </div>

  <NavFooter />
</template>

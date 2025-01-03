<template>
  <div>
    <div class="grid grid-cols-1 gap-4 p-4" v-if="placesStore.ready">
      <template v-for="place in places" v-key="place.id">
        <router-link :to="'/place/' + place.id">
          <div class="flex justify-between items-center">
            <p class="text-lg">{{ place.name }}</p>
            <p>{{ bestCard(place) ? bestCard(place) : '' }}</p>
          </div>
        </router-link>
      </template>
    </div>
    <!-- <ButtonCreate @click="openModal" /> -->
  </div>
</template>

<script setup>
import { useBonusesStore } from '@/stores/bonuses'
import { usePlacesStore } from '@/stores/places'
import { useAppStore } from '@/stores/app'
import { useCardsStore } from '@/stores/cards'
import { computed } from 'vue'
// import ButtonCreate from '../components/ButtonCreate.vue'

const bonusesStore = useBonusesStore()
const placesStore = usePlacesStore()
const appStore = useAppStore()
const cardsStore = useCardsStore()

const places = computed(() => placesStore.places.sort((a, b) => a.name.localeCompare(b.name)))
const bonuses = computed(() => bonusesStore.bonuses)

appStore.setTitle('Places')

const openModal = () => {
  console.log('open modal')
}

const bestCard = (place) => {
  const bonus = bonuses.value.filter(b => b.place.id == place.id)
      .sort((a,b) => b.value - a.value)
      .shift()
  return bonus ? bonus.card.name : null
}
</script>

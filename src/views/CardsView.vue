<template>

    <div class="grid grid-cols-1 gap-2 px-2" v-if="cardsStore.ready">
    
        <template v-for="card in cards" v-key="card.id">
            <router-link :to="'/card/' + card.id">
                <div class="card">
                    <h1>{{ card.name }}</h1>
                    <div class="flex items-center justify-start">
                        <template v-for="bonus in bonuses(card)">
                            <div class="flex flex-col items-center mr-3">
                                <i :class="bonus.place.icon"></i>
                                <p class="text-sm text-gray-600">{{ bonus.value }}</p>
                            </div>
                        </template>
                    </div>
                    <p v-if="card.renew_date">Renews {{ formatDate(card.renew_date) }}</p>
                    <!-- <p>{{ card.text }}</p> -->
                </div>
            </router-link>
        </template>
    </div>
</template>

<script setup>

import { useCardsStore } from '@/stores/cards'
import { useBonusesStore } from '@/stores/bonuses'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'
import dayjs from 'dayjs';

const cardsStore = useCardsStore()
const appStore = useAppStore()
const bonusesStore = useBonusesStore()
appStore.setTitle('Cards')

const cards = computed(() => cardsStore.cards.sort((a,b) => a.name.localeCompare(b.name)))

const bonuses = (card) => {
    let bonuses = bonusesStore.getBonusesByCard(card.id).sort((a,b) => b.value - a.value)
    console.log(bonuses)
    return bonuses
}

const formatDate = date => {
    return dayjs(date).format('MMMM D')
}

</script>
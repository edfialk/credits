import { defineStore } from 'pinia'
import db from '../db'

export const useCardsStore = defineStore('cards', {
    state: () => ({
        cards: [],
        places: [],
        fetching: false,
        ready: false,
    }),
    getters: {
        getCardById: (state) => {
            return (id) => state.cards.find(c => c.id == id)
        },
        getCards: (state) => state.cards,
    },
    actions: {
        async fetch() {
            this.cards = []
            this.ready = false
            this.fetching = true
            const { data, error } = await db.from('cards').select()
            console.log('cards', data)
            this.cards = data
            this.fetching = false
            this.ready = true
        },
    }
})

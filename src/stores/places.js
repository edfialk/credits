import { defineStore } from 'pinia'
import db from '../db'

export const usePlacesStore = defineStore('places', {
    state: () => ({
        places: [],
        cards: [],
        fetching: false,
        ready: false,
    }),
    getters: {
        getPlaceById: (state) => {
            return (id) => state.places.find(c => c.id == id)
        },
        getReady: (state) => state.ready
    },
    actions: {
        async fetch() {
            this.places = []
            this.ready = false
            this.fetching = true
            const { data, error } = await db.from('places').select()
            console.log('places', data)
            this.places = data
            this.fetching = false
            this.ready = true
        },
        async fetchCards(place_id) {
            this.cards = []
            this.ready = false
            this.fetching = true
            const { data, error } = await db.from('bonuses').select(`
                text,
                value,
                cards ( 
                    name
                )
            `)
            .eq('place_id', place_id)
            this.cards = data.map((c) => ({
                name: c.cards.name,
                text: c.text,
                value: c.value
            }))
            this.fetching = false
            this.ready = true
            console.log('places cards', data)
        },
    }
})

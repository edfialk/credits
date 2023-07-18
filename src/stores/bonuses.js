import { defineStore } from 'pinia'
import db from '../db'

export const useBonusesStore = defineStore('bonuses', {
    state: () => ({
        bonuses: [],
        fetching: false,
        ready: false,
    }),
    getters: {
        getBonusById: (state) => {
            return (id) => state.bonuses.find(c => c.id == id)
        },
        getBonuses: (state) => state.bonuses,
        getBonusesByCard: (state) => {
            return (card_id) => state.bonuses.filter(b => b.cards.id == card_id)
        },
        getBonusesByPlace: (state) => {
            return (place_id) => state.bonuses.filter(b => b.places.id == placeId)
        },
        getBestCardForPlace(state) {
            const self = this
            return (place_id) => {
                const bonuses = self.getBonusesByPlace(place_id)
                return bonuses.sort((a,b) => a.value - b.value)[0]
            }
        }
    },
    actions: {
        async fetch() {
            this.bonuses = []
            this.ready = false
            this.fetching = true
            const { data, error } = await db.from('bonuses').select(`
                id,
                text,
                value,
                cards ( id, name ),
                places ( id, name, icon )
            `)
            console.log('bonuses', data)
            this.bonuses = data
            this.fetching = false
            this.ready = true
        },
        async saveBonus(place_id, card_id, value, text) {
            const { error } = await db.from('bonuses')
                .insert({
                    place_id,
                    card_id,
                    value,
                    text
                })
        }
    }
})

import { defineStore } from 'pinia'
import db from '../db'
import { usePlacesStore } from './places'
import { useCardsStore } from './cards'

export const useOffersStore = defineStore('offers', {
    state: () => ({
        offers: {},
        fetching: false,
        ready: false,
    }),
    getters: {
        getOfferById: (state) => state.offers.id,
        getOffers: (state) => state.offers
    },
    actions: {
        async fetch() {
            this.offers = {}
            this.ready = false
            this.fetching = true
            const { data, error } = await db.from('offers').select(`
                id,
                title,
                reset,
                frequency,
                is_active,
                max_value,
                current_value,
                text,
                places (
                    name
                ),
                cards (
                    name
                )
            `)
            // console.log('offers', data)
            const offers = {}
            data.forEach(i => {
                offers[i.id] = i
            })
            console.log('offers', offers)
            this.offers = offers
            this.fetching = false
            this.ready = true
        },
        async saveOffer(offer) {
            const places = usePlacesStore()
            const cards = useCardsStore()
            offer.is_active = true
            offer.current_value = offer.max_value
            const { data, error } = await db.from('offers')
                .insert(offer)
                .select()
            offer.id = data.id
            if (offer.place_id) {
                const place = places.getPlaceById(offer.place_id)
                offer.places = { name: place.name }
            }
            const card = cards.getCardById(offer.card_id)
            offer.cards = { name: card.name }
            this.offers.push(offer)
        },
        async updateValue(offer_id, new_value, is_active = true) {
            console.log('is_active', is_active)
            const { error } = await db
                .from('offers')
                .update({ current_value: new_value, is_active })
                .eq('id', offer_id)
            Object.assign(this.offers[offer_id], {
                current_value: new_value,
                is_active
            })
        }
    }
})

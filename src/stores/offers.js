import { defineStore } from 'pinia'
import { useFirestore } from "vuefire";
import { collection, getDocs, getDoc, where, query, doc, updateDoc } from "firebase/firestore"

const firedb = useFirestore();

export const useOffersStore = defineStore('offers', {
    state: () => ({
        offers: [],
        fetching: false,
        ready: false,
    }),
    getters: {
        getOfferById: (state) => {
            return (id) => state.offers.find(item => item.id == id)
        },
        getOffers: (state) => state.offers
    },
    actions: {
        async fetch() {
            this.offers = []
            this.ready = false
            this.fetching = true

            try {
                const s = await getDocs(collection(firedb, "offers"))
                const offersPromises = s.docs.map(async (d) => {
                    const data = d.data()
                    let offer
                    if (data.place) {
                        const placeSnap = await getDoc(data.place)
                        const place = { id: placeSnap.id, ...placeSnap.data() }
                        offer = { id: d.id, ...data, place }
                    } else {
                        offer = { id: d.id, ...data }
                    }
                    return offer
                })

                this.offers = await Promise.all(offersPromises)
                console.log('offers', this.offers)
            } catch (error) {
                console.error('Error getting offers: ', error)
            } finally {
                this.fetching = false
                this.ready = true
            }
        },
        async saveOffer(offer) {
            /*             const places = usePlacesStore()
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
                        this.offers.push(offer) */
        },
        async updateValue(offerId, newValue) {
            const ref = doc(firedb, "offers", offerId)
            await updateDoc(ref, {
                current_value: newValue,
            })
            const i = this.offers.findIndex(item => item.id === offerId)
            if (i !== -1) {
                this.offers[i] = {...this.offers[i], current_value: newValue }
            }
        }
    }
})

import { defineStore } from 'pinia'
import { useFirestore } from "vuefire";
import { collection, getDocs, getDoc, where, query, doc } from "firebase/firestore";

const firedb = useFirestore();

export const useCardsStore = defineStore('cards', {
    state: () => ({
        cards: [],
        // places: [],
        fetching: false,
        ready: false,
    }),
    getters: {
        getCardById: (state) => (id) => state.cards.find(c => c.id == id),
        getCards: (state) => state.cards,
    },
    actions: {
        async fetch() {
            this.cards = []
            this.ready = false
            this.fetching = true
            const s = await getDocs(collection(firedb, "cards"))
            s.docs.forEach((d) => {
                const data = d.data()
                const card = { id: d.id, ...data }
                this.cards.push(card)
            })
            console.log('cards', this.cards)
            this.fetching = false
            this.ready = true
        },
    }
})

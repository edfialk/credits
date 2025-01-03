import { defineStore } from 'pinia'
import { useFirestore } from "vuefire";
import { collection, getDocs, getDoc, where, query, doc, setDoc } from "firebase/firestore";

const firedb = useFirestore();

export const useBonusesStore = defineStore('bonuses', {
    state: () => ({
        bonuses: [],
        fetching: false,
        ready: false,
    }),
    getters: {
        getBonuses: (state) => state.bonuses,
        getBonusById: (state) => {
            return (id) => state.bonuses.find(c => c.id == id)
        },
        getBonusesByCard: (state) => {
            return (card_id) => state.bonuses.filter(b => b.card.id == card_id)
        },
        getBonusesByPlace: (state) => {
            return (place_id) => state.bonuses.filter(b => b.place.id == place_id)
        },
        getBestCardForPlace(state) {
            const self = this
            return (place_id) => {
                const bonuses = self.getBonusesByPlace(place_id)
                return bonuses.sort((a, b) => a.value - b.value)[0]
            }
        }
    },
    actions: {
        async fetch() {
            this.bonuses = []
            this.ready = false
            this.fetching = true

            try {
                const s = await getDocs(collection(firedb, "bonuses"));
                const bonusesPromises = s.docs.map(async (d) => {
                    const data = d.data();
                    const cardSnap = await getDoc(data.card);
                    const card = { id: cardSnap.id, ...cardSnap.data() };
                    const placeSnap = await getDoc(data.place);
                    const place = { id: placeSnap.id, ...placeSnap.data() };
                    return {
                        id: d.id,
                        ...data,
                        card,
                        place
                    };
                });

                this.bonuses = await Promise.all(bonusesPromises);
                console.log('bonuses', this.bonuses);
            } catch (error) {
                console.error('Error fetching bonuses:', error);
            } finally {
                this.fetching = false
                this.ready = true
            }
        },
    },
    async insert(place_id, card_id, value, text) {
        const ref = doc(firedb, "bonuses");
        await setDoc(doc(firedb, "bonuses"), {
            place: doc(firedb, "places", place_id),
            card: doc(firedb, "cards", card_id),
            value,
            text
        })
        // const { error } = await db.from('bonuses')
        //     .insert({
        //         place_id,
        //         card_id,
        //         value,
        //         text
        //     })
    }
})

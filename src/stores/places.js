import { defineStore } from 'pinia'
import { useFirestore } from "vuefire";
import { collection, getDocs, where, query, doc } from "firebase/firestore";

const firedb = useFirestore();

export const usePlacesStore = defineStore('places', {
    state: () => ({
        places: [],
        fetching: false,
        ready: false,
    }),
    getters: {
        getPlaceById: (state) => {
            return (id) => state.places.find(item => item.id == id)
        },
    },
    actions: {
        async fetch() {
            this.places = []
            this.ready = false
            this.fetching = true

            try{
                const snapshot = await getDocs(collection(firedb, "places"))
                this.places = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
                console.log('places', this.places)
            } catch (error) {
                console.error('Error getting places: ', error)
            } finally {
                this.fetching = false
                this.ready = true
            }
        },
    }
})

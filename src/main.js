import 'flowbite'
import './assets/main.scss'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire } from 'vuefire'
import { firebaseApp } from './firedb'

import App from './App.vue'
import router from './router'

import { useCardsStore } from '@/stores/cards'
import { usePlacesStore } from '@/stores/places'
// import { useAppStore } from '@/stores/app'
import { useOffersStore } from '@/stores/offers'
import { useBonusesStore } from '@/stores/bonuses'

const app = createApp(App)

app.use(VueFire, {
    firebaseApp
})
app.use(createPinia())
app.use(router)

app.mount('#app')


useCardsStore().fetch()
usePlacesStore().fetch()
useOffersStore().fetch()
useBonusesStore().fetch()
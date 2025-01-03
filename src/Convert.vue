<script setup>
import { RouterView } from "vue-router";

import Nav from "./components/Nav.vue";
import NavFooter from "./components/NavFooter.vue";

import { useFirestore } from "vuefire";
import { useCollection } from "vuefire";
import { collection, writeBatch, doc, setDoc } from "firebase/firestore";
import { useBonusesStore } from "@/stores/bonuses";
import { usePlacesStore } from "@/stores/places";
import { useAppStore } from "@/stores/app";
import { useCardsStore } from "@/stores/cards";
import { useOffersStore } from "@/stores/offers";

const firedb = useFirestore();
const fireplaces = useCollection(collection(firedb, "places"));
const batch = writeBatch(firedb);

const store = useOffersStore();

const doConvert = async () => {
  for (const key in store.offers) {
    let p = store.offers[key];
    console.log(p);
    let ref = doc(firedb, "offers", "" + p.id);
    batch.set(ref, {
      title: p.title,
      text: p.text,
      reset: p.reset,
      place: p.places ? doc(firedb, "places", "" + p.places.id) : null,
      frequency: p.frequency,
      is_active: p.is_active,
      card: p.cards.name,
      title: p.title,
      max_value: p.max_value,
      current_value: p.current_value,
    });
  }

  /*   store.bonuses.forEach((p) => {
    // console.log(p, p.cards.id, p.places.id);
    let ref = doc(firedb, "bonuses", "" + p.id);
    batch.set(ref, {
        card: doc(firedb, "cards", "" + p.cards.id),
        place: doc(firedb, "places", "" + p.places.id),
        text: p.text,
        value: p.value
    });
  }); */

  await batch.commit();
};
</script>

<template>
  <header>
    <Nav />
  </header>

  <div style="padding: 30px">
    <h1>Convert</h1>
    <button @click="doConvert()">Go</button>
  </div>

  <NavFooter />
</template>

<template>
  <div class="smoothie-list-item">
    <router-link class="event-link" :to="{ name: 'Smoothie', params: {smoothieID: id} }">{{name}}</router-link>
    <button v-on:click="removeSmoothie">Remove</button>
  </div>
</template>

<script>
import { db } from "@/db";

export default {
  name: "SmoothieListItem",
  props: ["name", "id"],
  methods: {
    removeSmoothie() {
      db.collection("smoothies")
        .doc(this.$props.id)
        .delete();
    }
  }
};
</script>

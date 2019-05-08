<template>
  <li class="smoothie-list-item">
    <router-link class="event-link" :to="{ name: 'Smoothie', params: {smoothieID: id} }">{{name}}</router-link>
    <div class="remove-smoothie" v-on:click="removeSmoothie">remove</div>
  </li>
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


<style lang="scss">
.remove-smoothie {
  cursor: pointer;
  color: #ff7373;
  position: absolute;
  bottom: 25px;
  right: 25px;
}
</style>

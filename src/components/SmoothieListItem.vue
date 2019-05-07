<template>
  <div class="smoothie-list-item">
    {{name}}
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

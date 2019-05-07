<template>
  <div class="home">
    <header>
      <h1>Smoothio</h1>
    </header>
    <div class="list-of-smoothies"></div>
  </div>
</template>

<script>
import { db } from "@/db";

const smoothie = db.collection("smoothies");

export default {
  name: "smootihe",
  data() {
    return {
      smoothie: []
    };
  },
  watch: {
    id: {
      // call it upon creation too
      immediate: true,
      handler(id) {
        this.$bind("smoothie", users.doc(id));
      }
    }
  }
};
</script>

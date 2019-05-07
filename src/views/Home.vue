<template>
  <div class="home">
    <header>
      <h1>Smoothio</h1>
    </header>
    <div class="add-a-smoothie-container">
      <button v-on:click="isAddingSmoothie = !isAddingSmoothie">Add a smoothie</button>
      <div v-if="isAddingSmoothie" class="addSmoothieForm">
        <form v-on:submit="onAddSmoothieSubmit">
          <label>Smoothie Name</label>
          <input type="text" v-model="newSmoothieName">
        </form>
      </div>
    </div>
    <div class="list-of-smoothies"></div>
  </div>
</template>

<script>
import { db } from "@/db";

const smoothie = db.collection("smoothies");

export default {
  name: "home",
  data() {
    return {
      smoothies: [],
      isAddingSmoothie: false,
      newSmoothieName: ""
    };
  },
  methods: {
    onAddSmoothieSubmit() {
      db.collection("smoothies").add({
        name: this.newSmoothieName
      });
    }
  },

  firestore: {
    smoothies: db.collection("smoothies")
  }
};
</script>

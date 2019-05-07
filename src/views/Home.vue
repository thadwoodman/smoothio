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
    onAddSmoothieSubmit(event) {
      event.preventDefault();
      db.collection("smoothies")
        .add({
          name: this.newSmoothieName
        })
        .then(response => {
          this.$router.push({
            name: "smoothie",
            params: { smoothieID: response.id }
          });
        });
    }
  },

  firestore: {
    smoothies: db.collection("smoothies")
  }
};
</script>

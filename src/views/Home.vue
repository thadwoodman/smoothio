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
          <div v-if="showNameInputError">{{this.nameInputErrorText}}</div>
        </form>
      </div>
    </div>
    <div class="list-of-smoothies">
      <SmoothieListItem
        v-for="smoothie in smoothies"
        v-bind:key="smoothie.id"
        v-bind:id="smoothie.id"
        v-bind:name="smoothie.name"
      />
    </div>
  </div>
</template>

<script>
import { db } from "@/db";
import SmoothieListItem from "@/components/SmoothieListItem";

export default {
  name: "Home",
  components: { SmoothieListItem },
  data() {
    return {
      smoothies: [],
      isAddingSmoothie: false,
      newSmoothieName: "",
      showNameInputError: false,
      nameInputErrorText: ""
    };
  },
  methods: {
    onAddSmoothieSubmit(event) {
      event.preventDefault();
      if (this.isSmoothieUnique()) {
        db.collection("smoothies")
          .add({
            name: this.newSmoothieName
          })
          .then(response => {
            // navigate to newly created smoothie name
            this.$router.push({
              name: "Smoothie",
              params: { smoothieID: response.id }
            });
          });
      } else {
        this.displayNameInputError(
          `"${this.newSmoothieName}" has already been taken`
        );
      }
    },
    isSmoothieUnique() {
      return !this.smoothies
        .map(smoothie => smoothie.name)
        .includes(this.newSmoothieName);
    },
    displayNameInputError(text) {
      this.showNameInputError = true;
      this.nameInputErrorText = text;
    }
  },
  firestore: {
    smoothies: db.collection("smoothies")
  }
};
</script>

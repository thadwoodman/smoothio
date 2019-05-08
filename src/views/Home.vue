<template>
  <div class="home">
    <div class="inline-form-container">
      <div v-if="isAddingSmoothie" class="inline-form">
        <form v-on:submit="onAddSmoothieSubmit">
          <label>Name your smoothie (hit enter):</label>
          <input type="text" v-model="newSmoothieName">
          <div v-if="showNameInputError">{{this.nameInputErrorText}}</div>
        </form>
      </div>
      <button v-on:click="isAddingSmoothie = !isAddingSmoothie">Add a smoothie</button>
    </div>
    <section class="smoothies">
      <h2>Cool new smoothies:</h2>
      <ul class="list-of-smoothies">
        <SmoothieListItem
          v-for="smoothie in smoothies"
          v-bind:key="smoothie.id"
          v-bind:id="smoothie.id"
          v-bind:name="smoothie.name"
        />
      </ul>
    </section>
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

<style lang="scss">
ul.list-of-smoothies {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  .smoothie-list-item {
    border: 1px solid gray;
    border-radius: 5px;
    width: 140px;
    padding: 35px;
    position: relative;
    margin-bottom: 50px;
    margin-right: 50px;
  }
}
</style>


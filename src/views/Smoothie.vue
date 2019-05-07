<template>
  <div class="smoothie">
    <header>
      <h1 class="smoothie-name">{{smoothie.name}}</h1>
    </header>
    <div class="smoothie-ingredients">
      <SmoothieIngredient
        v-for="ingredient in smoothie.ingredients"
        v-bind:key="ingredient.id"
        v-bind:name="ingredient.name"
        class="content"
      />
    </div>
    <div class="add-smoothie-ingredients">
      <button v-on:click="showIngredientsForm = true">Add ingredients</button>
      <form v-if="showIngredientsForm" v-on:submit="addIngredient">
        <input type="text" v-model="newIngredientInput">
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "@/db";
import SmoothieIngredient from "@/components/SmoothieIngredient.vue";

export default {
  name: "smoothie",
  components: { SmoothieIngredient },
  data() {
    return {
      smoothieID: "",
      smoothie: {},
      showIngredientsForm: false,
      newIngredientInput: ""
    };
  },
  created() {
    // load smoothie on create
    this.smoothieID = this.$route.params.smoothieID;
    this.fetchSmoothieData();
  },
  methods: {
    fetchSmoothieData() {
      db.collection("smoothies")
        .doc(this.smoothieID)
        .get()
        .then(snapshot => {
          this.smoothie = snapshot.data();
        });
    },
    addIngredient(event) {
      event.preventDefault();
      if (!this.smoothie.ingredients) {
        this.smoothie.ingredients = [];
      }
      this.smoothie.ingredients.push({ name: this.newIngredientInput });
      this.updateSmoothie();
    },
    updateSmoothie() {
      db.collection("smoothies")
        .doc(this.smoothieID)
        .set(this.smoothie);
      this.showIngredientsForm = false;
    }
  }
};
</script>

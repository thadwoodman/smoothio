<template>
  <div class="smoothie">
    <header>
      <h1 class="smoothie-name">{{smoothie.name}}</h1>
    </header>
    <div class="error-text" v-if="showError">{{errorText}}</div>
    <div class="smoothie-ingredients">
      <SmoothieIngredient
        v-for="ingredient in smoothie.ingredients"
        v-bind:key="ingredient.id"
        v-bind:quantity="ingredient.quantity"
        v-bind:ingredient="ingredient.ingredient"
        class="content"
      />
    </div>
    <div class="add-smoothie-ingredients">
      <button v-on:click="showIngredientsForm = true">Add ingredients</button>
      <form v-if="showIngredientsForm" v-on:submit="addIngredient">
        <div class="input-container">
          <label for="quantity">Quantity</label>
          <input
            name="quantity"
            placeholder="1 cup"
            type="text"
            v-model="newIngredientInputQuantity"
          >
        </div>
        <div class="input-container">
          <label for="ingredient">Ingredient</label>
          <input
            name="ingredient"
            placeholder="Blueberries"
            type="text"
            v-model="newIngredientInputIngredient"
          >
        </div>
        <button type="submit">Add</button>
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
      showIngredientsForm: true,
      newIngredientInputQuantity: "",
      newIngredientInputIngredient: "",
      showError: false,
      errorText: ""
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
      if (
        this.newIngredientInputQuantity === "" ||
        this.newIngredientInputIngredient == ""
      ) {
        this.displayErrorText("You must include both quantity and ingredient");
      } else {
        this.showError = false;
        this.smoothie.ingredients.push({
          quantity: this.newIngredientInputQuantity,
          ingredient: this.newIngredientInputIngredient
        });
        this.updateSmoothie();
      }
    },
    updateSmoothie() {
      db.collection("smoothies")
        .doc(this.smoothieID)
        .set(this.smoothie);
      this.showIngredientsForm = false;
    },
    displayErrorText(text) {
      this.showError = true;
      this.errorText = text;
    }
  }
};
</script>

<template>
  <div class="smoothie">
    <header>
      <h1 class="smoothie-name">{{smoothie.name}}</h1>
    </header>
    <div class="error-text" v-if="showError">{{errorText}}</div>
    <div class="smoothie-tags">
      <ul class="smoothie-tags-list">
        <SmoothieTag v-for="tag in smoothie.tags" v-bind:key="tag" v-bind:tag="tag"/>
      </ul>
      <button v-on:click="showTagInput = !showTagInput">Add tag</button>
      <form v-if="showTagInput" v-on:submit="addTag">
        <input type="text" v-model="addTagInput">
      </form>
    </div>
    <div class="ingredients-container">
      <h2>Ingredients:</h2>
    </div>
    <ul class="smoothie-ingredients">
      <SmoothieIngredient
        v-for="ingredient in smoothie.ingredients"
        v-bind:key="ingredient.id"
        v-bind:quantity="ingredient.quantity"
        v-bind:ingredient="ingredient.ingredient"
      />
    </ul>
    <div class="add-smoothie-ingredients">
      <button v-on:click="showIngredientsForm = true">Add ingredient</button>
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
import SmoothieTag from "@/components/SmoothieTag.vue";

export default {
  name: "smoothie",
  components: { SmoothieIngredient, SmoothieTag },
  data() {
    return {
      smoothieID: "",
      smoothie: {},
      showIngredientsForm: false,
      newIngredientInputQuantity: "",
      newIngredientInputIngredient: "",
      showError: false,
      showTagInput: false,
      addTagInput: "",
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
    addTag(event) {
      event.preventDefault();
      if (this.addTagInput === "") {
        this.displayErrorText("Please enter a tag");
      } else if (
        this.smoothie.tags &&
        this.smoothie.tags.includes(this.addTagInput)
      ) {
        this.displayErrorText("Tag already exists");
      } else {
        if (!this.smoothie.tags) {
          this.smoothie.tags = [];
        }
        this.smoothie.tags.push(this.addTagInput);
        this.updateSmoothie();
        this.addTagInput = "";
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

<template>
  <div class="smoothie-ingredient">
    <span>{{quantity}}</span>
    <span>{{ingredient}}</span>
  </div>
</template>

<script>
import { db } from "@/db";

export default {
  name: "SmoothieIngredient",
  props: ["quantity", "ingredient"]
};
</script>

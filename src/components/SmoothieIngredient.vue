<template>
  <li class="smoothie-ingredient">
    <span>{{quantity}}</span> of
    <span>{{ingredient}}</span>
  </li>
</template>

<script>
import { db } from "@/db";

export default {
  name: "SmoothieIngredient",
  props: ["quantity", "ingredient"]
};
</script>

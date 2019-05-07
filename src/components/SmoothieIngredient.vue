<template>
  <div class="smoothie-ingredient">{{name}}</div>
</template>

<script>
import { db } from "@/db";

export default {
  name: "SmoothieIngredient",
  props: ["name"]
};
</script>

<template>
  <li class="smoothie-tag">
    <span>{{tag}}</span>
  </li>
</template>

<script>
import { db } from "@/db";

export default {
  name: "SmoothieIngredient",
  props: ["tag"]
};
</script>

<template>
  <div class="smoothie">
    <header>
      <h1>Smoothie name {{$route.params}}</h1>
    </header>
  </div>
</template>

<script>
// import { db } from "@/db";

// const smoothie = db.collection("smoothies");
console.log("loading smoothie");

export default {
  name: "smoothie",
  data() {
    return {
      smoothie: []
    };
  },
  created() {
    console.log("create!");
  }
};
</script>

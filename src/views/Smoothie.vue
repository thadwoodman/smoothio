<template>
  <div class="smoothie">
    <header>
      <h1 class="smoothie-name">{{smoothieName}}</h1>
    </header>
  </div>
</template>

<script>
import { db } from "@/db";

export default {
  name: "smoothie",
  data() {
    return {
      smoothieName: ""
    };
  },
  created() {
    // load smoothie on create
    // retrieve a document
    db.collection("smoothies")
      .doc(this.$route.params.smoothieID)
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        this.smoothieName = document.name;
      });
  }
};
</script>

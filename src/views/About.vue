<template>
    <v-main >
      <home />
      <about />
    </v-main>
</template>

<script>

import home from "../components/HomeSection";
import about from "../components/AboutSection";

export default {
  name: "App",
  components: {
    home,
    about
  },
  data: function() {
    return {
    };
  },
  methods: {
  },

  computed: {
  },

  mounted: function() {
  }
};
</script>
    
<style scoped>
</style>
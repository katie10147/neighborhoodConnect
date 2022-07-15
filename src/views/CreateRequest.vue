<template>
  <div>
    <CreateRequest v-bind:allTags="allTags" v-bind:signedInUser="signedInUser"/>
  </div>
</template>
<script>
import CreateRequest from "../components/CreateRequest.vue";

export default {
  name: "CreateRequest.vue",
  components: {
    CreateRequest,
  },
  props: ["requests", "allTags", "signedInUser"],
};
</script>
<style></style>

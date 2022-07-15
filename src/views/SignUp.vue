<template>
    <div>
      <div v-if="signedInUser">
        <meta http-equiv="Refresh" content="0; url='/#/'" />
      </div>
      <div v-else>
        <h1> Join us! </h1>
        <CreateUser /> 
      </div>
    </div>
</template>

<script>

import CreateUser from "../components/CreateUser.vue"


export default {
  name: "SignUpPage",
  props: {
    signedInUser: String,
  },
  components: {
      CreateUser
  },
  data() {
    return {
    };
  },
  created: function() {
  },
  computed: {
    console: () => console,
  },
  methods: {
  },
};
</script>
<style scoped>
</style>
<template>
    <div>
      <div v-if="signedInUser">
        <meta http-equiv="Refresh" content="0; url='/#/'" />
      </div>

      <div v-else>
        <h1> Welcome back! </h1>
        <SignIn /> 
      </div>
    </div>
</template>

<script>

import SignIn from "../components/SignIn.vue"


export default {
  name: "SignInPage",
  props: {
    signedInUser: String,
  },
  components: {
      SignIn
  },
  data() {
    return {
    };
  },
  computed: {
    console: () => console,
  },
};
</script>
<style scoped>
</style>
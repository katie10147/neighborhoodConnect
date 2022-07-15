<template>
  <v-card>
    <v-app-bar color="primary" dark dense>
      <template>
        <v-tabs class='ml-2'>
          <v-tab to='/'>Neighborhood Connect</v-tab>
          <v-tab to='/feed'>Requests</v-tab>
          <v-tab v-if="signedInUser" to='/following'>Following</v-tab>
          <v-tab v-if="!signedInUser" to='/login' class='ml-auto'>Login</v-tab>
          <v-tab v-else to='/settings' class='ml-auto'>Hi {{signedInUser}}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script>


export default {
  name: "Nav",
  props: {
    signedInUser: String,
  },
  data() {
    return {
      active: 'guide',
    };
  },
  computed: {
    console: () => console,
  },
};
</script>

<style scoped>
</style>

<template>
  <div>
      <h1>User Settings</h1>
      <ChangeUsername />
      <ChangePassword />
      <DeleteUser  />
      <SignOut />

    </div>
</template>

<script>
import SignOut from "../components/SignOut.vue";
import ChangeUsername from "../components/ChangeUsername.vue";
import ChangePassword from "../components/ChangePassword.vue";
import DeleteUser from "../components/DeleteUser.vue";


export default {
  name: "Settings",
  props:{
    signedInUser: String,
  },
  components: {
    SignOut,
    ChangeUsername,
    ChangePassword,
    DeleteUser,
  },
  created: function() {},
  computed: {
    console: () => console,
  },
  methods: {},
};
</script>
<style scoped></style>

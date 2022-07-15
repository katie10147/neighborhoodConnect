<template>
  <div>
    <GenericForm 
        v-bind:title="title" 
        v-bind:inputs="inputs" 
        v-bind:onClick="onClick"
        v-bind:errors="errors"
        v-bind:successMessage="successMessage"
        />
  </div>
</template>

<script>

import axios from "axios";
import { eventBus } from "../main";
import GenericForm from "./GenericForm.vue";

export default {
  name: "DeleteUser",
  components: {
      GenericForm
  },
  data() {
    return {
      title: 'Delete User',
      inputs: [
      ], 
      onClick: this.deleteUser, 
      errors: [],
      successMessage: null,
    }
  },
  created: function() {
  },
  methods: {
    deleteUser() {
      axios.delete(`users`)
        .then((response) => {
            this.successMessage = response.data.message;
            
            eventBus.$emit("delete-user-success");
            document.location.href="/#/";
        })
        .catch(err => {
          eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        })
        .then(() => {
          // always executed
          this.clearMessages();
          eventBus.$emit("refresh-requests");
        });
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
};
</script>

<style></style>

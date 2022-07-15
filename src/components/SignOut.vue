<template>
    <GenericForm 
        v-bind:title="title" 
        v-bind:inputs="inputs" 
        v-bind:onClick="onClick"
        v-bind:errors="errors"
        v-bind:successMessage="successMessage"
        />
</template>

<script>

import axios from "axios";
import { eventBus } from "../main";
import GenericForm from "./GenericForm.vue";

export default {
  name: "SignOut",
  components: {
      GenericForm
  },
  data() {
    return {
      title: 'Sign Out',
      inputs: [
      ],
      onClick: this.signOut, 
      errors: [],
      successMessage: null,
    }
  },
  created: function() {
  },
  computed: {
    console: () => console,
  },
  methods: {
    signOut() {
      axios.delete('session', {})
        .then((response) => {
            this.successMessage = response.data.message;
            eventBus.$emit('logout-success');
            document.location.href="/#/";
        })
        .catch(err => {
            eventBus.$emit('alert', {type: 'error', message: err.response.data.error});
        })
        .then(() => {
            this.clearMessages();
            eventBus.$emit('refresh-requests');
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

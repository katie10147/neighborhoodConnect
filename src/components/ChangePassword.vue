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
import GenericForm from "./GenericForm.vue";
import { eventBus } from '../main';

export default {
  name: "ChangePassword",
  components: {
      GenericForm
  },
  data() {
    return {
      title: 'Change Password',
      inputs: [
          "password"
      ],
      onClick: this.changePassword, 
      errors: [],
      successMessage: null,
    }
  },
  computed: {
    console: () => console,
  },
  methods: {
    changePassword(event) {
      const bodyContent = { password: event.target.elements.password.value }
      axios.patch(`users/`, bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
        })
        .catch(err => {
            eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        })
        .then(() => {
            this.resetForm(event);
            this.clearMessages();
            eventBus.$emit('refresh-requests');
        });
    },
    resetForm: function(event) {
      event.target.elements.password.value = '';
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

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
  name: "CreateUser",
  components: {
      GenericForm
  },
  data() {
    return {
      title: 'Create User',
      inputs: [
        'username',
        'password',
      ],
      onClick: this.createUser, 
      errors: [],
      successMessage: null,
    }
  },
  computed: {
    console: () => console,
  },
  methods: {
    createUser(event) {
      const bodyContent = { username: event.target.elements.username.value, password: event.target.elements.password.value };
      axios.post('session', bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
            const eventBodyContent = {username: bodyContent.username, id: response.data.user._id}
            eventBus.$emit('login-success', eventBodyContent);
            document.location.href = '/#/';
        })
        .catch(err => {
          eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        })
        .then(() => {
          // always executed
          this.resetForm(event);
          this.clearMessages();
          eventBus.$emit('refresh-requests');
        });
    },
    resetForm: function(event) {
      event.target.elements.username.value = '';
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

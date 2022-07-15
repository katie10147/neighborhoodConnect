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
  name: "ChangeUsername",
  components: {
      GenericForm
  },
  data() {
    return {
      title: 'Change Username',
      inputs: [
          "username"
      ],
      onClick: this.changeUsername, 
      errors: [],
      successMessage: null,
    }
  },
  computed: {
    console: () => console,
  },
  methods: {
    changeUsername(event) {
      const bodyContent = { username: event.target.elements.username.value }
      axios.patch(`users/`, bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
            eventBus.$emit("username-change", response.data.updatedUsername);
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
      event.target.elements.username.value = '';
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

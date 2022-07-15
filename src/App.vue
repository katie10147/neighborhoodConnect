<template>
<v-app>
    <Nav v-bind:signedInUser="signedInUser"/>
    <v-dialog v-model="alert.active" width='50%'>
      <v-alert v-model="alert.active" :type="alert.type" dismissible prominent>
        {{alert.message}}
      </v-alert>
    </v-dialog>
    <router-view v-bind:requests="requests" v-bind:allTags="allTags" v-bind:signedInUserId="signedInUserId" v-bind:signedInUser="signedInUser" />
</v-app>
</template>

<script>

import { eventBus } from "./main";
import axios from "axios";
import Nav from './components/Nav.vue'

export default {
  name: "app",
  components: {
    Nav
  },
  data() {
    return {
      signedInUser: '',
      signedInUserId: "", 
      requests: [],
      allTags: new Set(["Boston", "Cambridge", "Backbay", "MIT", "Pothole"]),
      alert: {
        active: false,
        type: '',
        message: '',
        color: '',
      }
    };
  },
  mounted () {
    axios.get('session')
      .then((response) => {
        this.signedInUser = response.data;
        this.$cookie.set("username", true);
      });
  },
  created: function() {
    this.refreshRequests();
    this.getTags();

    eventBus.$on("login-success", (response) => {
      this.signedInUserId = response.id;
      this.signedInUser = response.username;
      this.$cookie.set("username", true);
    });
    eventBus.$on("logout-success", () => {
      if (this.signedInUser){
        this.$cookie.set("username", false);
        this.signedInUser = '';
      } 
    });
    eventBus.$on("refresh-requests", () => {
      this.refreshRequests();
    });
    eventBus.$on("set-requests", (requests) => {
      this.requests = requests;
    });
    eventBus.$on("username-change", (name) => {
      this.$cookie.set("username", true);
      this.signedInUser = name;
      this.console.log(name);
    });
    eventBus.$on("tags-update", () => {
      this.getTags();
    });
    eventBus.$on("delete-user-success", () => {
     if (this.signedInUser){
        this.$cookie.set("username", false);
        this.signedInUser = '';
      }
    });
    eventBus.$on("alert", (a) => {
      this.alert.active = true;
      this.alert.type = a.type;
      this.alert.message = a.message;
    });
  },
  computed: {
    console: () => console,
  },
  beforeCreate () {
    axios.get('session')
      .then((response) => {
        this.signedInUser = response.data;
        this.$cookie.set("username", true);
      })
  },
  beforeDestroy () {
    axios.delete('session')
      .then(() => {
        this.$cookie.set("username", false);
      })
  },
  methods: {
      refreshRequests() {
      axios
        .get("requests")
        .then((response) => {
          this.requests = response.data;
        })
        .catch((err) => {
          eventBus.$emit('alert', {type: 'error', message: err.response.data.error});
        });
    },
    getTags() {
        axios
          .get('tags/allTags')
          .then((response) => {
                for (const tag of response.data) {
                  this.allTags.add(tag.name);
                }
          })
          .catch((err) => {
            eventBus.$emit('alert', {type: 'error', message: err.response.data.error});
        });
      },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.success-message {
  color: green;
  margin: auto;
}
.error-message {
  color: red;
  margin: auto;
}
</style>

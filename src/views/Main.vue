<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          
          <v-layout justify-center class='mt-3'>
            <v-btn @click.stop="drawer = !drawer" elevation="2" class="ml-3" justify='center' color="gray" style='width: 5%'>
                <v-icon class='mx-2' color=''>mdi-filter-menu-outline</v-icon>
            </v-btn>
            <v-btn v-on:click="createRequest()" elevation="2" class="mx-auto" justify='center' color="gray" style='width: 35%'>
                <v-icon class='mx-2' color=''>mdi-pencil-outline</v-icon>
                Create Request 
            </v-btn>
          </v-layout>

          <v-navigation-drawer v-model="drawer" absolute temporary class="sidebar">
            <v-list nav dense>
              <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                Filter by Tag
                <v-list-item v-for='tag in allTags' v-bind:key='tag'>
                  <v-btn v-if="filterTags.includes(tag)" @click="removeTag(tag)" fab x-small elevation='0' class='ml-0'>
                      <v-icon class='ma-0' color=green>
                          mdi-checkbox-marked-circle
                      </v-icon>
                  </v-btn>
                  <v-btn v-else @click="addTag(tag)" fab x-small elevation='0' color='blue' class='ml-0'>
                      <v-icon class='ma-0' color='primary'>
                          mdi-plus-box
                      </v-icon>
                  </v-btn>
                  {{tag}}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
          <Container v-if="filterTags.length == 0">
            <div v-for="request in requests.slice().reverse()" v-bind:key="request._id">
              <div :id="request._id" v-on:click="highlightTag(request)" style="cursor: pointer;" >
                <Req
                  v-bind:key="request._id"
                  v-bind:request="request"
                  v-bind:signedInUser="signedInUser"
                />
              </div> 
            </div> 
          </Container>
          <Container v-else>
            <div v-for="request in filteredRequests.slice().reverse()" v-bind:key="request._id">
              <div :id="request._id" v-on:click="highlightTag(request)" style="cursor: pointer;" >
                <Req 
                  v-bind:key="request._id"
                  v-bind:request="request"
                  v-bind:signedInUser="signedInUser"
                />
              </div> 
            </div> 
          </Container>
        </v-col>

        <v-col cols="12" md="6">
          <RequestsMap v-bind:requests="requests"/>
        </v-col>
      </v-row>
      
    </v-container>
  </div>
</template>

<script>
import { eventBus } from '../main';

import Req from "../components/Req.vue";
import Container from "../components/Container.vue";
import RequestsMap from "../components/RequestsMap.vue";

export default {
  name: "Main",
  components: {
    Container,
    Req, 
    RequestsMap,
  },
  props: {
    requests: Array,
    signedInUserId: String,
    allTags: Set,
    signedInUser: String,
  },

  data() {
    return {
      drawer: false,
      group: null,
      filterTags: [],
      filteredRequests: this.requests,
    };
  },
  created: function() {
    this.setFilteredRequests();
    eventBus.$on("set-requests-view", (req) => {
      var element = document.getElementById(req._id);
      var top = element.offsetTop;
      window.scrollTo({
        top: top,
        behavior: 'smooth',
      });
    });
      // for (let req in this.requests) {
  // document.getElementsByClassName(req._id)[0]
  // $(req._id).click(function() {
  // window.location = $(this).find("a").attr("href"); 
  // return false;
  //   });
  //   .addEventListener('click', function () {
  //     this.console.log('clicked req')
  //     // evenBus.$emit("map-popup", req._id )
  // });
      // }
  },

  computed: {
    console: () => console,
  },
  methods: {
    setFilteredRequests() {
      this.filteredRequests = [];
      if (this.filterTags.length == 0) {
        this.filteredRequests = this.requests;
      } else {
        this.requests.forEach((req) => {
          let intersection = req.tags.filter(tag => this.filterTags.includes(tag));
          if (intersection.length > 0) {
            this.filteredRequests.push(req);
          }
        })
      }
      const bodyContent = {requests: this.filteredRequests}
      eventBus.$emit('update-map', bodyContent);
    },
    createRequest() {
      document.location.href = "/#/createrequest";
    },
    addTag(tag) {
      this.filterTags.push(tag);
      this.setFilteredRequests();
    },
    removeTag(tag) {
      this.filterTags = this.filterTags.filter(t => t!= tag);
      this.setFilteredRequests();
    },
    highlightTag(req) {
      eventBus.$emit("highlight-tag", req);
    }
  },
};
</script>

<style scoped>

.sidebar{
  display:flex;
  margin: auto;
  justify-content: center;
  align-items: center;
}
</style>

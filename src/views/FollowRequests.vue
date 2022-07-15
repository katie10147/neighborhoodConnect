<template>
  <div>
    <div v-if="!signedInUser">
        <meta http-equiv="Refresh" content="0; url='/#/'" />
    </div>
    <div>
      <v-btn v-on:click="createRequest()" elevation="2" class="mx-auto" justify='center' color="gray" style='width: 35%'>
                <v-icon class='mx-2' color=''>mdi-pencil-outline</v-icon>
                Create Request 
            </v-btn>
      <title>NeighborhoodConnect</title>
      <div class="tagContent">

        <div class="tags">
          <h3> All Tags </h3>
          <FollowingTags v-bind:allTags="allTags" v-bind:signedInUser="signedInUser"/>
        </div>

        <Container>
          <h3>Followed Requests </h3>
          <div v-for="request in followedRequests" v-bind:key="request">
            <div>
              <Req
                v-bind:request="request"
                v-bind:signedInUser="signedInUser"
              />
            </div> 
          </div> 
        </Container>
      </div> 
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import Req from "../components/Req.vue";
import Container from "../components/Container.vue";
import axios from 'axios';
import FollowingTags from '../components/FollowingTags';



export default {
  name: "Main",
  components: {
    Req,
    Container,
    FollowingTags,
  },
  props: {
    requests: Array,
    allTags: Set,
    signedInUser: String,
  },

  data() {
    return {
        followedRequests: [],
        onClick: this.followTag, 
        successMessage: null,
    };
  },
  computed: {
    console: () => console,
  },
  created() {
    this.getFollowed();

    eventBus.$on('refresh-following-requests', () => {
      this.console.log("updating");
      this.getFollowed();
    });
  },
  methods: {
    createRequest() {
      document.location.href = "/#/createrequest";
    },
    getFollowed() {
        axios.get(`users/${this.signedInUser}/followedRequests`)
        .then((response) => {
          this.followedRequests = response.data;
        })
        .catch((err) => {
          eventBus.$emit('alert', {type: 'error', message: err.response.data.error});
        });
    },
  },
};
</script>

<style scoped>
main {
  color: #647c90;
}
button {
  display: flex;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  width: 100%;
  background-color: #707070;
  text-align: center;
}


.tagContent {
  display: flex;
  flex-direction: row;
}

.tags{
  border: 1px solid;
  margin: 10px;
}
</style>

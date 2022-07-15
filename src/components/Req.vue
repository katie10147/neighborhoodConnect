<template>
    <v-card elevation="8" class="mx-auto my-2 pa-4 rounded-lg requestCard">

        <v-card class='top' elevation="0">
            <v-card-title class='px-0 mr-auto'>
                {{req.title}}
            </v-card-title>
            <EditReq v-if="signedInUser == req.author" @click.native="toggleEditMode" class='mr-1'/>
            <DeleteReq v-if="signedInUser == req.author" @click.native="deleteRequest"/>
        </v-card>

        <v-card-subtitle v-if="req.author != ''" class='px-0 py-1'>
            @{{req.author}}
        </v-card-subtitle>

        <div v-if='!editMode' class='pt-0 font-weight-medium'>
            {{req.content}}
        </div>

        <v-text-field v-if='editMode' :value="newContent" v-model="newContent">
            <v-btn @click="editRequest" class="mb-2" slot='append' type="submit">
                SUBMIT
            </v-btn>
        </v-text-field>

        <v-card-subtitle v-if='req.latitude' class='px-0 py-0'>
            at {{req.latitude}}, {{req.longitude}}
        </v-card-subtitle>

        <v-card-subtitle class=''>
            <v-row class='px-0'>
                <v-card v-for='tag in req.tags' v-bind:key="tag" class='mr-2 px-1 tag' color='grey lighten-2'>
                    {{tag}}
                </v-card>
            </v-row>
        </v-card-subtitle >

        <v-card-actions>
            <v-row >
                <VoteButton @click.native="upvote" v-bind:num="req.likedBy.length" v-bind:up='true' :color="upvoted ? 'primary' : ''"/>
                <VoteButton @click.native="downvote" v-bind:num="req.dislikedBy.length" v-bind:up='false' v-bind:color="downvoted ? 'primary' : ''"/>

                <Resolved @click.native="toggleResolve" v-bind:status="req.status"/>
                <Unresolved @click.native="toggleResolve" v-bind:status="req.status"/>
            </v-row>
        </v-card-actions>
        <CommentSection 
            v-if='req.comments.length || signedInUser'
            v-bind:request="req"
            v-bind:signedInUser="signedInUser"/>
    </v-card>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import VoteButton from './VoteButton.vue';
import Resolved from './Resolved.vue';
import Unresolved from './Unresolved.vue';
import EditReq from './EditReq.vue';
import DeleteReq from './DeleteReq.vue';
import CommentSection from "./CommentSection.vue";

export default {
  name: "Req",
  components: {
    CommentSection,
    VoteButton,
    Resolved,
    Unresolved,
    EditReq,
    DeleteReq
  },
  props: {
    request: Object,
    signedInUser: String,
  },
  data() {
    return {
      req: this.request,
      newContent: this.request.content,
      editMode: false,
      }
  },
  computed:  {
    console: () => console,
    upvoted: function () {
        return this.req.likedBy
        .filter(u => u === this.signedInUser).length > 0;
    },
    downvoted: function () {
        return this.req.dislikedBy
        .filter(u => u === this.signedInUser)
        .length > 0;
    },
  },
  methods: {
    refreshRequest() {
        axios.get(`requests/${this.req._id}`)
            .then((response) => {
                this.req = response.data;
            }).catch(err => {
            eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        });
    },
    toggleEditMode() {
        this.editMode = !this.editMode;
        this.newContent = this.req.content;
    },
    editRequest() {
      const bodyContent = { id: this.req._id, content: this.newContent }
      axios.patch('requests/edit', bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
        })
        .catch(err => {
            eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        })
        .then(() => {
            this.toggleEditMode();
            this.refreshRequest();
        });
    },
    deleteRequest() {
      axios
        .delete(`requests/${this.req._id}`)
        .then(() => {
          eventBus.$emit("refresh-requests");
        }).catch(err => {
            eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        });
    },
    upvote() {
        const bodyContent = { username: this.signedInUser };
        axios
        .patch(`requests/like/${this.req._id}`, { data: bodyContent })
        .then(() => {
          this.refreshRequest();
        })
        .catch(err => {
            eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        });
    },
    downvote() {
        const bodyContent = { username: this.signedInUser };
        axios
            .patch(`requests/dislike/${this.req._id}`, { data: bodyContent })
            .then(() => {
                this.refreshRequest();
            }).catch(err => {
                eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
            });
    },
    toggleResolve() {
        const bodyContent = { username: this.signedInUser };
        axios
            .patch(`requests/resolve/${this.req._id}`, { data: bodyContent })
            .then(() => {
                this.refreshRequest()
            }).catch(err => {
                eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
            });
    },
  },
};
</script>

<style scoped>
.requestCard {
    width: 90%
}

.voteCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.top {
    display: flex;
    flex-direction: row;
    align-items: center;
}

</style>

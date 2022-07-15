<template>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header color='primary lighten-2'>
          Comments
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-list>
            <template v-for="(comment, index) in comments">
              <v-list-item class='my-0 py-0' :key="comment.title">
                <Comment v-bind:reqId="request._id" v-bind:comment="comment" v-bind:signedInUser="signedInUser"/>
              </v-list-item>
              <v-divider :key="index" class='py-0'></v-divider>
            </template>
          </v-list>

          <v-text-field v-if='signedInUser' v-model="newComment" class='' label="Add Comment" required filled outlined>
            <v-btn @click="addComment" class="mb-2" slot='append' type="submit">
              POST
            </v-btn>
          </v-text-field>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>

import axios from 'axios';
import { eventBus } from "../main";
import Comment from './Comment.vue'

export default {
  name: "CommentSection",
  components: {
    Comment
  },
  props: {
      request: Object,
      signedInUser: String,
  },
  data() {
        return {
            comments: [],
            newComment: '',
        }
    },
  created: function() {
      this.refreshComments();
      eventBus.$on("refresh-comments", () => {
        this.refreshComments();
      });
  },
  computed: {
    console: () => console,
  },
  mounted: function() {},
  methods: {
      addComment() {
          const bodyContent = {author: this.signedInUser, content: this.newComment, reqId: this.request._id};
          axios.post("requests/comment", bodyContent)
            .then(() => {
                this.newComment = '';
                this.refreshComments();
            })
            .catch((err) => {
              eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
            });

      },
      refreshComments() {
        axios.get("requests/comments/" + this.request._id)
        .then((response) => {
          this.comments = response.data;
        })
        .catch((err) => {
          eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        });
      }
  },
};
</script>

<style scoped>
</style>

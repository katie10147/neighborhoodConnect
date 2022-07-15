<template>
    <v-container>
    <v-list>
        <div v-for="tag in allTags" v-bind:key="tag">
            <v-list-item>
            <v-icon @click.prevent="unfollow(tag)" v-if="followedTags.includes(tag)" color='green'>mdi-checkbox-marked-circle</v-icon>
            <v-icon v-else @click.prevent="followTag(tag)" color='blue'>mdi-plus-box </v-icon>
            {{tag}}</v-list-item>
        </div>
    </v-list>
    </v-container>
</template>

<script>

import axios from "axios";
import { eventBus } from '../main';

export default {
    name: "Tags",
    props: {
        allTags: Set,
        signedInUser: String,
    },
    data() {
        return {
            followedTags: [],
        }
    },
    computed: {
        console: () => console,
    },
    mounted() {
        this.getFollowed();
        this.console.log(this.allTags);
    },     
    methods: {
        getFollowed() {
            axios.get(`users/username/${this.signedInUser}`)
                .then((response) => {
                this.console.log(response)
                this.followedTags = response.data.tags;
                this.console.log(this.followedTags);
                });
        },
        followTag(tag) {
            axios.patch(`users/followTag/${tag}`)
                .then((response) => {
                    this.console.log(response.data);
                    this.successMessage = response.data.message;
                    this.followedTags = response.data.user.tags;
                    eventBus.$emit('refresh-following-requests');
                }).catch((err) => {
                    this.console.log(err);
                });
        },
        unfollow(tag) {
            axios.patch(`users/unfollowTag/${tag}`)
                .then((response) => {
                    this.followedTags = response.data.user.tags;
                    eventBus.$emit('refresh-following-requests');
                });
        },
    }
}
</script>

<style scoped>

v-container{
    float: left;
    /* padding: 0px; */
    /* margin: 70px; */
    justify-content: flex-start
}
</style>
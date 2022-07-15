<template>
<v-row class='commentRow my-0'>
    <span class='mx-1 font-weight-black'>
    {{comment.author}}
    </span>
    <span 
        v-if='!editMode'
        class='font-weight-light mx-1 mr-auto'>
    {{comment.content}}
    </span>
    <v-text-field v-if='signedInUser == comment.author && editMode' :value="newContent" v-model="newContent">
        <v-btn class="mb-2 mr-1" slot='append' type="submit"
            @click='editComment'>
            SUBMIT
        </v-btn>
    </v-text-field>
    <v-btn v-if="signedInUser == comment.author"
        @click="toggleEditMode"
        fab x-small elevation='0' class='mr-1'>
        <v-icon class='ma-0'>
            mdi-file-edit
        </v-icon>
    </v-btn>
    <v-btn v-if="signedInUser == comment.author"
        @click="deleteComment"
        fab x-small elevation='0' class=''>
        <v-icon class='ma-0'>
            mdi-trash-can-outline
        </v-icon>
    </v-btn>
</v-row>
</template>

<script>

import axios from 'axios';
import { eventBus } from "../main";

export default {
    name: "Comment",
    props: {
        comment: Object,
        reqId: String,
        signedInUser: String,
    },
    data() {
        return {
            editMode: false,
            newContent: this.comment.content,
        }
    },
    computed: {
        console: () => console,
    },
    created: function() {
    },
    methods: {
        toggleEditMode() {
            this.editMode = !this.editMode;
            this.newContent = this.comment.content;
        },
        editComment() {
            const bodyContent = { reqId: this.reqId, commentId: this.comment._id, content: this.newContent }
            axios.patch('requests/comment/', bodyContent)
                .then(() => {
                })
                .catch(err => {
                    eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
                })
                .then(() => {
                    this.toggleEditMode();
                    eventBus.$emit('refresh-comments');
                });
        },
        deleteComment() {
            axios.delete(`requests/comment/${this.reqId}/${this.comment._id}`)
                .then(() => {
                })
                .catch(err => {
                    eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
                })
                .then(() => {
                    eventBus.$emit('refresh-comments');
                });
        }
    }
}
</script>

<style>
</style>
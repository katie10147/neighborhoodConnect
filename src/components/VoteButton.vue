<template>
    <v-card elevation="0" class='voteCard'>
        <v-btn class="ma-2 mb-0" text icon :color="color">
            <v-icon v-if="up">mdi-arrow-up-thick</v-icon>
            <v-icon v-else>mdi-arrow-down-thick</v-icon>
        </v-btn>
        <v-card-text class='pt-0'>
            {{num}}
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    name: "VoteButton",
    props: {
        num: Number,
        up: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
            default: ''
        }
    },
}
</script>

<style>
</style>
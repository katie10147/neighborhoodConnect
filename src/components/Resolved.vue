<template>
    <v-btn class="ma-2" :color="status == 'resolved' ? 'primary' : ''">
        Resolved
        <v-icon v-if="status == 'resolved'" color='green'>mdi-checkbox-marked-circle</v-icon>
    </v-btn>
</template>

<script>

export default {
    name: "Resolved",
    props: {
        num: Number,
        status: {
            type: String,
            default: '',
        },
    },
}
</script>

<style>
</style>
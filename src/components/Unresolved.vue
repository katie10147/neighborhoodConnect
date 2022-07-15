<template>
    <v-btn class="ma-2" :color="status == 'unresolved' ? 'primary' : ''">
        Unresolved
        <v-icon v-if="status == 'unresolved'" color='red'>mdi-cancel</v-icon>
    </v-btn>
</template>

<script>

export default {
    name: "Unresolved",
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
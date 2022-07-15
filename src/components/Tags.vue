<template>
    <ul>
        <div v-for="tag in request.tags" v-bind:key="tag">
            <li>{{tag}}</li>
        </div>
    </ul>
</template>

<script>

export default {
    name: "Tags",
    props: {
        request: Object,
    },
}
</script>

<style>

ul {
    list-style-type: none;
    display: flex;
}

li {
    float: none;
    text-align:center;
    margin: 5px;
    padding: 5px;
}
</style>
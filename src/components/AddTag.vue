<template>
    <div>
        <v-list class= "tags">
            <div  v-for="tag in allTags" v-bind:key="tag">
                <v-list-item class="tag rounded-lg my-0 py-0"><input type="checkbox" v-bind:value="tag" name="tags" />{{tag}}</v-list-item>
            </div>
            <v-list-item v-if="signedInUser" class="tag rounded-lg"><input type="checkbox" name="newTag"/> <input type="text" id="newTagValue"/> </v-list-item>
        </v-list>
    </div>
</template>

<script>


export default {
    name: "AddTag",
    props: {
        request: String,
        allTags: Set,
        signedInUser: String,
    },
    computed: {
        console: () => console,
    },
}
</script>

<style scoped>

input[type=text]{
    border: 1px solid;
}

input[type=checkbox] {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  word-wrap: break-word;
  margin: 5px;
}

.tags {
    display: flex;
    justify-content: center;
    vertical-align: center;
    border: solid 1px;
    flex-direction: column;
    color: white;
}

.tag{
    padding: 5px 10px;
    margin: 5px;
    /* width: 90%; */


}



</style>
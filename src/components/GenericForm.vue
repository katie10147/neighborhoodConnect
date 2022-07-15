<template>
<div class="main">
  <div class="container">
    <form class="form" v-on:submit.prevent="onClick($event)">
      <h2>{{title}}</h2>
      <div v-for="input in inputs" :key="input">
          <input class="content"
          :id="[[ input ]]"
          type='text' 
          :name="[[ input ]]" 
          :placeholder="[[ input ]]"/>
          </div>
        <input class="button"
        type="submit"
        :value="[[ title ]]"
      />
      <div v-if='errors.length' class="error-message" style="width: 250px;">
        <b>Please correct the following error(s):</b>
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
      </div>
      <div v-if='successMessage'>
        {{successMessage}}
      </div>

    </form>


  </div>
      <div>
  </div>
      </div>

</template>

<script>

export default {
  name: "GenericForm",
  props: {
    title: String,
    inputs: Array,
    onClick: Function,
    errors: Array,
    successMessage: String 
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

.content {
  display: flex;
  justify-content: center;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  /* height: 40%px; */
  width: 100%px;
  text-align: center;
}

.button {
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

.container {
  display: flex;
  justify-content: center;  
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  width: 100%;
  text-align: center;
}

main {
  color: #647C90;
  /* height:100% */
}

form {
  width: 100%;
}
input {
    width: 100%;
}

</style>


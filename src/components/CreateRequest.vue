<template>
  <div class="container">
    <v-form class="form" v-on:submit.prevent="onClick($event)">
      <h2>{{title}}</h2>
      <div v-for="input in inputs" :key="input">
          <input class="content"
          :id="[[ input ]]"
          type='text' 
          :name="[[ input ]]" 
          :placeholder="[[ input ]]"/>
      </div>
      <div class="reqInput">
        <div class="addTags">
          <h3>Tags</h3> 
          <AddTag v-bind:allTags="allTags" v-bind:signedInUser="signedInUser" />
        </div>

        <div class="location">
        <h3>Location</h3>
        <Map v-bind:center="location" />   
        </div>
        </div>

      <v-btn type="submit" elevation="2" class="mx-auto button" justify='center' color="gray" style='width: 50%'>
                Create Request 
            </v-btn>

      <div v-if='errors.length' class="error-message" style="width: 250px;">
        <b>Please correct the following error(s):</b>
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
      </div>
      <div v-if='successMessage'>
        {{successMessage}}
      </div>

    </v-form>

  </div>
</template>

<script>

import axios from "axios";
import { eventBus } from '../main';
import AddTag from './AddTag';
import $ from 'jQuery';
import Map from './Map.vue';


export default {
  name: "CreateRequest",
  props: {
    allTags: Set,
    signedInUser: String,
  },
  components: {
      AddTag,
      Map
  },
  data() {
    return {
      title: 'Create Request',
      inputs: [
          "subject", 
          "content", 
      ],
      onClick: this.createRequest, 
      errors: [],
      successMessage: null,
      location: null,
    }
  },
  created: function() {
    eventBus.$on("include-location", (location) => {
      this.location = location;

    });
  },
  computed: {
    console: () => console,
  },
  methods: {
    createRequest(event) {
      const tags = [];
      $('input[name="tags"]:checked').each(function() {
        tags.push(this.value);
      });
      const tagVal = $('#newTagValue').val();
      $('input[name="newTag"]:checked').each(function() {
        tags.push(tagVal);
        var tagContent = {name: tagVal};
        axios.post('tags/create', tagContent)
          .then((response) => {
              this.successMessage = response.data.message;
              eventBus.$emit('tags-update');

          })
          .catch(err => {
              eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
          })
          .then(() => {
              //this.resetForm(event);
              this.clearMessages();
              //eventBus.$emit('refresh-requests');
          });
      })
      const bodyContent = { 
          username: this.signedInUser, 
          subject: event.target.elements.subject.value, 
          content: event.target.elements.content.value,
          tags: tags,
        }
      if (this.location) {
        bodyContent.location = [
            this.location[0], 
            this.location[1]
        ]
      }
      this.console.log(bodyContent);
      axios.post('requests', bodyContent)
        .then((response) => {
            this.successMessage = response.data.message;
            
        })
        .catch(err => {
            eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
        })
        .then(() => {
            this.resetForm(event);
            this.clearMessages();
            eventBus.$emit('refresh-requests');
            document.location.href = '/#/feed';
        });
    },
    resetForm: function(event) {
      event.target.elements.subject.value = '';
      event.target.elements.content.value = '';
      $('input[name="tags"]:checked').removeAttr('checked');
      $('#newTagValue').val('');
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
};
</script>

<style scoped>

.content {
  display: flex;
  border: 1px solid;
  padding: 5px;
  margin: 15px;
  justify-content: center;
  width: 90%;
}

.button {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
}

.container{
  display: flex;
  border: 1px solid #707070;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  justify-content: center;
  width: 100%;
  flex-direction: row;
}

.addTags {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
  /* margin: 40px; */
}

.reqInput {
  display: flex;
  flex-direction: row;
}

</style>
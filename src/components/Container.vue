<template>
  <div class='containerComponent'>
      <slot>
      </slot>
  </div>
</template>

<script>

export default {
  name: "Container",
  components: {  },
  props: {
    title: String
  },
  data() {
    return {
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.containerComponent { 
  margin: 20px auto; 
  padding: 20px;
  border-radius: 5%;
  width: 100%;
}
</style>
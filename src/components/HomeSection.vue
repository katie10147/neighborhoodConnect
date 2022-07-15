<template>
  <section>
    <v-img dark style='height: 95vh' src="@/assets/img/city_background.jpg">
    <v-container fill-height fluid>
      <v-row justify="center">
        <v-col cols="12" sm="7">
          <v-card elevation='0' style='background: none;'>
            <v-card-title class='text-h2 justify-center black--text' >
              Neighborhood Connect
            </v-card-title>
            <v-card-text class='centerBlurb black--text'>
              Improve your community by submiting service requests to be viewed by all community members and city officials
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn class="mt-5 mb-9 black--text" rounded outlined large @click="$vuetify.goTo('#features')" >
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
      <div class="svg-border-waves text-white">
        <v-img src="@/assets/img/borderWaves.svg" />
      </div>
    </v-img>
    <v-container fluid id="features" class="mt-0">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
            <v-col
              cols="12"
              sm="4"
              class="text-center"
              v-for="(feature, i) in features"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="card ma-4 pa-4"
                  shaped
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                >
                  <v-img
                    :src="feature.img"
                    max-width="100px"
                    class="d-block ml-auto mr-auto"
                    :class="{ 'zoom-efect': hover }"
                  ></v-img>
                  <h1 class="font-weight-regular">{{ feature.title }}</h1>
                  <h4 class="font-weight-regular subtitle-2">
                    {{ feature.text }}
                  </h4>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div class="svg-border-waves">
      <img src="~@/assets/img/wave2.svg" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      features: [
        {
          img: require("@/assets/img/discussion.png"),
          title: "Open Discussion",
          text: "We allow users to submit requests with comment sections to invoke an open community. ",
        },
        {
          img: require("@/assets/img/tag_filter.png"),
          title: "Tag Filtering",
          text: "We allow users to follow specific requests using our proprietary tagging feature.",
        },
        {
          img: require("@/assets/img/map.png"),
          title: "Geo Filtering",
          text: "We allow users to view all requests that are tagged with a location in an easy to read map.",
        },
      ],
    };
  },
  watch: {
  },
  methods: {
  },
};
</script>


<style scoped>
.centerBlurb {
  text-align: center;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

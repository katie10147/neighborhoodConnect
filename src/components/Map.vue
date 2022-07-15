<template>
  <div class="main">
    <div class="flex">
      <div class="map-holder">
        <v-btn-toggle tile color="deep-purple accent-3" group>
          <v-btn value="left" @click="addLocation"> Include Location </v-btn>

          <v-btn value="center" @click="removeMarker"> No Location </v-btn>
        </v-btn-toggle>

        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

import { eventBus } from "../main";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
export default {
  name: "Map",
  data() {
    return {
      access_token:
        "pk.eyJ1Ijoia2F0aWUxMDE0NyIsImEiOiJja3dtdTRxajAwM3cyMm9vNnIxeDJnamY0In0.yUzEvi7yr1TIJoXifNnMQw",
      map: {},
      center: [-71.09204127759315, 42.35971488140217],
      marker: null,
    };
  },
  mounted() {
    this.createMap();
  },
  computed: {
    console: () => console,
  },
  methods: {
    async createMap() {
      try {
        mapboxgl.accessToken =
          "pk.eyJ1Ijoia2F0aWUxMDE0NyIsImEiOiJja3dtdTRxajAwM3cyMm9vNnIxeDJnamY0In0.yUzEvi7yr1TIJoXifNnMQw";
        this.map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: this.center,
          zoom: 11,
        });
        let geocoder = new MapboxGeocoder({
          accessToken: this.access_token,
          mapboxgl: mapboxgl,
          marker: false,
        });
        this.map.addControl(geocoder);
        geocoder.on("result", (e) => {
          this.addMarker(e.result.center);
        });
      } catch (err) {
        eventBus.$emit('alert', {type: 'error', message: err.response.data.error});
      }
    },
    async addLocation() {
      this.addMarker(this.center);
    },
    addMarker(location) {
      try {
        this.removeMarker();
        const marker = new mapboxgl.Marker({
          draggable: true,
          color: "#D80739",
        })
          .setLngLat(location)
          .addTo(this.map);
        this.center = location;
        this.marker = marker;
        eventBus.$emit("include-location", this.center);
        marker.on("dragend", (e) => {
          this.center = Object.values(e.target.getLngLat());
          eventBus.$emit("include-location", this.center);
        });
      } catch (err) {
        eventBus.$emit('alert', {type: 'error', message: err.response.data.error})
      }
    },
    removeMarker() {
      if (this.marker) {
        this.marker.remove();
      }
    },
  },
};
</script>
x
<style scoped>
.main {
  padding: 45px;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* .map-holder {
  width: 80%;
} */
#map {
  height: 70vh;
}
.dislpay-arena {
  display: flex;
  background: #ffffff;
  /* box-shadow: 0px -3px 10px rgba(0, 58, 78, 0.1); */
  border-radius: 5px;
  padding: 20px 30px;
  /* width: 25%; */
  border: solid rgba(0, 58, 78, 0.1);
  flex-direction: column;
  justify-content: center;
}
.coordinates-header {
  display: flex;
  margin-bottom: 5px;
  justify-content: center;
  flex-direction: column;
}
.coordinates-header h3 {
  color: #1f2a53;
  font-weight: 600;
}
.coordinates-header p {
  color: rgba(13, 16, 27, 0.75);
  font-weight: 600;
  font-size: 0.875rem;
}
.form-group {
  position: relative;
  display: flex;
  flex-direction: row;
}
.location-control {
  height: 30px;
  background: #ffffff;
  border: 1px solid rgba(31, 42, 83, 0.25);
  box-shadow: 0px 0px 10px rgba(73, 165, 198, 0.1);
  border-radius: 4px;
  /* padding: 0px 10px; */
  width: 90%;
}
.location-control:focus {
  outline: none;
}
.location-btn {
  margin: 15px;
  padding: 10px 15px;
  background: #d80739;
  box-shadow: 0px 4px 10px rgba(73, 165, 198, 0.1);
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
}
.location-btn:focus {
  outline: none;
}
.disabled {
  background: #db7990;
  cursor: not-allowed;
}
.copy-btn {
  background: #f4f6f8 0% 0% no-repeat padding-box;
  border: 1px solid #f4f6f8;
  border-radius: 0px 3px 3px 0px;
  /* position: absolute; */
  color: #5171ef;
  font-size: 0.875rem;
  font-weight: 500;
  height: 30px;
  padding: 0px 10px;
  cursor: pointer;
  right: 3.5%;
  top: 5%;
}
.copy-btn:focus {
  outline: none;
}
</style>

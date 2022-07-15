<template>
  <div class="main">
    <div class="flex">
      <div class="map-holder">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { eventBus } from '../main';

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
export default {
  name: "RequestsMap",
  props: {
    requests: Array,
  },
  data() {
    return {
      loading: false,
      location: "",
      access_token:
        "pk.eyJ1Ijoia2F0aWUxMDE0NyIsImEiOiJja3dtdTRxajAwM3cyMm9vNnIxeDJnamY0In0.yUzEvi7yr1TIJoXifNnMQw",
      center: [-71.09204127759315, 42.35971488140217],
      map: {},
      updatedRequests: [], 
      currentMarkers: {},
      currentPopups: {}
    };
  },
  created: function() {
    eventBus.$on("update-map", (data) => {
      this.updatedRequests = data.requests
      this.clearMarkers();
      this.addMarkers(this.updatedRequests);
    });
    eventBus.$on("highlight-tag", (req) => {
      for (var i in this.currentPopups) {
        this.currentPopups[i].remove()
      }
      this.currentPopups[req._id].addTo(this.map);
    });
  },
  mounted() {
    this.createMap();
    this.addMarkers(this.requests);
  },
  computed: {
    console: () => console,
  },
  methods: {
    async createMap() {
      try {
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          this.center = [lat, long];
        });

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
          const marker = new mapboxgl.Marker({
            draggable: true,
            color: "#D80739",
          })
            .setLngLat(e.result.center)
            .addTo(this.map);

          this.center = e.result.center;
          marker.on("dragend", (e) => {
            this.center = Object.values(e.target.getLngLat());
          });
        });
      } catch (err) {
        eventBus.$emit('alert', {type: 'error', message: err.response.data.error});
      }
    },
    async getLocation() {
      try {
        this.loading = true;
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
        );
        this.loading = false;
        this.location = response.data.features[0].place_name;
      } catch (err) {
        this.loading = false;
        eventBus.$emit('alert', {type: 'error', message: err.response.data.error});
      }
    },
    copyLocation() {
      if (this.location) {
        navigator.clipboard.writeText(this.location);
        alert("Location Copied");
      }
      return;
    },

    addMarkers(requests) {
      Array.prototype.forEach.call(requests, (req) => {
          // create a simple popup.
          if (req.latitude) {
            if (req.longitude) {
              var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                req.title + ": " + req.content
            );
            this.currentPopups[req._id] = popup;

              let lngLat = [req.latitude, req.longitude];
              var pinColor;
              if(req.status === 'resolved'){
                pinColor = "#008000";
              }else {
                pinColor = "#D80739";
              }
              let marker = new mapboxgl.Marker({
                draggable: false,
                color: pinColor,
              })

                .setLngLat(lngLat)
                .setPopup(popup) // sets a popup on this marker
                // .on("open", function () {
                // })
                .addTo(this.map);
                this.currentMarkers[req._id] = marker;


            marker.getElement().addEventListener("click", () => {
              eventBus.$emit("set-requests-view", req);
            });
            }
          }
        });

    },

    clearMarkers() {
      if (this.currentMarkers!==null) {
        for (let i in this.currentMarkers) {
          this.currentMarkers[i].remove();
        }
    //     for (var i = this.currentMarkers.length - 1; i >= 0; i--) {
    //     this.currentMarkers[i].remove();
    // }
}
    }
  },
};
</script>

<style scoped>
.main {
  /* padding: 45px 50px; */
  position: fixed;
  width: 48%;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.map-holder {
  width: 100%;
}
#map {
  height: 90vh;
  margin-top: 10px;
}
.dislpay-arena {
  background: #ffffff;
  box-shadow: 0px -3px 10px rgba(0, 58, 78, 0.1);
  border-radius: 5px;
  padding: 20px 30px;
  width: 25%;
}
.coordinates-header {
  margin-bottom: 50px;
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
}
.location-control {
  height: 30px;
  background: #ffffff;
  border: 1px solid rgba(31, 42, 83, 0.25);
  box-shadow: 0px 0px 10px rgba(73, 165, 198, 0.1);
  border-radius: 4px;
  padding: 0px 10px;
  width: 90%;
}
.location-control:focus {
  outline: none;
}
.location-btn {
  margin-top: 15px;
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
  position: absolute;
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

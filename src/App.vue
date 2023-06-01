<script>
import GeoLocation from "./components/GeoLocation.vue";
import GeoCodingSearch from "./components/GeoCodingSearch.vue";
import GeoLocationTimezone from "./components/GeoLocationTimezone.vue";
import LocationTable from "./components/LocationTable.vue";
import Footer from "./components/common/Footer.vue";

const saveDataToLocalStorage = (markers, savedLocations) => {
  localStorage.setItem("markers", JSON.stringify(markers));
  localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
};

export default {
  name: "App",
  data() {
    return {
      // default map center to Toronto
      center: { lat: 43.653226, lng: -79.3831843 }, 
      markers: [],
      savedLocations: [],
      noresult: false,
      currentLocationId: "",
    };
  },
  components: {
    GeoLocation,
    GeoCodingSearch,
    GeoLocationTimezone,
    LocationTable,
    Footer,
  },
  computed: {
    latitude() {
      return this.center.lat;
    },
    longitude() {
      return this.center.lng;
    },
  },
  methods: {
    // update location info after performing search
    updateLocation(location) {
      this.center.lat = location.latitude;
      this.center.lng = location.longitude;

      const newMarker = {
        id: Date.now().toString(),
        position: {
          lat: location.latitude,
          lng: location.longitude,
        },
      };
      //push to markers array
      this.markers.push(newMarker);
      //push the newMarker ID into the location object
      location.markerID = newMarker.id;

      // when search has no result, it passes true. Otherwise, it pass false
      this.noresult = false;
      location.noresult = this.noresult;

      this.savedLocations.push(location);
      // save data to localStorage
      saveDataToLocalStorage(this.markers, this.savedLocations);
    },
    //update current location latitude and longitude when clicking on "Get Current Location"
    updateCurrentLocation(location) {
      this.currentLocationId = location.currentLocationId
      this.center.lat = location.latitude;
      this.center.lng = location.longitude;
    },
    handleDeleteRecords(records) {
      for (const record of records) {
        const index = this.savedLocations.indexOf(record);
        if (index != -1) {
          this.savedLocations.splice(index, 1);
          const markerId = record.markerID;
          const markerIndex = this.markers.findIndex(
            (marker) => marker.id === markerId
          );
          if (markerIndex !== -1) {
            this.markers.splice(markerIndex, 1);
          }
        }
      }
      // Save data to localStorage
      saveDataToLocalStorage(this.markers, this.savedLocations);
    },
    noSearchResult(result) {
      this.noresult = result;
    },
  },
  created() {
    // Retrieve data from localStorage when the component is created
    const storedMarkers = localStorage.getItem("markers");
    const storedLocations = localStorage.getItem("savedLocations");

    if (storedMarkers) {
      this.markers = JSON.parse(storedMarkers);
    }
    if (storedLocations) {
      this.savedLocations = JSON.parse(storedLocations);
    }
  },
};
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <GeoLocation @location-updated="updateCurrentLocation" />
      <div class="flex w-[85%] max-h-32 items-center justify-center gap-x-5 mb-5 sm:flex-col">
        <GeoCodingSearch
          @location-selected="updateLocation"
          @no-result="noSearchResult"
          :currentLocationId="currentLocationId"
          :latitude="center.lat"
          :longitude="center.lng"
        />
        <GeoLocationTimezone
          :latitude="center.lat"
          :longitude="center.lng"
          :noresult="noresult"
        />
      </div>
      <GMapMap
        :key="center.lat"
        :center="center"
        :zoom="12"
        map-type-id="terrain"
        style="width: 100vw; height: 800px"
      >
        <GMapMarker
          :key="marker.id"
          v-for="marker in markers"
          :position="marker.position"
        />
      </GMapMap>
      <LocationTable
        :locations="savedLocations"
        @delete-records="handleDeleteRecords"
      />
    </div>
    <Footer />
  </div>
</template>
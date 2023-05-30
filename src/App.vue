<script>
import GetGeoLocation from "./components/GetGeoLocation.vue";
import GetGeoCodingSearch from "./components/GetGeoCodingSearch.vue";
import GetLocationTimezone from "./components/GetLocationTimezone.vue";
import LocationTable from "./components/LocationTable.vue";

const saveDataToLocalStorage = (markers, savedLocations) => {
  localStorage.setItem("markers", JSON.stringify(markers));
  localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
};

export default {
  name: "App",
  data() {
    return {
      center: { lat: 49.2827291, lng: -123.1207375 },
      markers: [],
      savedLocations: [],
    };
  },
  components: {
    GetGeoLocation,
    GetGeoCodingSearch,
    LocationTable,
    GetLocationTimezone,
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

      //save locations to display in the table
      this.savedLocations.push(location);

      // Save data to localStorage
      saveDataToLocalStorage(this.markers, this.savedLocations);
    },
    handleDeleteRecords(records) {
      for (const record of records) {
        const index = this.savedLocations.indexOf(record);
        if (index != -1) {
          this.savedLocations.splice(index, 1);
          const markerId = record.markerID;
          const markerIndex = this.markers.findIndex((marker) => marker.id === markerId);
          if (markerIndex !== -1 ) {
            this.markers.splice(markerIndex, 1);
          }
        }
      }
      // Save data to localStorage
      saveDataToLocalStorage(this.markers, this.savedLocations);
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
  <div class="flex flex-col items-center justify-center">
    <GetGeoLocation @location-updated="updateLocation" />
    <div class="flex w-[85%] h-48 items-center justify-center gap-x-5 mb-5">
      <GetGeoCodingSearch @location-selected="updateLocation" />
      <GetLocationTimezone :latitude="center.lat" :longitude="center.lng" />
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
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

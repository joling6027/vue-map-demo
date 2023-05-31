<template>
  <div class="my-5 flex flex-col items-center justify-center">
    <button
      @click="getLocation"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex"
    >
      Get Current Location <IconLocation/>
    </button>
    <!-- <div class="flex items-center justify-center gap-x-3 mt-5">
      <p v-if="errorMessage && !location" class="text-red-500 mt-2">{{ errorMessage }}</p>
      <p v-if="location" class="font-bold">Latitude: {{ location.latitude }}</p>
      <p v-if="location" class="font-bold">
        Longitude: {{ location.longitude }}
      </p>
    </div> -->
  </div>
</template>

<script>
import IconLocation from "./common/icons/IconLocation.vue";
export default {
  components: {
    IconLocation,
  },
  data() {
    return {
      location: null,
      errorMessage: "",
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.handleSuccess,
          this.handleError,
        );
      } else {
        this.errorMessage = "Geolocation is not supported by your browser.";
      }
    },
    handleSuccess(position) {
      console.log(position);
      this.location = {
        currentLocationId: Date.now().toString(),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.$emit("location-updated", this.location);
      // console.log("this.location"+ JSON.stringify(this.location))
    },
    handleError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.errorMessage = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          this.errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.errorMessage = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          this.errorMessage = "An unknown error occurred.";
          break;
      }
      this.isFetchingLocation = false;
    },
  },
};
</script>

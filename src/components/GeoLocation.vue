<template>
  <div class="my-5 flex flex-col items-center justify-center">
    <button
      @click="getLocation"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex"
    >
      Get Current Location <IconLocation/>
    </button>
      <p v-if="errorMessage && !location" class="text-red-500 mt-2">{{ errorMessage }}</p>
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
      this.location = {
        currentLocationId: Date.now().toString(),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.$emit("location-updated", this.location);
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

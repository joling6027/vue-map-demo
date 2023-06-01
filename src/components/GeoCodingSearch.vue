<template>
  <div class="flex justify-center items-center max-h-32 sm:flex-col sm:mb-5 sm:mt-24 box-border">
    <div class="mr-8 flex max-h-11">
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="searchLocation"
        placeholder="Enter a location"
        class="bg-gray-200 hover:bg-white border p-2 rounded-s-lg"
      />
      <button
        class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 p-2 rounded-r-lg"
        @click="searchLocation"
      >
        <IconSearch />
      </button>
    </div>
    <div v-if="searchResults.length" class="flex gap-x-5 border-r-2 pr-3 overflow-y-auto xl:max-h-32 sm:max-h-24 sm:mt-4 sm:border-transparent sm:pr-0 sm:border-r-0 sm:h-24">
      <div class="border-r-2 pr-3 basis-2/4 sm:w-1/2">
        <h3 class="font-bold">LAST SEARCH</h3>
        <p v-for="result in searchResults" :key="result.place_id">
          {{ result.formatted_address }}
        </p>
      </div>
      <div class="basis-2/4 sm:w-1/2">
        <h3 class="font-bold">COORDINATES</h3>
        <p class="overflow-x-auto" v-for="result in searchResults" :key="result.place_id">
          <span>{{ result.geometry.location.lat }},</span>
          <span>{{ result.geometry.location.lng }}</span>
        </p>
      </div>
    </div>
    <div v-if="showNoResultsMessage" class="flex gap-x-5 border-r-2 pr-3 overflow-y-auto xl:max-h-32 sm:mt-4">
      <h3 class="font-bold">LAST SEARCH</h3>
      <p>No search results found.</p>
    </div>
  </div>
</template>

<script>
import IconSearch from "./common/icons/IconSearch.vue";
export default {
  components: {
    IconSearch,
  },
  props: {
    latitude: Number,
    longitude: Number,
    currentLocationId: String,
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      location: null,
      showNoResultsMessage: false,
      autocomplete: null,
    };
  },
  watch: {
  currentLocationId(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.searchLocation();
    }else {
      return;
    }
  }
},
  methods: {
    async searchLocation() {
      let query = this.searchQuery.trim();

      if (query === "") {
        if (this.latitude && this.longitude) {
          query = `${this.latitude},${this.longitude}`;
        } else {
          return;
        }
      }
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          query
        )}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          this.searchResults = [data.results[0]];
          this.location = {
            address: this.searchResults[0].formatted_address,
            latitude: this.searchResults[0].geometry.location.lat,
            longitude: this.searchResults[0].geometry.location.lng,
          };
          this.$emit("location-selected", this.location);
          this.$emit("no-result", false);
          this.searchQuery = "";
          this.showNoResultsMessage = false;
        } else {
          this.searchResults = [];
          this.$emit("no-result", true);
          this.searchQuery = "";
          this.showNoResultsMessage = true;
        }
      } catch (error) {
        console.error("Error searching for location:", error);
        this.searchResults = [];
      }
    },
  },
};
</script>

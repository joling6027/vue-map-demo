<template>
  <div class="flex">
    <div class="mr-8 flex max-h-11">
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="searchLocation"
        placeholder="Enter a location"
        class="bg-gray-200 hover:bg-white border p-2 rounded-s-lg"
        ref="autocompleteInput"
      />
      <button
        class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 p-2 rounded-r-lg"
        @click="searchLocation"
      >
      <IconSearch />
      </button>
    </div>
    <div v-if="searchResults.length" class="flex gap-x-5 border-r-2 pr-3">
      <div class="border-r-2 pr-3">
        <h3 class="font-bold">LAST SEARCH</h3>
        <p v-for="result in searchResults" :key="result.place_id">
          {{ result.formatted_address }}
        </p>
      </div>
      <div>
        <h3 class="font-bold">LATITUDE & LONGITUDE</h3>
        <p v-for="result in searchResults" :key="result.place_id">
          <span>{{ result.geometry.location.lat }},</span><br />
          <span>{{ result.geometry.location.lng }}</span>
        </p>
      </div>
    </div>
    <div v-if="showNoResultsMessage">
      <h3 class="font-bold">LAST SEARCH</h3>
      <p>No search results found.</p>
    </div>
  </div>
</template>

<script>
import IconSearch from './common/icons/IconSearch.vue';
export default {
  components: {
    IconSearch
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
  mounted() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = this.initializeGoogleMaps;
    document.head.appendChild(script);
  },
  methods: {
    initializeGoogleMaps() {
      // Initialize the Autocomplete service
      const autocompleteService = new google.maps.places.AutocompleteService();

      // Initialize the Autocomplete input element
      const autocompleteInput = document.getElementById("autocomplete-input");
      const autocomplete = new google.maps.places.Autocomplete(autocompleteInput);

      // Listen for place selection event
      autocomplete.addListener("place_changed", () => {
        // Get the selected place from the Autocomplete input
        const place = autocomplete.getPlace();

        // Process the selected place data
        if (place.geometry && place.geometry.location) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();

          // Do something with the latitude and longitude values
          console.log("Selected Location:", latitude, longitude);
        }
      });
    },
    async searchLocation() {
      if (this.searchQuery.trim() === "") {
        return;
      }
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          this.searchQuery
        )}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          this.searchResults = data.results;
          this.location = {
            address: this.searchResults[0].formatted_address,
            latitude: this.searchResults[0].geometry.location.lat,
            longitude: this.searchResults[0].geometry.location.lng,
          };
          this.$emit("location-selected", this.location);
          this.searchQuery = "";
          this.showNoResultsMessage = false;
        } else {
          this.searchResults = [];
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

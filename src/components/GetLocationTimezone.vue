<template>
  <div class="flex gap-x-5">
    <div v-if="timeZone" class="pr-3 border-r-2">
      <h3 class="font-bold">TIMEZONE</h3>
      <p>Time Zone ID: {{ timeZone.timeZoneId }}</p>
      <p>Time Zone Name: {{ timeZone.timeZoneName }}</p>
      <!-- <p>Raw Offset: {{ timeZone.rawOffset }}</p> -->
    </div>
    <div v-if="localTime">
      <h3 class="font-bold">LOCAL TIME</h3>
      <p>{{ localTime }}</p>
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    latitude: Number,
    longitude: Number,
  },
  data() {
    return {
      timeZone: null,
      localTime: null,
      error: null,
    };
  },
  watch: {
    latitude: {
      immediate: true,
      handler() {
        this.getTimeZone();
      },
    },
    longitude: {
      immediate: true,
      handler() {
        this.getTimeZone();
      },
    },
  },
  methods: {
    async getTimeZone() {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${
            this.latitude
          },${this.longitude}&timestamp=${Math.floor(
            Date.now() / 1000
          )}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === "OK") {
          this.timeZone = data;
          this.getLocalTime();
          this.error = null;
        } else {
          this.timeZone = null;
          this.localTime = null;
          this.error = data.status;
        }
      } catch (error) {
        console.error(error);
        this.timeZone = null;
        this.localTime = null;
        this.error = "An error occurred while fetching the time zone.";
      }
    },
    async getLocalTime() {
      try {
        if (this.timeZone && this.timeZone.timeZoneId) {
          const response = await fetch(
            `https://worldtimeapi.org/api/timezone/${this.timeZone.timeZoneId}`
          );
          const data = await response.json();
          console.log(data)
          if (data && data.datetime) {
            this.localTime = data.datetime;
            console.log(data.datetime);
          } else {
            this.localTime = null;
          }
        } else {
          this.localTime = null;
        }
      } catch (error) {
        console.error(error);
        this.localTime = null;
      }
    },
    formatDateTime(datetime) {
      const formattedDateTime = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
      return formattedDateTime;
    },
  },
};
</script>

import './assets/main.css'
import './assets/index.css'
import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
// import VueGoogleAutocomplete from "vue-google-autocomplete";
import App from './App.vue'

const app = createApp(App);

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: "places"
  },
});

// app.component('vue-google-autocomplete', VueGoogleAutocomplete);

app.mount('#app');

import './assets/index.css'
import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import 'default-passive-events'
import App from './App.vue'

const app = createApp(App);

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  },
});

app.mount('#app');

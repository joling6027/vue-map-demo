# Vue-Map

Please check this [link](https://joling6027.github.io/vue-map-demo/) to see the demo.

## Project Setup

#### Please use your own Google API Key to run this project locally.
1. Below APIs need to be enabled for this project:
* Geocoding API
* Maps JavaScript API
* Time Zone API

  See [https://developers.google.com/maps/documentation/javascript/get-api-key](https://developers.google.com/maps/documentation/javascript/get-api-key) for more information.

2. After receiving your Google API Key, please clone this project to your local folder and add a .env.local file to the root.
3. Add `VITE_GOOGLE_MAP_API_KEY=YOUR_API_KEY` to your .env.local file.
4. Run below command to install dependencies.

    ```sh
    npm install
    ```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Screenshots

This section is to showcase the result in case the demo link is not available.
![desktop view](https://github.com/joling6027/vue-map-demo/blob/master/src/assets/images/desktop_screen.png)
![mobile view 1](https://github.com/joling6027/vue-map-demo/blob/master/src/assets/images/mobile_screen1.png)
![mobile view 2](https://github.com/joling6027/vue-map-demo/blob/master/src/assets/images/mobile_screen2.png)
![mobile view 3](https://github.com/joling6027/vue-map-demo/blob/master/src/assets/images/mobile_screen_search_history.png)

<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} {{ author }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      author: 'Joling Weng',
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  font-size: large;
  color: #888;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.container {
  max-width: 960px;
  margin: 0 auto;
}
</style>

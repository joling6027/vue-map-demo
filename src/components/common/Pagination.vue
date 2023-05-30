<template>
  <nav>
    <ul class="pagination">
      <li>
        <button @click="changePage(1)" :disabled="currentPage === 1">First</button>
      </li>
      <li>
        <button class="" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
      </li>
      <li v-for="page in totalPages" :key="page">
        <button @click="changePage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
      </li>
      <li>
        <button class="" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </li>
      <li>
        <button @click="changePage(totalPages)" :disabled="currentPage === totalPages">Last</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    changePage: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
  margin-top: 1rem;
}

.pagination li {
  margin: 0 0.5rem;
}

.pagination button {
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: larger;
  padding: 0.25rem 0.5rem;
}

.pagination button:hover {
  background-color: #cbd5e0;
}

.pagination button.active {
  font-weight: bold;
}

.pagination button:disabled {
  cursor: not-allowed;
}
</style>

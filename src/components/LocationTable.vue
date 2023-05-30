<template>
  <h2 class="font-bold text-xl mb-5">SEARCH HISTORY</h2>
  <form @submit.prevent="" class="w-[80%]">
    
    <table>
      <thead>
        <tr>
          <th><button class="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-xl" @click="deleteSelected" type="submit">Delete</button></th>
          <th>PLACE NAME</th>
          <th>LATITUDE</th>
          <th>LONGITUDE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(location, index) in paginatedLocations" :key="index">
          <td><input class="checkbox" type="checkbox" v-model="location.selected"/></td>
          <td>{{ location.address }}</td>
          <td>{{ location.latitude }}</td>
          <td>{{ location.longitude }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :changePage="changePage"
    />
  </form>
</template>

<script>
import Pagination from './common/Pagination.vue';
export default {
  components: {
    Pagination,
  },
  emits: ['delete-records'],
  props: {
    locations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.locations.length / this.pageSize);
    },
    paginatedLocations() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.locations.slice(startIndex, endIndex);
    }
  },
  methods: {
    deleteSelected() {
      console.log(this.locations);
      const selectedLocations = this.locations.filter((location) => location.selected);
      this.$emit("delete-records", selectedLocations);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-weight: 700;
  font-size: larger;
}

tbody td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: large;
}

.checkbox {
  width: 1.5rem;
  height: 1.5rem;
}
</style>

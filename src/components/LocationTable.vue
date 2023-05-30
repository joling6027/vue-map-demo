<template>
  <h2 class="font-bold text-xl my-6">SEARCH HISTORY</h2>
  <form @submit.prevent="" class="w-[80%] pb-24">
    <table>
      <thead>
        <tr>
          <th class="flex gap-x-2 justify-center">
            <button
              class="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-xl"
              @click="deleteSelected"
              type="submit"
            >
              <IconDelete />
            </button>
            <button
              class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-xl"
              @click="selectAll"
              type="button"
            >
              All
            </button>
          </th>
          <th>PLACE NAME</th>
          <th>LATITUDE</th>
          <th>LONGITUDE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(location, index) in paginatedLocations" :key="index">
          <td>
            <input
              class="checkbox"
              type="checkbox"
              v-model="location.selected"
            />
          </td>
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
import Pagination from "./common/Pagination.vue";
import IconDelete from "./common/icons/IconDelete.vue";
export default {
  components: {
    Pagination,
    IconDelete,
  },
  emits: ["delete-records"],
  props: {
    locations: {
      type: Array,
      required: true,
    },
  },
  watch: {
    currentPage(newPage, oldPage) {
      if (newPage !== oldPage && newPage > this.totalPages) {
        this.changePage(newPage - 1);
      }
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
      const reversedLocations = [...this.locations].reverse();
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return reversedLocations.slice(startIndex, endIndex);
    },
    // areAllSelected() {
    //   return this.paginatedLocations.every((location) => location.selected);
    // },
  },
  methods: {
    deleteSelected() {
      const selectedLocations = this.locations.filter(
        (location) => location.selected
      );
      this.$emit("delete-records", selectedLocations);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    selectAll() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      for (let i = startIndex; i < endIndex; i++) {
        this.paginatedLocations[i].selected = true;
      }
    },
  },
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

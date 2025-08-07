<template>
  <div class="container mt-5">
    <pre v-if="apiResponse" class="api-response">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-danger">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const authors = ref([]);
const loading = ref(false);
const error = ref(null);
const apiResponse = ref(null);


const calculateStats = () => {
  const authorsCount = authors.value.length;
  const totalBooks = authors.value.reduce((total, author) => total + author.famousWorks.length, 0);

  
  apiResponse.value = {
    success: true,
    data: {
      authorsCount,
      totalBooks,
      authors: authors.value.map(author => ({
        name: author.name,
        bookCount: author.famousWorks.length
      })),
    },
    timestamp: new Date().toISOString()
  };
};


const getApiData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('/src/assets/json/authors.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    authors.value = data;
    calculateStats(); 
  } catch (err) {
    error.value = 'Error loading authors data.';
    console.error('Error loading authors data:', err);
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  getApiData();
});
</script>

<style scoped>
.api-response {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  white-space: pre-wrap; 
  word-wrap: break-word;
}
</style>
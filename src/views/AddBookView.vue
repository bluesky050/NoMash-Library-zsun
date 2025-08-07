<template>
  <div class="container mt-5">
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN:</label>
        <input type="text" class="form-control" v-model="isbn" id="isbn" required />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" class="form-control" v-model="name" id="name" required />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <hr class="my-5" /> <BookList />

  </div>
</template>

<script>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';

// 1. 导入 BookList 组件
import BookList from '../components/BookList.vue';

export default {
  // 2. 注册组件
  components: {
    BookList
  },
  setup() {
    // ... setup 函数中的 addBook 等逻辑保持不变 ...
    const isbn = ref('');
    const name = ref('');

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }
        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        });
        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

    return {
      isbn,
      name,
      addBook,
    };
  },
};
</script>
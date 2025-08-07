<template>
  <div class="container mt-5 p-4 border rounded">
    <h3>Firestore Data Management</h3>
    <p>Displaying books where name is 'Test Book', ordered by ISBN (desc), limit 2.</p>
    
    <button @click="fetchBooks" class="btn btn-info mb-3">Refresh List</button>

    <ul v-if="books.length" class="list-group">
      <li 
        v-for="book in books" 
        :key="book.id" 
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
        </span>
        <div>
          <button @click="updateBook(book.id)" class="btn btn-sm btn-outline-warning ms-2">Update Name</button>
          <button @click="deleteBook(book.id)" class="btn btn-sm btn-outline-danger ms-2">Delete</button>
        </div>
      </li>
    </ul>
    <p v-else>No books found matching the query.</p>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js'; 
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc,
  orderBy,
  limit 
} from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    
    const fetchBooks = async () => {
      console.log("Fetching books with complex query...");
      try {
       
        const q = query(
          collection(db, 'books'),
          where('name', '==', 'Test Book'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'desc'),
          limit(2)
        );
        
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
        alert("获取数据时出错。提示：复合查询可能需要您在 Firebase 控制台中创建一个索引。请查看浏览器的开发者工具控制台，并点击其中的链接来创建索引。");
      }
    };

    // 2. 删除功能
    const deleteBook = async (id) => {
      if (!confirm('Are you sure you want to delete this book?')) return;

      try {
        const bookDocRef = doc(db, 'books', id);
        await deleteDoc(bookDocRef);
        console.log("Book deleted successfully!");
        fetchBooks(); // 删除后刷新列表
      } catch (error) {
        console.error("Error deleting book: ", error);
      }
    };

    // 3. 更新功能
    const updateBook = async (id) => {
      try {
        const bookDocRef = doc(db, 'books', id);
        // 示例：将书名更新为一个新名字，并附上时间戳以示区别
        await updateDoc(bookDocRef, {
          name: "Updated Name - " + new Date().toLocaleTimeString()
        });
        console.log("Book updated successfully!");
        fetchBooks(); // 更新后刷新列表
      } catch (error) {
        console.error("Error updating book: ", error);
      }
    };

    // 组件加载时自动获取数据
    onMounted(fetchBooks);

    // 将所有需要暴露给模板的变量和函数返回
    return {
      books,
      fetchBooks,
      deleteBook,
      updateBook,
    };
  },
};
</script>
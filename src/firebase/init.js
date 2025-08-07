// src/firebase/init.js

// 1. 从 Firebase SDK 中导入你需要的函数
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 新增：导入 Firestore 函数

// 2. 你的 Firebase 应用配置信息
// 确保这里使用的是你自己的真实配置
const firebaseConfig = {
  apiKey: "AIzaSyDDVKvQVewYN5NB-NQSa_N5ToB9824Tu9Q",
  authDomain: "lab-zsun.firebaseapp.com",
  projectId: "lab-zsun",
  storageBucket: "lab-zsun.firebasestorage.app",
  messagingSenderId: "823832598490",
  appId: "1:823832598490:web:5f9d1bdd70405b758652e3"
};

// 3. 初始化 Firebase 应用
initializeApp(firebaseConfig);

// 4. 初始化 Firestore 数据库并导出
const db = getFirestore();
export default db;
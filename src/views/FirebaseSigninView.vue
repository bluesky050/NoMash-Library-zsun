<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1>Sign in</h1>
        <p><input type="text" class="form-control" placeholder="Email" v-model="email" /></p>
        <p><input type="password" class="form-control" placeholder="Password" v-model="password" /></p>
        <p><button class="btn btn-primary" @click="signin">Sign in via Firebase</button></p>

        <hr />
        <p>
          Don't have an account? 
          <router-link to="/FireRegister">Create one here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const signin = () => {
  
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase login Successful!");
     
      router.push("/");
      
      console.log(auth.currentUser);
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        default:
          alert("Email or password was incorrect");
          break;
      }
    });
};
</script>
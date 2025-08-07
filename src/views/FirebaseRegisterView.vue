<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1>Create an Account</h1>
        <p><input type="text" class="form-control" placeholder="Email" v-model="email" /></p>
        <p><input type="password" class="form-control" placeholder="Password" v-model="password" /></p>
        <p><button class="btn btn-primary" @click="register">Save to Firebase</button></p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";

  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();

  const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        console.log("Firebase Register Successful!");
        console.log(data);
        router.push("/FireLogin"); 
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message); 
      });
  };
</script>
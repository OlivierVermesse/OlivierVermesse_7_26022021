<template>
  <main class="container">
    <section class="col-12 col-md-8 mt mx-auto p-3 bg-light rounded">
      <form @submit.prevent="handleSubmit">
        <p class="text-center">
          <img src="../assets/login.png" alt="login" style="width: 100px" />
        </p>
        <h1 class="text-center font-weight-bold" style="font-size: 4vw">
          Connexion
        </h1>
        <div v-show="isInvalid" class="invalidBox m-3" key="invalid">
          Veuillez vérifier vos informations de connexion
        </div>
        <div class="form-group mt-3">
          <label for="inputEmail">Email:</label>
          <input
            v-on:keydown="isInvalid = false"
            v-model="inputEmail"
            type="email"
            class="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="votre email"
          />
          <span id="emailHelp" class="form-text font-italic"
            >Veuillez nous contacter en cas d'oubli</span
          >
        </div>
        <div class="form-group mt-3">
          <label for="inputPassword">Mot de passe:</label>
          <input
            v-on:keydown="isInvalid = false"
            v-model="inputPassword"
            type="password"
            class="form-control"
            id="inputPassword"
            aria-describedby="passwordHelp"
            placeholder="votre mot de passe"
          />
          <span id="passwordHelp" class="form-text font-italic"
            >Veuillez nous contacter en cas d'oubli</span
          >
        </div>
        <button
          type="submit"
          class="
            text-white
            p-2
            w-100
            border-2
            rounded
            shadow
            BoutonFondVert
            font-weight-bold
          "
        >
          Se connecter
        </button>
      </form>
    </section>

    <div class="col-12 col-md-8 mx-auto mt-3">
      <router-link to="/inscription"
        ><button
          class="
          
            p-2
            w-100
            border-2
            rounded
            shadow
            font-weight-bold
          "
        >
          Inscription
        </button></router-link
      >
    </div>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
  name: "Accueil",
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
      isInvalid: false,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.inputEmail || !this.inputPassword) {
        return (this.isInvalid = true);
      }

      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.inputEmail,
          password: this.inputPassword,
        })
        .then(function (res) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("userName", res.data.userName);
          localStorage.setItem("role", res.data.role);
          router.push({ path: "Home" });
        })
        .catch((error) => {
          this.isInvalid = true;
          console.log(error);
        });
    },
  },
};
</script>
<template>
  <main class="container">
    <section class="col-12 col-md-8 mt mx-auto p-3">
      <form @submit.prevent="sendForm(event)">
        <p class="text-center m-2">
          <img
            src="../assets/registration.png"
            alt="enrollement"
            style="width: 50px"
          />
        </p>
        <h1 class="text-center font-weight-bold" style="font-size: 30px">
          Inscription
        </h1>
        <div v-show="invalid" class="invalidBox m-3" key="invalid">
          Veuillez remplir tous les champs du formulaire
        </div>
        <div class="form-group">
          <label for="inputLastName">Nom :</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputLastName"
            type="text"
            class="form-control"
            id="inputLastName"
            aria-describedby="userLastHelp"
            placeholder="Entrez votre nom"
          />
          <small id="lastNameHelp" class="form-text text-muted"
            >De 3 à 30 caractères</small
          >
        </div>
        <div class="form-group">
          <label for="inputUserName">Prénom:</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputUserName"
            type="text"
            class="form-control"
            id="inputUserName"
            aria-describedby="userFirstHelp"
            placeholder="Entrez votre prénom"
          />
          <small id="UserNameHelp" class="form-text text-muted"
            >De 3 à 30 caractères</small
          >
        </div>
        <div class="form-group">
          <label for="inputEmail">Email:</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputEmail"
            type="email"
            class="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="votre email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Entrez une adresse mail valide xxxx@xxxx.xxx</small
          >
        </div>
        <div class="form-group">
          <label for="inputPassword">Choisissez un Mot de passe:</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputPassword"
            type="password"
            class="form-control"
            id="inputPassword"
            aria-describedby="passwordHelp"
            placeholder="mot de passe"
          />
          <small id="passwordHelp" class="form-text text-muted"
            >minimum 8 caracteres dont au moins 1 lettre et 1 chiffre</small
          >
        </div>
        <button
          type="submit"
          class="
            BoutonFondRouge
            text-white
            p-2
            w-100
            border-2
            rounded
            shadow
            font-weight-bold
          "
        >
          S'inscrire
        </button>
      </form>
    </section>

    <div class="col-12 col-md-8 mx-auto mt-4">
      <router-link to="/#"
        ><button class="p-2 w-100 border-2 rounded shadow font-weight-bold">
          Ecran de connexion
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
  name: "Inscription",
  data() {
    return {
      inputLastName: "",
      inputUserName: "",
      inputEmail: "",
      inputPassword: "",
      invalid: false,
    };
  },
  methods: {
    sendForm() {
      if (
        !this.inputLastName ||
        !this.inputUserName ||
        !this.inputEmail ||
        !this.inputPassword
      ) {
        return (this.invalid = true);
      }
      const globalRegex = /(.*[a-z]){3,30}/;
      const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (
        globalRegex.test(this.inputLastName) &&
        globalRegex.test(this.inputUserName) &&
        mailRegex.test(this.inputEmail) &&
        pwdRegex.test(this.inputPassword)
      ) {
        axios
          .post("http://localhost:3000/api/auth/signup", {
            lastName: this.inputLastName,
            userName: this.inputUserName,
            email: this.inputEmail,
            password: this.inputPassword,
          })
          .then(() => {
            alert(
              "inscription réussie, redirection vers le module de connexion"
            );
            router.push({ path: "/" });
          })
          .catch((error) => {
            alert(error.status);
            console.log(error);
          });
      } else {
        console.log("validation form, method sendForm, renvoie une erreur");
        this.invalid = true;
      }
    },
  },
};
</script>
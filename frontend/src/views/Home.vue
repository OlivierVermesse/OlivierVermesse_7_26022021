<template>
  <main class="container">
    <div class="col-12">
      <section id="filPrincipal" class="row">
        <article class="col-12 col-md-4">
          <div
            class="card bg-light my-3 class=center-block"
            style="float: none"
          >
            <div class="card-header">
              <div class="row justify-content-around bg-white">
                <p class="m-1 text-center">Bienvenue {{ nameCurrentUser }} !</p>
                <p id="membre" class="text-center">
                  Vous êtes membre depuis le {{ creation }}
                </p>
                <button
                  class="border border-white bg-white"
                  @click="localClear"
                >
                  <img
                    src="../assets/logout.png"
                    alt="log-out"
                    style="width: 50px"
                  />
                </button>
              </div>
            </div>
            <div class="card-body">
              <div id="deleteUserButton" class="text-center">
                <router-link v-if="isAdmin" to="/Admin"
                  ><button
                    type="button"
                    class="btn btn-danger mx-auto rounded p-2 buttonsPanel"
                  >
                    Administration
                    <button class="rounded p-1 m-1">
                      <img
                        src="../assets/admin.jpg"
                        alt="admin"
                        style="width: 25px"
                      />
                      accéder
                    </button>
                  </button></router-link
                >
                <router-link v-else to="/Compte"
                  ><button
                    type="button"
                    class="btn btn-secondary mx-auto rounded p-2 buttonsPanel"
                  >
                    Suppression de compte
                  </button></router-link
                >
              </div>
            </div>
            <div id="publicationButton" class="card-body text-center">
              <router-link to="/CreatePost"
                ><button
                  type="button"
                  class="btn btn-dark mx-auto p-2 rounded buttonsPanel"
                >
                  Publication d'un message
                </button></router-link
              >
            </div>
          </div>
        </article>
        <sub class="col-12 col-md-8">
          <div class="col-12">
            <h1
              v-if="this.messages.length !== 0"
              class="col-12 my-2 btn btn-block btn-info font-weight-bold"
              style="background-color: #138400; cursor: default"
            >
              Dernières Publications
            </h1>
            <h1
              v-else
              class="col-12 my-2 btn btn-block btn-danger font-weight-bold"
              style="cursor: default"
            >
              Il n'existe pas encore de publication sur le site
            </h1>
          </div>
          <div
            v-for="message in messages"
            :key="message.id"
            class="card bg-light my-3"
          >
            <div class="card-header bg-light m-0 p-1">
              <div class="badge" style="width: 100px">
                Référence # {{ message.id }} postée par
                {{
                  message.userName.charAt(0).toUpperCase() +
                  message.userName.slice(1)
                }}
                le
                {{
                  message.createdAt
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(".") +
                  " à " +
                  message.createdAt.slice(11, 16)
                }}
              </div>
            </div>
            <div class="px-5 py-3">
              <p v-if="isAdmin || message.UserId == id" class="ml-2">
                {{ message.message }}
              </p>
            </div>
            <div class="btn">
              <img
                :src="message.messageUrl"
                v-if="message.messageUrl !== ''"
                class="border messImage"
                alt="image utilisateur"
                style="width: 250px"
              />
            </div>
          </div>
        </sub>
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
  name: "Home",
  data() {
    return {
      isAdmin: false,
      messages: [],
      id: "",
      nameCurrentUser: "",
      creation: "",
    };
  },
  created: function () {
    let id = localStorage.getItem("userId");
    axios
      .get("http://localhost:3000/api/messages", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (res) {
          const rep = res.data.list;
          this.messages = rep;
          rep.splice(10);
          localStorage.setItem("MessageId", rep[0].id);
          console.log(this.messages);
        } else {
          console.log("aucun message");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    let self = this;
    axios
      .get("http://localhost:3000/api/users/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        self.id = res.data.id;
        self.nameCurrentUser =
          res.data.userName.charAt(0).toUpperCase() +
          res.data.userName.slice(1);
        self.creation = res.data.createdAt
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
        self.isAdmin = res.data.isAdmin;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    localClear() {
      localStorage.clear();
      router.push({ path: "/" });
    },
  },
};
</script>
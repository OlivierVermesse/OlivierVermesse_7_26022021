<template>
  <main class="container">
    <div class="col-12">
      <section id="filPrincipal" class="row">
        <article class="col-12 col-md-4">
          <div
            class="d-flex flex-column card bg-light my-3 class=center-block"
            style="float: none"
          >
            <div class="card-header col-12">
              <div class="row justify-content-around bg-white">
                <p class="col-12 m-1 text-center">Bienvenue {{ nameCurrentUser }} !</p>
                <p id="membre" class="col-12 m-1 text-center">
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
                <div class="card-body">
                  <div id="deleteUserButton" class="text-center">
                    <router-link v-if="isAdmin" to="/Admin"
                      ><button
                        type="button"
                        class="btn btn-danger mx-auto rounded p-md-2 p-0 buttonsPanel btnSupp"
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
                        class="
                          btn btn-secondary
                          mx-auto
                          rounded
                          p-md-2
                          p-0
                          buttonsPanel
                          btnSupp
                        "
                      >
                        Suppression de compte
                      </button></router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <div class="col-12 col-md-8">
          <div class="row card mx-0 px-3">
            <div v-show="isInvalid" class="invalidBox m-2" key="invalid">
              Rappel : Votre message doit faire moins de 1 500 caractères.
            </div>
            <form enctype="multipart/form-data">
              <div
                class="row d-flex justify-content-around font-weight-bold pt-1"
                
              >
                <div class="col-12 col-md-7 form-group m-0 p-0">
                  <label for="newMessage" class="p-1"
                    >{{ callName() }}, saississez votre message :</label
                  >
                  <textarea
                    v-on:keydown="isInvalid = false"
                    class="form-control bg-light "
                    v-model="newMessage"
                    id="newMessage"
                    name="message"
                    rows="4"
                    placeholder="votre message ici (max 1 500 caractères)"
                    style="font-size: 12px"
                  ></textarea>
                </div>
                <div class="col-12 col-md-4 my-auto">
                  <div class="col-12 text-center my-auto py-1">
                    <img :src="newImage" alt="image de l'utilisateur" class="rounded" style="width: 8rem" />
                  </div>
                </div>
                <div class="col-12 mx-auto d-flex align-items-center boutons">
                  <div class="Publier mr-3">
                    <button
                      type="submit"
                      @click.prevent="send()"
                      class="btn btn-dark btn-block m-1 p-1"
                      style="font-size: 12px"
                    >
                      Publier
                    </button>
                  </div>
                  <div class="Annuler mr-3">
                    <a
                      class="btn btn-danger btn-block m-1 p-1 "
                      style="font-size: 12px"
                      @click="refresh"
                      >Annuler</a
                    >
                  </div>
                  <div
                    class="justify-content-center Upload mx-auto"
                  >
                  <label for="File">Choisir une photo</label>
                    <input
                      @change="selectFile()"
                      type="file"
                      ref="file"
                      name="image"
                      class="form-control-file"
                      id="File"
                      accept=".jpg, .jpeg, .png"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="col-12">
            <h1
              v-if="this.messages.length !== 0"
              class="col-12 my-2 p-1 btn btn-block btn-info font-weight-bold"
              @click="refresh"
              style="background-color: #138400; cursor: default"
            >
              Dernières Publications
            </h1>
            <h1
              v-else
              class="col-12 my-2 p-1 btn btn-block btn-danger font-weight-bold"
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
            <div class="card-header bg-light flex-wrap p1 createInfos mx-auto">
              <div class="flex-wrap pl-0 ml-0">
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
            <div class="col-12 d-flex flex-column flex-md-row" @click="commentPage(message.id)">
              <div class="col-12 col-md-8 pl-0 pr-2 pr-md-2 py-auto my-auto truncated">
                <span>{{ message.message }}</span>
              </div>
              <div class="col-12 col-md-4 btn my-auto">
                <img
                  :src="message.messageUrl"
                  v-if="message.messageUrl !== ''"
                  class="border messImage rounded"
                  alt="image utilisateur"
                  style="width: 8rem"
                />
              </div>
            </div>
            <div class="row col-12 m-0 justify-content-around mt-2" style="font-size: 12px">
              <button @click="commentPage(message.id)" class="font-weight-bold mb-2 bg-light">
                voir la totalité du message ou les commentaires...<img
                  src="../assets/oeil.png"
                  alt="oeil"
                  style="width: 25px"
                />
              </button>
              <button @click="commentPage(message.id)" class="border-0 mb-2 bg-light">
                <img
                  src="../assets/comment.png"
                  alt="comment"
                  style="width: 25px"
                />
              </button>
              <div v-if="isAdmin || message.UserId == id">
                <button
                  @click="deleteMessage(message.id, message.UserId, id)"
                  class="border-0 bg-light"
                >
                  <img
                    src="../assets/delete.jpg"
                    alt="delete"
                    style="width: 25px"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
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
      newImage: "",
      currentUserId: "",
      newMessage: "",
      file: null,
      isInvalid: false,
    };
  },
  dataComment() {
    return {
      isAdmin: false,
      currentUserId: "",
      newComment: "",
      comments: [],
      isInvalid: false,
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
    refresh() {
      location.reload();
    },
    localClear() {
      localStorage.clear();
      router.push({ path: "/" });
    },
    callName() {
      let name = localStorage.getItem("userName");
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    callNumber() {
      return localStorage.getItem("MessageId");
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.newImage = URL.createObjectURL(this.file);
    },
    send() {
      if (
        !localStorage.getItem("userName") ||
        !this.newMessage ||
        this.newMessage > 1500
      ) {
        this.isInvalid = true;
      } else {
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("UserId", localStorage.getItem("userId"));
        formData.append("message", this.newMessage.toString());
        axios
          .post("http://localhost:3000/api/messages/", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.UserId = "";
            this.newMessage = "";
            this.file = null;
            alert("publication postée !");
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    sendComment() {
      if (
        !this.newComment ||
        !localStorage.getItem("userId") ||
        !localStorage.getItem("MessageId" || this.newComment.lemgth > 1500)
        
      ) {
        this.isInvalid = true;
      } else {
        let UserId = localStorage.getItem("userId");
        let comment = this.newComment.toString();
        let MessageId = localStorage.getItem("MessageId");

        axios
          .post(
            "http://localhost:3000/api/comments/",
            { UserId, comment, MessageId },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            this.UserId = "";
            this.newMessage = "";

            alert("Commentaire Posté!");
            router.push({ path: "Commentpost" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    commentPage(m) {
      console.log(m);
      localStorage.setItem("MessageId", m);
      router.push({ path: "/Comment" });
    },
    createComment(m) {
      console.log(m);
      localStorage.setItem("MessageId", m);
      router.push({ path: "/createComment" });
    },
    deleteMessage(a, b, c) {
      console.log(typeof a, typeof b, typeof c);
      let confirmMessageDeletion = confirm(
        "voulez-vous vraiment supprimer ce message ainsi que la photo et commentaires si il y a ?"
      );
      if (confirmMessageDeletion == true) {
        axios
          .delete("http://localhost:3000/api/messages/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: {
              messageId: a,
              messageUid: b,
              uid: c,
            },
          })
          .then((res) => console.log(res))
          .catch((error) => {
            location.reload();
            console.log(error);
          });
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.delete-btn {
  padding: 0.5em 1em;
  background-color: #eccfc9;
  color: #c5391a;
  border: 2px solid #ea3f1b;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
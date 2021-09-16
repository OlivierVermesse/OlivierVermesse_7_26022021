<template>
  <main class="container">
    <Home class="mb-3"></Home>
    <div class="col-12">
      <div id="filPrincipal" class="row">
        <div class="col-12 col-md-4">
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
                        class="
                          btn btn-secondary
                          mx-auto
                          rounded
                          p-2
                          buttonsPanel
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
        </div>
        <div class="col-12 col-md-8" style="height: 200px">
          <div class="col-12">
            <h1
              class="col-12 btn btn-block btn-info font-weight-bold"
              style="cursor: default"
            >
              Vous consultez le message {{ messageId }} créé par
              {{ messageUserName }} en date du {{ creation }}
            </h1>
          </div>
          <div class="card bg-light my-3">
            <div class="card-header col-12 d-flex">
              <div class="col-8 pr-2 py-auto my-auto" style="font-size: 12px">
                {{ message }}
              </div>
              <div class="col-4 btn my-auto">
                <img
                  :src="messageUrl"
                  v-if="messageUrl !== ''"
                  class="border messImage"
                  style="width: 8rem"
                  alt="image postee par utilisateur"
                />
              </div>
            </div>
            <div class="row justify-content-around">
              <div v-if="isAdmin || messageUserId == currentUserId">
                <button
                  @click="
                    deleteMessage(messageId, messageUserId, currentUserId)
                  "
                  class="border-0"
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
          <div class="row card m-0 mb-3 px-3">
            <div v-show="isInvalid" class="invalidBox m-2" key="invalid">
              <p>
                Rappel : Votre commentaire doit faire moins de 1 500 caractères.
              </p>
            </div>
            <form enctype="multipart/form-data">
              <div class="d-flex">
                <div class="row col-10">
                  <div
                    class="
                      col-12
                      justify-content-center
                      form-group
                      mt-2
                      font-weight-bold
                    "
                  >
                    <label for="newComment"
                      >Envie de commenter ce message, alors à vos claviers
                      !</label
                    >
                    <textarea
                      v-on:keydown="isInvalid = false"
                      class="form-control bg-light"
                      style="font-size: 12px"
                      v-model="newComment"
                      id="newComment"
                      name="comment"
                      rows="4"
                      placeholder=" Saisissez votre commentaire ici (max 1 500 caractères)."
                    ></textarea>
                  </div>
                </div>

                <div class="col-3 px-auto my-auto">
                  <div class="col-12 py-auto">
                    <button
                      type="submit"
                      @click.prevent="send()"
                      class="btn btn-dark btn-block"
                      style="font-size: 12px"
                    >
                      Valider
                    </button>
                  </div>
                  <br />
                  <div class="col-12 py-auto">
                    <a
                      @click.prevent="refresh()"
                      class="btn btn-danger btn-block"
                      style="font-size: 12px"
                      >Annuler</a
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
          <p
            v-if="comments.length == 0"
            class="btn btn-block btn-info font-weight-bold"
          >
            Il n'y a pas de commentaire à afficher
          </p>
          <div v-else class="col-12">
            <h1
              class="col-12 btn btn-block btn-info font-weight-bold"
              style="cursor: default"
            >
              Voici les commentaires associés au message {{ messageId }}
            </h1>
          </div>
          <div
            v-for="comment in comments"
            :key="comment"
            class="card bg-light my-3"
          >
            <div class="my-2 mx-4" style="font-size: 12px">
              {{ comment.comment }}
            </div>
            <div
              class="card-header bg-light m-0 p-1 row justify-content-around"
              style="font-size: 12px"
            >
              <div class="badge my-auto">
                Commentaire {{ comment.id }} rédigé par
                {{
                  comment.User.userName.charAt(0).toUpperCase() +
                  comment.User.userName.slice(1)
                }}
                le
                {{
                  comment.createdAt
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(".") +
                  " à " +
                  comment.createdAt.slice(11, 16)
                }}
              </div>
              <div v-if="isAdmin || comment.UserId == currentUserId">
                <button
                  @click="
                    deleteComment(comment.id, comment.UserId, currentUserId)
                  "
                  class="border-0"
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
      </div>
    </div>
  </main>
</template>

<script>
import Home from "../components/Home";
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
  name: "Comment",
  components: {
    Home,
  },
  data() {
    return {
      isAdmin: false,
      comments: [],
      creation: "",
      messageUserName: "",
      messageUserId: "",
      message: "",
      messageId: "",
      messageUrl: "",
      nameCurrentUser: "",
      currentUserId: "",
      creationUser: "",
      newComment: "",
      isInvalid: false,
    };
  },
  created: function () {
    let MessageId = localStorage.getItem("MessageId");
    let self = this;
    axios
      .get("http://localhost:3000/api/messages/" + MessageId, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        self.creation = res.data.createdAt
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
        self.messageUserName = res.data.userName;
        self.messageUserId = res.data.userId;
        self.message = res.data.message;
        self.messageId = res.data.id;
        self.messageUrl = res.data.messageUrl;
      })
      .catch((error) => {
        alert(error);
      });
    let id = localStorage.getItem("userId");
    axios
      .get("http://localhost:3000/api/users/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        self.isAdmin = res.data.isAdmin;
        self.nameCurrentUser =
          res.data.userName.charAt(0).toUpperCase() +
          res.data.userName.slice(1);
        self.creationUser = res.data.createdAt
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
        self.currentUserId = res.data.id;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3000/api/comments/" + MessageId, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(function (res) {
        self.comments = res.data;
        console.log(self.comments);
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
    deleteMessage(a, b, c) {
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
          .then((res) => console.log(res));
        router.push({ path: "/Home" });
        location.reload();
      } else {
        return;
      }
    },
    deleteComment(commId, commUid, currentUid) {
      let confirmCommentDeletion = confirm(
        "voulez-vous vraiment suppimer votre commentaire ?"
      );
      if (confirmCommentDeletion == true) {
        axios
          .delete("http://localhost:3000/api/comments/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: {
              commentId: commId,
              commentUid: commUid,
              currentUid: currentUid,
            },
          })
          .then(() => {
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    },
    send() {
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
            router.push({ path: "Comment" });
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    refresh() {
      location.reload();
    },
  },
};
</script>
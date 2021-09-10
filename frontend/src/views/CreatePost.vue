  <template>
  <main class="container">
    <div class="text-center lead" style="font-weight: bold">
      {{ callName() }}, votre publication doit contenir un message et une photo
    </div>
    <section class="row card bg-light m-2 p-3">
      <div v-show="isInvalid" class="invalidBox m-2" key="invalid">
        <p>
          Rappel : Votre message doit contenir un texte et une photo. Votre
          message doit faire moins de 1 500 caractères.
        </p>
      </div>
      <form enctype="multipart/form-data">
        <div class="row">
          <div class="col-12 justify-content-center form-group">
            <label for="newMessage">Saississez votre message :</label>
            <textarea
              v-on:keydown="isInvalid = false"
              class="form-control"
              v-model="newMessage"
              id="newMessage"
              name="message"
              rows="8"
              placeholder="votre message ici (max 1 500 caractères)"
            ></textarea>
          </div>
          <div class="col-12 justify-content-center text-center">
            <img :src="newImage" class="w-50 rounded" />
          </div>
          <div class="col-12 justify-content-center">
            <div class="form-group justify-content-center">
              <label for="File"
                >Choisir une photo (format jpg, jpeg, png)</label
              >
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
        <div class="col-10 mx-auto align-content-center">
          <div>
            <button
              type="submit"
              @click.prevent="send()"
              class="btn btn-dark btn-block m-2 p-2"
            >
              Publier
            </button>
          </div>
          <router-link to="/Home">
            <div>
              <a class="btn btn-danger btn-block m-2 p-2">Annuler/Retour</a>
            </div></router-link
          >
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
  name: "CreatePost",
  data() {
    return {
      isAdmin: false,
      newImage: "",
      currentUserId: "",
      newMessage: "",
      file: null,
      messages: [],
      isInvalid: false,
    };
  },
  methods: {
    callName() {
      let name = localStorage.getItem("userName");
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.newImage = URL.createObjectURL(this.file);
    },
    send() {
      if (
        !this.file ||
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
            router.push({ path: "Home" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
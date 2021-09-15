  <template>
    <main class="container">
        <div class="text-center lead" style="font-weight: bold">
                        {{ callName() }}, vous commentez la publication numéro {{ callNumber() }}
                </div>
                <section class="row card bg-light m-2 p-3">
      <div v-show="isInvalid" class="invalidBox m-2" key="invalid">
        <p>
          Rappel : Votre commentaire doit faire moins de 1 500 caractères.
        </p>
      </div>
      <form enctype="multipart/form-data">
                <div class="row">
                    <div class="col-12 justify-content-center form-group">
                        <label for="newComment">À vos claviers...</label>
                        <textarea v-on:keydown="isInvalid = false"  class="form-control" v-model="newComment" id="newComment" name="comment" rows="8" placeholder=" Saisissez votre commentaire ici."></textarea>
                    </div>
                </div>
                
                <div class="col-10 mx-auto align-content-center">
                    <div><button type="submit" @click.prevent="send()" class="btn btn-dark btn-block m-2 p-2">Valider</button></div>
                    <router-link to="/Comment"> <div> <a class="btn btn-danger btn-block m-2 p-2">Annuler/Retour</a></div></router-link> 
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
    name: "CreateComment",
     data() {
        return {
            isAdmin: false,
            currentUserId: "", 
            newComment: "",
            comments: [],
            isInvalid: false
        }
    },
    methods: {
        callName() {
            let name = localStorage.getItem('userName');
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        callNumber() {
            return localStorage.getItem('MessageId')
        },
        send() {

            if (!this.newComment || !localStorage.getItem("userId") || !localStorage.getItem("MessageId" || this.newComment.lemgth > 1500)) {
                this.isInvalid = true;
            } else {

                let UserId      = localStorage.getItem("userId");
                let comment     = this.newComment.toString();
                let MessageId   = localStorage.getItem("MessageId");

                axios.post("http://localhost:3000/api/comments/", { UserId, comment, MessageId } , { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(()=> {
                    this.UserId = ""
                    this.newMessage = ""
            
                    alert('Commentaire Posté!')
                    router.push({path : 'Comment'})
                    
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }
    }
}
</script>
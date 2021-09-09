<template>
    <div class="container">   
         <Home class = "mb-3"></Home>  
        <main class="col-12">   
            <section class="col-8 mx-auto">
                <h1 class="my-2 btn btn-block btn-danger font-weight-bold " style="cursor:default">Page administrateur</h1>
            </section>
            <section class="row">
                <div class="col-12 col-md-4">
                    <article class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card">
                            <div class="row justify-content-around">
                                <div class="m-1 my-auto"> Bonjour {{ nameCurrentUser }} ! </div>
                                <button class="my-auto bg-white border border-white" @click="localClear"> <img class="bg-white border border-white" src="../assets/logout.png" alt="log-out" style="width:35px"/> </button>
                            </div>
                        </div>
                                <div class="card-body text-center" v-if="isAdmin">
                                    <p v-if="isAdmin" type="button"  class=" btn btn-danger mx-auto rounded p-2" style="cursor:default">Vous êtes le modérateur</p> 
                                </div>
                        <div class="card-body mx-auto">
                            <p class="btn rounded text-white font-weight-bold" style="background-color: green;cursor:default">Cet écran vous permet d'afficher ou supprimer les utilisateurs et les messages.</p>
                        </div>
                    </article> 
                </div>   
                <article class="col col-md-8 mt-5">
                    <h2 class="text-center m-5 ">Sélectionner un menu</h2>
                    <div class="row justify-content-around">
                        <!-- <button @click="toCommentsList()" class="btn btn-warning rounded shadow font-weight-bold p-5 m-2">MESSAGES/COMMENTS</button> -->
                        <button @click="UsersList()" class="btn btn-info rounded shadow font-weight-bold p-5 m-2" >Users</button>
                    </div>
                </article>
            </section>
        </main>
    </div>
</template>


<script>
import Home from "../components/Home";
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Admin",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.firstName.charAt(0).toUpperCase() + res.data.firstName.slice(1);       
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        // seeOnePost(m) {
        //     console.log(m);
        //     localStorage.setItem('MessageId', m);
        //     router.replace("http://localhost:8080/api/comment")
        // },
        // toCommentsList() {
        //     router.replace("http://localhost:8080/api/CommentsList")
        // },
        UsersList() {
            router.replace("http://localhost:8080/api/UsersList")
        }
    }
}
</script>
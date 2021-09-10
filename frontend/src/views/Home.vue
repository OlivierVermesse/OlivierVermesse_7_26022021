<template>
    <main class="container">    
        <div class="col-12">
            <section id="filPrincipal" class="row">
                <article class="col-12 col-md-4">
                    <div class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around bg-white">
                                <p class="m-1 text-center"> Bienvenue {{ nameCurrentUser }} ! </p>
                                <p id="membre" class="text-center">Vous êtes membre depuis le {{ creation }}</p>
                                <button class="border border-white bg-white" @click="localClear"> <img src="../assets/logout.png" alt="log-out" style="width:50px"/> </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="deleteUserButton" class="text-center">
                                <router-link v-if="isAdmin" to='/Admin'><button type="button" class=" btn btn-danger mx-auto rounded p-2 buttonsPanel">Administration <button class=" rounded p-1 m-1 "><img src="../assets/admin.jpg" alt="admin" style="width:25px"> accéder</button></button></router-link> 
                                <router-link v-else to='/Compte'><button type="button" class=" btn btn-secondary mx-auto rounded p-2 buttonsPanel">Suppression de compte</button></router-link> 
                            </div>
                            <div id="publicationButton" class=" card-body text-center">
                            <router-link to='/CreatePost' ><button type="button" class="btn btn-dark mx-auto p-2 rounded buttonsPanel">Publication d'un message</button></router-link>
                        </div>
                        </div>
                    </div>                  
                </article>
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
            creation: ""           
        }
    },
    created: function() {        
        let id = localStorage.getItem('userId')  
        let self = this;
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            console.log(res)
            self.id                 = res.data.id;
            self.nameCurrentUser               = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        }
    }
}
</script>
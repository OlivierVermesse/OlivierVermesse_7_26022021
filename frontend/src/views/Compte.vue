<template>
    <main class="container">   
        <Home class = "mb-3"></Home> 
        <div class="row justify-content-center">
            <div class="col-10">
                <div class="card">
                                <div class="row justify-content-around">
                                    <p class="my-auto"> Bienvenue {{ fullNameCurrentUser }} ! </p>
                                    <p class="my-auto">Vous êtes membre depuis le {{ creation }}</p>
                                    <button class="mt-auto mb-auto bg-white border border-white"  @click="localClear"> <img src="../assets/logout.png" alt="logo-out" style="width:35px"/> </button>
                                </div>
                            </div>
                <section class="row">
                    <div class="col-12">
                        <div class="card my-3 class=center-block" style="float:none;">
                            <div class="card-body mx-auto">
                                <div class="btn-info rounded p-3" style="cursor:default"><button class="rounded p-2" style="cursor:default"><span class="m-3 font-weight-bold">ATTENTION !!!<br>si vous supprimez votre compte, l'ensemble de vos messages et images seront supprimés.<br>Cette suppression sera irréversible.</span></button></div>
                            </div>
                            <div class="card-body mx-auto">
                                <div class="btn-danger rounded p-3" style="cursor:default"><button @click="deleteMyAccount(id)" class="rounded p-2 bg-light"><span class="m-3 font-weight-bold">SUPPRIMER VOTRE COMPTE</span><img src="../assets/delete.jpg" alt="deleteUser" style="width:50px"></button></div>
                            </div>
                        </div> 
                    </div>  
                </section>
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
    name: "Compte",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            fullNameCurrentUser: "",
            creation: "",
            id: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.fullNameCurrentUser    = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1) + " " + res.data.lastName.charAt(0).toUpperCase() + res.data.lastName.slice(1);
            self.id                 = res.data.id     
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        deleteMyAccount(n) {
            let id = n;
            let confirmUserDeletion = confirm("voulez-vous vraiment supprimer votre compte ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/users/" + id, {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
                .then((res)=> {
                    console.log(res);
                    alert('Cliquez sur ok et l\'utilisateur sera supprimé');
                    router.replace("http://localhost:8080/api/")
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        },
    }
}
</script>
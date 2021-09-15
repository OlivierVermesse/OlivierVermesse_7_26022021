<template>
    <main class="container">  
        <Home class = "mb-3"></Home>   
        <div class="col-12">
            <div class="col-12">
               <router-link v-if="isAdmin" to='/Admin'><h1 class="my-2 btn btn-block btn-danger font-weight-bold">Page administrateur</h1></router-link>
            </div>
            <section class="row">
                <div class="col-12">
                    <article class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card">
                            <div class="row justify-content-around">
                                <div class="m-1 my-auto"> Bonjour {{ nameCurrentUser }} ! </div>
                                <button class="my-auto bg-white border border-white" @click="localClear"> <img class="bg-white border border-white" src="../assets/logout.png" alt="log-out" style="width:35px"/> </button>
                            </div>
                        </div>
                                <div class="text-center" style="padding-top:10px;padding-buttom:0" v-if="isAdmin">
                                    <p v-if="isAdmin" type="button"  class=" btn btn-danger mx-auto rounded p-2" style="cursor:default">Vous êtes le modérateur</p> 
                                </div>
                        <div class="text-center" style="padding-top:0;padding-buttom:10px">
                            <p class="btn rounded text-white font-weight-bold" style="background-color: green;cursor:default">Cet écran vous permet d'afficher ou supprimer les utilisateurs et les messages.</p>
                        </div>
                    </article> 
                </div>    
                <div class="col col-md-12">
                    <h2 class="text-center m-5 ">
                        Liste des utilisateurs
                    </h2>
                    <table class="table table-striped">
                            <tr>
                                <th class="py-3 text-center">Nom</th>
                                <th class="py-3 text-center">Prénom</th>
                                <th class="py-3 text-center">Email</th>
                                <th class="py-3 text-center">Créé le</th>
                                <th class="py-3 text-center">Supprimer</th>
                            </tr>
                            <tr>
                                <td>
                                    <span class="badge p-3 badgeList" v-for="i in users" :key="i">   
                                         {{ i.lastName.charAt(0).toUpperCase() + i.lastName.slice(1) }}  
                                    </span>
                                </td>
                                <td>
                                    <span class="badge p-3 badgeList" v-for="i in users" :key="i">   
                                         {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} 
                                    </span>
                                </td>
                                <td>
                                    <span class="badge p-3 badgeList" v-for="i in users" :key="i">   
                                         {{ i.email }}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge p-3 badgeList" v-for="i in users" :key="i">   
                                        {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge p-2 badgeList" v-for="i in users" :key="i">   
                                        <button class="rounded bg-white border border-white" @click="deleteOneUser( i.id, isAdmin )"> <img src="../assets/delete.jpg" alt="deleteUser" style="width:25px"> </button>
                                    </span>
                                </td>
                            </tr>
                    </table>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";
import Home from '../components/Home';

export default {
    name: "UsersList",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: "",
            users: []
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  

        axios.get("http://localhost:3000/api/users/" + id , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);       
        })
        .catch((error)=> { console.log(error) 
        });

        axios.get("http://localhost:3000/api/users/all" , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {  
            this.users = res.data.found;
        })
        .catch((error)=>{
            console.log(error)
        })      
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        deleteOneUser(uid, isAdmin) {
        console.log(uid, isAdmin)
        
        let confirmUserDeletion = confirm("voulez-vous vraiment supprimer cet utilisateur ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/users/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        uid:          uid,
                        isAdmin:      isAdmin,
                    }
                })
                .then((res)=> {
                    console.log(res)
                    router.replace("http://localhost:8080/api/UsersList")
                })
                .catch((error) => { 
                    location.reload();
                    console.log(error)
                })
            } else {
                return 
            }
        },
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
    }
}
</script>
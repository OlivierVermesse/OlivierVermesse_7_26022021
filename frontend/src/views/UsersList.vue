<template>
    <div class="container">  
        <Home class = "mb-3"></Home>   
        <main class="col-12">
            <section class="col-8 mx-auto">
                <h1
                class="my-2 btn btn-block btn-danger font-weight-bold adminTitle"
                style="cursor: default"
                >
                Page administrateur
                </h1>
            </section>
            <section class="row">
                <div class="col-12 col-md-4">
                    <article class="card bg-light my-3 class=center-block" style="float: none" >
                        <div class="card-header col-12">
                            <div class="row justify-content-around bg-white">
                                <div class="col-12 m-1 text-center">
                                Bonjour {{ nameCurrentUser }} !
                                </div>
                                <button
                  class="border border-white bg-white"
                  @click="localClear"
                >
                  <img
                    class="bg-white border border-white"
                    src="../assets/logout.png"
                    alt="log-out"
                    style="width: 35px"
                  />
                </button>
                                <div class="card-body text-center" v-if="isAdmin">
                                    <p
                                        v-if="isAdmin"
                                        type="button"
                                        class="btn btn-danger mx-auto rounded p-2"
                                        style="cursor: default"
                                    >
                                        Vous êtes le modérateur
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div class="mx-auto">
                        <p
                        class="btn rounded text-white font-weight-bold"
                        style="background-color: green; cursor: default"
                        >
                        Cet écran vous permet d'afficher ou supprimer les utilisateurs et
                        les messages.
                        </p>
                    </div>
                </div>
        
                <div class="col-12 col-md-12">
                    <h2 class="text-center">
                        Liste des utilisateurs
                    </h2>

                    <div class="listUser" v-for="i in users" :key="i">   
                        <div class=" p-3">
                            Id : {{ i.id }}
                            <br>
                            Nom : {{ i.lastName.charAt(0).toUpperCase() + i.lastName.slice(1) }}
                            <br>
                            Prénom : {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }}
                            <br>
                            Email : {{ i.email }}
                            <br>
                            Créé le : {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}} 
                            <br>
                            Delete :  <button class="rounded" @click="deleteOneUser( i.id, isAdmin )"> <img src="../assets/delete.jpg" alt="delete" style="width:25px"> </button>
                        </div>
                    </div>

                    <table class="table table-striped">
                            <tr>
                                <th class="py-3 text-center">Id</th>
                                <th class="py-3 text-center">Nom</th>
                                <th class="py-3 text-center">Prénom</th>
                                <th class="py-3 text-center">Email</th>
                                <th class="py-3 text-center">Créé le</th>
                                <th class="py-3 text-center">Supprimer</th>
                            </tr>
                            <tr>
                                <td class="text-center">
                                    <span class="badge p-3 badgeList" v-for="i in users" :key="i">   
                                         {{ i.id }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <span class="badge p-3 badgeList col-12" v-for="i in users" :key="i">   
                                         {{ i.lastName.charAt(0).toUpperCase() + i.lastName.slice(1) }}  
                                    </span>
                                </td>
                                <td class="text-center">
                                    <span class="badge p-3 badgeList col-12" v-for="i in users" :key="i">   
                                         {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} 
                                    </span>
                                </td>
                                <td class="text-center">
                                    <span class="badge p-3 badgeList col-12" v-for="i in users" :key="i">   
                                         {{ i.email }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <span class="badge p-3 badgeList col-12"  v-for="i in users" :key="i">   
                                        {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}}
                                    </span>
                                </td>
                                <td class="text-center col-1">
                                    <span class="badge p-2 badgeList" v-for="i in users" :key="i">   
                                        <button class="rounded bg-white border border-white" @click="deleteOneUser( i.id, isAdmin )"> <img src="../assets/delete.jpg" alt="deleteUser" style="width:25px"> </button>
                                    </span>
                                </td>
                            </tr>
                    </table>
                </div>
            </section>
        </main>
    </div>
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
        
        let confirmUserDeletion = confirm("voulez-vous vraiment supprimer cet utilisateur - Cela supprimera les messages, images et commmentaires de cet utilisateur ?");
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
<template>
    <header class="container">
        <div class="row ">
            <nav class="col-12 text-center">
               <router-link to="/Home">  <img src="../assets/home.png"  alt="logo-home" class="home"/></router-link>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style>
.home {
  width: 30%;
}

@media only screen and (max-width: 768px) {
  .home {
    width: 80%;
  }
}
</style>
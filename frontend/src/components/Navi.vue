<template>
  <div class="container">
    <div class="row">
      <div class="col-12 navbar justify-content-between" id="header">
        <img src="../assets/logo.png" alt="logo-boite" class="logo" />
        <a class="mailto" href="mailto:contact@test.com"> <img src="../assets/contact.png" alt="bouton_aide" class="contact"/></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navi",
};
</script>

<style>
.logo {
  width: 250px;
}
.contact {
  width: 250px;
}

@media only screen and (max-width: 768px) {
  .logo {
    width: 100px;
  }

  .contact {
    width: 100px;
  }
}
</style>









    
}
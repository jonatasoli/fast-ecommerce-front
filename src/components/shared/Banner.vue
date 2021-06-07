<template>
  <v-banner color="#FAA500" width="100%" height="90" class="banner" single-line>
    <div class="banner">
      <div>
        <v-img src="./assets/fast-time.png" width="100" height="100"></v-img>
      </div>
      <div class="text">
        <h3 id="title">
          Pedidos confirmados até 12 horas serão postados <br />no mesmo dia útil
        </h3>
        <h3>Exceto: Sabádos, Domingos e Feriados</h3>
      </div>
    </div>
  </v-banner>
</template>

<script>
export default {};
</script>

<style scoped>
h3 {
  color: #18121e;
  margin-left: 30px;
  word-wrap: break-word;
}
br {
    display: none
}
#title {
  font-size: 25px;
}
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 600px) {
    h3 {
        margin-left: 0px;
        width: auto
        
    }

    br {
        display: unset
    }
  #title {
    font-size: 20px;
  }

  .v-banner {
    height: 170px !important;

  }
  .banner {
      flex-direction: column;
  }

}
</style>

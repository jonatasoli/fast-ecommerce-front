<template>
  <div>
    <NavBar> 
       <v-btn  x-large 
        @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left> mdi-menu</v-icon></v-btn>
    </NavBar>
    <MenuDashboard :sidebarMenu="sidebarMenu"/>
    <v-container class="buscar">
    <Date @dates="dates = $event"/>
    <div class="select-status">

        <v-select
          :items="items"
          item-text="name"
          v-model=status
          label="Status"
          solo
           :required="!status"
          menu-props="auto"
          hide-details
          single-line
        ></v-select>
     
      
    </div>
    
    <v-btn x-large @click="loadData">Buscar</v-btn>
    </v-container>
    <v-container>
      <router-view :key="$route.fullPath"/>
    </v-container>
  </div>
</template>

<script>

import NavBar from "@/components/shared/NavBar.vue";
import MenuDashboard from "../components/MenuDashboard.vue";
import Date from "../components/Date.vue";
export default {
  components: { NavBar, MenuDashboard, Date },
  data: () => ({
    status: "paid",
    dates: '',
    sidebarMenu: false,
    items: [
      {name: "Pagamento Aprovado", value: "paid"},
      {name: "Pagamento Recusado", value: "refused"},
      {name: "Aguardando Pagamento", value: "waiting_payment"},
    ]
  }),
  methods: {
    loadData() {
      console.log(this.dates)
      this.$router.push({
        name:"tableOrders",
        params: {dates: JSON.stringify(this.dates),
                status: this.status},
      }).catch (() => {});
      // location.reload()
    },
  },
};
</script>
<style scoped>
.buscar {
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
}
.select-status {
  width: 300px;
  margin: 30px 20px 0px 50px;
}

</style>
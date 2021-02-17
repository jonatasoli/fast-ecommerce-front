<template>
<div class="home-style">
      <v-btn color="#233237" x-large 
        @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left>mdi-menu</v-icon></v-btn>
    <v-navigation-drawer 
            v-model="sidebarMenu" 
            app
            floating
            :permanent="sidebarMenu"
            :mini-variant.sync="mini"
            >
            <v-list dense dark>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon @click.stop="toggleMenu = !toggleMenu">mdi-chevron-left</v-icon>

                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <h3 class="font-weight-thin">Configurações</h3>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item  v-for="item in items" :key="item.title" link :to="item.href">
                    <v-list-item-icon>
                        <v-icon >{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title ><h3>{{ item.title }}</h3></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
  
</div>
</template>

<script>
export default {
    data:() => ({
        sidebarMenu: false,
        toggleMenu: false,
        items: [
            { title:"Produtos", icon:"mdi-cart" },
      ],
  }),

}
</script>

<style>

</style>
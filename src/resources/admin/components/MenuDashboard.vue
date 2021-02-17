<template>
<div class="home-style">
    <v-navigation-drawer 
            v-model="this.sidebar" 
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
    props: ['sidebarMenu'],
    computed: {
        sidebar: {
        get () { return this.sidebarMenu },
        set (value) { this.$emit('update:sidebarMenup', value) },
        },
    },
    data:() => ({
        toggleMenu: false,
        items: [
            { title:"Produtos", icon:"mdi-cart" },
      ],
  }),

}
</script>

<style>

</style>
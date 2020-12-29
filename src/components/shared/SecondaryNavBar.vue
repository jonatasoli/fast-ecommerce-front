<template>
  <div width='500'>
    <v-toolbar
      id="categories-app-bar"
      color="#233237"
      height="30"
      class="center-items"
    >
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn x-large color="#233237" elevation="0">
          <router-link 
          tag="v-btn"
          :to="{name: 'product-category', 
          params:{id: category.id}}">{{category.name}}</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "SecondNavBar",
  props: ["category"]
}
</script>

<style lang="sass" scoped>
.center-items
  display: flex
  justify-content: center
  align-items: center

v-text-field
  backgroud: "white"
</style>

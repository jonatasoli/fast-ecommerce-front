<template>
  <v-carousel
    class="carousel"
    cycle
    hide-delimiter-background
    interval="4000"
    height="auto"
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <v-img class="img" :src="item.src" cover max-width="100%" height="600"></v-img
    ></v-carousel-item>
    <!-- <v-carousel-item ><v-img  src="./assets/0002.jpg" cover max-width="100%" height="600"></v-img></v-carousel-item> -->
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/01-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/02-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/03-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/04-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/05-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/06-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/07-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/08-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/09-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/10-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/11-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/12-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/13-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/14-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/15-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/16-Banner.jpg" },
        { src: "https://gattorosa.nyc3.digitaloceanspaces.com/17-Banner.jpg" },
      ],
    };
  },
};
</script>

<style scoped>
/* .carousel {
  height: 600px !important;
} */
>>> .v-image__image {
  background: no-repeat center;
  background-size: 100% 600px;
}

.img .carousel {
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  .carousel {
    margin-top: -150px;
    height: 500px !important;
  }
  >>> .v-image__image {
    background: no-repeat center;
    background-size: 100% 400px;
  }
}
</style>

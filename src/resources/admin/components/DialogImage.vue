<template>
  <v-card>
    <v-row class="d-flex aling-center mx-5">
    <v-card-title> Imagens </v-card-title>
    <v-spacer></v-spacer>
    <v-btn text @click="close"><v-icon>mdi-close</v-icon></v-btn>
    </v-row>
    <v-card-text>
      <v-container>
        <span>Imagem Principal:</span>
        <v-col>
          <v-row>
            <v-file-input
              label="Imagem"
              prepend-icon="mdi-camera"
              v-model="image"
            >
            </v-file-input>
            <v-btn class="mt-5" fab small dark color="indigo" @click="insert_image">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-row>
          <div class="text_img">
              <v-img max-height="80"
              max-width="80"
              :src=content.image_path>
              </v-img>
              <span>{{image_name(content.image_path)}}</span>
          </div>
        </v-col>
        <span>Imagens Galeria:</span>
        <v-col>
          <v-row>
            <v-file-input label="Imagem" prepend-icon="mdi-camera" v-model="imageGallery"> </v-file-input>
            <v-btn class="mt-5" fab small dark color="indigo" @click="insert_image_gallery">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-row>
          <div v-if="content.uri">
          <div class="text_img" v-for="image in images" :key="image.url" >
              <v-img max-height="80"
              max-width="80"
              :src=image.url>
              </v-img>
              <span>{{image_name(image.url)}}</span>
              <v-spacer></v-spacer>
              <v-btn text @click="deleteImage(image)"><v-icon>mdi-delete</v-icon></v-btn>
          </div>

          </div>
        </v-col>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions} from "vuex";
export default {
  props: ["editedItem"],
  data() {
    return {
      image: [],
      imageGallery: [],
      image_path: "",
    };
  },
  computed: {
    ...mapState("productAdmin", { image_url: "image" }),
    ...mapState("product", ["images"]),
    content: {
      get() {
        return this.editedItem;
      },
      set(content) {
        this.$emit("update:editedItem", content);
      },
    },
  },
  methods: {
    ...mapActions("productAdmin", ["setImage", "postImageGallery", "deleteImageGallery"]),
    ...mapActions("product", ["setImagesGallery"]),
    image_name(image) {
      let arr = image.split("/");
      return arr[arr.length - 1];
    },
    close() {
      this.dialogImage = false;
      this.$emit("setdialogimage", this.dialogImage);
      this.image = [];
    },
    async insert_image() {
      let formData = new FormData();

      formData.append("image", this.image);  
      console.log(this.content.id)
      await this.setImage({"product_id":this.content.id, "image": formData});
      this.content.image_path = this.image_url;
    },
     async insert_image_gallery() {
      let formData = new FormData();

      formData.append("imageGallery", this.imageGallery);  
      
      await this.postImageGallery({"product_id":this.content.id , "image": formData});
      this.setImagesGallery({product_id: this.content.uri})
      this.imageGallery = []
    },

    deleteImage(item) {
      this.deleteImageGallery(item.id)
      
      setTimeout(() =>{this.setImagesGallery({product_id: this.content.uri})}, 50)
    }
  },
};
</script>

<style scoped>
.text_img {
  margin-bottom: 20px;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  
}
.text_img span {
  margin-left: 20px;
}
</style>

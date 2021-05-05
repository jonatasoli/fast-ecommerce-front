<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text class="card">
      <v-container>
        <v-row>
          <v-col cols="15" sm="8" md="6">
            <v-text-field
              v-model="content.name"
              label="Nome"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="content.uri"
              label="URI"
            ></v-text-field>
          </v-col>
          <v-col cols="5" sm="7" md="3">
            <v-text-field
              v-model="content.price"
              label="Preço"
              @blur="focusOut"
              @focus="focusIn"
            ></v-text-field>
          </v-col>
          <v-col cols="5" sm="7" md="12">
            <v-file-input
              label="Imagem"
              prepend-icon="mdi-camera"
              v-model="image"
            >
            </v-file-input>
            <div class="text_img">Imagem inserida: {{ image_name }}</div>
          </v-col>

          <v-col cols="2" sm="4" md="8">
            <Editor :content="content" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              v-model="content.quantity"
              label="Quantidade"
            ></v-text-field>

            <v-text-field
              type="text"
              v-model="content.discount"
              label="Desconto"
              @blur="focusOutDiscount"
              @focus="focusInDiscount"
            ></v-text-field>
          </v-col>
          <template>
            <v-container fluid>
              <v-radio-group
                label="Exibir Produto?"
                v-model="content.showcase"
                row
                mandatory
              >
                <v-radio label="Sim" :value="true"></v-radio>
                <v-radio label="Não" :value="false"></v-radio>
              </v-radio-group>
            </v-container>
          </template>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">
        Cancelar
      </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Salvar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "productAdmin"
);
import Editor from "../components/Editor";
export default {
  props: ["editedItem","editedIndex", "items"],
  components: { Editor },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      dialog: false,
      image: [],
      image_path: "",
    };
  },
  computed: {
    ...mapState({image_url: "image"}),
    image_name() {
      if (this.content.image_path == null) {
        return null
      }
      else {
        let arr = this.content.image_path.split("/");
        return arr[arr.length - 1]
      }
    },
    receive_items: {
      get() {
        return this.items;
      },
      set(val) {
        this.$emit("update:items", val);
      },
    },
    content: {
      get() {
        return this.editedItem;
      },
      set(content) {
        this.$emit("update:editedItem", content);
      },
    },
    editIndex: {
      get() {
        return this.editedIndex;
      },
      set(val) {
        this.$emit("update:editedIndex", val)
      }
    },
    formTitle() {
      return this.editedIndex === -1
        ? "Adicionar Produto"
        : "Editar Produto";
    },
  },
  created() {
    this.getProductsAll();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    ...mapGetters(["getProductsAll"]),
    ...mapActions([
      "setImage",
      "postProduct",
      "updateProduct",
      "deleteProduct",
      "setProductsAll"
    ]),
    close() {
      console.log((this.dialogModel = false));
      console.log(this.dialog);
      this.dialog = false;
      this.$emit("setdialog", this.dialog);
      this.$nextTick(() => {
        this.content = Object.assign({}, this.defaultItem);
        this.editIndex = -1;
      });
    },
    async save() {
      let price_int = 0;
      let discont_int = 0;
      let formData = new FormData();

      formData.append("image", this.image)

      await this.setImage(formData);
      this.content.image_path = this.image_url
      
      if (this.editIndex > -1) {
        
        Object.assign(this.items[this.editIndex], this.content);
        price_int = this.content.price;
        price_int = Number(price_int.replace(/[^0-9]+/g, ""));
        this.content.price = price_int;
        discont_int = this.content.discount;
        discont_int = this.content.discount;
        if (!discont_int) {
          discont_int = 0;
        } else {
          discont_int = Number(discont_int.replace(/[^0-9]+/g, ""));
        }
        this.content.discount = discont_int;
        this.updateProduct(this.content);
        this.setProductsAll();
      } else {
        price_int = this.content.price;
        price_int = Number(price_int.replace(/[^0-9]+/g, ""));
        this.content.price = price_int;
        discont_int = this.content.discount;
        if (!discont_int) {
          discont_int = 0;
        } else {
          discont_int = Number(discont_int.replace(/[^0-9]+/g, ""));
        }
        this.content.discount = discont_int;
        this.receive_items.push(this.content);
        console.log(this.receive_items)
        this.postProduct(this.content);
      }
      console.log(this.image);
      console.log(this.editIndex)
      this.close();
      location.reload();
    },
    imageName() {
      this.image_name = this.content.image_path.split("/").end()
    },

    focusOut: function () {
      // Recalculate the currencyValue after ignoring "$" and "," in user input
      this.content.price = parseInt(
        this.content.price.replace(/[^\d.]/g, "")
      );
      // Ensure that it is not NaN. If so, initialize it to zero.
      // This happens if user provides a blank input or non-numeric input like "abc"
      if (isNaN(this.content.price)) {
        this.content.price = 0;
      }
      this.content.price = this.formatCurrency(
        parseInt(this.content.price) / 100
      );
    },
    focusIn: function () {
      // Unformat display value before user starts modifying it
      if (this.content.price) {
        this.content.price = this.content.price.replace(
          /[^0-9]+/g,
          ""
        );
      }
    },
    focusOutDiscount() {
      // Recalculate the currencyValue after ignoring "$" and "," in user input
      this.content.discount = parseInt(
        this.content.discount.replace(/[^\d.]/g, "")
      );
      // Ensure that it is not NaN. If so, initialize it to zero.
      // This happens if user provides a blank input or non-numeric input like "abc"
      if (isNaN(this.content.discount)) {
        this.content.discount = "0";
      }
      this.content.discount = this.formatCurrency(
        parseInt(this.content.discount) / 100
      );
    },
    focusInDiscount() {
      console.log(typeof this.content.discount, "desconto");
      if (this.content.discount) {
        this.content.discount = this.content.discount.replace(
          /[^0-9]+/g,
          ""
        );
      }
    },
    
  },
};
</script>

<style>
.text_img {
  color: white;
  font-size: 16px;
}
</style>

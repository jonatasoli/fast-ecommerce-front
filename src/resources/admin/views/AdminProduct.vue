<template>
  <div>
    <v-row class="navbar">
      <NavBar>
        <v-btn x-large @click.stop="sidebarMenu = !sidebarMenu">
          <v-icon left> mdi-menu</v-icon></v-btn
        >
      </NavBar>
      <MenuDashboard :sidebarMenu="sidebarMenu" />
    </v-row>
    <v-container class="table">
      <v-card>
        <v-data-table 
        :headers="headers" 
        :items="items"
        sortBy="id"
        update: sort-asc>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Produtos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <template
                v-slot:activator="{
                  on,
                  attrs,
                }"
              >
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Adicionar
                </v-btn>
              </template>
              <DialogProduct
                :editedItem="editedItem"
                :editedIndex="editedIndex"
                :items="items"
                @setdialog="dialog = $event"
              />
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Deseja excluir esse produto?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "productAdmin"
);
import NavBar from "@/components/shared/NavBar.vue";
import MenuDashboard from "../components/MenuDashboard.vue";
import DialogProduct from "../components/DialogProduct.vue";
export default {
  name: "AdminProduct",
  components: {
    NavBar,
    MenuDashboard,
    DialogProduct,
  },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      sidebarMenu: false,
      headers: [
        { text: "Id", value: "id" },
        { text: "Nome", value: "name" },
        { text: "Valor", value: "price" },
        { text: "Quantidade", value: "quantity", sortable: false },
        { text: "Ativo", value: "showcase" },
        { text: "Categoria", value: "category_id" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedItem: {
        id: "",
        name: "",
        uri: "",
        price: 0,
        description: ``,
        image_path: "",
        category_id: 1,
        quantity: 0,
        showcase: "" ,
      },
      editedIndex: -1,
      dialogDelete: false,
      dialog: false,
    };
  },
  computed: {
    ...mapState({
      productsAll: "products_all",
    }),
    items() {
      return this.productsAll.map((item) => {
        return {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          showcase: item.showcase ? "Sim" : "Não",
          price: this.formatCurrency(item.price / 100),
          uri: item.uri,
          description: item.description,
          discount: this.formatCurrency(item.discount / 100),
          category_id: item.category_id,
          image_path: item.image_path,
        };
      });
    },
  },
  methods: {
    ...mapGetters(["getProductsAll"]),
    ...mapActions(["setProductsAll"]),
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.deleteProduct(this.editedItem.id);
      this.closeDelete();
      location.reload();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.setProductsAll();
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setProductsAll();
    });
  },
};
</script>

<style>
.v-input .v-label {
  font-size: 20px;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 20px !important;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 18px !important;
}

.table {
  margin-top: 50px;
}
</style>

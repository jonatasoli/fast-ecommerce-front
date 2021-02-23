<template>
  <div>
    <v-row class="navbar">
    <NavBar> 
       <v-btn  x-large 
        @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left> mdi-menu</v-icon></v-btn>
    </NavBar>
    <MenuDashboard :sidebarMenu="sidebarMenu"/>
    </v-row>
    <v-container class="table">
      <v-card>
        <v-data-table 
        :headers="headers" 
        :items="items"
        :pagination.sync="pagination"
          sortBy="id"
        update: sort-asc>
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Produtos</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                        >
                  <template v-slot:activator="{ on, attrs }">
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
          <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text class="card">
            <v-container>
              <v-row>
                <v-col
                  cols="15"
                  sm="8"
                  md="6"
                >
                <v-text-field
                  v-model="editedItem.name"
                  label="Nome"
                ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="3"
            >
              <v-text-field
                v-model="editedItem.uri"
                label="URI"
              ></v-text-field>
            </v-col>
            <v-col
              cols="5"
              sm="7"
              md="3"
            >
              <v-text-field
                v-model="editedItem.price"
                label="Preço"
              ></v-text-field>
            </v-col>
            
            <v-col
              cols="2"
              sm="4"
              md="8"
            >
              <Editor :editedItem="editedItem"/>
            </v-col>
              <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                type="number"
                v-model="editedItem.quantity"
                label="Quantidade"
              ></v-text-field>

              <v-text-field
                v-model="editedItem.discount"
                label="Desconto"
              ></v-text-field>
              </v-col>
            <template>
            <v-container fluid >
              <v-radio-group 
              class="radio_group"
              label="Exibir Produto?" 
              v-model="editedItem.showcase" row mandatory>
                <v-radio  label="Sim" :value="true"></v-radio>
                <v-radio  label="Não" :value="false"></v-radio>                
              </v-radio-group>
          </v-container>
          </template>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        
      >
        mdi-delete
      </v-icon>
    </template>
    <template >
      <v-btn
        color="primary"
      >
        Reset
      </v-btn>
    </template>
                </v-data-table>
        </v-card>
    </v-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("productAdmin");
import NavBar from "@/components/shared/NavBar.vue";
import MenuDashboard from "../components/MenuDashboard.vue"
import Editor from "../components/Editor.vue"
export default {
  components: {
    NavBar,
    MenuDashboard,
    Editor
  },
  data(){
    return {
      selectItems: [
        {text:'Sim', value: 'true'},
        {text:'Não', value: 'false'}
      ],
      active: null,
      sidebarMenu: false,
      headers: [
            { text: 'Id', value: 'id'},
            { text: 'Nome', value: 'name' },
            { text: 'Quantidade', value: 'quantity', sortable: false},
            { text: 'Ativo', value: 'showcase'},
            { text: 'Actions', value: 'actions', sortable: false },
          
      ],
      editedIndex: -1,
      dialog: false, // used to toggle the dialog
      editedItem: {
        name: '',
        uri: '',
        price: 0,
        description: ``,
        image_path: 'null',
        category_id: 1,
        quantity: 0,
        showcase: null
        
      }, // empty holder for create/update ops
    }
  },
  computed: {
    items() {
      return this.productsAll.map((item) =>{
        return {
        "id": item.id,
        "name": item.name,
        "quantity": item.quantity,
        "showcase": item.showcase?'Sim':'Não',
        "price": item.price,
        "uri": item.uri,
        "description": item.description,
        "discount": item.discount,
        "category_id": item.category_id,
        "image_path": item.image_path
       }
      })
    },
    ...mapState({
      productsAll: "products_all"
    }),
  },
  created() {
    this.getProductsAll()
  },
  methods: {
    ...mapGetters(["getProductsAll"]),
    ...mapActions([
      "setProductsAll", 
      "postProduct",
      "updateProduct"]),
    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },
    save() {
      if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
          this.postProduct(this.editedItem)
        }
        this.updateProduct(this.editedItem)
        this.close()
        location.reload()
  },
  editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(item)
        this.dialog = true
      },
  },
   beforeRouteUpdate(to, from, next){
    this.productsAll = this.setProductsAll();
    next()
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.productsAll = vm.setProductsAll();
      })
    }
};
</script>

<style>
.v-input .v-label {
  font-size: 20px;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr >  td{
    font-size: 20px !important;
}
.v-data-table > .v-data-table__wrapper > table > thead> tr >  th{
    font-size: 18px !important;
}

.table {
    margin-top: 50px;
}
</style>
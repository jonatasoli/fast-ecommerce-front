<template>
  <div>
    <v-dialog v-model="dialog" max-width="700px">
        <v-card>
            <v-card-title>
                <span class="headline">Código de Rastreio</span>
            </v-card-title>
            <v-card-text>
                <v-col>
                    <v-text-field
                    v-model="editedItem.tracking"
                    label="Código de Rastreio"></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    
                >
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogMail" max-width="600px">
      <v-card>
        <v-card-title class="headline">Deseja enviar o email com o código de Rastreio?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text >Cancelar</v-btn>
          <v-btn color="blue darken-1" text >Sim</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-icon
      dense
      class="mr-2"
      @click="editItem(item)"
    >
      mdi-plus-circle
    </v-icon>
      <!-- <v-icon
      dense
      class="mr-2"
      @click="sendMail(item)"
    >
      mdi-email
    </v-icon>  -->
  </div>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "productAdmin"
);
export default {
  props: ["item", "items"],
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      id: 0,
      editedItem: {
        tracking: '',
        id_payment: 0,
        order_id:0,
      },
      dialog: false,
      dialogMail: false,
      editedIndex: -1
    }
  },
  watch:{
    $route(to) {
      this.date = to.params.date;
    }
  },
  computed: {
...mapState({
      orders: "orders"
    }),
  },
  created() {
    this.getOrders();
   
  },
  methods: {
    ...mapActions(["setOrders", "postTrackingNumber"]),
    ...mapGetters(["getOrders"]),
    close() {
      this.dialog = false
      this.editedItem.tracking = ''
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
        this.postTrackingNumber(this.editedItem)
      }
      this.dialog = false;
      location.reload()
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      
    },
    // sendMail(item) {
    //   this.editedIndex = this.items.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialogMail = true;
    // },
    // closeSend() {
    //   this.dialogMail = false;
    // }
  },
}
</script>

<style>

</style>
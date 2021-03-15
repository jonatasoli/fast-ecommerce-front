<template>
  <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        class="elevation-1"
      > 
      <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Pedidos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="headline">Código de Rastreio</span>
                </v-card-title>
                <v-card-text>
                    <v-col>
                        <v-text-field
                        v-model="editedItem.tracking_number"
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
      </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        dense
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-plus-circle
      </v-icon>
    </template>
      </v-data-table>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "productAdmin"
);
export default {
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      id: 0,
      editedItem: {
        tracking_number: '',
        id_payment: 0,
      },
      dialog: false,
      date: this.$route.params.date,
      expanded: [],
      singleExpand: false,
      order: this.getOrders(),
      editedIndex: -1,
      headers: [
        {
          text: "ID Pagamento",
          align: "start",
          value: "id_payment",
        },
        { text: "Cliente", value: "user_name" },
        { text: "Documento", value: "user_document" },
        { text: "Total", value: "amount"},
        { text: "Rastreio", value: "tracking" },
        { value: "actions"}
      ],
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
    items() {
        return this.item()
    }
  },
  created() {
    this.getOrders();
   
  },
  methods: {
    ...mapActions(["setOrders", "postTrackingNumber"]),
    ...mapGetters(["getOrders"]),
    item() {
        const orders = this.orders.map((item) => {
            return {
                "id_payment": item.payment_id,
                "order_id": item.order_id,
                "tracking": item.tracking_number,
                "user_name": item.user_name,
                "user_document": item.document,
                "amount": this.formatCurrency(item.amount / 100)
            }
        });
        const order_filter = orders.filter(function (a) {
	        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null)
    )
        return order_filter
    },
    close() {
      this.dialog = false
      this.editedItem.tracking_number = ''
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
  },
  beforeRouteUptade(to, from, next) {
    this.date = to.params.date;
    this.setOrders(this.date);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.date = to.params.date;
      vm.setOrders(vm.date)
    })
  }
  

}
</script>

<style>

</style>
<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="id_payment"
    show-expand
    class="elevation-1 table-orders"
    id="printMe"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          >Pedidos <br />
          {{ dateRangeText }}</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-simple-table>
          <thead>
            <tr>
              <th>Id Pagarme:</th>
              <th>Status:</th>
              <th>Documento:</th>
              <th>Email:</th>
              <th>Telefone:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{item.id_pagarme}}</td>
              <td>{{mutation_status(item)}}</td>
              <td>{{item.user_document}}</td>
              <td>{{item.user_email}}</td>
              <td>{{item.user_phone}}</td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-simple-table>
          <thead>
            <tr>
              <th>Rua:</th>
              <th>Número:</th>
              <th>Cidade:</th>
              <th>Bairro:</th>
              <th scope="col">CEP:</th>
              <th>Estado:</th>
              <th>Pais:</th>
              <th>Complemento:</th>
              <th>Tipo:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ item.user_street }}</td>
              <td>{{ item.user_street_number }}</td>
              <td>{{ item.user_city }}</td>
              <td>{{ item.user_neighborhood }}</td>
              <td>{{ item.user_zip_code }}</td>
              <td>{{ item.user_state }}</td>
              <td>{{ item.user_country }}</td>
              <td>{{ item.user_address_complement }}</td>
              <td>{{ item.user_address_type }}</td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-simple-table>
          <thead>
            <h4>Produtos:</h4>
            <tr>
              <th>Nome:</th>
              <th>Quantidade:</th>
              <th>Valor Unitario</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(products, i) in item.products" :key="i">
              <td>{{ products.product_name }}</td>
              <td>{{ products.qty }}</td>
              <td>{{ formatCurrency(products.price / 100) }}</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th></th>
              <th>Valor Total com Frete:</th>
              <th>Valor Total:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>{{formatCurrency(item.amount /100)}}</td>
              <td>
                {{ formatCurrency(getTotalPrice(item.products)) }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </td>
    </template>
     <template v-slot:[`item.checked`]="{ item }">
      <v-checkbox
      v-model="item.checkbox"
      @click="checkedOrder(item)"
    ></v-checkbox>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-row>
      <Tracking :item="item" :items="items" />
      <v-icon @click="print(item)">mdi-printer</v-icon>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
import Tracking from "../components/Tracking.vue";
import FormatCurrencyMixin from "@/mixins/format-currency";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "productAdmin"
);
export default {
  components: { Tracking },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      dates: this.$route.params.dates,
      status: this.$route.params.status,
      expanded: [],
      singleExpand: false,
      editedItem: {
        checkbox: false
      },
      order: this.getOrders(),
      headers: [
        {
          text: "ID Pagamento",
          value: "id_payment",
          width: 50,
        },
        { text: "Data Pedido", value: "order_date", width: 150},
        { text: "ID Pagarme", value: "id_pagarme" },

        { text: "Cliente", value: "user_name", align: "start" },
        { text: "Vendedor", value: "affiliate", width: 150 },
        { text: "Rastreio", value: "tracking" },
        { text: "Verificado", value: "checked"},
        { value: "actions", width: 100},
      ],
    };
  },
  watch: {
    $route(to) {
      console.log(to)
      this.dates = to.params.dates;
      this.status = to.params.status;
    },
  },
  mounted() {
    // const payload = {date: JSON.parse(this.new_dates), status: this.status}
    // this.setOrders(payload);
    console.log(this.new_dates)
  },
  computed: {
    ...mapState({
      orders: "orders",
    }),
    dateRangeText() {
      return JSON.parse(this.dates)
        .map((value) => this.formatDate(value))
        .sort()
        .join("-");
    },
    new_dates() {
      const new_dates = JSON.parse(this.dates);
      const date = {  
        date_start: new_dates[0],
        date_end: new_dates[1], }
      return JSON.stringify(date)
    },
    items() {
      return this.orders.map((item) => {
        return {
          id_payment: item.payment_id,
          amount: item.amount,
          order_id: item.order_id,
          id_pagarme: item.id_pagarme,
          order_date: item.order_date,
          status: item.status,
          tracking: item.tracking_number,
          user_name: item.user_name,
          user_email: item.email,
          user_phone: item.phone,
          user_document: item.document,
          user_address_type: item.address_type,
          user_country: item.country,
          user_state: item.state,
          user_city: item.city,
          user_street: item.street,
          user_street_number: item.street_number,
          user_neighborhood: item.neighborhood,
          user_address_complement: item.address_complement,
          user_zip_code: item.zipcode,
          affiliate: item.user_affiliate,
          checkbox: item.checked,
          products: item.products,
        };
      });
    },
    
  },
  created() {
    this.getOrders();
    console.log(this.orders);
  },
  methods: {
    ...mapActions(["setOrders", "postCheckedOrder"]),
    ...mapGetters(["getOrders"]),
    checkedOrder(item) {
      return this.postCheckedOrder({order_id: item.order_id, check: item.checkbox})
    },
    getTotalPrice(item) {
      console.log(item);
      const prices = this.reducePrices(item);
      console.log("sum", prices);
      return prices / 100;
    },
    reducePrices(product) {
      const reducer = (accumulator, currentValue = 0) => {
        return currentValue.price * currentValue.qty + accumulator;
      };

      const arrayIndexes = Object.values(product);
      
      const prices = arrayIndexes.reduce(reducer, 0);

      return prices;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    mutation_status(item) {
      console.log(item.id_payment)
      let status = item.status
      if(status == "paid") {
        return status = "Pagamento Aprovado"
      } else if (status == "waiting_payment") {
        return status = "Aguardando pagamento"
      } else {
        return status = "Pagamento recusado"
      }
    },
    print(item) {
      console.log(item)
      let routeData = this.$router.resolve({name: 'OrderPrint' , query: {item: JSON.stringify(item)}});
      window.open(routeData.href);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.dates = to.params.dates;
    this.status = to.params.status;
    console.log(to)
    const payload = {dates: this.new_dates, status: this.status}
    this.setOrders(payload);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.dates = to.params.dates;
      vm.status = to.params.status;
      const payload = {dates: vm.new_dates, status: vm.status}
      vm.setOrders(payload);
    });
  },
};
</script>

<style>
</style>

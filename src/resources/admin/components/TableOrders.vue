<template>
  <v-data-table
        :headers="headers"
        :items="items"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="id"
        show-expand
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
      </v-toolbar>
      </template>
      <template v-slot:expanded-item="{  headers, item }">
      <td :colspan="headers.length">
        <v-simple-table>
          <thead>
            <h4>Dados de envio:</h4>
            
            <tr>
              <th>Rua:</th>
              <th>Número:</th>
              <th>Cidade:</th>
              <th>Bairro:</th>
              <th>Estado:</th>
              <th>Pais:</th>
              <th>Complemento:</th>
              <th>Tipo:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{item.user_street}}</td>
              <td>{{item.user_street_number}}</td>
              <td>{{item.user_city}}</td>
              <td>{{item.user_neighborhood}}</td>
              <td>{{item.user_state}}</td>
              <td>{{item.user_country}}</td>
              <td>{{item.user_address_complement}}</td>
              <td>{{item.user_address_type}}</td>
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
          <tbody >
            <tr  v-for="(product, i) in item.products" :key="i">
              <td>{{product.product_name}}</td>
              <td>{{product.qty}}</td>
              <td>{{formatCurrency(product.price / 100)}}</td>
            </tr>
          </tbody>
            
          <thead>
            <tr>
              <!-- <th>Frete:</th> -->
              <th>Valor Total:</th>
              <th>Valor Total com frete:</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="(product, i) in item.products" :key="i">
              <!-- <td>{{formatCurrency((item.amount / 100) - getTotalPrice )}}</td> -->
              <td>{{formatCurrency((product.price * product.qty) / 100)}}</td>
              <td>{{formatCurrency(item.amount / 100)}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </td>
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
      date: this.$route.params.date,
      expanded: [],
      singleExpand: false,
      order: this.getOrders(),
      headers: [
        {
          text: "ID Pagamento",
          align: "start",
          value: "id_payment",
        },
        { text: "Rastreio", value: "tracking" },
        { text: "Cliente", value: "user_name" },
        { text: "Produto", value: "product_name"},
        { text: "Documento", value: "user_document" },
        { text: "Vendedor", value: "affiliate"}
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
      return this.orders.map((item) => {
        return {
          id_payment: item.payment_id,
          tracking: item.tracking_number,
          user_name: item.user_name,
          user_document: item.document,
          user_address_type: item.address_type,
          user_country: item.country,
          user_state: item.state,
          user_city: item.city,
          user_street: item.street,
          user_street_number: item.street_number,
          user_neighborhood: item.neighborhood,
          user_address_complement: item.address_complement,
          user_user_zip_code: item.zip_code,
          affiliate: item.user_affiliate,
          amount: item.amount,
          products: item.products,
          product_name: item.products.map(value => value.product_name),
          id: item.id
        }
      });
    },
    // getTotalPrice() {
    //   let price = 0
    //   this.items.products.forEach(function (value) {
    //     price += value.price * value.qty
    //   })
    //   return price / 100
    // },
  },
  created() {
    this.getOrders();
    console.log(this.date)

  },
  methods: {
    ...mapActions(["setOrders"]),
    ...mapGetters(["getOrders"])
  },
  beforeRouteUptade(to, from, next) {
    this.date = to.params.date;
    this.orders = this.setOrders(this.date);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.date = to.params.date;
      vm.orders = vm.setOrders(vm.date)
    })
  }

}
</script>

<style>

</style>
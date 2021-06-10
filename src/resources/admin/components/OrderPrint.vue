<template>
  <v-app>
    <v-container class="box">
      <h1>Pedido N {{ item.order_id }}</h1>
      <hr />
      <div class="data-payment">
        <span><strong>Data pedido: </strong> {{ item.order_date }}</span>
        <span><strong>Id Pagamento: </strong> {{ item.id_payment }}</span>
        <span><strong>Id Pagarme: </strong> {{ item.id_pagarme }}</span>
        <span><strong>Status: </strong> {{ mutation_status(item) }}</span>
        <span><strong>Afiliado: </strong> {{ item.affiliate }}</span>
        <span><strong>Código Rastreio: </strong> {{ item.tracking }}</span>
      </div>
      <hr />
      <div class="data-user">
        <span><strong>Nome: </strong> {{ item.user_name }}</span>
        <span><strong>Documento:</strong> {{ item.user_document }}</span>
        <span><strong>Telefone:</strong> {{ item.user_phone }}</span>
        <span><strong>Email:</strong> {{ item.user_email }}</span>
        <span><strong>CEP:</strong> {{ item.user_zip_code }}</span>
        <span><strong>Endereço:</strong> {{ item.user_street }}</span>
        <span><strong>Número:</strong> {{ item.user_street_number }}</span>
        <span><strong>Complemento:</strong> {{ item.address_complement }}</span>
        <span><strong>Bairro:</strong> {{ item.user_neighborhood }}</span>
        <span><strong>Cidade:</strong> {{ item.user_city }}</span>
        <span><strong>Estado:</strong> {{ item.user_state }}</span>
        <span><strong>País:</strong> {{ item.user_country }}</span>
      </div>
      <hr />

      <div v-for="(product, index) in item.products" :key="index" class="products">
        <div class="product-name">
          <span>{{ product.product_name }}</span>
        </div>
        <div class="product-itens">
          <span><strong>Quantidade: </strong> </span>
          <span>{{ product.qty }}</span>
          <span><strong>Preço unitário: </strong></span>
          <span>{{ formatCurrency(product.price / 100) }}</span>
          <span><strong>SubTotal: </strong></span>
          <span>{{ formatCurrency((product.price / 100) * product.qty) }}</span>
        </div>
      </div>
      <hr />
      <div class="total-price">
        <span
          ><strong>Total: </strong
          >{{ formatCurrency(getTotalPrice(item.products)) }}</span
        >
        <span
          ><strong>Total com frete: </strong>{{ formatCurrency(item.amount / 100) }}</span
        >
      </div>
      <v-btn @click="print" class="btn-print">Imprimir</v-btn>
    </v-container>
  </v-app>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";
export default {
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      item: JSON.parse(this.$route.query.item),
    };
  },
  methods: {
    print() {
      window.print();
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

    mutation_status(item) {
      console.log(item.id_payment);
      let status = item.status;
      if (status == "paid") {
        return (status = "Pagamento Aprovado");
      } else if (status == "waiting_payment") {
        return (status = "Aguardando pagamento");
      } else {
        return (status = "Pagamento recusado");
      }
    },
  },
};
</script>

<style scoped>
.box {
  color: black;
}
.v-application {
  background-color: white !important;
}
span {
  font-size: 20px;
}
.products {
  margin-top: 20px;
}
.product-itens {
  display: flex;
  justify-content: space-between;
}

.data-user,
.data-payment {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.total-price {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  float: right;
}

.btn-print {
  margin-top: 100px;
}

@media print {
  .btn-print {
    display: none;
  }
}
</style>

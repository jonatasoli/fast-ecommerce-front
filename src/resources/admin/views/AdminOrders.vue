<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="desserts"
      item-key="name"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    desserts: [
      {
        id_payment: 1,
        tracking: "SE03482BR",
        product_name: "PRODUTO",
        amount: "R$100,00",
        qty: 10,
        user_name: "Joaozinho",
        user_document: "01234567890",
        user_address_type: "Casa",
        user_country: "Brasil",
        user_state: "São Paulo",
        user_street: "Rua X",
        user_street_number: "12B",
        user_neighborhood: "Baixo H",
        user_address_complement: "SIM",
        user_zip_code: "12120-000",
        affiliate: "Vendor A",
      },
    ],
    headers: [
      {
        text: "ID Pagamento",
        align: "start",
        value: "id_payment",
      },
      { text: "Rastreio", value: "tracking" },
      { text: "Nome do Produto", value: "product_name" },
      { text: "Valor", value: "amount" },
      { text: "Quantidade", value: "qty" },
      { text: "Cliente", value: "user_name" },
      { text: "Documento", value: "user_document" },
      { text: "Tipo de Endereço", value: "user_address_type" },
      { text: "País", value: "user_country" },
      { text: "Cidade", value: "user_city" },
      { text: "Estado", value: "user_state" },
      { text: "Rua", value: "user_street" },
      { text: "Número", value: "user_street_number" },
      { text: "Bairro", value: "user_neighborhood" },
      { text: "Complemento", value: "user_address_complement" },
      { text: "CEP", value: "user_zip_code" },
      { text: "Vendedor", value: "affiliate" },
    ],
  }),
};
</script>

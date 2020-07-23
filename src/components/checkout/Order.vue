<template>
  <section class="section">
    <div class="column is-three-fifths is-offset-one-fifth">
      <h3>Resumo</h3>
    </div>
  </section>
</template>

<script>
/* import { mapState } from "vuex"; */

export default {
  data() {
    return {
      labelPosition: "on-border",
      hasError: false
    };
  }
  /* computed: { */
  /*   ...mapState("direct_sales", ["direct_sales"]) */
  /* }, */
  /* methods: { */
  /*   onSubmit() { */
  /*     const _transaction = Object.assign({}, this.transaction); */
  /*     console.log("Formulario ", _transaction); */
  /*   } */
  /* } */
};
// Todo
// 1 - Configurar o campo de completar endereço
// 2 - Validações
// 3 - Forma de pagamento
// 4 - Comprar
</script>

<style scoped lang="scss"></style>

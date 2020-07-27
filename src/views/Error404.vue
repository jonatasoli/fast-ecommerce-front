<template>
  <div>
    <div class="container">
      <div class="notification is-danger">
        <h3 class="text-center">Erro 404!</h3>
        <p class="text-center">Página não encontrada.</p>
      </div>
      <button class="button is-info" @click="$router.back()">Voltar</button>
    </div>
  </div>
</template>

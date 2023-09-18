<template>
  <div class="loading">
    <div class="spinner" />
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  width: 100%;
}

.spinner  {
  width: 60px;
  height: 60px;
  border: 3px solid #b5b5b5;
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  }

  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
  }
</style>

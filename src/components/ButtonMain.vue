<template>
  <button class="cartPage__check-btn">
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.cartPage__check-btn {
  padding: 10px 50px;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: chartreuse;
  cursor: pointer;
  transition: .2s ease-in;

  &:hover {
    background-color: rgb(131, 238, 24);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(-1px);
  }
}
</style>
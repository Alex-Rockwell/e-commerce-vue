<template>
  <div>
    <div class="overlay" @click="close">
      <div class="modal" @click.stop>
        <h3 class="modal__text">
          Please choose color and size for this product!
        </h3>
        <ButtonMain
          @click="$emit('update:show', false)"
          class="cartPage__check-btn"
          >Close</ButtonMain
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonMain from "./ButtonMain.vue";

const emit = defineEmits(["update:show"]);
function close() {
  emit("update:show", false);
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 450px;
  min-height: 200px;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: white;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation-name: a1;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}
@keyframes a1 {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.modal__text {
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 40px;
}
</style>

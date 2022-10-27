<template>
  <div v-if="isOpen" class="backdrop">
    <div class="popup">
      <h3>Please, confirm your order!</h3>
      <hr />
      <div class="footer">
        Phone: <input type="text" placeholder="+1-222-333-444" />
        &nbsp;
        <button @click="$emit('confirm', { saveCartState: saveCartState })">
          Confirm
        </button>
        &nbsp;
        <button @click="$emit('close', null)" class="cancel-button">
          Cancel
        </button>
      </div>
      <div class="checkbox">
        <input
          type="checkbox"
          :checked="saveCartState"
          @click="saveCartState = !saveCartState"
        />Save ordered products in cart
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConfirmationModal",
  props: {
    isOpen: { type: Boolean, required: true },
  },
  emits: {
    close: null,
    confirm: null,
  },
  data() {
    return {
      saveCartState: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.popup {
  top: 50px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
}

.popup h3 {
  text-align: center;
  margin: 0;
}
.cancel-button {
  background-color: indianred;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.footer {
  align-items: center;
  margin: auto;
}
.checkbox {
  text-align: left;
}
</style>

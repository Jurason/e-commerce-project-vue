<template>
  <div v-if="isOpen" class="confirmation-modal__backdrop">
    <div class="confirmation-modal__content">
      <h3>Please, confirm your order!</h3>
      <hr />
      <div class="confirmation-modal__content__footer">
        Phone: <input type="text" placeholder="+1-222-333-444" />
        &nbsp;
				<BaseButton
						:disabled="false"
						name="Confirm"
						@click="$emit('confirm', { saveCartState: saveCartState })"
				/>&nbsp;
				<BaseButton
						:disabled="false"
						name="Cancel"
						@click="$emit('close', null)"
						class="confirmation-modal__content__footer__cancel-button cancel-button"
				/>
      </div>
      <div class="confirmation-modal__content__checkbox">
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
import BaseButton from "./BaseButton";

export default {
  name: "ConfirmationModal",
	components: {
		BaseButton
	},
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
	watch: {
		isOpen(){
			this.saveCartState = false
		}
	}
};
</script>

<style lang="scss" scoped>
.confirmation-modal__content {
  top: 20%;
  padding: 20px;
  left: 40%;
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 1em;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.confirmation-modal__content h3 {
  text-align: center;
  margin: 0;
}
.confirmation-modal__content__footer__cancel-button {
  background-color: indianred;
}
.confirmation-modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.confirmation-modal__content__footer {
  align-items: center;
  margin: auto;
}
.confirmation-modal__content__checkbox {
  text-align: left;
}
</style>

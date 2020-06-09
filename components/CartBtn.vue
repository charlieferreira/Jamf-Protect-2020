<template>
  <a href="#" class="m-cart-button" @click="toggle">
    <div class="m-cart-button__label">
      <div class="m-cart-button__icon">
        <img src="@/assets/images/cart-icon.svg" onload="SVGInject(this)" alt="Cart">
      </div>
      <p class="m-cart-button__text">Summary</p>
    </div>
    <p :class="['m-cart-button__price', isPriceLoading ? 'default' : 'e-price-loading']">{{ total }}</p>
  </a>
  <!-- / m-cart-button -->

</template>

<script>
import SVGInject from '@iconfu/svg-inject';

export default {
  name: 'CartBtn',
  computed: {
    total() {
      return this.$store.getters.formattedTotalPrice
    },
    isPriceLoading() {
      return this.$store.getters.isLoading('price');
    },
  },
  methods: {
    toggle(e) {
      e.preventDefault()
      Event.$emit('toggle-sidebar')
    }
  },
}
</script>
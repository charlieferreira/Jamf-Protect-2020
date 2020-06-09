<template>
  <div :class="['m-sidebar', active ? 'm-sidebar--active' : '']">
    <div class="m-sidebar__bg"></div>
    <div class="m-summary-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-lg-4 offset-lg-8 col-md-5 offset-md-7 col-sm-7 offset-sm-5 col-12">
            <aside class="m-summary">
              <div :class="['m-loader', !isLoading ? 'm-loader--active' : '']">
                <img src="@/assets/images/puff.svg" alt="" class="m-loader__icon">
              </div>
              <div class="m-summary__close" @click="toggleSidebar()">
                <span></span><span></span>
              </div>
              <!-- / m-summary__close -->

              <div class="m-summary__currency">
                <p class="m-summary__currency-text">Currency</p>
                
                <SelectBox placeholder="Currency" name="currency" :value="currency.value" :options="currency.options" @change="updateCurrency" />
                <!-- / e-select-box -->

              </div>
              <!-- / m-summary__currency -->

              <div class="e-cta e-cta--box">
                <a href="https://www.jamf.com/lp/ecom-contact/" target="_blank" rel="nofollow" class="e-cta__link">Contact Jamf</a>
              </div>
              <!-- / e-cta -->

              <h3 class="m-summary__header">Summary</h3>
              <div class="m-summary__table">
                <div class="m-summary__group">

                  <div class="m-summary__row" v-for="cartItem in cart.items" :key="cartItem.name">
                    <p class="m-summary__label">{{ cartItem.name }}</p>
                    <p :class="['m-summary__price', isPriceLoading ? 'default' : 'e-price-loading']">{{ formattedPrice(cartItem.price) }}</p>
                  </div>
                  <!-- / m-summary__row -->

                </div>
                <!-- / m-summary__group -->

                <div class="m-summary__group">
                  <div class="m-summary__row">
                    <p class="m-summary__label m-summary__label--featured">Subtotal</p>
                    <p :class="['m-summary__price', isPriceLoading ? 'default' : 'e-price-loading']">{{ formattedPrice(cart.summary.net) }}</p>
                  </div>
                  <!-- / m-summary__row -->

                  <div class="m-summary__row">
                    <p class="m-summary__label m-summary__label--featured">Taxes & Fees</p>
                    <p :class="['m-summary__price', isPriceLoading ? 'default' : 'e-price-loading']">{{ formattedPrice(cart.summary.vat) }}</p>
                  </div>
                  <!-- / m-summary__row -->

                </div>
                <!-- / m-summary__group -->

                <div class="m-summary__group m-summary__group--total">
                  <div class="m-summary__row">
                    <p class="m-summary__label">Total</p>
                    <p :class="['m-summary__price', isPriceLoading ? 'default' : 'e-price-loading']">{{ formattedPrice(cart.summary.gross) }}</p>
                  </div>
                </div>
                <!-- / m-summary__group -->

              </div>
              <!-- / m-summary__table -->

              <div v-if="showActions" class="m-summary__actions">
                <a href="#" @click="proceedCheckout( $event, 'checkout' )" id="completePurchase" class="e-button">Complete Purchase</a>
                <a href="#" @click="proceedCheckout( $event, 'quote' )" class="e-button e-button--outline e-button--dark">Request Quote</a>
              </div>

            </aside>
            <!-- / m-summary -->

          </div>
          <!-- / column -->

        </div>
      </div>
    </div>
    <!-- / m-summary-wrapper -->

  </div>
  <!-- / m-step__sidebar -->
  
</template>

<script>
import { mapGetters } from 'vuex';
import SelectBox from '@/components/SelectBox.vue';
import setPageAndSidebarHeights from './../assets/js/functions.js';

export default {
  name: 'Sidebar',
  data() {
    return {
      active: false,
    }
  },
  computed: {
    ...mapGetters({
      formattedPrice: 'formattedPrice',
      currency: 'currencyForSelectbox'
    }),
    showActions() {
      return (this.$store.state.currentStep == 6) ? true : false
    },
    cart() {
      return this.$store.state.cart
    }, 
    isLoading() {
      return this.$store.getters.isLoading('cart');
    },
    isPriceLoading() {
      return this.$store.getters.isLoading('price');
    },
  },
  methods: {
    updateCurrency(params) {
      const newVal = params.value
      if (this.currency.value != newVal) {
        this.$store.dispatch('changeCurrency', newVal)
      }
    },
    toggleSidebar() {
      this.active = !this.active
      if(this.active) {
        document.querySelector('html, body').classList.add('blocked');
      } else {
        document.querySelector('html, body').classList.remove('blocked');
      }
    },
    proceedCheckout(e, scope) {
      e.preventDefault();
      this.$store.dispatch('generateCartUrl', scope)
    }
  },
  components: {
    SelectBox
  },
  created() {

    setPageAndSidebarHeights();

    Event.$on('toggle-sidebar', () => {
      this.toggleSidebar()
    })
  },
  mounted() {
    if(document.querySelector('.m-loader__icon')) {
      SVGInject(document.querySelector('.m-loader__icon'));
    }
  },
}
</script>
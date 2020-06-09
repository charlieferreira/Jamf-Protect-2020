<template>
  <main class="p-step p-step--1">
    <div class="m-step">
      <Sidebar />

      <div class="container">
        <div class="m-step__container">
          <div class="row">
            <div class="col-xl-7 col-lg-10 col-12">
              <ProgressBar />

              <h2 class="m-step__subheader">Select number of devices to subscribe:</h2>
              <div class="m-box">
                <div class="m-box__body m-box__body--table">
                  <div class="m-table">
                    <div class="m-table__row" v-for="product in products" :key="product.id">
                      <div class="m-table__column">
                        <p class="m-table__name">{{ product.name }}</p>
                      </div>
                      <!-- / m-table__column -->

                      <div class="m-table__column">
                        <Tooltip label="Price Scales" v-show="isEducation" featured>
                          <template v-slot:content>
                            <p class="e-tooltip__header">{{ product.name }}</p>
                            <p class="e-tooltip__subheader">per device based on total licenses</p>
                            <div class="e-tooltip__content">
                              <ul class="e-tooltip__table">
                                <li v-for="price in product.pricing" class="e-tooltip__row">
                                  <p class="e-tooltip__label">{{ price.label }} total licenses:</p>
                                  <p class="e-tooltip__price">{{ formattedPrice(price.value) }}</p>
                                </li>
                                <!-- / e-tooltip__row -->

                              </ul>
                              <!-- / e-tooltip__table -->

                            </div>
                          </template>
                        </Tooltip>
                      </div>
                      <!-- / m-table__column -->

                      <div class="m-table__column">
                        <p class="m-table__label">Per device <strong :class="isPriceLoading ? 'default' : 'e-price-loading'">{{ formattedPrice(product.price) }}</strong></p>
                      </div>
                      <!-- / m-table__column -->

                      <div class="m-table__column">
                        <div class="m-table__counter">
                          <p class="m-table__label">Devices</p>
                          <div class="e-counter">
                            <div @click="decreaseQty(product.id)" class="e-counter__remove"></div>
                            <input type="number" min="0" max="9999" :value="product.qty" @input="changeQty(product.id, $event.target.value)" class="e-counter__input">
                            <div @click="increaseQty(product.id)" class="e-counter__add"></div>
                          </div>
                          <!-- / e-counter -->

                        </div>
                      </div>
                      <!-- / m-table__column -->

                    </div>
                    <!-- / m-table__row -->

                    <div class="m-table__row">
                      <div class="m-table__column m-table__column--summary">
                        <p class="m-table__label m-table__label--summary">Total licenses: <strong>{{ totalQty }}</strong></p>
                        <p class="m-table__minimum">Minimum purchase: <span id="minimumPurchase">{{ minQty }} licenses</span></p>
                      </div>
                      <!-- / m-table__column -->

                    </div>
                    <!-- / m-table__row -->

                  </div>
                  <!-- / m-table -->

                </div>
                <!-- / m-box__body -->

                <div class="m-box__footer">
                  <div class="e-tooltip e-tooltip--empty">
                    <div class="e-tooltip__icon"></div>
                    <p class="e-tooltip__text">Annual subscription. Billed annually.</p>
                  </div>
                  <!-- / e-tooltip -->

                </div>
                <!-- / m-box__footer -->

              </div>
              <!-- / m-box -->

              <div class="m-page__actions">
                <NextStepButton link_to="step2" stepId="2" text="Next step" :img="require(`@/assets/images/strzalka.svg`)" />
              </div>
              <!-- / m-page__actions -->

            </div>
            <!-- / column -->

          </div>

          <CTA />
          <!-- / e-cta -->

        </div>
        <!-- / m-step__container -->

      </div>
    </div>
    <!-- / m-step -->

  </main>
  <!-- / p-step -->
</template>

<script>
import { mapGetters } from 'vuex'

import NextStepButton from '@/components/NextStepButton.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Tooltip from '@/components/Tooltip.vue'
import CTA from '@/components/CTA.vue'

export default {
  name: 'Step1',
  computed: {
    ...mapGetters([
      'minQty', 
      'totalQty',
      'formattedPrice',
      'isEducation'
    ]),
    products() {
      return this.$store.state.products
    },
    isPriceLoading() {
      return this.$store.getters.isLoading('price');
    }
  },
  methods: {
    getFormattedPrice(price) {
      return this.$store.getters.formattedPrice(price);
    },
    changeQty(productId, val) {
      this.$store.dispatch('updateProductQty', {
        id: productId,
        qty: val
      })
      Event.$emit('validate-step-1')
    },
    decreaseQty(productId) {
      this.$store.dispatch('decreaseProductQty', productId)
      Event.$emit('validate-step-1')
    },
    increaseQty(productId) {
      this.$store.dispatch('increaseProductQty', productId)
      Event.$emit('validate-step-1')
    }
  },
  components: {
    NextStepButton, Sidebar, Tooltip, ProgressBar, CTA
  },
  mounted() {
    this.$store.dispatch('getCart')
    this.$store.dispatch('changeCurrentStep', 1)
    this.$store.dispatch('changePriceRule')
    this.$store.dispatch('updateProductPriceList')
  }
}
</script>

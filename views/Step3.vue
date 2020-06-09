<template>
  <main class="p-step p-step--3">
    <div class="m-step">
      <Sidebar />

      <div class="container">
        <div class="m-step__container">
          <div class="row">
            <div class="col-xl-7 col-lg-10 col-12">
              <ProgressBar />

              <h2 class="m-step__subheader">Choose your support package</h2>
              <div class="m-box">
                <div class="m-box__body m-box__body--table">
                  <h3 class="m-box__header">Based on your organization type and number of devices selected, we recommend the selection below.</h3>
                  <div class="m-box__radios">

                    <MCheck v-for="product in products" :key="product.id" :input_id="product.value" type="support-package"  :price="!product.price ? '' : getFormattedPrice(product.price)" :value="product.value" :full="!product.price && !product.price_text" :wider="!product.price" :price_only="!product.price">
                      <template v-slot:label>{{ product.name }}</template>
                      <template v-slot:tooltip>
                        <Tooltip>
                          <template v-slot:content>
                            <p class="e-tooltip__header">{{ product.name }}</p>
                            <div class="e-tooltip__content">
                              <p>{{ product.description }}</p>
                            </div>
                          </template>
                        </Tooltip>
                      </template>
                      <template v-if="!product.price" v-slot:price_text>
                        <p v-html="product.price_text"></p>
                      </template>
                    </MCheck>

                  </div>
                  <!-- / m-box__radios -->

                </div>
                <!-- / m-box__body -->

                <div class="m-box__footer">
                  <Tooltip empty>Annual subscription. Billed annually.</Tooltip>
                </div>
                <!-- / m-box__footer -->

              </div>
              <!-- / m-box -->

              <div class="m-page__actions">
                <router-link to="step2" id="prevStep" class="e-button e-button--outline e-button--dark">Back</router-link>
                
                <a href="#" @click="toggleSidebar($event)" class="e-button e-button--complete e-button--mobile">Go to summary</a>

              <!-- <NextStepButton link_to="step3" stepId="3" text="Next step" :img="require(`@/assets/images/strzalka.svg`)"  />-->
              </div>
              <!-- / m-page__actions -->

            </div>
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
import SVGInject from '@iconfu/svg-inject'

import Sidebar from '@/components/Sidebar.vue'
import NextStepButton from '@/components/NextStepButton.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import CartBtn from '@/components/CartBtn.vue'
import Tooltip from '@/components/Tooltip.vue'
import MCheck from '@/components/MCheck.vue'
import CTA from '@/components/CTA.vue'

export default {
  name: 'Step3',
  components: {
    Sidebar, NextStepButton, ProgressBar, CartBtn, Tooltip, MCheck, CTA
  },
  computed: {
    products() {
      return this.$store.state.support_packages.products;
    },
  },
  methods: {
    getFormattedPrice(price) {
      return this.$store.getters.formattedPrice(price);
    },
  },
  mounted() {
    this.$store.dispatch('changeCurrentStep', 6)
  }
}
</script>
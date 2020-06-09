<template>
  <main class="p-step p-step--2">
    <div class="m-step">
      <Sidebar />

      <div class="container">
        <div class="m-step__container">
          <div class="row">
            <div class="col-xl-7 col-lg-10 col-12">
              <ProgressBar />

              <h2 class="m-step__subheader">Jamf Connect onboarding:</h2>
              <div class="m-box">
                <div class="m-box__body m-box__body--plans">
                  <h3 class="m-box__header">Onboarding service (implementation) is required for new Jamf Connect subscriptions. For more information, <a href="https://www.jamf.com/lp/ecom-contact/" target="_blank">contact Jamf</a>.</h3>
                  <div class="m-box__radios">

                    <MCheck v-for="product in products" :key="product.id" tooltip_list="product.tooltip_list" tooltip_content="product.tooltip_content" type="implementation-service" :input_id="product.value" :price="!product.price ? '' : getFormattedPrice(product.price)" :value="product.value" :require="product.require">
                      <template v-slot:label>{{ product.name }}</template>
                      <template v-slot:link>
                        <a v-if="product.statement" target="_blank" :href="product.statement">View Statement of Work</a>
                      </template>
                      <template v-if="!product.price" v-slot:price_text>
                        <p v-html="product.price_text"></p>
                      </template>
                    </MCheck>

                  </div>
                  <!-- / m-box__radios -->

                </div>
                <!-- / m-box__body -->

              </div>
              <!-- / m-box -->

              <div class="m-page__actions">
                <router-link to="step1" id="prevStep" class="e-button e-button--outline e-button--dark">Back</router-link>
                <NextStepButton link_to="step4" stepId="4" text="Next step" :img="require(`@/assets/images/strzalka.svg`)" />
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
import SVGInject from '@iconfu/svg-inject';

import Sidebar from '@/components/Sidebar.vue'
import NextStepButton from '@/components/NextStepButton.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import CartBtn from '@/components/CartBtn.vue'
import Tooltip from '@/components/Tooltip.vue'
import MCheck from '@/components/MCheck.vue'
import CTA from '@/components/CTA.vue'

export default {
  name: 'Step2',
  computed: {
    products() {
      return this.$store.state.implementation_services.products;
    },
  },
  methods: {
    getFormattedPrice(price) {
      return this.$store.getters.formattedPrice(price);
    },
  },
  components: {
    Sidebar, NextStepButton, ProgressBar, CartBtn, Tooltip, MCheck, CTA
  },
  mounted() {
    this.$store.dispatch('changeCurrentStep', 2)
  }
}
</script>
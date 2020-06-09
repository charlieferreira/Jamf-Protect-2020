<template>
  <main class="p-step p-step--5">
    <div class="m-step">
      <Sidebar />

      <div class="container">
        <div class="m-step__container">
          <div class="row">
            <div class="col-xl-7 col-lg-10 col-12">
              <ProgressBar />

              <h2 class="m-step__subheader">Select your subscription length:</h2>
              <div class="m-box">
                <div class="m-box__body m-box__body--plans">
                  <h3 class="m-box__header">Lock in pricing by paying future years now. Applies to subscription licenses only.</h3>
                  <div class="m-box__radios">

                    <MCheck v-for="product in products" :key="product.id" :input_id="product.value" type="subscription" :price="getFormattedPrice(product.price)" :price_text="product.price_text" :value="product.value" :full="!product.price && !product.price_text ? true : false" wider>
                      <template v-slot:label>
                        {{ product.name }}
                        <span>{{ product.description }}</span>
                      </template>
                      <template v-slot:price_text>
                        <p v-html="product.price_text" style="display: inline-block;font-size: 12px;line-height: 22px;margin-left: 5px;">{{product.price_text}}</p>
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
                <NextStepButton link_to="step3" stepId="3" text="Next step" :img="require(`@/assets/images/strzalka.svg`)" />
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
import SVGInject from '@iconfu/svg-inject';

import Sidebar from '@/components/Sidebar.vue'
import NextStepButton from '@/components/NextStepButton.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import CartBtn from '@/components/CartBtn.vue'
import Tooltip from '@/components/Tooltip.vue'
import MCheck from '@/components/MCheck.vue'
import CTA from '@/components/CTA.vue'

export default {
  //name: 'Step5',
  name: 'Step2',
  components: {
    Sidebar, NextStepButton, ProgressBar, CartBtn, Tooltip, MCheck, CTA
  },
  computed: {
    products() {
      return this.$store.state.subscriptions.products;
    },
  },
  methods: {
    getFormattedPrice(price) {
      return this.$store.getters.formattedPrice(price);
    },
  },
  mounted() {
    //this.$store.dispatch('changeCurrentStep', 6)
    this.$store.dispatch('changeCurrentStep', 2)
  }
}
</script>

<template>
  <main class="p-step p-step--4">
    <div class="m-step">
      <Sidebar />

      <div class="container">
        <div class="m-step__container">
          <div class="row">
            <div class="col-xl-7 col-lg-10 col-12">
              <ProgressBar />

              <h2 class="m-step__subheader">Choose your cloud hosting</h2>
              <div class="m-box">
                <div class="m-box__body m-box__body--table">
                  <h3 class="m-box__header">Based on your organization type, we recommend the following:</h3>
                  <div class="m-box__radios">

                    <MCheck v-for="product in products" :key="product.id" :input_id="product.value" type="cloud-hosting" :price="!product.price ? '' : getFormattedPrice(product.price)" :price_text="product.price_text" :value="product.value" :full="!product.price && !product.price_text ? true : false" wider>
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

                <div class="m-box__footer m-box__footer--divider">
                  <Tooltip empty>Annual subscription. Billed annually.</Tooltip>
                </div>
                <!-- / m-box__footer -->

                <div class="m-box__body">
                  <div class="e-field e-field--text">
                    <div class="e-field__label">
                      <p class="e-field__label-text">Enter your preferred cloud instance name</p>
                      <Tooltip>
                        <template v-slot:content>
                          <div class="e-tooltip__content">
                            <p>Save time setting up your cloud environment and choose your cloud instance name now.</p>
                            <p><strong>Character restrictions:</strong></p>
                            <ul>
                              <li>20 characters or less</li>
                              <li>No special characters</li>
                              <li>No spaces</li>
                              <li>Cannot begin with a number</li>
                              <li>Instance name will be all lowercase</li>
                            </ul>
                            <p>Additional restrictions apply. Jamf will contact you if there are any concerns with your requested name.</p>
                          </div>
                        </template>
                      </Tooltip>
                    </div>
                    <!-- / e-field__label -->

                    <input type="text" v-model="cloudInstanceName" class="e-input">
                  </div>
                  <!-- / e-field -->

                  <div class="m-box__content">
                    <p>
                      Your instance will appear like: <br>
                      https://yourinstancename.jamfcloud.com
                    </p>
                    <p>
                      No special characters no spaces, cannot begin with a number, must be lower case, 20 characters or less. <br>
                      Some restrictions apply.
                    </p>
                    <p>
                      Leave blank if you prefer to select your name later.
                    </p>
                  </div>

                </div>
                <!-- / m-box__body -->

              </div>
              <!-- / m-box -->

              <div class="m-page__actions">
                <router-link to="step3" id="prevStep" class="e-button e-button--outline e-button--dark">Back</router-link>
                <NextStepButton link_to="step5" stepId="5" text="Next step" :img="require(`@/assets/images/strzalka.svg`)" />
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
  name: 'Step4',
  components: {
    Sidebar, NextStepButton, ProgressBar, CartBtn, Tooltip, MCheck, CTA
  },
  computed: {
    products() {
      return this.$store.state.cloud_hostings.products;
    },
    cloudInstanceName: {
      get() {
        return this.$store.state.cloud_hostings.instance_name;
      }, 
      set(value) {
        this.$store.commit('updateCloudInstanceName', value);
      },
    }
  },
  methods: {
    getFormattedPrice(price) {
      return this.$store.getters.formattedPrice(price);
    },
  },
  mounted() {
    this.$store.dispatch('changeCurrentStep', 4)
  }
}
</script>
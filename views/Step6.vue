<template>
  <main class="p-step p-step--6">
    <div class="m-step">
      <Sidebar />

      <div class="container">
        <div class="m-step__container">
          <div class="row">
            <div class="col-xl-7 col-lg-10 col-12">
              <ProgressBar />

              <h2 class="m-step__subheader">Select your Training Pass to enroll in Jamf training courses</h2>
              <div class="m-box">
                <div class="m-box__body m-box__body--table">
                  <h3 class="m-box__header">Use Training Pass to enroll in Jamf Training Courses</h3>
                  <div class="m-box__radios">

                    <MCheck v-for="product in products" :key="product.id" :input_id="product.value" type="training-pass" :price="!product.price ? '' : getFormattedPrice(product.price)" :value="product.value" :full="!product.price && !product.price_text ? true : false" :wider="product.price ? false : true" :price_only="product.price ? false : true">
                      <template v-slot:label>{{ product.name }}</template>
                      <template v-if="product.description" v-slot:tooltip>
                        <Tooltip>
                          <template v-slot:content>
                            <p class="e-tooltip__header">{{ product.name }}</p>
                            <div class="e-tooltip__content">
                              <p>{{ product.description }}</p>
                            </div>
                          </template>
                        </Tooltip>
                      </template>
                    </MCheck>

                  </div>
                  <!-- / m-box__radios -->

                </div>
                <!-- / m-box__body -->

                <div class="m-box__footer">
                  <Tooltip more>
                    <template v-slot:heading>
                      <p>Additional Terms Apply.</p>
                      <p>
                        Subscription is valid for one (1) year from the date of purchase. <br>
                      </p>
                    </template>
                    <template v-slot:content>
                      <p class="e-tooltip__header">Policies</p>
                      <div class="e-tooltip__content">
                        <p>Minimum one (1) year subscription is required. Multiple subscriptions may be purchased. Subscription is valid for one (1) year from the date of purchase. Training Passes incurring more than two (2) late cancellations*/no shows** during the term of the Training Pass will be deactivated and future enrollments will be allowed.</p>
                        <p>*Late cancellation — Providing cancellation notice less than ten (10) business day prior to the start of the training course or certification exam retest.</p>
                        <p>**No show — not present on the first (1) and second (2) days of the Training Course. Customer will be removed from the class roster if not present on the first (1) and second (2) days or not present for the certification exam retest.</p>
                        <p>Customer must pre-register to attend a training course or certification exam retest. Subscription must be active to register, enroll and attend a training course or certification exam retest. Must be active/valid throughout all four (4) days of the training course.</p>
                      </div>
                    </template>
                  </Tooltip>
                </div>
                <!-- / m-box__footer -->

              </div>
              <!-- / m-box -->

              <div class="m-page__actions">
                <router-link to="step5" id="prevStep" class="e-button e-button--outline e-button--dark">Back</router-link>
                <a href="#" @click="toggleSidebar($event)" class="e-button e-button--complete e-button--mobile">Go to summary</a>
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
import Sidebar from '@/components/Sidebar.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import CartBtn from '@/components/CartBtn.vue'
import Tooltip from '@/components/Tooltip.vue'
import MCheck from '@/components/MCheck.vue'
import CTA from '@/components/CTA.vue'

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

export default {
  name: 'Step6',
  components: {
    Sidebar, ProgressBar, CartBtn, Tooltip, MCheck, CTA
  },
  computed: {
    products() {
      return this.$store.state.training_passes.products;
    },
  },
  methods: {
    toggleSidebar(e) {
      e.preventDefault();
      Event.$emit('toggle-sidebar');
    },
    scrollToSection(to, duration = 1000, element = document.body) {
      const toOffset = document.querySelector(to).offsetTop;
      window.scrollTo(0, toOffset);
    },
    getFormattedPrice(price) {
      return this.$store.getters.formattedPrice(price);
    },
  },
  mounted() {
    this.$store.dispatch('changeCurrentStep', 6)
  }
}
</script>
<template>
  <main class="p-not-found">
    <section class="m-page">
      <div class="container">
        <div class="m-page__container">
          <div class="row">
            <div class="col-12">
              <h1 class="m-page__header">Page not found</h1>
              <h2 class="m-page__subheader">Sorry, but page you wanted doesn't exist</h2>
            </div>
            <!-- / column -->
          </div>
          <div class="row">
            <div class="col-12">
              <div class="m-page__actions m-page__actions--centered">
                <router-link to="/" class="e-button">Get back</router-link>
              </div>
            </div>
          </div>

          <CTA />
          <!-- / e-cta -->

        </div>
        <!-- / m-page__container -->

      </div>
    </section>
    <!-- / m-page -->

  </main>
  <!-- / p-home -->

</template>

<script>
import NextStepButton from '@/components/NextStepButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import Tooltip from '@/components/Tooltip.vue'
import CTA from '@/components/CTA.vue'

export default {
  name: 'NotFoundPage',
  components: {
    NextStepButton, Tooltip, SelectBox, CTA
  }
}
</script>
<template>
  <main class="p-home">
    <section class="m-page">
      <div class="container">
        <div class="m-page__container">
          <div class="row">
            <div class="col-12">
              <h1 class="m-page__header">Configure new Jamf Protect subscription</h1>
              <h2 class="m-page__subheader">Tell us a little about your organization.</h2>
            </div>
            <!-- / column -->

            <div class="col-xl-8 offset-xl-2 col-md-8 offset-md-2">
              <div class="m-box">
                <div class="m-box__body">
                  <div class="e-field">
                    <div class="e-field__label">
                      <p class="e-field__label-text">Industry:</p>
                      <Tooltip>
                        <template v-slot:content>
                          <p class="e-tooltip__header">Why do we need this information?</p>
                          <div class="e-tooltip__content">
                            <p>As you configure your Jamf Protect subscription, Jamf can recommend the appropriate products based on industry solutions.</p>
                           <p>If your organization is education-related, select the option that best describes your school. Your organization may be eligible for Education pricing. Terms & conditions apply.</p>
                          </div>
                        </template>
                      </Tooltip>
                    </div>
                    <!-- / e-field__label -->

                    <SelectBox placeholder="Select Industry" name="industry" :value="industry.value" :options="industry.options" @change="updateCompanyData" />
                  </div>
                  <!-- / e-field -->

                  <div class="e-field">
                    <div class="e-field__label">
                      <p class="e-field__label-text">Number of employees or students in your organization:</p>
                      <Tooltip>
                        <template v-slot:content>
                          <p class="e-tooltip__header">Why do we need this information?</p>
                          <div class="e-tooltip__content">
                            <p>As you configure your Jamf Protect subscription, Jamf can recommend the appropriate products based on industry solutions.</p>
                          </div>
                        </template>
                      </Tooltip>
                    </div>
                    <!-- / e-field__label -->

                    <SelectBox placeholder="Select number of employees" name="employees" :value="employees.value" :options="employees.options" @change="updateCompanyData" />
                  </div>
                  <!-- / e-field -->
 <!-- / DELETE
                  <div class="e-field">
                    <div class="e-field__label">
                      <p class="e-field__label-text">Which Single Sign On provider does your organization use?</p>
                      <Tooltip>
                        <template v-slot:content>
                          <p class="e-tooltip__header">Why do we need this information?</p>
                          <div class="e-tooltip__content">
                            <p>Jamf Connect currently works with the listed providers only. If you choose Other, Jamf Connect will not be compatible.</p>
                          </div>
                        </template>
                      </Tooltip>
                      <p class="e-field__label-desc">If AD FS is a factor in your environment, please <a href="https://www.jamf.com/lp/ecom-contact/" target="_blank">contact Jamf</a> sales prior to purchase to discuss your needs.</p>
                    </div>


                  <SelectBox placeholder="Select SSO Provider" name="providers" :value="providers.value" :options="providers.options" @change="updateCompanyData" />
                    <p class="e-field__error" v-if="!providers.valid">You've selected "{{ providers.options[providers.value] }}". Jamf Connect is currently compatible only with the listed providers.</p>
                  </div>

                  -->





                  <div class="e-field">
                    <div class="e-field__label">
                      <p class="e-field__label-text">Which option best describes your organization’s mac management & security experience?</p>
                      <Tooltip>
                        <template v-slot:content>
                          <p class="e-tooltip__header">Why do we need this information?</p>
                          <div class="e-tooltip__content">
                            <p>As you configure your Jamf Protect subscription, Jamf can recommend the appropriate products based on your mac experience.</p>
                          </div>
                        </template>
                      </Tooltip>
                    </div>
                    <!-- / e-field__label -->

                    <SelectBox placeholder="Select Mac Experience" name="support" :value="support.value" :options="support.options" @change="updateCompanyData" />
                  </div>
                  <!-- / e-field -->

                  <div class="e-field">
                    <div class="e-field__label">
                      <p class="e-field__label-text">Do you currently use an MDM to manage your devices?</p>
                      <Tooltip>
                        <template v-slot:content>
                          <p class="e-tooltip__header">Why do we need this information?</p>
                          <div class="e-tooltip__content">
                            <p>As you configure your Jamf Protect subscription, Jamf can recommend the appropriate products based on your current MDM.</p>
                            <!--<p>If your organization is education-related, ownership of Jamf Pro, Jamf School or Jamf Now is required in order to qualify for Education pricing.</p>-->
                          </div>
                        </template>
                      </Tooltip>
                    </div>
                    <!-- / e-field__label -->

                    <SelectBox placeholder="Select MDM option" name="mdm" :value="mdm.value" :options="mdm.options" @change="updateCompanyData" />
                    <p class="e-field__error" v-if="!mdm.valid">If you currently own a Jamf MDM product and would like to align subscription renewal dates, <a href="https://www.jamf.com/jamf-nation/my/account-team" target="_blank">Contact your Jamf account team.</a></p>
                  </div>
                  <!-- / e-field -->

                </div>
                <!-- / m-box__body -->

              </div>
              <!-- / m-box -->

            </div>
            <!-- / column -->

          </div>
          <div class="row">
            <div class="col-12">
              <div class="m-page__actions">
                <NextStepButton link_to="step1" text="Continue" />
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
  name: 'Home',
  computed: {
    industry() {
      return this.$store.state.company.industry
    },
    employees() {
      return this.$store.state.company.employees
    },
    support() {
      return this.$store.state.company.support
    },
   providers() {
     return this.$store.state.company.providers
   },
    mdm() {
      return this.$store.state.company.mdm
    }
  },
  methods: {
    updateCompanyData(params) {
      this.$store.dispatch('updateCompanyField', {
        fieldName: params.fieldName,
        value: params.value
      })
		//console.log(this.$store.getters.countEmptyCompanyFields)
    }
  },
  components: {
    NextStepButton, Tooltip, SelectBox, CTA
  }
}
</script>

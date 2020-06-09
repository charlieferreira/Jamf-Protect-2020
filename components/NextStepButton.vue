<template>
  <router-link :to="link_to" id="nextStep"
  :class="{
    'e-button' : true,
    'e-button--disabled' : disabled,
    'e-button--icon' : img
  }">
  {{ text }}
  <span v-if="img" class="e-button__icon">
    <img :src="img" onload="SVGInject(this)" alt="Next step">
  </span>
  </router-link>
</template>

<script>
import SVGInject from '@iconfu/svg-inject';
export default {
  name: 'NextStepButton',
  props: [
    'link_to', 'text', 'img'
  ],
  data() {
    return {
      disabled: true,
    }
  },
  methods: {
    enableButton() {
      this.disabled = false;
    },
    disableButton() {
      this.disabled = true;
    },
  },
  mounted() {
    // intro validation control
    function toggleButtonOnIntro(el) {
      if(el.$el.pathname.includes('step1')) {
        if(el.$store.getters.countEmptyCompanyFields === 0) {
          el.enableButton();
        } else {
          el.disableButton();
        }
      }
    }

    // first step validation control
    function toggleButtonOnFirstStep(el) {
      if(el.$store.getters.totalQty < el.$store.getters.minQty) {
        el.disableButton();
      } else {
        el.enableButton();
      }
    }

    Event.$on('validate-select-boxes', () => {
      toggleButtonOnIntro(this);
    });

    Event.$on('validate-step-1', () => {
      toggleButtonOnFirstStep(this);
    });
    if(this.$props.link_to.includes('step1')) {
      toggleButtonOnIntro(this);
    } else if(this.$props.link_to.includes('step2')) {
      toggleButtonOnFirstStep(this);
    } else {
      this.enableButton();
    }

  },
}
</script>
<template>
  <div>
    <h1 class="m-step__header">New Jamf Protect subscription</h1>
    <div class="e-steps">
      <div 
        v-for="i in steps" :key="i" 
        :class="{ 
          'e-steps__number' : true,
          'e-steps__number--initial' : true,
          'e-steps__number--active' : (i == step),
          'e-steps__number--completed' : (i < step),
         }"
      >
        <span class="e-steps__label">{{ i }}</span>
      </div>
    </div>
    <!-- / e-steps -->

    <CartBtn />
  </div>
</template>

<script>
import CartBtn from '@/components/CartBtn.vue'

function animateSteps() {
  const steps = document.querySelectorAll('.e-steps__number');
  const completedSteps = document.querySelectorAll('.e-steps__number--completed');
  let counter = 0;
  let delay = 0;

  steps.forEach((element, index) => {
    delay = 0;
    if(!element.classList.contains('e-steps__number--completed')) {
      delay = 120 * counter;
      counter += 1;
    }
    setTimeout(() => {
      element.classList.remove('e-steps__number--initial');
    }, delay);
    if(index == completedSteps.length - 1) {
      element.classList.add('e-steps__number--last');
    } else {
      element.classList.remove('e-steps__number--last');
    }
  });
}

export default {
  name: 'ProgressBar',
  computed: {
    step() {
      return this.$store.state.currentStep
    },
    steps() {
      return this.$store.state.countSteps
    }
  },
  components: {
    CartBtn
  },
  updated() {
    animateSteps();
  },
  mounted() {
    animateSteps();
  }
}
</script>
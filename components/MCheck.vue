<template>
  <div 
    :class="[
      'm-check', 
      wider ? 'm-check--wider' : '', 
      price_only ? 'm-check--price-only' : ''
    ]"
    v-if="isVisible"
  >
    <div class="e-radio">
      <input @change="selectProduct(productId)" type="radio" name="checkboxes" :id="input_id" :value="value" :checked="checked">
      <span class="e-radio__mark"></span>
    </div>
    <!-- / e-radio -->

    <div :class="['m-check__label', full ? 'm-check__label--full' : '']">
      <label :for="input_id"><slot name="label"></slot></label>
      <slot name="tooltip_list"></slot>
      <slot name="tooltip"></slot>
      <slot name="link"></slot>
    </div>
    <!-- / m-check__label -->

    <div class="m-check__value">
      <p v-if="price" :class="['m-check__price', isPriceLoading ? 'default' : 'e-price-loading']">{{ price }}</p>
      <slot name="price_text"></slot>
    </div>
    <!-- / m-check__value -->

  </div>
  <!-- / m-check -->
</template>

<script>
export default {
  name: 'MCheck',
  props: {
    value: String,
    full: Boolean,
    wider: Boolean,
    price_only: Boolean,
    input_id: String,
    price: String,
    type: String,
    tooltip_content: String,
    tooltip_list: String,
    require: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      productId: this.getProductId(),
      checked: false,
    }
  },
  computed: {
    isPriceLoading() {
      return this.$store.getters.isLoading('price');
    },
    isVisible() {
      if (this.require.length > 0) {
        const intersection = this.$store.getters.getProductIds.filter(element => this.require.includes(element));
        return (intersection.length > 0) ? 1 : 0
      }

      return 1;
    }
  },
  methods: {
    getProductId() 
    {
      if(this.type == 'support-package') {
        return this.$store.getters.getSupportPackageByValue(this.value).id;
      } else if(this.type == 'support-package') {
        return this.$store.getters.getSupportPackageByValue(this.value).id
      } else if(this.type == 'cloud-hosting') {
        return this.$store.getters.getCloudHostingByValue(this.value).id
      } else if(this.type == 'subscription') {
        return this.$store.getters.getSubscriptionLengthByValue(this.value).id
      } else if(this.type == 'training-pass') {
        return this.$store.getters.getTrainingPassByValue(this.value).id
      }
    },

    selectImplementationService(productId, value) {
      this.$store.dispatch('selectImplementationService', {
        id: productId,
        value: value,
      });
    },
    selectSupportPackage(productId, value) {
      this.$store.dispatch('selectSupportPackage', {
        id: productId,
        value: value,
      });
    },
    selectCloudHosting(productId, value) {
      this.$store.dispatch('selectCloudHosting', {
        id: productId,
        value: value,
      });
    },
    selectSubscriptionLength(productId, value) {
      this.$store.dispatch('selectSubscriptionLength', {
        id: productId,
        value: value,
      });
    },
    selectTrainingPass(productId, value) {
      this.$store.dispatch('selectTrainingPass', {
        id: productId,
        value: value,
      });
    },
    selectProduct(productId) 
    {
      if(this.type == 'support-service') {
        this.selectSupportPackage(productId, this.getProductId());
      } else if(this.type == 'support-package') {
        this.selectSupportPackage(productId, this.getProductId());
      } else if(this.type == 'cloud-hosting') {
        this.selectCloudHosting(productId, this.getProductId());
      } else if(this.type == 'subscription') {
        this.selectSubscriptionLength(productId, this.getProductId());
      } else if(this.type == 'training-pass') {
        this.selectTrainingPass(productId, this.getProductId());
      }
    },
  },
  created() {
    if(this.type == 'implementation-service') {

      const implementationServiceValue = this.$store.getters.getImplementationServiceValue();
      const implementationServiceDefaultValue = this.$store.getters.getImplementationServiceDefaultValue();

      if(implementationServiceValue) {
        (this.getProductId() === implementationServiceValue) ? this.checked = true : this.checked = false;
      } else {
        (this.getProductId() === implementationServiceDefaultValue) ? this.checked = true : this.checked = false;
      }
    
    } else if (this.type == 'support-package') {

      const supportPackageValue = this.$store.getters.getSupportPackageValue(this.getProductId());
      const supportPackageDefaultValue = this.$store.getters.getSupportPackageDefaultValue(this.getProductId());

      if(supportPackageValue) {
        (this.getProductId() === supportPackageValue) ? this.checked = true : this.checked = false;
      } else {
        (this.getProductId() === supportPackageDefaultValue) ? this.checked = true : this.checked = false;
      }

    } else if(this.type == 'cloud-hosting') {

      const cloudHostingValue = this.$store.getters.getCloudHostingValue(this.getProductId());
      const cloudHostingDefaultValue = this.$store.getters.getCloudHostingDefaultValue(this.getProductId());

      if(cloudHostingValue) {
        (this.getProductId() === cloudHostingValue) ? this.checked = true : this.checked = false;
      } else {
        (this.getProductId() === cloudHostingDefaultValue) ? this.checked = true : this.checked = false;
      }

    } else if(this.type == 'subscription') {

      const subscriptionValue = this.$store.getters.getSubscriptionLengthValue(this.getProductId());
      const subscriptionDefaultValue = this.$store.getters.getSubscriptionLengthDefaultValue(this.getProductId());

      if(subscriptionValue) {
        (this.getProductId() === subscriptionValue) ? this.checked = true : this.checked = false;
      } else {
        (this.getProductId() === subscriptionDefaultValue) ? this.checked = true : this.checked = false;
      }

    } else if(this.type == 'training-pass') {

      const trainingPassValue = this.$store.getters.getTrainingPassValue(this.getProductId());
      const trainingPassDefaultValue = this.$store.getters.getTrainingPassDefaultValue(this.getProductId());

      if(trainingPassValue) {
        (this.getProductId() === trainingPassValue) ? this.checked = true : this.checked = false;
      } else {
        (this.getProductId() === trainingPassDefaultValue) ? this.checked = true : this.checked = false;
      }

    }
  }
}
</script>

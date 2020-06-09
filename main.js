import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
window.Event = new Vue()

store.subscribe((mutation, state) => {
  // update price rule, when quantity updated
  if (mutation.type == 'UPDATE_PRODUCT_QTY') {
    store.dispatch('changePriceRule')
  }
})

new Vue({
  router,
  store,
  watch: {
    $route(to, from) {
      let setValues = true;
      // redirect to intro page when at least one select doesn't has value
      if ( this.$store.getters.countEmptyCompanyFields > 0 ) {
        setValues = false;
        router.push('/').catch(err => console.warn(err.message));
      } else {
        if(to.name != 'home') {
          // redirect to first step page when total qty is less than minimum
          if (this.$store.getters.totalQty < this.$store.getters.minQty) {
            setValues = false;
            router.push('/step1').catch(err => console.warn(err.message));
          }
        }
        Event.$emit('validate-select-boxes');
      }

      if(setValues) {
        setDefaultValueToStore(to);
      }

      // setDefaultValueToStore(to);
      function setDefaultValueToStore(step) {
        
        if(step.name == 'step3') {
          //const value = store.getters.getImplementationServiceValue();
          //const defaultValue = store.getters.getImplementationServiceDefaultValue();
          const value = store.getters.getSupportPackageValue();
          const defaultValue = store.getters.getSupportPackageDefaultValue();
          
          if(!value) {
            store.dispatch('selectSupportPackage', {
              id: defaultValue,
              value: defaultValue,
            });

         // if(!value) {
           // store.dispatch('selectImplementationService', {
             // id: defaultValue,
              //value: defaultValue,
           // });
          }

        } else if(step.name == 'step2') {
          //
          // const value = store.getters.getSupportPackageValue();
          // const defaultValue = store.getters.getSupportPackageDefaultValue();

          const value = store.getters.getSubscriptionLengthValue();
          const defaultValue = store.getters.getSubscriptionLengthDefaultValue();
          // if (!value) {
          //   store.dispatch('selectSupportPackage', {
          //     id: defaultValue,
          //     value: defaultValue,
          //   });
          // }

          if (!value) {
            store.dispatch('selectSubscriptionLength', {
              id: defaultValue,
              value: defaultValue,
            });
          }

        } else if (step.name == 'step4') {

          const value = store.getters.getCloudHostingValue();
          const defaultValue = store.getters.getCloudHostingDefaultValue();

          if (!value) {
            store.dispatch('selectCloudHosting', {
              id: defaultValue,
              value: defaultValue,
            });
          }

        } else if (step.name == 'step5') {

          const value = store.getters.getSubscriptionLengthValue();
          const defaultValue = store.getters.getSubscriptionLengthDefaultValue();

          if (!value) {
            store.dispatch('selectSubscriptionLength', {
              id: defaultValue,
              value: defaultValue,
            });
          }

        } else if (step.name == 'step6') {

          const value = store.getters.getSupportPackageValue();
          const defaultValue = store.getters.getSupportPackageDefaultValue();

          if (!value) {
            store.dispatch('selectSupportPackage', {
              id: defaultValue,
              value: defaultValue,
            });
          }

        }
      }

    }
  },
  render: h => h(App)
}).$mount("#app")

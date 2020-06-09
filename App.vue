<template>
  <div id="app">
    <div class="body-mask"></div>
    <Header />
    
    <router-view />

    <Footer />
  </div>
</template>

<style lang="scss">
  @import '@/assets/styles/main.scss';
</style>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

window.$ = require('jquery')
window.jQuery = require('jquery')

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      company: {
        industy: null,
        employees: null,
        support: null,
        providers: null,
        mdm: null,
      },
      currency: 'usd'
    }
  },
  beforeCreate () {
    this.$store.dispatch('ipLocationAsync')
    this.$store.dispatch('getProduct', this.$store.state.products)
    //this.$store.dispatch('getProduct', this.$store.state.implementation_services.products)
    this.$store.dispatch('getProduct', this.$store.state.support_packages.products)
    this.$store.dispatch('getProduct', this.$store.state.subscriptions.products)
  }
}
</script>

<template>
  <div 
    :class="[
      'e-tooltip', featured ? 'e-tooltip--featured' : '', 
      empty ? 'e-tooltip--empty' : '', 
      more ? 'e-tooltip--more' : '', 
      link ? 'e-tooltip--link' : '', 
      active ? 'e-tooltip--active' : ''
    ]"
  >
    <div class="e-tooltip__icon" v-if="!link" @click="openTooltip()"></div>
    
    <div class="e-tooltip__text" v-if="empty"><slot></slot></div>
    <span class="e-tooltip__text" v-if="featured" @click="openTooltip()">{{ label }}</span>
    <a class="e-tooltip__text" v-if="link" @click="openTooltip()">
      <slot name="heading"></slot>
    </a>

    <div class="e-tooltip__text" v-if="more">
      <slot name="heading"></slot>
      <a href="#" class="e-tooltip__toggle" @click="openTooltip()">Read more</a>
      <div class="e-tooltip__inner" v-if="more && !empty">
        <div class="e-tooltip__close" @click="closeTooltip()">
          <span></span><span></span>
        </div>
        <!-- / e-tooltip__close -->

        <div class="e-tooltip__body">
          <slot name="content"></slot>
        </div>
      </div>
      <!-- / e-tooltip__inner -->

    </div>
    
    <div class="e-tooltip__inner" v-if="!empty && !more">
      <div class="e-tooltip__close" @click="closeTooltip()">
        <span></span><span></span>
      </div>
      <!-- / e-tooltip__close -->

      <div class="e-tooltip__body">
        <slot name="content"></slot>
      </div>
    </div>
    <!-- / e-tooltip__inner -->

  </div>
  <!-- / e-tooltip -->
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    label: String,
    featured: Boolean,
    empty: Boolean,
    more: Boolean,
    link: Boolean,
  },
  data() {
    return {
      active: false,
    }
  },
  mounted() {
    document.querySelector('body .body-mask').addEventListener('click', this.closeTooltip);
  },
  methods: {
    openTooltip() {
      document.querySelector('body').classList.add('mask');
      this.active = true;
    },
    closeTooltip() {
      document.querySelector('body').classList.remove('mask');
      this.active = false;
    }
  }
}
</script>
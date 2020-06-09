<template>
  <div 
    :class="{ 
      'e-select-box' : true,
      'e-select-box--active' : isOpen, 
      'e-select-box--choosen' : isSelected
    }"
    @click="toggleSelect()"
    @click-outside="toggleSelect()"
  >
    <p class="e-select-box__input">{{ currentLabel }}</p>
    <ul class="e-select-box__options">

      <template v-for="(label, key) in options">
        <OptionBox :key="key" :label="label" :value="key" @onChange="updateValue" :active="(key == value || key == `_${value}`) ? true : false" />
      </template>

    </ul>
  </div>
</template>

<script>
import OptionBox from '@/components/OptionBox.vue';

export default {
  name: 'SelectBox',
  components: {
    OptionBox
  },
  props: {
    name: String,
    placeholder: {
      type: String,
      required: false,
      default: 'Choose option'
    },
    value: {
      type: String,
      required: false,
      default: null
    },
    options: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    isSelected() {
      return (this.value) ? true : false;
    },
    currentLabel() {
      if (this.options[ this.value ] != undefined) {
        return this.options[ this.value ];
      } else {
        if(this.options[ `_${this.value}` ] != undefined) {
          return this.options[ `_${this.value}` ];
        } else {
          return this.placeholder;
        }
      }
    }
  },
  created() {
    window.addEventListener('click', this.closeSelect);
  },
  methods: {
    updateValue(newVal) {
      this.$emit('change', {
        fieldName: this.name,
        value: newVal
      })
      this.validStep1()
    },
    closeSelect(e) {
      if (! this.$el.contains(e.target)) {
        this.isOpen = false
      }
    },
    validStep1() {
      Event.$emit('validate-select-boxes');
    },
    toggleSelect() {
      // get all selectboxes
      const selectBoxes = this.$options.parent.$children.filter(() => {
        if (this.$el.classList.contains('e-select-box')) {
          return this;
        }
      });

      // close all except this
      selectBoxes.forEach((element, index) => {
        if (element != this) {
          element.isOpen = false;
        }
      });

      this.isOpen = !this.isOpen;
    }
  }
}
</script>
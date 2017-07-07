<template>
  <button 
    :type="nativeType" 
    :class="classes" 
    :disabled="disabled"
    @click="handleClick">
    <v-icon type="load-c" class="v-load-loop" v-if="loading"></v-icon>
    <span><slot></slot></span>
  </button>
</template>

<script>
  import { oneOf } from '../../utils/assist';

  const prefixCls = 'v-button';

  export default {
    name: prefixCls,
    props: {
      type: {
        validator(value) {
          return oneOf(value, ['primary', 'text', 'success', 'warning', 'danger', 'info']);
        }
      },
      loading: Boolean,
      disabled: Boolean,
      nativeType: {
        default: 'button',
        validator(value) {
          return oneOf(value, ['button', 'submit', 'reset']);
        }
      }
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.type}`]: !!this.type,
            [`${prefixCls}-loading`]: !!this.loading
          }
        ];
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
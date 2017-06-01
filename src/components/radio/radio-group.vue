<template>
  <div :class="prefixCls">
    <slot></slot>
  </div>
</template>

<script>
  const prefixCls = 'v-radio-group';

  export default {
    name: prefixCls,

    props: {
      value: [String, Number]
    },

    data() {
      return {
        prefixCls
      };
    },

    mounted() {
      this.$on('on-radio-change', value => {
        this.$emit('input', value);
      });
    }
  };
</script>
<template>
  <div :class="prefixCls">
    <slot></slot>
  </div>
</template>

<script>
  const prefixCls = 'v-checkbox-group';

  export default {
    name: prefixCls,

    props: {
      value: [Array, Boolean]
    },

    data() {
      return {
        prefixCls
      };
    },

    mounted() {
      this.$on('on-checkbox-change', value => {
        this.$emit('input', value);
      });
    }
  };
</script>
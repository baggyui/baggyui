<template>
  <div :class="prefixCls">
    <slot></slot>
  </div>
</template>

<script>
  const prefixCls = 'v-breadcrumb';

  export default {
    name: prefixCls,

    props: {
      separator: {
        type: String,
        default: '/'
      }
    },

    data() {
      return {
        prefixCls
      };
    }
  };
</script>
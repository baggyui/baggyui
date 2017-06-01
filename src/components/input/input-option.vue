<template>
  <li
    :class="prefixCls"
    @click.stop="handleSelect">{{ value }}</li>
</template>

<script>
  const prefixCls = 'v-input-option';

  export default {
    name: prefixCls,

    props: {
      value: [String, Number],
      title: Boolean
    },

    data() {
      return {
        prefixCls
      };
    },

    methods: {
      handleSelect() {
        this.$emit('on-select-change', this.value);
      }
    }
  };
</script>
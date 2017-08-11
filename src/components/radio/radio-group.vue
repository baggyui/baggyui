<template>
  <div :class="groupClasses">
    <slot></slot>
  </div>
</template>

<script>
  const prefixCls = 'v-radio-group';

  export default {
    name: prefixCls,

    props: {
      value: [String, Number],
      tab: Boolean
    },

    data() {
      return {
        prefixCls
      };
    },

    computed: {
      groupClasses() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-tab`]: this.tab,
          }
        ];
      }
    },

    mounted() {
      this.$on('on-radio-change', value => {
        this.$emit('input', value);
      });
    }
  };
</script>
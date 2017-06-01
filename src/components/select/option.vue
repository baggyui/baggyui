<template>
  <li
    :class="classes"
    :title="showTitle(label)"
    @click.stop="select(value, label)">{{ label }}</li>
</template>

<script>
  const prefixCls = 'v-option';

  export default {
    name: prefixCls,

    props: {
      label: [String, Number],
      value: [String, Number],
      title: Boolean
    },

    data() {
      return {
        selected: false,
      };
    },

    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-selected`]: this.selected
          }
        ];
      }
    },

    methods: {
      select(value, label) {
        this.$parent.$emit('on-select-change', value, label);
      },

      showTitle(label) {
        return this.title && label;
      }
    },

    mounted() {
      if (this.$parent.value === this.value) {
        this.$nextTick(() => {
          this.select(this.value, this.label);
        });
      }
    }
  };
</script>
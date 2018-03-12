<template>
  <button 
    :type="nativeType" 
    :class="classes"
    :style="styles"
    :disabled="disabled"
    @click="handleClick">
    <v-icon
      v-if="icon"
      :type="icon"
      size="20"
      class="vertical-center"></v-icon>
    <v-icon type="load-c" class="v-load-loop" v-if="loading"></v-icon>
    <span :class="iconTextClass"><slot></slot></span>
  </button>
</template>

<script>
  import Icon from '../icon';
  import { oneOf } from '../../utils/assist';

  const prefixCls = 'v-button';

  export default {
    name: prefixCls,

    components: {
      'v-icon': Icon
    },

    props: {
      type: {
        validator(value) {
          return oneOf(value, [
            'primary',
            'text',
            'delete',
            'success',
            'warning',
            'danger',
            'info'
          ]);
          // return oneOf(value, ['primary', 'text', 'info', 'warning', 'warning-text']);
        }
      },
      loading: Boolean,
      disabled: Boolean,
      nativeType: {
        default: 'button',
        validator(value) {
          return oneOf(value, ['button', 'submit', 'reset']);
        }
      },
      icon: String,
      width: [Number, String],
      height: [Number, String]
    },

    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.type}`]: !!this.type,
            [`${prefixCls}-loading`]: !!this.loading,
            [`${prefixCls}-icon`]: !!this.icon
          }
        ];
      },

      styles() {
        let style = {};

        if (this.width) {
          style['width'] = `${this.width}px`;
          style['padding-left'] = 0;
          style['padding-right'] = 0;
        }

        if (this.height) {
          style['height'] = `${this.height}px`;
          style['padding-top'] = 0;
          style['padding-bottom'] = 0;
        }

        return style;
      },

      iconTextClass() {
        return this.icon ? 'vertical-center': '';
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
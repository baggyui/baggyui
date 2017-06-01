<template>
  <div :class="classes" v-clickoutside="handleClose">
    <div :class="prefixCls + '-selection'" @click="toggleMenu">
      <span v-if="selected" :class="prefixCls + '-value'">{{ selected }}</span>
      <span v-else :class="prefixCls + '-placeholder'">{{ placeholder }}</span>
      <i class="v-icon v-icon-arrow-down-b"></i>
    </div>

    <transition name="v-select-zoom">
      <div v-show="visible" :class="prefixCls + '-dropdown'">
        <ul :class="prefixCls + '-list'">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import clickoutside from '../../utils/clickoutside';

  const prefixCls = 'v-select';

  export default {
    name: prefixCls,

    directives: { clickoutside },

    props: {
      value: [String, Number],
      disabled: Boolean,
      placeholder: {
        type: String,
        default: '请选择'
      }
    },

    data() {
      return {
        prefixCls,
        visible: false,
        selected: ''
      };
    },

    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-visible`]: this.visible,
            [`${prefixCls}-disabled`]: this.disabled
          }
        ];
      }
    },

    watch: {
      value(val) {
        if (val === '') {
          this.select(val, '');
          return;
        }

        this.$children.forEach(child => {
          if (val === child.value) {
            this.select(child.value, child.label);
          }
        });
      },

      visible(val) {
        if (val) {
          this.$emit('on-focus');
        } else {
          this.$emit('on-blur');
        }
      }
    },

    methods: {
      toggleMenu() {
        if (this.disabled) {
          return;
        }

        this.visible = !this.visible;
      },

      hideMenu() {
        this.visible = false;
      },

      handleClose() {
        this.hideMenu();
      },

      select(value, label) {
        this.selected = label;
        this.$emit('input', value);
        this.hideMenu();

        this.$children.forEach(child => {
          if (child.value === value) {
            child.selected = true;
          } else {
            child.selected = false;
          }
        });
      }
    },

    mounted() {
      this.$on('on-select-change', (value, label) => {
        this.select(value, label);
      });
    }
  };
</script>
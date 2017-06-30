<template>
  <div :class="classes" v-clickoutside="handleClose">
    <div :class="prefixCls + '-selection'" @click="toggleMenu">
      <span v-if="selected" :class="prefixCls + '-value'">{{ selected }}</span>
      <span v-else :class="prefixCls + '-placeholder'">{{ placeholder }}</span>
      <i class="v-icon v-icon-arrow-down-b"></i>
    </div>

    <transition name="v-select-zoom">
      <div
        ref="dropdown"
        v-show="visible"
        :class="prefixCls + '-dropdown'"
        :style="style">
        <ul :class="prefixCls + '-list'">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import clickoutside from '../../utils/clickoutside';
  import { getOffset } from '../../utils/fn';

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
        selected: '',
        style: {}
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
          this.setPosition();
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
      },

      setPosition() {
        if (this.visible) {
          const selectHeight = 34;
          const p = getOffset(this.$el);

          this.style = {
            top: p.top + selectHeight + 'px',
            left: `${p.left}px`,
            width: `${p.right - p.left}px`,
            maxHeight: `${this.maxHeight}px`,
          };
        }
      },

      init() {
        document.body.appendChild(this.$refs.dropdown);

        // 监听窗口改动
        window.addEventListener('resize', this.setPosition);

        // 监听滚动条改动
        let parent = this.$el.parentNode;
        while (parent !== document.body) {
          parent.addEventListener('scroll', this.setPosition);
          parent = parent.parentNode;
        }
      },

      destroy() {
        // 移除窗口改动
        window.removeEventListener('resize', this.setPosition);

        // 移除滚动条改动
        let parent = this.$el.parentNode;
        while (parent !== document.body) {
          try {
            parent.removeEventListener('scroll', this.setPosition);
            parent = parent.parentNode;
          } catch (e) {
            parent = document.body;
          }
        }

        document.body.removeChild(this.$refs.dropdown);
      }
    },

    mounted() {
      this.$on('on-select-change', (value, label) => {
        this.select(value, label);
      });

      this.init();
    },

    beforeDestroy() {
      this.destroy();
    }
  };
</script>
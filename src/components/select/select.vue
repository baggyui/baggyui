<template>
  <div :class="classes" v-clickoutside="handleClose">
    <div :class="prefixCls + '-selection'" @click="toggleMenu">
      <span v-if="selected" :class="prefixCls + '-value'">{{ selected }}</span>
      <span v-else :class="prefixCls + '-placeholder'">{{ placeholder }}</span>
      <i class="v-icon v-icon-arrow-down-b"></i>
    </div>

    <transition
      name="v-select-zoom"
      @before-enter="beforeEnter"
      @after-leave="afterLeave">
      <div
        ref="dropdown"
        v-show="visible"
        :class="dropdownClasses"
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
  import { scrollbarWidth } from '../../utils/elem';

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
        style: {},
        dropdownBottom: false
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
      },

      dropdownClasses() {
        return [
          `${prefixCls}-dropdown`,
          {
            [`${prefixCls}-dropdown-bottom`]: this.dropdownBottom
          }
        ];
      },

      scrollbarWidth() {
        return scrollbarWidth();
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
          this.initDropdown();
          this.$emit('on-focus');
        } else {
          this.destroyDropdown();
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

          let windowHeight = window.innerHeight;
          let dropdownHeight = this.$refs.dropdown.offsetHeight;
          const padding = 5;

          let dropdownTop;
          if (p.top + selectHeight + dropdownHeight > windowHeight - this.scrollbarWidth) {
            dropdownTop = p.top - dropdownHeight - padding;
            this.dropdownBottom = true;
          } else {
            dropdownTop = p.top + selectHeight + padding;
            this.dropdownBottom = false;
          }

          this.style = {
            top: `${dropdownTop}px`,
            left: `${p.left}px`,
            width: `${p.right - p.left}px`,
            // maxHeight: `${this.maxHeight}px`,
          };
        }
      },

      scrollDropdown() {
        this.visible = false;
      },

      initDropdown() {
        document.body.appendChild(this.$refs.dropdown);
        this.$nextTick(() => {
          this.setPosition();

          // 监听窗口改动
          window.addEventListener('resize', this.setPosition);

          // 监听滚动条改动
          let parent = this.$el.parentNode;
          while (parent !== document.body) {
            parent.addEventListener('scroll', this.scrollDropdown);
            parent = parent.parentNode;
          }
        });
      },

      destroyDropdown() {
        // 移除窗口改动
        window.removeEventListener('resize', this.setPosition);

        // 移除滚动条改动
        let parent = this.$el.parentNode;
        while (parent !== document.body) {
          try {
            parent.removeEventListener('scroll', this.scrollDropdown);
            parent = parent.parentNode;
          } catch (e) {
            parent = document.body;
          }
        }

        // document.body.removeChild(this.$refs.dropdown);
      },

      beforeEnter() {
        // this.initDropdown();
      },

      afterLeave() {
        // this.destroyDropdown();
      }
    },

    mounted() {
      this.$on('on-select-change', (value, label) => {
        this.select(value, label);
      });
    },

    beforeDestroy() {
      // 因为 clickoutside 在 ie9 与 chrome 表现不同，this.visible 获取不一致
      if (this.$refs.dropdown.style.display !== 'none') {
        this.destroyDropdown();
      }

      if (this.$refs.dropdown.parentNode === document.body) {
        document.body.removeChild(this.$refs.dropdown);
      }
    }
  };
</script>
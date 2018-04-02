<template>
  <div>
    <transition :name="prefixCls + '-fade'">
      <div
        v-show="visible"
        :class="prefixCls + '-shadow'"></div>
    </transition>
    
    <transition :name="prefixCls + '-ease'">
      <div
        v-show="visible"
        :class="prefixCls + '-container'"
        @click.self="handleClose">
        <div :class="prefixCls" :style="styles">
          <!-- header -->
          <div :class="prefixCls + '-header'">
            <span class="header-title">{{ title }}</span>
            <i v-if="closable"
               class="header-close v-icon v-icon-android-close"
               @click="handleClose"></i>
          </div>

          <!-- body -->
          <div v-if="$slots.body">
            <slot name="body"></slot>
          </div>
          <div :class="prefixCls + '-body'" v-else>
            <slot></slot>
          </div>

          <!-- footer -->
          <div :class="prefixCls + '-footer'" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { scrollbarWidth } from '../../utils/elem';

  const prefixCls = 'v-dialog';

  export default {
    name: prefixCls,

    props: {
      value: Boolean,
      title: String,
      top: String,
      width: Number,
      closable: {
        default: true,
        type: Boolean
      }
    },

    data() {
      return {
        prefixCls,
        visible: false
      };
    },

    computed: {
      styles() {
        let style = {};

        if (this.top) {
          style['margin-top'] = `${this.top}`;
        }

        if (this.width) {
          style['width'] = `${this.width}px`;
        }

        return style;
      }
    },

    watch: {
      value(val) {
        this.visible = val;
      },

      visible(val) {
        this.$emit('input', val);

        if (val) {
          this.$emit('open');
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = scrollbarWidth() + 'px';
          document.addEventListener('keydown', this.escClose);
        } else {
          this.$emit('close');
          document.body.style.overflow = 'auto';
          document.body.style.paddingRight = 0;
          document.removeEventListener('keydown', this.escClose);
        }
      }
    },

    methods: {
      handleClose() {
        this.visible = false;
      },

      escClose(e) {
        if (this.visible && e.keyCode === 27) {
          this.handleClose();
        }
      }
    },

    mounted() {
      if (this.value) {
        this.visible = this.value;
      }
    }
  };
</script>
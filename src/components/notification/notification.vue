<template>
  <transition :name="prefixCls + '-fade'">
    <div 
      :class="prefixCls"
      :style="{ top: top + 'px' }"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <v-icon
        v-if="hasType"
        :type="typeClass"></v-icon>
      <div :class="{ 'is-with-icon': hasType }">
        <h2 :class="prefixCls + '-title'">{{ title }}</h2>
        <div 
          v-if="message"
          :class="prefixCls + '-content'">{{ message }}</div>
      </div>
      <div :class="prefixCls + '-close'" 
           @click="close">
        <v-icon type="android-close"></v-icon>
      </div>
    </div>
  </transition>
</template>

<script>
  import { oneOf } from '../../utils/assist';
  import Icon from '../icon';

  const prefixCls = 'v-notification';
  const typeMap = {
    success: 'checkmark-circled',
    error: 'close-circled',
    info: 'information-circled',
    warning: 'android-alert'
  };

  export default {
    name: prefixCls,

    components: {
      'v-icon': Icon
    },

    data() {
      return {
        prefixCls,
        id: null,
        title: '',
        message: '',
        visible: false,
        duration: 3500,
        timer: null,
        top: null,
        type: null
      };
    },

    computed: {
      hasType() {
        return this.type && typeMap[this.type];
      },

      typeClass() {
        return this.hasType ? typeMap[this.type] : '';
      }
    },

    mounted() {
      this.visible = true;
      this.startTimer();
    },

    methods: {
      startTimer() {
        if (this.duration <= 0) {
          return;
        }

        this.timer = setTimeout(() => {
          this.close();
        }, this.duration);
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      close() {
        this.visible = false;

        if (typeof this.onClose === 'function') {
          this.onClose(this.id);
        }
      }
    },

    watch: {
      visible(val) {
        if (!val) {
          this.clearTimer();
          // 单元测试时，代码覆盖触发不了 transitionend
          /* istanbul ignore next */
          this.$el.addEventListener('transitionend', () => {
            this.$el.parentNode.removeChild(this.$el);
          });
        }
      }
    }
  };
</script>
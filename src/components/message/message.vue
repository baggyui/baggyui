<template>
  <transition :name="prefixCls + '-fade'">
    <div
      v-if="visible"
      :class="prefixCls"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <v-icon :type="typeClass"></v-icon>
      <div :class="prefixCls + '-content'">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
  const prefixCls = 'v-message';
  const typeMap = {
    success: 'checkmark',
    error: 'close',
    info: 'information',
    warning: 'alert'
  };

  export default {
    name: prefixCls,

    data() {
      return {
        prefixCls,
        visible: false,
        message: '',
        duration: 3000,
        timer: null,
        type: 'info'
      };
    },

    computed: {
      typeClass() {
        return typeMap[this.type];
      }
    },

    methods: {
      startTimer() {
        this.timer = setTimeout(() => {
          this.visible = false;
        }, this.duration);
      },

      clearTimer() {
        clearTimeout(this.timer);
      },
    },

    mounted() {
      this.visible = true;
      this.startTimer();
    }
  };
</script>
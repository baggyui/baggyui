<template>
  <span>
    <a
      v-if="(to || link)"
      :class="(prefixCls + '-link')"
      @click="handleHref">
      <slot></slot>
    </a>
    <span v-else><slot></slot></span>
    <span :class="(prefixCls + '-separator')">{{ separator }}</span>
  </span>
</template>

<script>
  const prefixCls = 'v-breadcrumb-item';

  export default {
    name: prefixCls,

    props: {
      to: [Object, String],
      replace: Boolean,
      link: Boolean
    },

    data() {
      return {
        prefixCls,
        separator: this.$parent.separator
      };
    },

    methods: {
      handleHref(evt) {
        const to = this.to;

        if (to && !this.link) {
          if (this.$router) {
            if (this.replace) {
              this.$router.replace(to);
            } else {
              this.$router.push(to);
            }
          } else {
            if (typeof to === 'string') {
              window.location.href = to;
            }
          }
        } else {
          this.$emit('click', evt);
        }
      }
    }
  };
</script>
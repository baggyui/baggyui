<template>
  <ul :class="prefixCls">
    <li>
      <div
        :class="(prefixCls + '-cell')"
        @click="toggle">
        <span
          :class="(prefixCls + '-arrow')"
          :style="arrowLeft"
          @click.stop="arrowToggle">
            <v-icon
              v-if="isFolder"
              :class="{ 'isOpen': open }"
              type="arrow-right-b"></v-icon>
          <span>
          </span>
        </span>
        <span :class="(prefixCls + '-label')">{{ data.label }}</span>
      </div>

      <transition :name="(prefixCls + '-slide')">
        <div v-show="open" :class="(prefixCls + '-slide')" ref="item">
          <v-tree-item
            v-if="isFolder"
            v-for="(item, index) in data.children"
            :key="index"
            :z-index="zIndex + 1"
            :expand-on-click-node="expandOnClickNode"
            :data="item"></v-tree-item>
        </div>
      </transition>
    </li>
  </ul>
</template>

<script>
  const prefixCls = 'v-tree-item';

  export default {
    name: prefixCls,

    props: {
      data: {
        type: Object,
        default: null
      },
      zIndex: {
        type: Number,
        default: 0
      },
      expandOnClickNode: Boolean
    },

    data() {
      return {
        prefixCls,
        open: false
      };
    },

    computed: {
      isFolder() {
        return this.data.children && this.data.children.length;
      },

      arrowLeft() {
        return {
          'margin-left': 18 * this.zIndex + 'px'
        };
      },

      parent() {
        let parent = this.$parent;
        for (let i = 0; i < this.zIndex; i++) {
          parent = parent.$parent;
        }
        return parent;
      }
    },

    methods: {
      openToggle() {
        if (this.isFolder) {
          this.open = !this.open;
        }
      },

      toggle() {
        if (this.expandOnClickNode) {
          this.openToggle();
        }

        this.parent.$emit('on-toggle', this.data);
      },

      arrowToggle() {
        if (this.expandOnClickNode) {
          this.toggle();
          return;
        }

        this.openToggle();
        this.parent.$emit('on-arrow-toggle', this.data);
      }
    }
  };
</script>
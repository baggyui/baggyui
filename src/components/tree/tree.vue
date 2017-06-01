<template>
  <div :class="prefixCls">
    <v-tree-item
      v-for="(item, index) in data"
      :key="index"
      :expand-on-click-node="expandOnClickNode"
      :data="item"></v-tree-item>
  </div>
</template>

<script>
  import Item from './tree-item';

  const prefixCls = 'v-tree';

  export default {
    name: prefixCls,

    components: {
      'v-tree-item': Item
    },

    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      expandOnClickNode: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        prefixCls
      };
    }
  };
</script>
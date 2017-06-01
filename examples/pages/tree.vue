<template>
  <div>
    <p class="title">基础用法</p>
    <div class="tree-box">
      <v-tree
        :data="data"
        @on-toggle="handleToggle"></v-tree>
    </div>

    <p class="title">只允许箭头点击展开</p>
    <div class="tree-box">
      <v-tree
        :data="data"
        :expand-on-click-node="false"
        @on-arrow-toggle="handleArrowToggle"
        @on-toggle="handleToggle2"></v-tree>
    </div>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          label: '海贼',
          children: [{
            label: '草帽海贼团',
            children: [{
              label: '路飞'
            }, {
              label: '娜美'
            }]
          }, {
            label: '白胡子海贼团',
            children: [{
              label: '白胡子'
            }, {
              label: '艾斯'
            }]
          }]
        }, {
          label: '海军',
          children: [{
            label: '卡普'
          }, {
            label: '三大将',
            children: [{
              label: '赤犬'
            }, {
              label: '青雉'
            }, {
              label: '黄猿'
            }]
          }]
        }, {
          label: '革命军',
          children: [{
            label: '龙'
          }, {
            label: '萨博'
          }]
        }]
      };
    },

    methods: {
      handleToggle(data) {
        console.info('toggle');
        console.log(data);
      },

      handleArrowToggle(data) {
        // debugger
        console.info('arrow toggle');
        console.log(data);
      },

      handleToggle2(data) {
        console.info('toggle 2');
        console.log(data);
      }
    }
  };
</script>

<style lang="sass" scoped>
  .tree-box {
    margin: 0 auto;
    width: 400px;
  }
</style>
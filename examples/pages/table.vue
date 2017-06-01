<template>
  <div>
    <p class="title">基础表格</p>
    <div class="table-box">
      <v-table :columns="columns1" :data="data1"></v-table>
    </div>

    <p class="title">斑马纹</p>
    <div class="table-box">
      <v-table :columns="columns1" :data="data1" stripe></v-table>
    </div>

    <p class="title">带边框表格</p>
    <div class="table-box">
      <v-table
        border
        :columns="columns1"
        :data="data1"></v-table>
    </div>

    <p class="title">固定表头</p>
    <div class="table-box">
      <v-table
        stripe
        border
        :columns="columns1"
        :data="data2"
        height="150"></v-table>
    </div>

    <p class="title">多选</p>
    <div class="table-box">
      <v-table
        border
        :columns="columns2"
        :data="data1"
        @selection-change="handleSelectionChange"></v-table>
    </div>

    <p class="title">自定义内容</p>
    <div class="table-box">
      <v-table
        border
        :columns="columns3"
        :data="data3"></v-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns1: [{
          title: '姓名',
          key: 'name',
          width: 180
        }, {
          title: '年龄',
          key: 'age',
          width: 180
        }, {
          title: '地址',
          key: 'address'
        }],

        columns2: [{
          type: 'selection',
          width: 60,
        }, {
          title: '姓名',
          key: 'name',
          width: 180
        }, {
          title: '年龄',
          key: 'age',
          width: 180
        }, {
          title: '地址',
          key: 'address'
        }],

        columns3: [{
          title: '姓名',
          key: 'name',
          width: 180
        }, {
          title: '年龄',
          key: 'age',
          width: 180
        }, {
          title: '地址',
          key: 'address'
        }, {
          title: '操作',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h('v-button', {
                props: {
                  type: 'text'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.handleModify(params.index);
                  }
                }
              }, '修改'),
              h('v-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.handleRemove(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }],

        data1: [
          {
            name: '路飞',
            age: 18,
            address: '东海风车村'
          }, {
            name: '娜美',
            age: 17,
            address: '东海可可亚西村'
          }, {
            name: '索隆',
            age: 18,
            address: '东海霜月村'
          }
        ],

        data2: [
          {
            name: '路飞',
            age: 18,
            address: '东海风车村'
          }, {
            name: '娜美',
            age: 17,
            address: '东海可可亚西村'
          }, {
            name: '索隆',
            age: 18,
            address: '东海霜月村'
          }, {
            name: '乌索布',
            age: 17,
            address: '东海西罗普村'
          }, {
            name: '山治',
            age: 18,
            address: '东海巴拉蒂耶海上餐厅'
          }, {
            name: '乔巴',
            age: 15,
            address: '伟大航路樱花王国'
          }, {
            name: '罗宾',
            age: 20,
            address: '西海奥哈拉'
          }, {
            name: '弗兰奇',
            age: 21,
            address: '伟大航路水之都'
          }, {
            name: '布鲁克',
            age: 100,
            address: '魔之海域'
          }
        ],

        data3: [
          {
            name: '路飞',
            age: 18,
            address: '东海风车村'
          }, {
            name: '娜美',
            age: 17,
            address: '东海可可亚西村'
          }, {
            name: '索隆',
            age: 18,
            address: '东海霜月村'
          }
        ]
      };
    },

    methods: {
      // 多选 action
      handleSelectionChange(val) {
        let arr = [];

        val.forEach((value) => {
          arr.push(value.name);
        });

        console.log(arr);
      },

      // 修改 action
      handleModify(index) {
        this.$modal.alert({
          title: '提示',
          message: `您要修改的数据在第 ${index + 1} 行！`
        });
      },

      // 移除 action
      handleRemove(index) {
        this.$modal.confirm({
          title: '提示',
          message: '确认要删除该行数据, 是否继续?',
          onOk: () => {
            this.data3.splice(index, 1);
            console.log(this.data3);
          }
        });
      }
    },

    mounted() {
      this.$on('update', index => {
        this.handleModify(index);
      });
    }
  };
</script>

<style lang="scss" scoped>
  .table-box {
    margin: 0 auto;
    width: 700px;
  }
</style>
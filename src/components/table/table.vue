<template>
  <div :class="tableClasses">
    <v-table-head
      :columns="columns"
      :data="rebuildData"
      :scrollbar-visible="scrollbarVisible"
      @select-all="handleSelectAll"></v-table-head>

    <v-table-body
      v-if="rebuildData.length !== 0"
      :columns="columns"
      :data="rebuildData"
      :height="height"
      @select-change="handleSelect"
      @scrollbar-change="handleScrollbar"></v-table-body>
    <div v-else :class="(prefixCls + '-empty')">
      <span>{{ emptyText }}</span>
    </div>
  </div>
</template>

<script>
  import { deepCopy } from '../../utils/assist';
  import tableHead from './table-head';
  import tableBody from './table-body';

  const prefixCls = 'v-table';

  export default {
    name: prefixCls,

    components: {
      'v-table-head': tableHead,
      'v-table-body': tableBody
    },

    props: {
      columns: {
        type: Array,
        default() {
          return [];
        }
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      emptyText: {
        type: String,
        default: '暂无数据'
      },
      height: [Number, String],
      border: Boolean,
      stripe: Boolean
    },

    data() {
      return {
        prefixCls,
        rebuildData: this.getRebuildData(),
        selectArr: [],
        scrollbarVisible: false
      };
    },

    computed: {
      tableClasses() {
        return [
          prefixCls,
          {
            [`${prefixCls}-border`]: this.border,
            [`${prefixCls}-stripe`]: this.stripe
          }
        ];
      }
    },

    watch: {
      data(val) {
        this.rebuildData = this.getRebuildData();
      }
    },

    methods: {
      getRebuildData() {
        let data = deepCopy(this.data);

        this.data.forEach((value, index) => {
          let item = data[index];
          if (!item._checked) {
            data[index]._checked = false;
          }
        });

        return data;
      },

      changeChecked(index, value) {
        let obj = this.rebuildData[index];
        obj._checked = value;
        this.rebuildData.splice(index, 1, obj);
      },

      getSelection() {
        let arr = [];

        this.rebuildData.forEach((value) => {
          if (value._checked) {
            arr.push(value);
          }
        });

        return arr;
      },

      handleSelect(val) {
        let index = val.index;
        let checked = val.checked;

        this.changeChecked(index, checked);
        let checkedArr = this.getSelection();
        this.$emit('selection-change', checkedArr);
      },

      handleSelectAll(val) {
        let checkedArr = [];
        let fromHeadChick = true;

        this.rebuildData.forEach((value, index) => {
          this.changeChecked(index, val);
        });

        checkedArr = this.getSelection();
        this.$emit('selection-change', checkedArr);
      },

      handleScrollbar(val) {
        this.scrollbarVisible = val;
      }
    }
  };
</script>
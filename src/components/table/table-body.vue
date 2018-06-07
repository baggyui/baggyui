<template>
  <div :class="prefixCls" :style="{ height: height + 'px' }">
    <table
      cellspacing="0"
      cellpadding="0"
      border="0">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="index"
          :width="column.width">
      </colgroup>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="(column, coIndex) in columns" :key="coIndex">
            <v-table-cell
              :index="index"
              :row="row"
              :column="column"
              :checked="rowChecked(row)"
              :data="data"
              @select-cell="handleSelect"></v-table-cell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import tableCell from './table-cell';

  const prefixCls = 'v-table-body';

  export default {
    name: prefixCls,

    components: {
      'v-table-cell': tableCell
    },

    props: {
      columns: Array,
      data: Array,
      height: [Number, String]
    },

    data() {
      return {
        prefixCls,
        checked: false
      };
    },

    methods: {
      handleSelect(val) {
        let obj = {
          index: val.index,
          checked: val.checked
        };

        this.$emit('select-change', obj);
      },

      rowChecked(row) {
        return row._checked;
      }
    }
  };
</script>
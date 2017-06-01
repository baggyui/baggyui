<template>
  <div :class="prefixCls" :style="{ height: height + 'px' }">
    <table
      ref="tbody"
      cellspacing="0"
      cellpadding="0"
      border="0">
      <colgroup>
        <col v-for="column in columns" :width="column.width">
      </colgroup>
      <tbody>
        <tr v-for="(row, index) in data">
          <td v-for="column in columns">
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

    watch: {
      data() {
        this.initScrollbar();
      }
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
      },

      initScrollbar() {
        this.$nextTick(() => {
          if (this.height) {
            let tbodyHeihgt = this.$refs.tbody.scrollHeight;
            let showScrollbar = false;

            if (this.height < tbodyHeihgt) {
              showScrollbar = true;
            }

            this.$emit('scrollbar-change', showScrollbar);
          }
        });
      }
    },

    mounted() {
      this.initScrollbar();
    }
  };
</script>
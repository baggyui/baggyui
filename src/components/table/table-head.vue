<template>
  <div :class="prefixCls">
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
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            <div class="cell">
              <template v-if="column.type === 'selection'">
                <v-checkbox
                  v-model="checked"
                  @on-change="handleSelectAll"></v-checkbox>
              </template>
              <template v-else>{{ column.title }}</template>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
  const prefixCls = 'v-table-head';

  export default {
    name: prefixCls,

    props: {
      columns: Array,
      data: Array
    },

    data() {
      return {
        prefixCls,
        checked: false
      };
    },

    watch: {
      data(val) {
        this.checked = this.isSelectAll();
      }
    },

    methods: {
      isSelectAll() {
        if (this.data.length === 0) {
          return false;
        }

        let isSelectAll = true;

        for (let i = 0, len = this.data.length; i < len; i++) {
          if (!this.data[i]._checked && !this.data[i].checkDisabled) {
            isSelectAll = false;
            break;
          }
        }

        return isSelectAll;
      },

      handleSelectAll(val) {
        this.$emit('select-all', val);
      }
    },

    mounted() {
      this.checked = this.isSelectAll();
    }
  };
</script>
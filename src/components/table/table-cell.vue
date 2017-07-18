<template>
  <div class="cell" ref="cell">
    <Cell
      v-if="column.render"
      :row="row"
      :index="index"
      :render="column.render"></Cell>
    <template v-else>
      <template v-if="column.type === 'selection'">
        <v-checkbox
          v-model="cellChecked"
          @on-change="handleChange"></v-checkbox>
      </template>
      <template v-else>{{ row[column.key] }}</template>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Cell from './expand';

  const prefixCls = 'v-table-cell';

  export default {
    name: prefixCls,

    components: {
      Cell
    },

    props: {
      data: Array,
      index: Number,
      row: Object,
      column: Object,
      checked: Boolean
    },

    data() {
      return {
        cellChecked: this.checked
      };
    },

    watch: {
      data(val) {
        if (this.column.type === 'selection') {
          this.cellChecked = val[this.index]._checked;
        }
      }
    },

    methods: {
      handleChange(val) {
        let obj = {
          index: this.index,
          checked: val
        };
        this.$emit('select-cell', obj);
      }
    },

    mounted() {
      if (this.checked && this.column.type === 'selection') {
        this.handleChange(this.checked);
      }
    }
  };
</script>
<template>
  <div class="cell" ref="cell">
    <Cell
      v-if="(!column._oldRender && column.render)"
      :row="row"
      :index="index"
      :render="column.render"></Cell>
    <template v-else>
      <template v-if="column.type === 'selection'">
        <v-checkbox
          v-model="cellChecked"
          :disabled="row.checkDisabled"
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

        this.compile();
      }
    },

    methods: {
      compile() {
        if (!this.column.render) {
          return;
        }

        if (!this.column._oldRender) {
          return;
        }

        let component;

        // 旧的 render
        const template = this.column.render(this.row, this.column, this.index);
        const cell = document.createElement('div');
        cell.innerHTML = template;

        // 设置 methods
        const rootParent = this.$parent.$parent.$parent;
        let methods = {};
        let actions = this.column.actions;
        if (actions) {
          for (let key in actions) {
            const func = actions[key];
            if (typeof func === 'function') {
              methods[key] = func.bind(rootParent);
            }
          }
        }

        // Vue 对象
        const res = Vue.compile(cell.outerHTML);
        component = new Vue({
          render: res.render,
          staticRenderFns: res.staticRenderFns,
          methods: methods
        });

        // 清空
        this.$el.innerHTML = '';
        const Cell = component.$mount();
        this.$refs.cell.appendChild(Cell.$el);
      },

      handleChange(val) {
        let obj = {
          index: this.index,
          checked: val
        };
        this.$emit('select-cell', obj);
      }
    },

    mounted() {
      this.compile();

      if (this.checked && this.column.type === 'selection') {
        this.handleChange(this.checked);
      }
    },

    // beforeDestroy() {
    //   this.$refs.cell.remove();
    // }
  };
</script>
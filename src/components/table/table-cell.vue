<template>
  <div class="cell" ref="cell">
    <template v-if="column.type === 'selection'">
      <v-checkbox
        v-model="cellChecked"
        @on-change="handleChange"></v-checkbox>
    </template>
    <template v-else>{{ row[column.key] }}</template>
  </div>
</template>

<script>
  import Vue from 'vue';

  const prefixCls = 'v-table-cell';

  export default {
    name: prefixCls,

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

        const component = new Vue({
          functional: true,
          render: (h) => {
            return this.column.render(h, {
              self: this,
              row: this.row,
              column: this.column,
              index: this.index
            });
          }
        });

        // 清空，因为会重复渲染，到时参考 iView 优化
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
    }
  };
</script>
<template>
  <div>
    <p class="title">迷你型</p>
    <div class="pageBox">
      <v-page
        :total="100"
        @on-change="handlePageChange"></v-page>
    </div>
    <p class="result">{{ current }}</p>
    
    <p class="title">每页显示 20 条</p>
    <div class="pageBox">
      <v-page
        :total="100"
        :page-size="20"
        @on-change="handlePageChange2"></v-page>
    </div>
    <p class="result">{{ current2 }}</p>

    <p class="title">总条数</p>
    <div class="pageBox">
      <v-page
        :total="100"
        show-total
        @on-change="handlePageChange3"></v-page>
    </div>
    <p class="result">{{ current3 }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: '',
        current2: '',
        current3: ''
      };
    },

    methods: {
      handlePageChange(current) {
        this.current = `当前页：${current}`;
      },

      handlePageChange2(current) {
        this.current2 = `当前页：${current}`;
      },

      handlePageChange3(current) {
        this.current3 = `当前页：${current}`;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .pageBox {
    margin: 20px 0;
  }
</style>
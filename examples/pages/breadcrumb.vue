<template>
  <div>
    <p class="title">面包屑</p>
    <div class="crumb-box">
      <v-breadcrumb>
        <v-breadcrumb-item to="/">首页</v-breadcrumb-item>
        <v-breadcrumb-item :to="{ path: '/button' }">按钮</v-breadcrumb-item>
        <v-breadcrumb-item to="/table">表格</v-breadcrumb-item>
        <v-breadcrumb-item>面包屑</v-breadcrumb-item>
      </v-breadcrumb>
    </div>

    <p class="title">自定义分隔符</p>
    <div class="crumb-box">
      <v-breadcrumb separator=">">
        <v-breadcrumb-item to="/">首页</v-breadcrumb-item>
        <v-breadcrumb-item :to="{ path: '/button' }">按钮</v-breadcrumb-item>
        <v-breadcrumb-item to="/table">表格</v-breadcrumb-item>
        <v-breadcrumb-item>面包屑</v-breadcrumb-item>
      </v-breadcrumb>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="sass" scoped>
  .crumb-box {
    padding: 10px 0;
  }
</style>
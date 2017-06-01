<template>
  <div>
    <p class="title">面包屑</p>
    <v-breadcrumb>
      <v-breadcrumb-item to="/">首页</v-breadcrumb-item>
      <v-breadcrumb-item :to="{ path: '/button' }">按钮</v-breadcrumb-item>
      <v-breadcrumb-item to="/table">表格</v-breadcrumb-item>
      <v-breadcrumb-item>面包屑</v-breadcrumb-item>
    </v-breadcrumb>

    <p class="title">自定义分隔符</p>
    <v-breadcrumb separator=">">
      <v-breadcrumb-item to="/">首页</v-breadcrumb-item>
      <v-breadcrumb-item :to="{ path: '/button' }">按钮</v-breadcrumb-item>
      <v-breadcrumb-item to="/table">表格</v-breadcrumb-item>
      <v-breadcrumb-item>面包屑</v-breadcrumb-item>
    </v-breadcrumb>
  </div>
</template>

<script>
  export default {};
</script>
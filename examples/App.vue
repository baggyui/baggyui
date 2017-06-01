<template>
  <div id="app">
    <p class="app-router-link">
      <router-link to="/icon">icon</router-link>
      <router-link to="/button">button</router-link>
      <router-link to="/radio">radio</router-link>
      <router-link to="/checkbox">checkbox</router-link>
      <router-link to="/select">select</router-link>
      <router-link to="/input">input</router-link>
      <router-link to="/notification">notification</router-link>
      <router-link to="/message">message</router-link>
      <router-link to="/dialog">dialog</router-link>
      <router-link to="/modal">modal</router-link>
      <router-link to="/table">table</router-link>
      <router-link to="/page">page</router-link>
      <router-link to="/datepicker">datepicker</router-link>
      <router-link to="/tree">tree</router-link>
      <router-link to="/breadcrumb">breadcrumb</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 30px 0;
}

input, textarea {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.app-router-link {
  a {
    display: inline-block;
    margin: 5px;
    color: #20a0ff;
    text-decoration: underline;
  }

  .router-link-active {
    color: #fff;
    background: #20a0ff;
  }
}

.title {
  margin: 16px 0;
}

.result {
  @extend .title;
  color: #20a0ff;
}
</style>

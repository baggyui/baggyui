<template>
  <div>
    <p class="title">基础用法</p>
    <v-button @click="openMessage">打开消息提示</v-button>

    <p class="title">带描述性</p>
    <v-button
      type="success"
      @click="openSuccessMessage">成功消息</v-button>
    <v-button
      type="warning"
      @click="openWarnMessage">警告消息</v-button>
    <v-button
      type="danger"
      @click="openFailMessage">失败消息</v-button>
    <v-button
      type="info"
      @click="openInfoMessage">信息消息</v-button>
  </div>
</template>

<script>
  export default {
    methods: {
      openMessage() {
        this.$message({
          message: '这是一条消息提示'
        });
      },

      openSuccessMessage() {
        // this.$message({
        //   message: '这是一条成功的消息提示',
        //   type: 'success'
        // });

        // or
        this.$message.success({
          message: '这是一条成功的消息提示'
        });
      },

      openWarnMessage() {
        // this.$message({
        //   message: '这是一条警告的消息提示',
        //   type: 'warning'
        // });

        // or
        this.$message.warning({
          message: '这是一条警告的消息提示'
        });
      },

      openFailMessage() {
        // this.$message({
        //   message: '这是一条错误的消息提示',
        //   type: 'error'
        // });

        // or
        this.$message.error({
          message: '这是一条错误的消息提示'
        });
      },

      openInfoMessage() {
        // this.$message({
        //   message: '这是一条消息提示',
        //   type: 'info'
        // });

        // or
        this.$message.info({
          message: '这是一条消息提示'
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  button {
    margin: 2px 5px;
  }
</style>
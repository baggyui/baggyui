<template>
  <div>
    <p class="title">基础用法</p>
    <v-button @click="openNotify">打开通知</v-button>
    <v-button @click="openNotifyOnlyTitle">打开通知（仅标题）</v-button>
    <v-button @click="openNotifyUnClose">打开通知（不会关闭）</v-button>

    <p class="title">带描述性</p>
    <v-button
      type="success"
      @click="openNotifySuccess">成功通知</v-button>
    <v-button
      type="warning"
      @click="openNotifyWarning">警告通知</v-button>
    <v-button
      type="danger"
      @click="openNotifyError">失败通知</v-button>
    <v-button
      type="info"
      @click="openNotifyinfo">信息通知</v-button>
  </div>
</template>

<script>
  export default {
    methods: {
      openNotify() {
        this.$notify({
          title: '通知',
          message: '这是一条通知消息，这是一条通知消息',
        });
      },

      openNotifyOnlyTitle() {
        this.$notify({
          title: '仅标题的通知'
        });
      },

      openNotifyUnClose() {
        this.$notify({
          title: '通知',
          message: '这是一条不会自动关闭的通知消息',
          duration: 0
        });
      },

      openNotifySuccess() {
        // this.$notify({
        //   title: '成功',
        //   message: '这是一条成功的消息',
        //   type: 'success'
        // });

        // or
        this.$notify.success({
          title: '成功',
          message: '这是一条成功的消息'
        });
      },

      openNotifyWarning() {
        // this.$notify({
        //   title: '警告',
        //   message: '这是一条警告的消息',
        //   type: 'warning'
        // });

        // or
        this.$notify.warning({
          title: '警告',
          message: '这是一条警告的消息'
        });
      },

      openNotifyError() {
        // this.$notify({
        //   title: '失败',
        //   message: '这是一条失败的消息',
        //   type: 'error'
        // });

        // or
        this.$notify.error({
          title: '失败',
          message: '这是一条失败的消息'
        });
      },

      openNotifyinfo() {
        // this.$notify({
        //   title: '信息',
        //   message: '这是一条信息的消息',
        //   type: 'info'
        // });

        // or
        this.$notify.info({
          title: '信息',
          message: '这是一条信息的消息'
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
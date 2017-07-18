<template>
  <div>
    <p class="title">消息提示</p>
    <v-button @click="showAlert">显示消息框</v-button>

    <p class="title">确认消息</p>
    <v-button @click="showConfirm">显示确认框</v-button>
    <v-button @click="showConfirm2">异步确认框</v-button>

    <p class="title">提交内容</p>
    <v-button @click="showPrompt">显示提交框</v-button>
    <v-button @click="showPrompt2">密码确认框</v-button>
  </div>
</template>

<script>
  export default {
    methods: {
      showAlert() {
        // this.$modal.alert({
        //   title: '标题名称',
        //   message: '这是一段内容'
        // });

        // or
        // this.$modal({
        //   title: '标题名称',
        //   message: '这是一段内容'
        // });

        // or
        this.$modal({
          type: 'alert',
          title: '标题名称',
          message: '这是一段内容'
        });
      },

      showConfirm() {
        // this.$modal.confirm({
        //   title: '提示',
        //   message: '此操作将永久删除该文件, 是否继续?',
        //   onOk: () => {
        //     this.$message({
        //       message: '删除成功',
        //       type: 'success'
        //     });
        //   }
        // });

        // or
        this.$modal({
          type: 'confirm',
          title: '提示',
          message: '此操作将永久删除该文件, 是否继续?',
          onOk: () => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        });
      },

      showConfirm2() {
        // this.$modal.confirm({
        //   title: '提示',
        //   message: '此操作将永久删除该文件, 是否继续?',
        //   loading: true,
        //   onOk: () => {
        //     setTimeout(() => {
        //       this.$modal.remove();
        //       this.$message({
        //         message: '删除成功',
        //         type: 'success'
        //       });
        //     }, 1000);
        //   }
        // });

        // or
        this.$modal({
          type: 'confirm',
          title: '提示',
          message: '此操作将永久删除该文件, 是否继续?',
          loading: true,
          onOk: () => {
            setTimeout(() => {
              this.$modal.remove();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }, 1000);
          }
        });
      },

      showPrompt() {
        // this.$modal.prompt({
        //   title: '提示',
        //   message: '请输入账号',
        //   inputValidate: (value) => {
        //     if (!value) {
        //       return '不能为空';
        //     }
        //   },
        //   onOk: (value) => {
        //     this.$message({
        //       message: `内容是：${value}`
        //     });
        //   }
        // });

        // or
        this.$modal({
          type: 'prompt',
          title: '提示',
          message: '请输入账号',
          inputValidate: (value) => {
            if (!value) {
              return '不能为空';
            }
          },
          onOk: (value) => {
            this.$message({
              message: `内容是：${value}`
            });
          }
        });
      },

      showPrompt2() {
        // this.$modal.prompt({
        //   title: '提示',
        //   message: '请输入您的密码进行确认',
        //   inputType: 'password',
        //   inputValidate: (value) => {
        //     if (value.length < 6) {
        //       return '密码不能小于 6 位';
        //     }
        //   },
        //   onOk: (value) => {
        //     this.$message({
        //       message: `密码是：${value}`
        //     });
        //   }
        // });

        // or
        this.$modal({
          type: 'prompt',
          title: '提示',
          message: '请输入您的密码进行确认',
          inputType: 'password',
          loading: true,
          inputValidate: (value) => {
            if (value.length < 6) {
              return '密码不能小于 6 位';
            }
          },
          okValidate: (value) => {
            if (value.length > 7) {
              return '密码不能大于 7 位';
            }
          },
          onOk: (value) => {
            setTimeout(() => {
              this.$modal.remove();
              this.$message({
                message: `密码是：${value}`
              });
            }, 1000);
          }
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
<template>
  <div class="box">
    <p class="title">基础用法</p>
    <v-button @click="visible = true">显示对话框</v-button>
    <v-button @click="visible3 = true">禁用右上角关闭</v-button>

    <v-dialog v-model="visible" title="提示">
      <span>这是一段信息</span>
      <span slot="footer">
        <v-button @click="visible = false">取 消</v-button>
        <v-button type="primary" @click="visible = false">确 定</v-button>
      </span>
    </v-dialog>

    <v-dialog v-model="visible3" title="提示" :closable="false">
      <span>这是一段信息</span>
      <span slot="footer">
        <v-button @click="visible3 = false">取 消</v-button>
        <v-button type="primary" @click="visible3 = false">确 定</v-button>
      </span>
    </v-dialog>

    <p class="title">自定义 top</p>
    <v-button @click="visible6 = true">top 为 10%</v-button>
    <v-button @click="visible7 = true">top 为 10px</v-button>

    <v-dialog v-model="visible6" title="提示" top="10%">
      <span>这是一段信息</span>
      <span slot="footer">
        <v-button @click="visible6 = false">取 消</v-button>
        <v-button type="primary" @click="visible6 = false">确 定</v-button>
      </span>
    </v-dialog>

    <v-dialog v-model="visible7" title="提示" top="10px">
      <span>这是一段信息</span>
      <span slot="footer">
        <v-button @click="visible7 = false">取 消</v-button>
        <v-button type="primary" @click="visible7 = false">确 定</v-button>
      </span>
    </v-dialog>

    <p class="title">自定义宽度</p>
    <v-button @click="visible4 = true">宽度为 400px</v-button>
    <v-button @click="visible5 = true">最小宽度为 400px</v-button>

    <v-dialog v-model="visible4" title="提示" width="400">
      <span>这是一段信息</span>
      <span slot="footer">
        <v-button @click="visible4 = false">取 消</v-button>
        <v-button type="primary" @click="visible4 = false">确 定</v-button>
      </span>
    </v-dialog>

    <v-dialog v-model="visible5" title="提示" min-width="400">
      <span>这是一段信息</span>
      <span slot="footer">
        <v-button @click="visible5 = false">取 消</v-button>
        <v-button type="primary" @click="visible5 = false">确 定</v-button>
      </span>
    </v-dialog>

    <p class="title">自定义内容</p>
    <v-button @click="visible2 = true">显示自定义的对话框</v-button>

    <v-dialog v-model="visible2" title="提示">
      <div slot="body" style="padding: 30px 0; text-align: center;">
        <span>快看下面五颜六色的按钮：</span>
        <div style="margin-top: 20px;">
          <v-button type="success">成功按钮</v-button>
          <v-button type="warning">警告按钮</v-button>
          <v-button type="danger">危险按钮</v-button>
          <v-button type="info">信息按钮</v-button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        visible2: false,
        visible3: false,
        visible4: false,
        visible5: false,
        visible6: false,
        visible7: false
      };
    }
  };
</script>

<style lang="scss" scoped>
  .box>button {
    margin: 2px 5px;
  }
</style>

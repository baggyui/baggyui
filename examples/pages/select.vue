<template>
  <div>
    <p class="title">选项框</p>
    <v-select v-model="select">
      <v-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"></v-option>
    </v-select>
    <p class="result">{{ select }}</p>

    <p class="title">选中</p>
    <v-select v-model="select4">
      <v-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"></v-option>
    </v-select>
    <p class="result">{{ select4 }}</p>

    <p class="title">内容过长</p>
    <v-select v-model="select3" placeholder="请选择城市">
      <v-option label="北京市北京市北京市北京市北京市北京市北京市北京市" value="Beijing" title></v-option>
      <v-option label="上海市" value="Shanghai"></v-option>
      <v-option label="广州市" value="Guangzhou"></v-option>
      <v-option label="深圳市" value="Shenzhen"></v-option>
    </v-select>
    <p class="result">{{ select3 }}</p>

    <p class="title">禁用状态</p>
    <v-select v-model="select2" disabled>
      <v-option label="北京市" value="Beijing"></v-option>
      <v-option label="上海市" value="Shanghai"></v-option>
      <v-option label="广州市" value="Guangzhou"></v-option>
      <v-option label="深圳市" value="Shenzhen"></v-option>
    </v-select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        select: '',
        select2: 'Beijing',
        select3: '',
        select4: 'Beijing',

        options: [{
          label: '北京市',
          value: 'Beijing'
        }, {
          label: '上海市',
          value: 'Shanghai'
        }, {
          label: '广州市',
          value: 'Guangzhou'
        }, {
          label: '深圳市',
          value: 'Shenzhen'
        }]
      };
    }
  };
</script>
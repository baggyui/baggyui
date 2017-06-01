<template>
  <div>
    <p class="title">多选框</p>
    <v-checkbox v-model="checked" label="orange">橘子</v-checkbox>
    <p class="result">{{ checked }}</p>

    <p class="title">多选框</p>
    <v-checkbox v-model="once" label="orange">橘子</v-checkbox>
    <p class="result">{{ once }}</p>

    <!-- 禁用状态 -->
    <v-checkbox v-model="fruit2" label="apple" disabled>苹果</v-checkbox>
    <v-checkbox v-model="fruit2" label="banana" disabled>香蕉</v-checkbox>
    <p class="result">{{ fruit2 }}</p>

    <p class="title">多选框组</p>
    <v-checkbox v-model="fruit" label="apple">苹果</v-checkbox>
    <v-checkbox v-model="fruit" label="banana">香蕉</v-checkbox>
    <v-checkbox v-model="fruit" label="pear">梨子</v-checkbox>
    <p class="result">{{ fruit }}</p>

    <p class="title">多选框组</p>
    <v-checkbox-group v-model="city">
      <v-checkbox
        v-for="(item, index) in options"
        :key="index"
        :label="item.label">{{ item.value }}</v-checkbox>
    </v-checkbox-group>
    <p class="result">{{ city }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
        once: [],
        fruit: [],
        fruit2: ['banana'],
        city: [],

        options: [{
          label: 'beijing',
          value: '北京'
        }, {
          label: 'shanghai',
          value: '上海'
        }, {
          label: 'guangzhou',
          value: '广州'
        }, {
          label: 'shenzhen',
          value: '深圳'
        }]
      };
    }
  };
</script>

<style lang="scss" scoped>
  label {
    margin: 0 5px;
  }
</style>
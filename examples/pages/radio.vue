<template>
  <div>
    <p class="title">单选框</p>
    <v-radio v-model="checked" label="orange">橘子</v-radio>
    <p class="result">{{ checked }}</p>

    <p class="title">禁用状态</p>
    <v-radio v-model="fruit2" label="apple" disabled>苹果</v-radio>
    <v-radio v-model="fruit2" label="banana" disabled>香蕉</v-radio>
    <p class="result">{{ fruit2 }}</p>
    
    <p class="title">单选框组</p>
    <v-radio v-model="fruit" label="apple">苹果</v-radio>
    <v-radio v-model="fruit" label="banana">香蕉</v-radio>
    <v-radio v-model="fruit" label="pear">梨子</v-radio>
    <p class="result">{{ fruit }}</p>

    <p class="title">单选框组</p>
    <v-radio-group v-model="city">
      <v-radio
        v-for="(item, index) in options"
        :key="index"
        :label="item.label">{{ item.value }}</v-radio>
    </v-radio-group>
    <p class="result">{{ city }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: '',
        fruit: 'banana',
        fruit2: 'banana',
        city: 'shanghai',

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
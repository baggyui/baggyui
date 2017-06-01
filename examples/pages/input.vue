<template>
  <div>
    <p class="title">输入框</p>
    <v-input v-model="input" placeholder="请输入内容"></v-input>
    <p class="result">{{ input }}</p>

    <p class="title">密码框</p>
    <v-input
      v-model="password"
      type="password"
      placeholder="请输入内容"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"></v-input>
    <p class="result">{{ password }}</p>

    <p class="title">文本域</p>
    <v-input
      v-model="textarea"
      type="textarea"
      placeholder="请输入内容"
      rows="4"></v-input>
    <p class="result">{{ textarea }}</p>

    <p class="title">禁用状态</p>
    <v-input v-model="disabledInput" placeholder="请输入内容" disabled></v-input>

    <p class="title">错误状态</p>
    <v-input v-model="errInput" placeholder="请输入内容" invalid></v-input>

    <p class="title">带 icon</p>
    <v-input
      v-model="iconInput"
      icon="ios-search-strong"
      placeholder="请输入内容"
      @on-icon-click="handleIconClick"></v-input>

    <p class="title">带输入建议</p>
    <v-input
      v-model="suggestInput"
      placeholoder="请输入内容"
      :suggestions="suggestions"></v-input>
    <p class="result">{{ suggestInput }}</p>

    <p class="title">前置或后置元素</p>
    <div></div>
    <v-input v-model="slotInput" placeholder="请输入内容" style="width:400px;">
      <span slot="prepend">https://</span>
      <span slot="append">.com</span>
    </v-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        disabledInput: '',
        errInput: '',
        password: '',
        textarea: '',
        iconInput: '',
        suggestInput: '',
        suggestions: ['北京市', '上海市', '广州市', '深圳市'],
        slotInput: ''
      };
    },

    methods: {
      handleFocus(val) {
        console.log('focus,', val);
      },

      handleBlur(val) {
        console.log('blur,', val);
      },

      handleChange() {
        console.log(this.password);
      },

      handleIconClick(val) {
        console.log('Search: ', val);
      }
    }
  };
</script>

<style lang="scss" scoped>
  label {
    margin: 0 5px;
  }
</style>
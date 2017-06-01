<template>
  <div>
    <p class="title">基础用法</p>
    <v-datepicker placeholder="选择日期" @on-change="handleChange"></v-datepicker>

    <p class="title">带 Icon</p>
    <v-datepicker placeholder="选择日期" icon></v-datepicker>
  </div>
</template>

<script>
  export default {
    methods: {
      handleChange(val) {
        console.log('change value: ', val);
      }
    }
  };
</script>
<template>
  <div>
    <p class="title">基础用法</p>
    <v-datepicker v-model="date1" placeholder="选择日期"></v-datepicker>

    <p class="title">带 Icon</p>
    <v-datepicker v-model="date2" placeholder="选择日期" icon></v-datepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        date1: '2017-08-08',
        date2: ''
      };
    },

    watch: {
      date1(val) {
        console.log('change value: ', val);
      }
    }
  };
</script>
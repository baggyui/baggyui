<template>
  <ul :class="prefixCls">
    <!-- 总条数 -->
    <span v-if="showTotal" :class="(prefixCls + '-total')">共 {{ total }} 条</span>

    <!-- 左箭头 -->
    <li :class="prevClasses" @click="handlePrevPage">
      <v-icon type="ios-arrow-left"></v-icon>
    </li>

    <!-- 第一页 -->
    <li
      :class="[
        prefixCls + '-number',
        { active: currentPage === 1 }
      ]"
      @click="handleChangePage(1)">1</li>

    <!-- 左省略 -->
    <li
      v-if="showPrevMore"
      :class="[
        prefixCls + '-number',
        prefixCls + '-more'
      ]"
      @click="handlePrevMorePage"
      @mouseenter="(prevClass = 'ios-arrow-left')"
      @mouseleave="(prevClass = 'ios-more')">
      <v-icon :type="prevClass"></v-icon>
    </li>

    <!-- 页数 -->
    <li
      v-for="(pager, index) in pagers"
      :key="index"
      :class="[
        prefixCls + '-number',
        { active: currentPage === pager }
      ]"
      @click="handleChangePage(pager)">{{ pager }}</li>

    <!-- 右省略 -->
    <li
      v-if="showNextMore"
      :class="[
        prefixCls + '-number',
        prefixCls + '-more'
      ]"
      @click="handleNextMorePage"
      @mouseenter="(nextClass = 'ios-arrow-right')"
      @mouseleave="(nextClass = 'ios-more')"
      >
      <v-icon :type="nextClass"></v-icon>
    </li>

    <!-- 最后一页 -->
    <li
      v-if="pageCount !== 1"
      :class="[
        prefixCls + '-number',
        { active: currentPage === pageCount }
      ]"
      @click="handleChangePage(pageCount)">{{ pageCount }}</li>

    <!-- 右箭头 -->
    <li :class="nextClasses" @click="handleNextPage">
      <v-icon type="ios-arrow-right"></v-icon>
    </li>
  </ul>
</template>

<script>
  import Icon from '../icon';

  const prefixCls = 'v-page';

  export default {
    name: prefixCls,

    components: {
      'v-icon': Icon
    },

    props: {
      total: {
        default: 0,
        type: Number
      },
      current: {
        default: 1,
        type: Number
      },
      pageSize: {
        default: 10,
        type: Number
      },
      showTotal: {
        default: false,
        type: Boolean
      }
    },

    data() {
      return {
        prefixCls,
        currentPage: this.current,
        showPrevMore: false,
        showNextMore: false,
        prevClass: 'ios-more',
        nextClass: 'ios-more'
      };
    },

    computed: {
      pagers() {
        // 暂时写死
        const pagerCount = 7;
        const currentPage = this.currentPage;
        const pageCount = this.pageCount;

        let showPrevMore = false;
        let showNextMore = false;

        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - 2) {
            showPrevMore = true;
          }

          if (currentPage < pageCount - 2) {
            showNextMore = true;
          }
        }

        const arrs = [];

        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagerCount - 2);
          for (let i = startPage; i < pageCount; i++) {
            arrs.push(i);
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagerCount; i++) {
            arrs.push(i);
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2) - 1;
          for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            arrs.push(i);
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            arrs.push(i);
          }
        }

        this.showPrevMore = showPrevMore;
        this.showNextMore = showNextMore;

        return arrs;
      },

      pageCount() {
        if (this.pageSize <= 0) {
          return 1;
        }

        const count = Math.ceil(this.total / this.pageSize);
        return (count === 0) ? 1 : count;
      },

      prevClasses() {
        return [
          `${prefixCls}-arrow`,
          {
            disabled: this.currentPage === 1
          }
        ];
      },

      nextClasses() {
        return [
          `${prefixCls}-arrow`,
          {
            disabled: this.currentPage === this.pageCount
          }
        ];
      }
    },

    watch: {
      current(val) {
        this.currentPage = val;
      }
    },

    methods: {
      handleChangePage(pager) {
        if (this.currentPage !== pager) {
          this.currentPage = pager;
          this.$emit('on-change', pager);
        }
      },

      handlePrevPage() {
        if (this.currentPage > 1) {
          this.handleChangePage(this.currentPage - 1);
        }
      },

      handleNextPage() {
        if (this.currentPage < this.pageCount) {
          this.handleChangePage(this.currentPage + 1);
        }
      },

      handlePrevMorePage() {
        this.prevClass = 'ios-more';

        let currentPage = this.currentPage - 5;
        if (currentPage < 1) {
          currentPage = 1;
        }
        this.handleChangePage(currentPage);
      },

      handleNextMorePage() {
        this.nextClass = 'ios-more';

        let currentPage = this.currentPage + 5;
        if (currentPage > this.pageCount) {
          currentPage = this.pageCount;
        }
        this.handleChangePage(currentPage);
      }
    }
  };
</script>
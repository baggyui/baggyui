<template>
  <div :class="prefixCls" v-clickoutside="handleClickoutside">
    <v-input
      v-model="dateInput"
      :icon="(icon ? 'ios-calendar-outline' : '')"
      :placeholder="placeholder"
      @focus="handleFocus"
      @on-icon-click="handleFocus"></v-input>

    <transition name="v-datepicker-zoom">
      <div
        ref="dropdown"
        v-show="visible"
        :class="dropdownClasses"
        :style="style">
        <!-- 日历面板 -->
        <div v-show="(currentView === 'date')">
          <div :class="(prefixCls + '-header')">
            <v-icon
              class="double-arrow prev-btn"
              type="ios-arrow-left"
              @click.native="prevYear"></v-icon>
            <v-icon
              class="prev-btn"
              type="ios-arrow-left"
              @click.native="prevMonth"></v-icon>
            <span class="text-btn" @click="showYearView">{{ tmpYear }} 年</span>
            <span class="text-btn" @click="showMonthView">{{ tmpMonth }} 月</span>
            <v-icon
              class="double-arrow next-btn"
              type="ios-arrow-right"
              @click.native="nextYear"></v-icon>
            <v-icon
              class="next-btn"
              type="ios-arrow-right" @click.native="nextMonth"></v-icon>
          </div>
          <div :class="(prefixCls + '-body')">
            <ul class="body-th">
              <li>日</li>
              <li>一</li>
              <li>二</li>
              <li>三</li>
              <li>四</li>
              <li>五</li>
              <li>六</li>
            </ul>
            <ul class="body-td">
              <li
                v-for="date in dateList"
                :class="{
                  active: (date.currMonth && date.value === day && tmpMonth === month && tmpYear === year),
                  'no-curr-month': !date.currMonth
                }"
                @click="selectDate(date)">{{ date.value }}</li>
            </ul>
          </div>
        </div>
        
        <!-- 年面板 -->
        <div v-show="(currentView === 'year')">
          <div :class="(prefixCls + '-header')">
            <v-icon
              class="double-arrow prev-btn"
              type="ios-arrow-left"
              @click.native="prevTenYear"></v-icon>
            <span class="text-btn" @click="showDateView">
              {{ yearList[0] }} 年 - {{ yearList[yearList.length - 1] }} 年
            </span>
            <v-icon
              class="double-arrow next-btn"
              type="ios-arrow-right"
              @click.native="nextTenYear"></v-icon>
          </div>
          <ul :class="(prefixCls + '-panel')">
            <li
              v-for="item in yearList"
              :class="{ active: item === tmpYear }"
              @click="selectYear(item)">{{ item }}</li>
          </ul>
        </div>

        <!-- 月面板 -->
        <div v-show="(currentView === 'month')">
          <div :class="(prefixCls + '-header')">
            <v-icon
              class="double-arrow prev-btn"
              type="ios-arrow-left"
              @click.native="prevYear"></v-icon>
            <span class="text-btn" @click="showYearView">{{ tmpYear }} 年</span>
            <v-icon
              class="double-arrow next-btn"
              type="ios-arrow-right"
              @click.native="nextYear"></v-icon>
          </div>
          <ul :class="(prefixCls + '-panel')">
            <li
              v-for="item in monthList"
              :class="{ active: item === tmpMonth }"
              @click="selectMonth(item)">{{ item }} 月</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import clickoutside from '../../utils/clickoutside';
  import { getOffset } from '../../utils/fn';
  import { getMonthLength, getStartWeek, pad } from '../../utils/date';

  const prefixCls = 'v-datepicker';

  export default {
    name: prefixCls,

    directives: { clickoutside },

    props: {
      value: String,
      placeholder: [String, Number],
      icon: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        prefixCls,
        visible: false,
        currentView: 'date',
        // dateInput: this.value,

        year: 0,
        month: 0,
        day: 0,

        tmpYear: 0,
        tmpMonth: 0,
        tmpDay: 0,

        style: {},
        dropdownBottom: false
      };
    },

    computed: {
      dateInput: {
        get() {
          return this.value;
        },

        set(val) {
          this.$emit('input', val);
        }
      },

      dropdownClasses() {
        return [
          `${prefixCls}-dropdown`,
          {
            [`${prefixCls}-dropdown-bottom`]: this.dropdownBottom
          }
        ];
      },

      dateList() {
        let dateList = [];

        // 当月天数
        let monthLength = getMonthLength(this.tmpYear, this.tmpMonth);

        // 上个月天数
        let prevMonthLength = getMonthLength(this.tmpYear, this.tmpMonth - 1);

        // 当月 1 号是星期几
        let startWeek = getStartWeek(this.tmpYear, this.tmpMonth);

        // 插入上个月日期
        for (let i = 0, len = startWeek; i < len; i++) {
          dateList.push({
            prevMonth: true,
            value: prevMonthLength - startWeek + i + 1
          });
        }

        // 插入本月日期
        for (let i = 0; i < monthLength; i++) {
          dateList.push({
            currMonth: true,
            value: i + 1
          });
        }

        // 插入下个月日期
        for (let i = 0, len = 42 - startWeek - monthLength; i < len; i++) {
          dateList.push({
            nextMonth: true,
            value: i + 1
          });
        }

        return dateList;
      },

      yearList() {
        let yearList = [];

        const index = this.tmpYear % 10;
        const startYear = this.tmpYear - index;

        for (let i = 0; i < 10; i++) {
          yearList[i] = startYear + i;
        }

        return yearList;
      },

      monthList() {
        let monthList = [];

        for (let i = 0; i < 12; i++) {
          monthList[i] = i + 1;
        }

        return monthList;
      }
    },

    watch: {
      visible(val) {
        if (val) {
          this.showDateView();
          this.initDate();
          this.initDropdown();
        } else {
          this.destroyDropdown();
        }
      }
    },

    methods: {
      handleFocus() {
        this.visible = true;
      },

      handleClickoutside(e) {
        const parent = e.target.parentNode;
        if (parent) {
          const classList = parent.classList;

          if (classList) {
            if (classList.contains('v-datepicker-header') || classList.contains('v-datepicker-panel')) {
              return;
            }
          }
        }

        this.visible = false;
      },

      initDate() {
        const val = this.dateInput;
        if (!this.isDate(val)) {
          this.initToday();
          return;
        }

        const date = val.split('-');
        const tmpYear = parseInt(date[0], 10);
        const tmpMonth = parseInt(date[1], 10);
        const tmpDay = parseInt(date[2], 10);

        if (tmpMonth < 1 || tmpMonth > 12) {
          this.initToday();
          return;
        }

        const dateLength = getMonthLength(tmpYear, tmpMonth);
        if (tmpDay < 0 || tmpDay > dateLength) {
          this.initToday();
          return;
        }

        this.tmpYear = tmpYear;
        this.tmpMonth = tmpMonth;
        this.tmpDay = tmpDay;
        this.year = tmpYear;
        this.month = tmpMonth;
        this.day = tmpDay;
      },

      initToday() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        this.tmpYear = year;
        this.tmpMonth = month;
        this.tmpDay = day;
        this.year = year;
        this.month = month;
        this.day = day;
      },

      prevYear() {
        this.tmpYear -= 1;
      },

      nextYear() {
        this.tmpYear += 1;
      },

      prevMonth() {
        if (this.tmpMonth === 1) {
          this.tmpMonth = 12;
          this.prevYear();
        } else {
          this.tmpMonth -= 1;
        }
      },

      nextMonth() {
        if (this.tmpMonth === 12) {
          this.tmpMonth = 1;
          this.nextYear();
        } else {
          this.tmpMonth += 1;
        }
      },

      prevTenYear() {
        this.tmpYear -= 10;
      },

      nextTenYear() {
        this.tmpYear += 10;
      },

      selectDate(date) {
        if (date.prevMonth) {
          this.prevMonth();
        } if (date.nextMonth) {
          this.nextMonth();
        }

        this.year = this.tmpYear;
        this.month = this.tmpMonth;
        this.day = date.value;

        // setTimeout(() => {
        this.visible = false;
        this.dateInput = `${this.year}-${pad(this.month, 2)}-${pad(this.day, 2)}`;
        // }, 150);
      },

      selectYear(year) {
        this.tmpYear = year;
        this.showMonthView();
      },

      selectMonth(month) {
        this.tmpMonth = month;
        this.showDateView();
      },

      showDateView() {
        this.currentView = 'date';
      },

      showYearView() {
        this.currentView = 'year';
      },

      showMonthView() {
        this.currentView = 'month';
      },

      isDate(val) {
        const reg = /^\d{4}-\d{1,2}-\d{1,2}$/;
        return reg.test(val);
      },

      scrollDropdown() {
        this.visible = false;
      },

      setPosition() {
        if (this.visible) {
          const selectHeight = 34;
          const p = getOffset(this.$el);

          let windowHeight = window.innerHeight;
          let dropdownHeight = this.$refs.dropdown.offsetHeight;
          const padding = 5;

          let dropdownTop;
          if (p.top + selectHeight + dropdownHeight > windowHeight) {
            dropdownTop = p.top - dropdownHeight - padding;
            this.dropdownBottom = true;
          } else {
            dropdownTop = p.top + selectHeight + padding;
            this.dropdownBottom = false;
          }

          this.style = {
            top: `${dropdownTop}px`,
            left: `${p.left}px`,
            // width: `${p.right - p.left}px`,
            // maxHeight: `${this.maxHeight}px`,
          };
        }
      },

      initDropdown() {
        document.body.appendChild(this.$refs.dropdown);
        this.$nextTick(() => {
          this.setPosition();

          // 监听窗口改动
          window.addEventListener('resize', this.setPosition);

          // 监听滚动条改动
          let parent = this.$el.parentNode;
          while (parent !== document.body) {
            parent.addEventListener('scroll', this.scrollDropdown);
            parent = parent.parentNode;
          }
        });
      },

      destroyDropdown() {
        // 移除窗口改动
        window.removeEventListener('resize', this.setPosition);

        // 移除滚动条改动
        let parent = this.$el.parentNode;
        while (parent !== document.body) {
          try {
            parent.removeEventListener('scroll', this.scrollDropdown);
            parent = parent.parentNode;
          } catch (e) {
            parent = document.body;
          }
        }

        document.body.removeChild(this.$refs.dropdown);
      }
    },

    beforeDestroy() {
      if (this.$refs.dropdown.style.display !== 'none') {
        this.destroyDropdown();
      }
    }
  };
</script>

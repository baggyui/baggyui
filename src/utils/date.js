/**
 * 时间戳转时间
 * @param  {String} timestamp 时间戳
 * @return {Object} 时间
 *
 * 例如：
 * timestampToDate('1484222693'); // Thu Jan 12 2017 20:04:53 GMT+0800 (中国标准时间)
 */
export function timestampToDate(timestamp) {
  let date = new Date();

  date.setTime(timestamp * 1000);

  return date;
}

 /**
  * 获取特定格式时间
  * @param  {Object} date   时间
  * @param  {String} format 格式
  * @return {String} 特定格式的时间
  *
  * 例如：
  * var now = new Date(); // Mon Jan 16 2017 14:32:22 GMT+0800 (中国标准时间)
  * formatDate(now, 'yyyy-MM-dd h:m:s'); // 2017-01-16 14:32:22
  */
export function formatDate(date, format) {
  let time = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let k in time) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? time[k] : ('00' + time[k]).substr(('' + time[k]).length));
    }
  }

  return format;
}

/**
 * 时间戳转特点格式时间
 * @param  {String} timestamp 时间戳
 * @return {String} 特点格式时间
 *
 * 例如：
 * timestampFormatDate('1484222693', 'yyyy-MM-dd'); // 2017-01-12
 */
export function timestampFormatDate(timestamp, format) {
  let date = timestampToDate(timestamp);
  let result = formatDate(date, format);

  return result;
}

/**
 * 获取每月有多少天
 * @param {Number, String} year  年
 * @param {Number, String} month 月
 * @return {Number} 天数
 */
export function getMonthLength(year, month) {
  year = parseInt(year);
  month = parseInt(month);
  return new Date(year, month, 0).getDate();
}

/**
 * 获取每月第一天是星期几，0代表星期日，1代表星期一，以此类推
 * @param {Number, String} year  年
 * @param {Number, String} month 月
 * @return {Number} 第几天
 */
export function getStartWeek(year, month) {
  year = parseInt(year);
  month = parseInt(month) - 1;
  return new Date(year, month).getDay();
}

/**
 * 质朴长存法，位数不够的整数前面补零
 * @param {Number, String} num 数字
 * @param {Number} n   保留位数
 * @return {String} 补零整数
 */
export function pad(num, n) {
  let len = parseInt(num).toString().length;
  while(len < n) {
    num = '0' + num;
    len += 1;
  }
  return num;
}
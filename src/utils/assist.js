// 判断参数是否是其中之一
export function oneOf(value, validList) {
  let len = validList.length;

  if (!len || len === 0) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    if (value === validList[i]) {
      return true;
    }
  }

  return false;
}

// 深拷贝
export function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  }

  if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }

  return o;
}

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };

  return map[toString.call(obj)];
}

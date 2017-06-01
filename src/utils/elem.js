// 获取滚动条宽度
export function scrollbarWidth() {
  let parent = document.createElement('div');
  let son = document.createElement('div');

  son.style.height = '1px';
  parent.appendChild(son);
  parent.style.visibility = 'hidden';
  document.body.appendChild(parent);

  let sonWidth = son.clientWidth;
  parent.style.overflowY = 'scroll';

  let scrollbarWidth = sonWidth - son.clientWidth;
  document.body.removeChild(parent);

  return scrollbarWidth;
}
// 获取滚动条宽度
export function scrollbarWidth() {
  // Create the measurement node
  let scrollDiv = document.createElement("div");
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Delete the DIV 
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
}
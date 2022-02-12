// 计算每个卡片的坐标
// elements是uni.createSelectorQuery().in(this).query.selectAll('.product').boundingClientRect(data => {}) 中的data对象
/**
 * elements: [{left: 15, right: 180, top: 50, width: 165}, {...}]
*/
export function calcPositions({ columns = 2, gap = 7, elements }) {
  if (!elements || !elements.length) {
    return [];
  }
  //上一行卡片的底部纵坐标数组，用于找到新卡片填充位置
  const y = [];
  // 每个卡片的坐标数组
  const positions = [];
  
  elements.forEach((item, index) => {
    // 还未填满一行
    if (y.length < columns) {
      y.push(item.height);
      positions.push({
        left: (index % columns) * (item.width + gap),
        top: 0
      });
    } else {
      // 最小纵坐标
      const min = Math.min(...y);
      // 纵坐标最小的卡片索引
      const idx = y.indexOf(min);
      // 替换成新卡片的纵坐标
      y.splice(idx, 1, min + gap + item.height);
      positions.push({ left: idx * (item.width + gap), top: min + gap });
    }
  });
  // 由于采用绝对定位，容器是无法自动撑开的。因此需要计算实际高度，即最后一个卡片的top加上自身高度
  return {
    positions,
    containerHeight:
      positions[positions.length - 1].top +
      elements[elements.length - 1].height
  };
}

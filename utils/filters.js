export function initPrice(val, toFixedNum = 2) {
  if (!['string', 'number' ].includes(typeof val)) { return '0.00' }
  if (typeof toFixedNum !== 'number') { toFixedNum = 2 }
  return Number.parseFloat(val).toFixed(toFixedNum)
}

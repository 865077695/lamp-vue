/**
 * 返回类型码对应的文字
 * @param {*当前类型码} typ
 * @param {*当前key对应的类型配置} options
 */
export const getStatusText = (typ, options) => {    // 传入当前类型和类型配置数组，返回类型码对应的文字
  let label
  options.map(item => {
    if (item.value === typ) {
      label = item.label
    }
  })
  return label
}

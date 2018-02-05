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

const add0 = function (val) {
  if (val < 10) {
    val = '0' + val
  }
  return val
}
export const formmatDate = (date) => {    // 格式化日期格式
  let time = new Date(date)
  return `${time.getFullYear()}-${add0(time.getMonth() + 1)}-${add0(time.getDate())} ${add0(time.getHours())}:${add0(time.getMinutes())}:${add0(time.getSeconds())}`
}

export const formmatTime = (date) => {    // 格式化时间格式
  let time = new Date(date)
  return `${add0(time.getHours())}:${add0(time.getMinutes())}:${add0(time.getSeconds())}`
}

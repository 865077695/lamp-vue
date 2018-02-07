/**
 * 返回类型码对应的文字
 * @param {*当前类型码} typ
 * @param {*当前key对应的类型配置} options
 */
import config from '@/config'
export const getStatusText = (typ, options) => {    // 传入当前类型和类型配置数组，返回类型码对应的文字
  let label = '未知'
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

export const powerDate = () => {      // 返回能耗统计页面所用的年月待选数据
  let startYear = config.startYear
  let y = []
  let time = new Date() // 当前年份
  let year = time.getFullYear()
  for (let i = 0; i < year - startYear + 1; i++) {
    y.push(String(+startYear + i))
  }
  y = y.map(item => {
    return {
      value: item,
      label: item,
      children: [{
        value: '01',
        label: '01'
      }, {
        value: '02',
        label: '02'
      }, {
        value: '03',
        label: '03'
      }, {
        value: '04',
        label: '04'
      }, {
        value: '05',
        label: '05'
      }, {
        value: '06',
        label: '06'
      }, {
        value: '07',
        label: '07'
      }, {
        value: '08',
        label: '08'
      }, {
        value: '09',
        label: '09'
      }, {
        value: '10',
        label: '10'
      }, {
        value: '11',
        label: '11'
      }, {
        value: '12',
        label: '12'
      }]
    }
  })
  return y
}

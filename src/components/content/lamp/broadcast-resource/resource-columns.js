import http from '@/common/http'
export const audioColumns = [
  { title: '资源id', key: 'id', width: 100 },
  { title: '资源名称', key: 'name', width: 200 },
  { title: '资源地址', key: 'url', width: 300 },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              console.log(params)
            }
          }
        }, '编辑'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              this.tableLoading = true
              http({ url: '/media/delete', method: 'POST', data: { id: params.row.id, url: params.row.url } })
                .then(res => {
                  if (res.code === 200) {
                    this.$Message.success('删除资源成功')
                    this.updateData()
                  } else {
                    this.$Message.warning('删除失败')
                  }
                })
            }
          }
        }, '删除')
      ])
    }
    // {
    //   title: '资源类型',
    //   key: 'typ',
    //   render: (h, params) => {
    //     return h('div', getStatusText(params.row.typ, dev.typeOptions))
    //   }
    // },
  }
]

export const videoColumns = audioColumns

<template>
  <div>
    <span class="title">{{$route.query.id}}</span> 照明分组<br><br>
    <Button @click="addGroup">新建分组</Button><br><br>
    <Table class="table" border :loading="dataLoading" :columns="columns" :data="groupList"></Table>

<!-- 策略设置modal -->
    <Modal v-model="editModal" width="720">
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>策略设置</span>
        </p>
        <div style="padding: 0 50px;">
          分组名称： <br><br>
          <Input v-model="edit.groupName" placeholder="输入分组名称" style="width: 200px"></Input>
          <br><br>
          开启时间：<br><br>
          <TimePicker :value="edit.time" @on-change="timeChange" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 200px"></TimePicker>
        </div>
        <div slot="footer" style="text-align: center;">
            <Button type="primary" size="large" :loading="editModal_loading" @click="sub">提交</Button>
            <Button type="primary" size="large" @click="cancel">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'LightSet',
  data () {
    return {
      dataLoading: false,         // 表格加载动画
      editModal_loading: false,   // 策略设置确认时加载动画
      editModal: false,           // 策略设置modal框状态
      edit: {
        time: [],
        groupName: ''
      },
      groupList: [
        { groupName: '全关分组', groupId: 'a', time: [111, 222] },
        { groupName: '全关分组', groupId: 'b', time: [111, 222] },
        { groupName: '全关分组', groupId: 'c', time: [111, 222] },
        { groupName: '全关分组', groupId: 'd', time: [111, 222] },
        { groupName: '全关分组', groupId: 'e', time: [111, 222] }
      ],
      columns: [
        { title: '分组名称', key: 'groupName' },
        {
          title: '操作',
          key: 'action',
          width: 400,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    // 根据id获取该分组数据赋值给edit
                    this.edit = params.row
                    this.editModal = true
                  }
                }
              }, '策略设置'),
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    // this.$router.push({ path: '/street-edit', query: { id: params.row.streetId } })
                  }
                }
              }, '编辑分组'),
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    // this.$router.push({ path: '/street-edit', query: { id: params.row.streetId } })
                  }
                }
              }, '详情')
            ])
          }
        }
      ]
    }
  },
  methods: {
    addGroup () {
      // 新建空的edit
      this.edit = {}
      this.editModal = true
    },
    sub () {
      this.editModal_loading = true
      // ajax提交
      setTimeout(() => {
        // 提交
        this.editModal_loading = false
        this.editModal = false
      }, 1000)
      console.log(this.edit)
    },
    cancel () {
      this.editModal = false
    },
    timeChange ($event) {
      this.edit.time = $event
    }
  }
}
</script>

<style scoped>
.title {
  color: rgb(90, 68, 68);
}
</style>

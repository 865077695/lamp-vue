<template>
  <div>
    <div v-for="item in chartData" class="box" :style="'background: url(/static/img/'+item.bgImg+'.png) top center/100% 100%'" :key="item.status">
      <p style="color: #e9eaec">{{item.name}}</p>
      <p style="color: #fff;font-size: 26px;letter-spacing: 2px">{{item.count}}</p>
    </div>
    
    <Card class="notify">
        <p slot="title">
            <Icon type="information-circled"></Icon>
            报警通知
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit" title="更多">
            <Icon type="more"></Icon>
        </a>
        <ul>
            <li v-for="item in notifyData" :key="item.id">
                <Alert type="success">{{item.poleName}}:{{item.deviceTyp | optionToText}}{{item.content}}</Alert>
            </li>
        </ul>
    </Card>
    <!-- <div class="notify">
      <p v-for="item in notifyData" :key="item.id">灯杆{{item.poleName}}：{{item.content}}</p>
    </div> -->
  </div>
</template>

<script>
import bus from '@/eventBus'
import { chartData, msgTyp } from '@/data/options'
import { getStatusText } from '@/common/_func'
export default {
  name: 'chart',
  data () {
    return {
      notifyData: [
        { id: 'a' }
      ],
      chartData,
      value2: 0
    }
  },
  methods: {
    changeLimit () {
      this.$router.push({ path: '/user-analysis/alert-notice' })
    }
  },
  created () {
    bus.$on('setChart', (params) => {
      let total = 0
      params.map(item => {
        total += item.cou
      })
      this.chartData.map(item => {
        if (item.status === 0) {
          item.count = total
        } else {
          params.map(i => {
            if (i.status === item.status) {
              item.count = i.cou
            }
          })
        }
      })
    })
    bus.$on('setNotice', (params) => {
      this.notifyData = params
      console.log(this.notifyData)
    })
  },
  filters: {
    optionToText: function (value) {
      console.log(value)
      let text = getStatusText(value, msgTyp)
      return text
    }
  }
}
</script>

<style scoped>
.box {
  height: 120px;
  width: 240px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding-left: 20px;
  padding-top: 20px;
}
.notify {
  width: 240px;
  max-height: 250px;
}
</style>

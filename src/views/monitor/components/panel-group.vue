<template>

  <div class="panel_wrap">

    <ul>
      <li>
        <img src="~@/assets/raping.svg" alt="" class="left_icon">
        <div class="li_right">
          <span>实时负载功率(kW)</span>
          <span>{{ realpower }}</span>
        </div>
      </li>
      <li>
        <img src="~@/assets/drfdl.svg" alt="" class="left_icon">
        <div class="li_right">
          <span>当日发电量(kWh)</span>
          <span>{{ tgeneration }}</span>
        </div>
      </li>
      <li>
        <img src="~@/assets/allfd.svg" alt="" class="left_icon">
        <div class="li_right">
          <span>总发电量(MWh)</span>
          <span>{{ dgeneration }}</span>
        </div>
      </li>
      <li>
        <img src="~@/assets/runed.svg" alt="" class="left_icon">
        <div class="li_right">
          <span>运行电站数</span>
          <span>{{ projectnum }}</span>
        </div>
      </li>
      <li>
        <img src="~@/assets/alarm.svg" alt="" class="left_icon">
        <div class="li_right">
          <span>报警电站数</span>
          <span>0</span>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import store from '@/store'
import { dealonenumber } from '@/utilcommon.js'
import { getAppIndexData } from '@/api/mainmonitor.js'
export default {
  name:'PanelGroup',
  data(){
    return {
      realpower:'', // 实时负载功率
      dgeneration:'', // 当日发电量
      tgeneration:'', // 总发电量
      projectnum:'', // 运行电站数
      intervalData: null, // 定时器
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      this.getData();
      this.intervalData = window.setInterval(() => {
          this.getData()
      }, 1000)
    },
    getData(){
      getAppIndexData (store.getters.userid).then(res =>{

        this.realpower = dealonenumber(res.result.realpower);
        this.dgeneration = dealonenumber(res.result.dgeneration);
        this.tgeneration = dealonenumber(res.result.tgeneration);
        this.projectnum = dealonenumber(res.result.projectnum);
      });
    },
    // beforeunloadFn(e){
    //   e = e || window.event
    //   if (e) {
    //     e.returnValue = '关闭提示'
    //     console.log('e  刷新PanelGroup');

    //   }
    //   window.sessionStorage.setItem('a',1)
    //   return '关闭提示'
    //   console.log('刷新PanelGroup');

    // }
  },
  watch:{
    '$route': function (to, from) {
      this.init()
    }
  },
  beforeDestroy(){
    window.clearInterval(this.intervalData);
    this.intervalData = null;
  },
  // destroyed() {
  //   window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  // }
}
</script>

<style lang="scss" scoped>
.panel_wrap {
  width:100%;
  padding:10px 0.5% 0;
  z-index:100;
  position:relative;
  ul{
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding-left:0;
    margin:0;
    li{
      list-style:none;
      width:19%;
      background: rgba(32,57,88,0.9);
      border: 1px solid #3D507B;
      border-radius: 1px;
      height:100px;
      display:flex;
      justify-content: space-around;
      align-items: center;

      .li_right{
        span:first-child{
          display:block;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #939EBC;
          letter-spacing: 0.86px;
          text-align: right;
          margin-bottom:5px;
        }
        span:last-child{
          display:block;
          font-family: MicrosoftYaHei;
          font-size: 30px;
          color: #C2D4F1;
          letter-spacing: 2.14px;
          text-align: right;
        }
      }
    }
  }


}

</style>

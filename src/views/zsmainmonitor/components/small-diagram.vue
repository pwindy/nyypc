<template>
  <div class="lf_bottom_wrap" id="small_wrap" v-if="smalldata && smalldata[4] && smalldata[4].aFarACV">
    <div class="leftright_small right_small linerl1" style="width:70%;top:14%;left:12%;z-index:10;"></div>

    <div v-if="smalldata[0].tap > 0" class="topdown_small down_small linedu11" style="height:62%;top:14%;left:28%"></div>
    <div v-else-if="smalldata[0].tap < 0" class="topdown_small top_small linedu11" style="height:62%;top:14%;left:28%"></div>
    <div v-else-if="smalldata[0].tap == 0" class="topdown_small tdstop_small linedu11" style="height:62%;top:14%;left:28%"></div>

    <div class="leftright_small right_small linerl2" style="width:40.3%;top:47%;left:30%;z-index:30;"></div>

    <div class="topdown_small down_small linedu11" style="height:30%;top:47%;left:49%;z-index:20;"></div>
    <div class="topdown_small down_small linedu11" style="height:30%;top:47%;left:69%;z-index:20;"></div>

    <!-- 电网 -->
    <div class="sbdiv" style="top:7%;left:7%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallcyj.svg" />

      <div class="infobox chaiyouji" style="width:160px;left: 80%;">
        <div class="sbcanshu">
          <p>三相电压(V):</p><p>{{ smalldata[4].aFarACV | sanxiang_filters(smalldata[4].bFarACV,smalldata[4].cFarACV) }}</p>
        </div>
        <div class="sbcanshu">
          <p>三相电流(A):</p><p>{{ smalldata[4].aFarACA | sanxiang_filters(smalldata[4].bFarACA,smalldata[4].cFarACA) }}</p>
        </div>
        <div class="sbcanshu">
          <p>实时功率(kW):</p><p>{{ smalldata[4].farTAP }}</p>
        </div>
      </div>

      <div class="devicestatus"><img src="@/assets/dwstatus.svg" alt=""></div>

    </div>


    <!-- 负载 -->
    <div class="sbdiv" style="top:7%;left:78%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallfz.svg" />

      <!-- <div class="infobox fuzai" style="width:120%;left: -50%;top: 0;"> -->
      <div class="infobox fuzai" style="width:100px;left: 70%;top: 10%;">
        <div class="sbcanshu">
          <p>实时功率(kWh):</p>
          <p>{{smalldata[4].loadTAP}}</p>
        </div>
      </div>

      <div class="devicestatus">
        <img src="@/assets/fzstatus.svg" alt="">
      </div>
    </div>


    <!--储能变流器  PCS -->
    <div class="sbdiv" style="top:40%;left:24%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallpcs.svg" />
      <!-- <div class="infobox mainpcs1" style="width:220%;left:-200%;top:-30%;"> -->
      <div class="infobox mainpcs1" style="width:200px;left:80%;top:-30%;">
        <div class="sbcanshu">
          <p>运行状态:</p><p>{{ smalldata[0].runState | yxzt_filters}}</p>
        </div>
        <div class="sbcanshu">
          <p>并离网状态:</p><p>{{ smalldata[0].gridState | blwzt_filters}}</p>
        </div>
        <div class="sbcanshu">
          <p>控制模式:</p><p>{{ smalldata[0].localAutomation | kzms_filters( smalldata[0].localManual,smalldata[0].remoteControl ) }}</p>
        </div>
        <div class="sbcanshu">
          <p>三相电压(V):</p><p>{{ smalldata[0].abacv | sanxiang_filters(smalldata[0].bcacv,smalldata[0].caacv) }}</p>
        </div>
        <div class="sbcanshu">
          <p>三相电流(A):</p><p>{{ smalldata[0].aaci | sanxiang_filters(smalldata[0].baci,smalldata[0].caci) }}</p>
        </div>
        <div class="sbcanshu">
          <p>实时功率(kW):</p><p>{{ smalldata[0].tap }}</p>
        </div>
        <div class="sbcanshu">
          <p>直流电压(V):</p><p>{{ smalldata[0].dcv }}</p>
        </div>
        <div class="sbcanshu">
          <p>直流电流(A):</p><p>{{ smalldata[0].dci }}</p>
        </div>
        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/pcs',query:{id:13,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus">
        <img src="@/assets/pcsstatus.svg" alt="">
      </div>
    </div>


   <!--空调  ac1 -->
    <div class="sbdiv" style="top:70%;left:45%;z-index:30;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallac.svg" />

      <!-- <div class="infobox mainac1" style="width:100%;left:-80%;top:0;"> -->
      <div class="infobox mainac1" style="width:90px;left:80%;top:0;">
        <div class="sbcanshu">
          <p>运行状态:</p><p>{{ smalldata[2].comState| yxzt_filters }}</p>
        </div>
        <div class="sbcanshu">
          <p>室温(℃):</p><p>{{ smalldata[2].innerTemperature }}</p>
        </div>
        <div class="sbcanshu">
          <p>湿度:</p><p>{{ smalldata[2].humidity }}</p>
        </div>
        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/ac',query:{id:15,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus">
        <img src="@/assets/ac1status.svg" alt="">
      </div>
    </div>

   <!--空调  ac2 -->
    <div class="sbdiv" style="top:70%;left:65%;z-index:30;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallac.svg" />
      <!-- <div class="infobox mainac1" style="width:100%;left:-80%;top:0;"> -->
      <div class="infobox mainac1" style="width:90px;left:80%;top:0;">
        <div class="sbcanshu">
          <p>运行状态:</p><p>{{ smalldata[3].comState| yxzt_filters }}</p>
        </div>
        <div class="sbcanshu">
          <p>室温(℃):</p><p>{{ smalldata[3].innerTemperature }}</p>
        </div>
        <div class="sbcanshu">
          <p>湿度:</p><p>{{ smalldata[3].humidity }}</p>
        </div>
        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/ac',query:{id:15,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus">
        <img src="@/assets/ac2status.svg" alt="">
      </div>
    </div>


    <!--储能电表  bms -->
    <div class="sbdiv" style="top:72%;left:24%;z-index:50;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallbms.svg" />

      <!-- <div class="infobox mainbms1" style="width:140%;left:80%;top:-100%;"> -->
      <div class="infobox mainbms1" style="width:160px;right:80%;top:-100%;">
        <div class="sbcanshu">
          <p>运行状态:</p><p>{{ smalldata[1].comState | yxzt_filters }}</p>
        </div>
        <div class="sbcanshu">
          <p>电压(V):</p><p>{{ smalldata[1].group_V }}</p>
        </div>
        <div class="sbcanshu">
          <p>电流(A):</p><p>{{ smalldata[1].group_I }}</p>
        </div>
        <div class="sbcanshu">
          <p>SOC:</p><p>{{ smalldata[1].soc }}</p>
        </div>
        <div class="sbcanshu">
          <p>SOH:</p><p>{{ smalldata[1].soh }}</p>
        </div>
        <div class="sbcanshu">
          <p>可充电量(kWh):</p><p>{{ smalldata[1].group_RC }}</p>
        </div>
        <div class="sbcanshu">
          <p>可放电量(kWh):</p><p>{{ smalldata[1].group_DQ }}</p>
        </div>
        <div class="sbcanshu">
          <p>电池温度(℃):</p><p>{{ smalldata[1].mbt }}</p>
        </div>
        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/bms',query:{id:14,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus" style="top:80%;">
        <img src="@/assets/bmsstatus.svg" alt="">
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'SmallDiagram',
  props:{
    sbdata:Array
  },
  data() {
    return {
      smalldata:[],
      projectid: this.$route.query.projectid
    }
  },
  mounted(){
    let _this = this;
    _this.$nextTick( () => {
      _this.smalldata = _this.sbdata;
    });
  },
  watch:{
    sbdata: function (newVal ,oldVal){ //不能用箭头函数
      if(newVal != oldVal){
        let _this = this;
        _this.$nextTick( () => {
          let small_wrap = document.getElementById('small_wrap');
          if(small_wrap){
            _this.smalldata = newVal;
          }

        })
      }
    }
  },

  methods:{

    enters(e){
      e.toElement.childNodes[1].style.display = "block";
    },
    leaver(e){
      e.fromElement.childNodes[1].style.display = "none";
    }

  },

  filters: {

    sanxiang_filters: function(value,value1,value2){
      return value + '/' + value1 + '/' + value2;
    },
    yxzt_filters: function(value){
      if( value == 0 ) { return "关机" }
      else { return "开机" }
    },
    blwzt_filters: function(value){
      if( value == 0 ) { return "并网" }
      else { return "离网" }
    },
    kzms_filters: function(value,localManual,remoteControl){
      if( value == 1 ) { return "本地自动" }
      else if( localManual == 1 ) { return "本地手动" }
      else if( remoteControl == 1 ) { return "远程控制" }
    }

  }
}
</script>
<style lang="scss" scoped>
.lf_bottom_wrap{
  width:100%;
  height:100%;
  position:relative;

  .devicestatus{
    position: absolute;
    z-index: 30;
    top:90%;
    left:10%;
    img{
      display:block;
      overflow:hidden;
    }
  }

  .sbdiv{
    position: absolute;
    width:8%;
    z-index: 40;

    img{
      width:100%;
    }

    .infobox{
      position: absolute;
      font-size:12px;
      padding: 10% 0;
      color:#8a91a3;
      background: #2d416e;
      box-shadow: 0 0 0.375rem 0 rgba(7,77,155,.22);
      font-family: MicrosoftYaHei;
      z-index: 101;
      top: 0;
      display:none;
      .sbcanshu{
        line-height:18px;
        text-align:center;
        p{
          display:inline-block;
          margin:0;
        }
        p:last-child{
          color:#fff;
        }
      }
      .detail{
        width:100%;
        margin-top: 8%;
        text-align: center;
        a{
          font-size: 12px;
          color: #fff;
          border-radius: 2px;
          background: #06f;
          display: inline-block;
          padding: 5% 12%;
          // cursor:pointer;
        }
      }
    }


  }
}







</style>

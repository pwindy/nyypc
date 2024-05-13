<template>
  <div class="lf_bottom_wrap" id="small_wrap" v-if="smalldata && smalldata[1]">
    <div v-if="smalldata[1].powerGeneration == 0" class="leftright_small lrstop_small linerl1" style="width:33.5%;top:18%;left:12%;z-index:10;"></div>
    <div v-else class="leftright_small right_small linerl1" style="width:33.5%;top:18%;left:12%;z-index:10;"></div>

    <div v-if="smalldata[4].itap == 0" class="leftright_small lrstop_small linerl2" style="width:35%;top:18%;left:45.5%;z-index:10;"></div>
    <div v-else class="leftright_small right_small linerl2" style="width:35%;top:18%;left:45.5%;z-index:10;"></div>

    <div v-if="smalldata[2].tap > 0" class="topdown_small top_small linedu11" style="height:62%;top:18%;left:45%"></div>
    <div v-else-if="smalldata[2].tap < 0" class="topdown_small down_small linedu11" style="height:62%;top:18%;left:45%"></div>
    <div v-else-if="smalldata[2].tap == 0" class="topdown_small tdstop_small linedu11" style="height:62%;top:18%;left:45%"></div>


    <!-- 柴油机 -->
    <div class="sbdiv" style="top:10%;left:7%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallcyj.svg" />

      <!-- <div class="infobox chaiyouji" style="width:220%;left: 80%;"> -->
      <div class="infobox chaiyouji" style="width:200px;left: 80%;">
        <div class="sbcanshu">
          <p>U(V):</p><p>{{ smalldata[1].generating12V | sanxiang_filters(smalldata[1].generating23V,smalldata[1].generating31V) }}</p>
        </div>
        <div class="sbcanshu">
          <p>P(kW):</p><p>{{ smalldata[1].powerGeneration }}</p>
        </div>
        <div class="sbcanshu">
          <p>频率(hZ):</p><p>{{ smalldata[1].generationFrequency }}</p>
        </div>
      </div>

      <div class="devicestatus"><img src="@/assets/dwstatus.svg" alt=""></div>

    </div>

    <!-- 负载 电表 -->
    <div class="sbdiv" style="top:10%;left:78%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallfz.svg" />

      <!-- <div class="infobox fuzai" style="width:120%;left: -50%;top: 0;"> -->
      <div class="infobox fuzai" style="width:100px;right: 70%;top: 10%;">
        <div class="sbcanshu">
          <p>P(kW):</p>
          <p>{{smalldata[4].itap}}</p>
        </div>
      </div>

      <div class="devicestatus">
        <img src="@/assets/fzstatus.svg" alt="">
      </div>
    </div>


    <!--储能变流器  PCS -->
    <div class="sbdiv" style="top:40%;left:41%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallpcs.svg" />
      <!-- <div class="infobox mainpcs1" style="width:220%;left:-200%;top:-30%;"> -->
      <div class="infobox mainpcs1" style="width:200px;left:80%;top:-30%;">
        <div class="sbcanshu">
          <p>运行状态:</p><p>{{ smalldata[2].runState | yxzt_filters}}</p>
        </div>
        <div class="sbcanshu">
          <p>并离网状态:</p><p>{{ smalldata[2].gridState | blwzt_filters}}</p>
        </div>
        <div class="sbcanshu">
          <p>控制模式:</p><p>{{ smalldata[2].localAutomation | kzms_filters( smalldata[2].localManual,smalldata[2].remoteControl ) }}</p>
        </div>
        <div class="sbcanshu">
          <p>三相电压(V):</p><p>{{ smalldata[2].abacv | sanxiang_filters(smalldata[2].bcacv,smalldata[2].caacv) }}</p>
        </div>
        <div class="sbcanshu">
          <p>三相电流(A):</p><p>{{ smalldata[2].aaci | sanxiang_filters(smalldata[2].baci,smalldata[2].caci) }}</p>
        </div>
        <div class="sbcanshu">
          <p>实时功率(kW):</p><p>{{ smalldata[2].tap }}</p>
        </div>
        <div class="sbcanshu">
          <p>直流电压(V):</p><p>{{ smalldata[2].dcv }}</p>
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


    <!--储能电表  bms -->
    <div class="sbdiv" style="top:72%;left:41%;z-index:50;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallbms.svg" />

      <!-- <div class="infobox mainbms1" style="width:140%;left:80%;top:-100%;"> -->
      <div class="infobox mainbms1" style="width:200px;left:80%;top:-100%;">
        <div class="sbcanshu">
          <p>运行状态:</p><p>{{ smalldata[3].comState | yxzt_filters }}</p>
        </div>
        <div class="sbcanshu">
          <p>电压(V):</p><p>{{ smalldata[3].group_V }}</p>
        </div>
        <div class="sbcanshu">
          <p>电流(A):</p><p>{{ smalldata[3].group_I }}</p>
        </div>
        <div class="sbcanshu">
          <p>SOC:</p><p>{{ smalldata[3].soc }}</p>
        </div>
        <div class="sbcanshu">
          <p>SOH:</p><p>{{ smalldata[3].soh }}</p>
        </div>
        <div class="sbcanshu">
          <p>可充电量(kWh):</p><p>{{ smalldata[3].group_RC }}</p>
        </div>
        <div class="sbcanshu">
          <p>可放电量(kWh):</p><p>{{ smalldata[3].group_DQ }}</p>
        </div>
        <div class="sbcanshu">
          <p>电池温度(℃):</p><p>{{ smalldata[3].mbt }}</p>
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

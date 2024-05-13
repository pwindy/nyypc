<template>
  <div class="lf_bottom_wrap" id="small_wrap" v-if="smalldata && smalldata[0]">

    <!-- 负载 -->
    <div v-if="smalldata[1][5].loadTAP == 0" class="topdown_small tdstop_small linedu11" style="height:25%;top:8.5%;left:54%;z-index:10;"></div>
    <div v-else class="topdown_small top_small linedu11" style="height:25%;top:8.5%;left:54%;z-index:10;"></div>



    <!-- 柴油机1 -->
    <div v-if="smalldata[0][1].powerGeneration == 0" class="leftright_small lrstop_small line1" style="width:22%;top:32%;left:17.5%;z-index:11;"></div>
    <div v-else class="leftright_small right_small line1" style="width:22%;top:32%;left:17.5%;z-index:11;"></div>

    <!-- 柴油机中间 -->
    <div v-if="(smalldata[0][1].powerGeneration-smalldata[0][2].tap-smalldata[0][4].itap) > 0" class="leftright_small right_small line2" style="width:28.5%;top:32%;left:39.5%;z-index:11;"></div>
    <div v-else-if="(smalldata[0][1].powerGeneration-smalldata[0][2].tap-smalldata[0][4].itap) < 0" class="leftright_small left_small line2" style="width:28.5%;top:32%;left:39.5%;z-index:11;"></div>
    <div v-else-if=" ( smalldata[0][1].powerGeneration == 0 && smalldata[0][2].tap == 0 && smalldata[0][4].itap == 0 ) || ( smalldata[1][1].powerGeneration == 0 && smalldata[1][2].tap == 0 && smalldata[1][4].itap == 0 ) " class="leftright_small lrstop_small line2" style="width:28.5%;top:32%;left:39.5%;z-index:11;"></div>

    <!-- 柴油机2 -->
    <div v-if="smalldata[1][1].powerGeneration == 0" class="leftright_small lrstop_small line3" style="width:22%;top:32%;left:68%;z-index:11;"></div>
    <div v-else class="leftright_small left_small line3" style="width:22%;top:32%;left:68%;z-index:11;"></div>

    <!-- pcs1 -->
    <div v-if="smalldata[0][2].tap == 0" class="topdown_small tdstop_small linedu21" style="height:48%;top:33.5%;left:39%;z-index:10;"></div>
    <div v-else-if="smalldata[0][2].tap > 0" class="topdown_small top_small linedu21" style="height:48%;top:33.5%;left:39%;z-index:10;"></div>
    <div v-else-if="smalldata[0][2].tap < 0" class="topdown_small down_small linedu21" style="height:48%;top:33.5%;left:39%;z-index:10;"></div>

    <!-- pcs2 -->
    <div v-if="smalldata[1][2].tap == 0" class="topdown_small tdstop_small linedu22" style="height:48%;top:33.5%;left:68%;z-index:10;"></div>
    <div v-else-if="smalldata[1][2].tap > 0" class="topdown_small top_small linedu22" style="height:48%;top:33.5%;left:68%;z-index:10;"></div>
    <div v-else-if="smalldata[1][2].tap < 0" class="topdown_small down_small linedu22" style="height:48%;top:33.5%;left:68%;z-index:10;"></div>



    <!-- 柴油机1 -->
    <div class="sbdiv" style="top:25%;left:15%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallcyj.svg" />

      <!-- <div class="infobox chaiyouji" style="width:120%;left: 80%;"> -->
      <div class="infobox chaiyouji" style="width:100px;left: 90%;">
        <div class="sbcanshu">
          <p>P(kW):</p><p>{{ smalldata[0][1].powerGeneration }}</p>
        </div>
        <div class="sbcanshu">
          <p>U(V):</p><p>{{ smalldata[0][1].chargeEngineV }}</p>
        </div>
        <div class="sbcanshu">
          <p>频率(Hz):</p><p>{{ smalldata[0][1].generationFrequency }}</p>
        </div>
        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/dg',query:{id:56,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus"><img src="@/assets/cyj1status.svg" alt=""></div>
    </div>

    <!-- 柴油机2 -->
    <div class="sbdiv" style="top:25%;left:85%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallcyj.svg" />

      <!-- <div class="infobox chaiyouji" style="width:120%;right: 80%;"> -->
      <div class="infobox chaiyouji" style="width:100px;right: 90%;">
        <div class="sbcanshu">
          <p>P(kW):</p><p>{{ smalldata[1][1].powerGeneration }}</p>
        </div>
        <div class="sbcanshu">
          <p>U(V):</p><p>{{ smalldata[1][1].chargeEngineV }}</p>
        </div>
        <div class="sbcanshu">
          <p>频率(Hz):</p><p>{{ smalldata[1][1].generationFrequency }}</p>
        </div>
        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/dg',query:{id:56,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus"><img src="@/assets/cyj2status.svg" alt=""></div>
    </div>


    <!-- 负载 -->
    <div class="sbdiv" style="top:2%;left:50.2%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallfz.svg" />

      <!-- <div class="infobox fuzai" style="width:120%;right: -90%;top: 0;"> -->
      <div class="infobox fuzai" style="width:100px;left: 80%;top: 30%;">
        <div class="sbcanshu">
          <p>P(kW):</p>
          <p>{{ smalldata[1][5].loadTAP }}</p>
        </div>
      </div>

      <div class="devicestatus">
        <img src="@/assets/fzstatus.svg" alt="">
      </div>
    </div>





    <!--储能变流器  PCS1 -->
    <div class="sbdiv" style="top:47%;left:35.5%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallpcs.svg" />
      <!-- <div class="infobox mainpcs1" style="width:180%;left:-170%;top:-30%;"> -->
      <div class="infobox mainpcs1" style="width:200px;right:80%;top:-30%;">
        <div class="sbcanshu">
          <p>U(V):</p><p>{{ smalldata[0][2].abacv | sanxiang_filters(smalldata[0][2].bcacv,smalldata[0][2].caacv) }}</p>
        </div>
        <div class="sbcanshu">
          <p>I(A):</p><p>{{ smalldata[0][2].aaci | sanxiang_filters(smalldata[0][2].baci,smalldata[0][2].caci) }}</p>
        </div>
        <div class="sbcanshu">
          <p>P(kW):</p><p>{{ smalldata[0][2].tap }}</p>
        </div>
        <div class="sbcanshu">
          <p>频率(Hz):</p><p>{{ smalldata[0][2].acFrequency }}</p>
        </div>

        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/pcs',query:{id:57,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus">
        <img src="@/assets/pcs1status.svg" alt="">
      </div>
    </div>


    <!--储能变流器  PCS2 -->
    <div class="sbdiv" style="top:47%;left:64.5%;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallpcs.svg" />
      <!-- <div class="infobox mainpcs1" style="width:180%;left:-170%;top:-30%;"> -->
      <div class="infobox mainpcs1" style="width:200px;right:80%;top:-30%;">
        <div class="sbcanshu">
          <p>U(V):</p><p>{{ smalldata[1][2].abacv | sanxiang_filters(smalldata[1][2].bcacv,smalldata[1][2].caacv) }}</p>
        </div>
        <div class="sbcanshu">
          <p>I(A):</p><p>{{ smalldata[1][2].aaci | sanxiang_filters(smalldata[1][2].baci,smalldata[1][2].caci) }}</p>
        </div>
        <div class="sbcanshu">
          <p>P(kW):</p><p>{{ smalldata[1][2].tap }}</p>
        </div>
        <div class="sbcanshu">
          <p>频率(Hz):</p><p>{{ smalldata[1][2].acFrequency }}</p>
        </div>
        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/pcs',query:{id:57,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus">
        <img src="@/assets/pcs2status.svg" alt="">
      </div>
    </div>


    <!--储能电表  bms1 -->
    <div class="sbdiv" style="top:76%;left:35.5%;z-index:50;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallbms.svg" />

      <!-- <div class="infobox mainbms1" style="width:140%;left:100%;top:-20%;"> -->
      <div class="infobox mainbms1" style="width:160px;right:80%;top:-20%;">
        <div class="sbcanshu">
          <p>SOC:</p><p>{{ smalldata[0][3].soc }}</p>
        </div>
        <div class="sbcanshu">
          <p>U(V):</p><p>{{ smalldata[0][3].group_V }}</p>
        </div>
        <div class="sbcanshu">
          <p>最大电压(mv):</p><p>{{ smalldata[0][3].mvosU1 }}</p>
        </div>
        <div class="sbcanshu">
          <p>最小电压(mv):</p><p>{{ smalldata[0][3].lvosU1 }}</p>
        </div>

        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/bms',query:{id:58,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus" style="top:80%;">
        <img src="@/assets/bms1status.svg" alt="">
      </div>
    </div>

    <!--储能电表  bms2 -->
    <div class="sbdiv" style="top:76%;left:64.5%;z-index:50;" @mouseenter="enters($event)" @mouseleave="leaver($event)">
      <img src="@/assets/smallbms.svg" />

      <!-- <div class="infobox mainbms1" style="width:140%;left:100%;top:-20%;"> -->
      <div class="infobox mainbms1" style="width:160px;right:80%;top:-20%;">
        <div class="sbcanshu">
          <p>SOC:</p><p>{{ smalldata[1][3].soc }}</p>
        </div>
        <div class="sbcanshu">
          <p>U(V):</p><p>{{ smalldata[1][3].group_V }}</p>
        </div>
        <div class="sbcanshu">
          <p>最大电压(mv):</p><p>{{ smalldata[1][3].mvosU1 }}</p>
        </div>
        <div class="sbcanshu">
          <p>最小电压(mv):</p><p>{{ smalldata[1][3].lvosU1 }}</p>
        </div>

        <div class="detail">
          <router-link :to="{ path:'/mainmonitor/bms',query:{id:58,projectid:projectid}}">详情</router-link>
        </div>
      </div>

      <div class="devicestatus" style="top:80%;">
        <img src="@/assets/bms2status.svg" alt="">
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'SmallDiagramfour',
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

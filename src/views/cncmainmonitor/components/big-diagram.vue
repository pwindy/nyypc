<template>
    <div class="lf_bottom_wrap" id="big_wrap" v-if="bigdata && bigdata[8] && bigdata[8].aFarACV">

      <div id="grightline1" class="leftright_big right_big" style="left:14%; top:15%;  width:70%; z-index: 1;background-size: 120px 3px;"></div>

      <div id="grightline2" class="leftright_big right_big" style="left:40%; top:45%;  width:32.5%;z-index: 1;"></div>

      <div v-if="bigdata[0].tap > 0" id="gdownline11" class="topdown_big down_big" style="left:40%; top:15%;  height:60%;z-index: 1;"></div>
      <div v-else-if="bigdata[0].tap < 0" id="gdownline11" class="topdown_big top_big" style="left:40%; top:15%;  height:60%;z-index: 1;"></div>
      <div v-else-if="bigdata[0].tap == 0" id="gdownline11" class="topdown_big tdstop_big" style="left:40%; top:15%;  height:60%;z-index: 1;"></div>

      <div id="gdownline12" class="topdown_big down_big" style="left:56.5%; top:45%;  height:30%;z-index: 1;"></div>
      <div id="gdownline13" class="topdown_big down_big" style="left:72.5%; top:45%;  height:30%;z-index: 1;"></div>

      <!-- 柴油机 -->
      <div class="sbdiv" style="top:10%;left:10%;cursor:pointer;" title="点击查看设备详情" @click="tocyjdevices">
        <img src="@/assets/bigcyj.svg" alt="" />
        <div class="infobox chaiyouji" style="width:250%;">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[7].generatingV1 | sanxiang_filters(bigdata[7].generatingV2,bigdata[7].generatingV3) }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[7].generatorL1VA | sanxiang_filters(bigdata[7].generatorL2VA,bigdata[7].generatorL3VA) }}</p>
          </div>
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[7].powerGeneration }}</p>
          </div>
        </div>
      </div>

    <!-- STS -->
    <div class="sbdiv" style="top:10%;left:20%;cursor:pointer;" title="点击查看设备详情"  @click="tostsdevices">
      <img src="@/assets/bigsts.svg" />
    </div>

      <!-- 电表 -->
      <div class="sbdiv" style="top:10%;left:30%;cursor:pointer;" title="点击查看设备详情" @click="todbdevices">
        <img src="@/assets/bigsts.svg" alt="" />
        <div class="infobox dianbiao" style="width:250%;left:-25%;">
          <div class="sbcanshu">
            <p style="width:110px;">有功功率(kW):</p><p>{{ bigdata[3].itap }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:110px;">无功功率(kVar):</p><p>{{ bigdata[3].itrp }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:110px;">电量(kWh):</p><p>{{ bigdata[3].tpap }}</p>
          </div>
        </div>
      </div>



       <!-- 负载 -->
      <div class="sbdiv" style="top:10%;left:80%;" title="负载">
        <img src="@/assets/bigfz.svg" alt="" />
        <div class="infobox fuzai">
          <div class="sbcanshu">
            <p>P(kW):</p>
            <p>{{bigdata[8].loadTAP}}</p>
          </div>
        </div>
      </div>

      <!--储能变流器  PCS -->
      <div class="sbdiv" style="top:40%;left:37.5%;cursor:pointer;" title="点击查看设备详情" @click="topcsdevices">
        <img src="@/assets/bigpcs.svg" alt="" />
        <div class="infobox mainpcs1" style="width:250%;">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[0].abacv | sanxiang_filters(bigdata[0].bcacv,bigdata[0].caacv) }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[0].aaci | sanxiang_filters(bigdata[0].baci,bigdata[0].caci) }}</p>
          </div>
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[0].tap }}</p>
          </div>
          <div class="sbcanshu">
            <p>并离网:</p><p>{{ bigdata[0].gridState | blwzt_filters}}</p>
          </div>
        </div>
      </div>


      <!--空调  ac1 -->
      <div class="sbdiv" style="top:72%;left:54%;z-index:30;cursor:pointer;" title="点击查看设备详情" @click="toacdevices">
        <img src="@/assets/bigac.svg" alt="" />

        <div class="infobox mainac1">
          <div class="sbcanshu">
            <p>T(℃):</p><p>{{ bigdata[4].exhaustTemperature }}</p>
          </div>
          <div class="sbcanshu">
            <p>L(%RH):</p><p>{{ bigdata[4].returnHumidity }}</p>
          </div>
        </div>

      </div>



      <!--空调  ac2 -->
      <div class="sbdiv" style="top:72%;left:70%;z-index:30;cursor:pointer;" title="点击查看设备详情" @click="toacdevices">
        <img src="@/assets/bigac.svg" alt=""/>

        <div class="infobox mainac2">
          <div class="sbcanshu">
            <p>T(℃):</p><p>{{ bigdata[5].exhaustTemperature }}</p>
          </div>
          <div class="sbcanshu">
            <p>L(%RH):</p><p>{{ bigdata[5].returnHumidity }}</p>
          </div>
        </div>

      </div>


      <!--储能电表  bms -->
      <div class="sbdiv" style="top:72%;left:37.5%;z-index:50;cursor:pointer;" title="点击查看设备详情" @click="tobmsdevices">
        <img src="@/assets/bigbms.svg" alt="" />

        <div class="infobox mainbms1">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[1].group_V }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[1].group_I }}</p>
          </div>
          <div class="sbcanshu">
            <p>SOC:</p><p>{{ bigdata[1].soc }}</p>
          </div>
        </div>
      </div>

    </div>

</template>

<script>

export default {
  name: 'BigDiagram',
  props:{
    sbdata:Array
  },
  data() {
    return {
      // bigdata :[],
      projectid: this.$route.query.projectid
    }
  },
  computed: {
    bigdata() {
      // console.log(this.sbdata);
      return this.sbdata
    }
  },
  methods:{
    enters(e){
      e.toElement.childNodes[1].style.display = "block";
    },
    leaver(e){
      e.fromElement.childNodes[1].style.display = "none";
    },
    tocyjdevices(){
      this.$router.push({ path: "/mainmonitor/dg",query: {id: 36,projectid: this.projectid} });
    },
    tostsdevices(){
      this.$router.push({ path: "/mainmonitor/sts",query: {id: 30,projectid: this.projectid} });
    },
    todbdevices(){
      this.$router.push({ path: "/mainmonitor/db",query: {id: 31,projectid: this.projectid} });
    },
    topcsdevices(){
      this.$router.push({ path: "/mainmonitor/pcs",query: {id: 28,projectid: this.projectid} });
    },
    toacdevices(){
      this.$router.push({ path: "/mainmonitor/ac",query: {id: 32,projectid: this.projectid} });
    },
    tobmsdevices(){
      this.$router.push({ path: "/mainmonitor/bms",query: {id: 29,projectid: this.projectid} });
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
    },
  }
}
</script>
<style lang="scss" scoped>
.lf_bottom_wrap{
  width:100%;
  height:100%;
  position:relative;

  .sbdiv{
    position: absolute;
    width:5%;
    z-index: 40;

    img{
      width:100%;
    }

    .infobox{
      position: absolute;
      width:150%;
      font-size:12px;
      color:#8a91a3;
      font-family: MicrosoftYaHei;
      z-index: 101;
      left: 0;
      top:95%;
      .sbcanshu{
        line-height:18px;
        width: 200%;
        // text-align:center;
        p{
          display:inline-block;
          margin:0;
        }
        p:first-child{
          width:55px;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #1D80F8;
          letter-spacing: 1.2px;
          line-height: 22px;
        }
        p:last-child{
          color:#fff;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          letter-spacing: 1.2px;
          line-height: 22px;
        }
      }

    }

  }
}








.leftline{
  position:absolute;
  width:10%;
  height:9px;
  background:#192e58 url("~@/assets/leftline.png") repeat-x 0 0;
  animation: torunlr 50000ms infinite linear;
}

.rightline{
  position:absolute;
  width:10%;
  height:9px;
  background:#192e58 url("~@/assets/rightline.png") repeat-x 0 0;
  animation: torunlr 50000ms infinite linear;
}
@keyframes torunlr {
    0% {
        background-position: 0 50%;
    }

    100% {
        background-position: 2000px 50%;
    }
}

.upline{
  position:absolute;
  width:9px;
  height:10%;
  background:#192e58 url("~@/assets/upline.png") repeat-y 0 0;
  animation: torunud 50000ms infinite linear;
}

.downline{
  position:absolute;
  width:9px;
  height:10%;
  background:#192e58 url("~@/assets/downline.png") repeat-y 0 0;
  animation: torunud 50000ms infinite linear;
}
@keyframes torunud {
    0% {
        background-position:50% 0 ;
    }

    100% {
        background-position: 50% 2000px;
    }
}


</style>

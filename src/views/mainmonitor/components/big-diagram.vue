<template>
    <div class="lf_bottom_wrap" id="big_wrap" v-if="bigdata && bigdata[11]">

      <div id="grightline1" class="leftright_big right_big" style="left:14%; top:15%;  width:70%; z-index: 1;background-size: 120px 3px;"></div>

      <div id="grightline2" class="leftright_big right_big" style="left:27.5%; top:45%;  width:16%;z-index: 1;"></div>
      <div id="grightline3" class="leftright_big right_big" style="left:55%; top:45%;  width:16%;z-index: 1;"></div>

      <div v-if="bigdata[0].tap > 0" id="gdownline11" class="topdown_big down_big" style="left:25%; top:15%;  height:60%;z-index: 1;"></div>
      <div v-else-if="bigdata[0].tap < 0" id="gdownline11" class="topdown_big top_big" style="left:25%; top:15%;  height:60%;z-index: 1;"></div>
      <div v-else-if="bigdata[0].tap == 0" id="gdownline11" class="topdown_big tdstop_big" style="left:25%; top:15%;  height:60%;z-index: 1;"></div>

      <div v-if="bigdata[1].tap > 0" id="gdownline21" class="topdown_big down_big" style="left:55%; top:15%;  height:60%;z-index: 1;"></div>
      <div v-else-if="bigdata[1].tap < 0" id="gdownline21" class="topdown_big top_big" style="left:55%; top:15%;  height:60%;z-index: 1;"></div>
      <div v-else-if="bigdata[1].tap == 0" id="gdownline21" class="topdown_big tdstop_big" style="left:55%; top:15%;  height:60%;z-index: 1;"></div>


      <!-- 柴油机 -->
      <div class="sbdiv" style="top:10%;left:10%;cursor: pointer;" title="点击查看设备详情" @click="tocyjdevices">
        <img src="@/assets/bigcyj.svg" alt="" />
        <div class="infobox chaiyouji" style="width:250%;">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[11].aFarACV | sanxiang_filters(bigdata[11].bFarACV,bigdata[11].cFarACV) }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[11].aFarACA | sanxiang_filters(bigdata[11].bFarACA,bigdata[11].cFarACA) }}</p>
          </div>
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[11].farTAP }}</p>
          </div>
        </div>
      </div>

      <!-- 一级柜 -->
      <div class="sbdiv" style="top:10%;left:65%;" title="一级柜">
        <img src="@/assets/bigsts.svg" alt="" />
      </div>

       <!-- 负载 -->
      <div class="sbdiv" style="top:10%;left:80%;" title="负载">
        <img src="@/assets/bigfz.svg" alt="" />
        <div class="infobox fuzai">
          <div class="sbcanshu">
            <p>P(kW):</p>
            <p>{{bigdata[11].loadTAP}}</p>
          </div>
        </div>
      </div>

      <!--储能变流器  PCS1 -->
      <div class="sbdiv" style="top:40%;left:22.5%;cursor:pointer;" title="点击查看设备详情" @click="topcsdevices">
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

      <!--储能变流器  PCS2 -->
      <div class="sbdiv" style="top:40%;left:52.5%;cursor:pointer;" title="点击查看设备详情" @click="topcsdevices">
        <img src="@/assets/bigpcs.svg" alt="" />

        <div class="infobox mainpcs2" style="width:250%;">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[1].abacv | sanxiang_filters(bigdata[0].bcacv,bigdata[0].caacv) }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[1].aaci | sanxiang_filters(bigdata[0].baci,bigdata[0].caci) }}</p>
          </div>
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[1].tap }}</p>
          </div>
          <div class="sbcanshu">
            <p>并离网:</p><p>{{ bigdata[1].gridState | blwzt_filters}}</p>
          </div>
        </div>
      </div>

      <!--空调  ac1 -->
      <div class="sbdiv" style="top:40%;left:42%;z-index:30;cursor:pointer;" title="点击查看设备详情" @click="toacdevices">
        <img src="@/assets/bigac.svg" alt="" />

        <div class="infobox mainac1">
          <div class="sbcanshu">
            <p>T(℃):</p><p>{{ bigdata[4].innerTemperature }}</p>
          </div>
          <div class="sbcanshu">
            <p>L(%RH):</p><p>{{ bigdata[4].humidity }}</p>
          </div>
        </div>

      </div>



      <!--空调  ac2 -->
      <div class="sbdiv" style="top:40%;left:70%;z-index:30;cursor:pointer;" title="点击查看设备详情" @click="toacdevices">
        <img src="@/assets/bigac.svg" alt=""/>

        <div class="infobox mainac2">
          <div class="sbcanshu">
            <p>T(℃):</p><p>{{ bigdata[5].innerTemperature }}</p>
          </div>
          <div class="sbcanshu">
            <p>L(%RH):</p><p>{{ bigdata[5].humidity }}</p>
          </div>
        </div>

      </div>


      <!--储能电表  bms1 -->
      <div class="sbdiv" style="top:72%;left:22.5%;z-index:50;cursor:pointer;" title="点击查看设备详情" @click="tobmsdevices">
        <img src="@/assets/bigbms.svg" alt="" />

        <div class="infobox mainbms1">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[2].group_V }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[2].group_I }}</p>
          </div>
          <div class="sbcanshu">
            <p>SOC:</p><p>{{ bigdata[2].soc }}</p>
          </div>
        </div>
      </div>

      <!--储能电表  bms2 -->
      <div class="sbdiv" style="top:72%;left:52.5%;z-index:50;cursor:pointer;" title="点击查看设备详情" @click="tobmsdevices">
        <img src="@/assets/bigbms.svg" alt="" />

        <div class="infobox mainbms2">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[3].group_V }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[3].group_I }}</p>
          </div>
          <div class="sbcanshu">
            <p>SOC:</p><p>{{ bigdata[3].soc }}</p>
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
      this.$router.push({ path: "/mainmonitor/dg",query: {id: 7,projectid: this.projectid} });
    },
    topcsdevices(){
      this.$router.push({ path: "/mainmonitor/pcs",query: {id: 1,projectid: this.projectid} });
    },
    toacdevices(){
      this.$router.push({ path: "/mainmonitor/ac",query: {id: 5,projectid: this.projectid} });
    },
    tobmsdevices(){
      this.$router.push({ path: "/mainmonitor/bms",query: {id: 3,projectid: this.projectid} });
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
        width:200%;
        // border:1px solid red;
        p{
          display:inline-block;
          margin:0;
        }
        p:first-child{
          width:55PX;
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

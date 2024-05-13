<template>
    <div class="lf_bottom_wrap" id="big_wrap" v-if="bigdata && bigdata[0]">

      <!-- 负载 -->
      <div v-if="bigdata[1][5].loadTAP == 0" id="gdownline11" class="topdown_big tdstop_big" style="left:50.5%;top:10.8%;height:21%;z-index: 1;background-size: 3px 40px;"></div>
      <div v-else id="gdownline12" class="topdown_big top_big" style="left:50.5%;top:10.8%;height:21%;z-index: 1;background-size: 3px 40px;"></div>



      <!-- 柴油机1 -->
      <div v-if="bigdata[0][1].powerGeneration == 0" id="grightline11" class="leftright_big lrstop_big" style="left:15%; top:32%;  width:22.6%; z-index: 1;"></div>
      <div v-else id="grightline11" class="leftright_big right_big" style="left:15%; top:32%;  width:22.6%; z-index: 1;"></div>

      <!-- 柴油机中间 -->
      <div v-if="(bigdata[0][1].powerGeneration-bigdata[0][2].tap-bigdata[0][4].itap) > 0" id="grightline12" class="leftright_big right_big" style="left:37.6%; top:32%;  width:25%; z-index: 1;background-size: 120px 3px;"></div>
      <div v-else-if="(bigdata[0][1].powerGeneration-bigdata[0][2].tap-bigdata[0][4].itap) < 0" id="grightline12" class="leftright_big left_big" style="left:37.6%; top:32%;  width:25%; z-index: 1;background-size: 120px 3px;"></div>
      <div v-else-if="( bigdata[0][1].powerGeneration == 0 && bigdata[0][2].tap == 0 && bigdata[0][4].itap == 0 ) || ( bigdata[1][1].powerGeneration == 0 && bigdata[1][2].tap == 0 && bigdata[1][4].itap == 0 ) < 0" id="grightline12" class="leftright_big lrstop_big" style="left:37.6%; top:32%;  width:25%; z-index: 1;background-size: 120px 3px;"></div>

      <!-- 柴油机2 -->
      <div v-if="bigdata[1][1].powerGeneration == 0" id="grightline13" class="leftright_big lrstop_big" style="left:62.5%; top:32%;  width:20%; z-index: 1;background-size: 120px 3px;"></div>
      <div v-else id="grightline13" class="leftright_big left_big" style="left:62.5%; top:32%;  width:20%; z-index: 1;background-size: 120px 3px;"></div>

      <!-- pcs1 -->
      <div v-if="bigdata[0][2].tap == 0" id="gdownline21" class="topdown_big tdstop_big" style="left:37.5%;top:32%;height:50%;z-index: 1;"></div>
      <div v-else-if="bigdata[0][2].tap > 0" id="gdownline21" class="topdown_big top_big" style="left:37.5%;top:32%;height:50%;z-index: 1;"></div>
      <div v-else-if="bigdata[0][2].tap < 0" id="gdownline21" class="topdown_big down_big" style="left:37.5%;top:32%;height:50%;z-index: 1;"></div>

      <!-- pcs2 -->
      <div v-if="bigdata[1][2].tap == 0" id="gdownline22" class="topdown_big tdstop_big" style="left:62.5%;top:32%;height:50%;z-index: 1;"></div>
      <div v-else-if="bigdata[1][2].tap > 0" id="gdownline22" class="topdown_big top_big" style="left:62.5%;top:32%;height:50%;z-index: 1;"></div>
      <div v-else-if="bigdata[1][2].tap < 0" id="gdownline22" class="topdown_big down_big" style="left:62.5%;top:32%;height:50%;z-index: 1;"></div>


      <!-- 柴油机1 -->
      <div class="sbdiv" style="top:27%;left:15%;" title="点击查看设备详情"  @click="todgdevices">
        <img src="@/assets/bigcyj.svg" alt="" />
        <div class="infobox chaiyouji" style="width:250%;">
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[0][1].powerGeneration }}</p>
          </div>
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[0][1].chargeEngineV }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:70px;">频率(Hz):</p><p>{{ bigdata[0][1].generationFrequency }}</p>
          </div>
        </div>
      </div>

      <!-- 柴油机2 -->
      <div class="sbdiv" style="top:27%;left:80%;" title="点击查看设备详情"  @click="todgdevices">
        <img src="@/assets/bigcyj.svg" alt="" />
        <div class="infobox chaiyouji" style="width:250%;">
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[1][1].powerGeneration }}</p>
          </div>
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[1][1].chargeEngineV }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:70px;">频率(Hz):</p><p>{{ bigdata[1][1].generationFrequency }}</p>
          </div>
        </div>
      </div>


       <!-- 负载1 -->
      <div class="sbdiv" style="top:5%;left:48%;" title="负载1">
        <img src="@/assets/bigfz.svg" alt="" />
        <div class="infobox fuzai">
          <div class="sbcanshu">
            <p>P(kW):</p>
            <p>{{ bigdata[1][5].loadTAP }}</p>
          </div>
        </div>
      </div>


      <!--储能变流器  PCS1 -->
      <div class="sbdiv" style="top:48%;left:35%;cursor:pointer;" title="点击查看设备详情" @click="topcsdevices">
        <img src="@/assets/bigpcs.svg" alt="" />
        <div class="infobox mainpcs1" style="width:250%;">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[0][2].abacv | sanxiang_filters(bigdata[0][2].bcacv,bigdata[0][2].caacv) }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[0][2].aaci | sanxiang_filters(bigdata[0][2].baci,bigdata[0][2].caci) }}</p>
          </div>
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[0][2].tap }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:70px;">频率(Hz):</p><p>{{ bigdata[0][2].acFrequency }}</p>
          </div>
        </div>
      </div>

      <!--储能变流器  PCS2 -->
      <div class="sbdiv" style="top:48%;left:60%;cursor:pointer;" title="点击查看设备详情" @click="topcsdevices">
        <img src="@/assets/bigpcs.svg" alt="" />
        <div class="infobox mainpcs1" style="width:250%;">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[1][2].abacv | sanxiang_filters(bigdata[1][2].bcacv,bigdata[0][2].caacv) }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[1][2].aaci | sanxiang_filters(bigdata[1][2].baci,bigdata[0][2].caci) }}</p>
          </div>
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[1][2].tap }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:70px;">频率(Hz):</p><p>{{ bigdata[1][2].acFrequency }}</p>
          </div>
        </div>
      </div>



      <!--储能电表  bms1 -->
      <div class="sbdiv" style="top:74%;left:35%;z-index:50;cursor:pointer;" title="点击查看设备详情" @click="tobmsdevices">
        <img src="@/assets/bigbms.svg" alt="" />

        <div class="infobox mainbms1" style="width:300%;">
          <div class="sbcanshu">
            <p>SOC:</p><p>{{ bigdata[0][3].soc }}</p>
          </div>
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[0][3].group_V }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:100px;">最大电压(mv):</p><p>{{ bigdata[0][3].mvosU1 }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:100px;">最小电压(mv):</p><p>{{ bigdata[0][3].lvosU1 }}</p>
          </div>
        </div>
      </div>

      <!--储能电表  bms2 -->
      <div class="sbdiv" style="top:74%;left:60%;z-index:50;cursor:pointer;" title="点击查看设备详情" @click="tobmsdevices">
        <img src="@/assets/bigbms.svg" alt="" />

        <div class="infobox mainbms1" style="width:300%;">
          <div class="sbcanshu">
            <p>SOC:</p><p>{{ bigdata[1][3].soc }}</p>
          </div>
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[1][3].group_V }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:100px;">最大电压(mv):</p><p>{{ bigdata[1][3].mvosU1 }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:100px;">最小电压(mv):</p><p>{{ bigdata[1][3].lvosU1 }}</p>
          </div>
        </div>
      </div>




    </div>

</template>

<script>

export default {
  name: 'BigDiagramfour',
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
    todgdevices(){
      this.$router.push({ path: "/mainmonitor/pcs",query: {id: 56,projectid: this.projectid} });
    },
    topcsdevices(){
      this.$router.push({ path: "/mainmonitor/ac",query: {id: 57,projectid: this.projectid} });
    },
    tobmsdevices(){
      this.$router.push({ path: "/mainmonitor/bms",query: {id: 58,projectid: this.projectid} });
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



</style>

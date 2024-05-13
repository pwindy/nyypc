<template>
    <div class="lf_bottom_wrap" id="big_wrap" v-if="bigdata && bigdata[1]">

      <div v-if="bigdata[1].powerGeneration == 0" id="grightline1" class="leftright_big lrstop_big" style="left:14%; top:15%;  width:34%; z-index: 1;background-size: 120px 3px;"></div>
      <div v-else id="grightline1" class="leftright_big right_big" style="left:14%; top:15%;  width:34%; z-index: 1;background-size: 120px 3px;"></div>

      <div v-if="bigdata[4].itap == 0" id="grightline1" class="leftright_big lrstop_big" style="left:48%; top:15%;  width:35%; z-index: 1;background-size: 120px 3px;"></div>
      <div v-else id="grightline1" class="leftright_big right_big" style="left:48%; top:15%;  width:35%; z-index: 1;background-size: 120px 3px;"></div>


      <div v-if="bigdata[2].tap > 0" id="gdownline11" class="topdown_big down_big" style="left:25%; top:15%;  height:60%;z-index: 1;"></div>
      <div v-else-if="bigdata[2].tap < 0" id="gdownline11" class="topdown_big top_big" style="left:48%; top:15%;  height:60%;z-index: 1;"></div>
      <div v-else-if="bigdata[2].tap == 0" id="gdownline11" class="topdown_big tdstop_big" style="left:25%; top:15%;  height:60%;z-index: 1;"></div>


      <!-- 柴油机 -->
      <div class="sbdiv" style="top:10%;left:10%;" title="电网">
        <img src="@/assets/bigcyj.svg" alt="" />
        <div class="infobox chaiyouji" style="width:250%;">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[1].generating12V | sanxiang_filters(bigdata[1].generating23V,bigdata[1].generating31V) }}</p>
          </div>
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[1].powerGeneration }}</p>
          </div>
          <div class="sbcanshu">
            <p style="width:70px;">频率(hZ):</p><p>{{ bigdata[1].generationFrequency }}</p>
          </div>
        </div>
      </div>


       <!-- 负载 -->
      <div class="sbdiv" style="top:10%;left:80%;" title="负载">
        <img src="@/assets/bigfz.svg" alt="" />
        <div class="infobox fuzai">
          <div class="sbcanshu">
            <p>P(kW):</p>
            <p>{{bigdata[4].itap}}</p>
          </div>
        </div>
      </div>

      <!--储能变流器  PCS -->
      <div class="sbdiv" style="top:40%;left:45.5%;cursor:pointer;" title="点击查看设备详情" @click="topcsdevices">
        <img src="@/assets/bigpcs.svg" alt="" />
        <div class="infobox mainpcs1" style="width:250%;">
          <div class="sbcanshu">
            <p>U(V):</p><p>{{ bigdata[2].abacv | sanxiang_filters(bigdata[2].bcacv,bigdata[2].caacv) }}</p>
          </div>
          <div class="sbcanshu">
            <p>I(A):</p><p>{{ bigdata[2].aaci | sanxiang_filters(bigdata[2].baci,bigdata[2].caci) }}</p>
          </div>
          <div class="sbcanshu">
            <p>P(kW):</p><p>{{ bigdata[2].tap }}</p>
          </div>
          <div class="sbcanshu">
            <p>并离网:</p><p>{{ bigdata[2].gridState | blwzt_filters}}</p>
          </div>
        </div>
      </div>


      <!--储能电表  bms -->
      <div class="sbdiv" style="top:72%;left:45.5%;z-index:50;cursor:pointer;" title="点击查看设备详情" @click="tobmsdevices">
        <img src="@/assets/bigbms.svg" alt="" />

        <div class="infobox mainbms1">
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
    topcsdevices(){
      this.$router.push({ path: "/mainmonitor/pcs",query: {id: 13,projectid: this.projectid} });
    },

    tobmsdevices(){
      this.$router.push({ path: "/mainmonitor/bms",query: {id: 14,projectid: this.projectid} });
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

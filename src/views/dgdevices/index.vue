<template>
  <div class="app-container">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="wrap">
      <div class="tit">柴油机设备详情</div>
      <div class="con">
        <div class="select_wrap">
          <div class="select_title">设备名称：</div>
          <div class="select_con" style="width:70%;">
            <el-select v-model="valueselect" placeholder="请选择" @change="changeProject($event)">
              <el-option v-for="item in valueoptions" :key="item.key" :label="item.label" :value="item" :id="item.key"></el-option>
            </el-select>
          </div>
        </div>
        <div class="con_table">
          <div class="classify">
            <div class="c_tit">
              <span></span>
              <span>发动机参数</span>
            </div>
            <div class="c_data">
              <ul>
                <li>燃料液位(%)</li>
                <li v-if="devicesdata.fuelLevel == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.fuelLevel }}</li>

                <li>油压(bar)</li>
                <li v-if="devicesdata.oilPressure == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.oilPressure }}</li>

                <li>水温(℃)</li>
                <li v-if="devicesdata.temperature == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.temperature }}</li>

                <li style="font-size:12px;">发动机转速(r/min)</li>
                <li v-if="devicesdata.rpm == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.rpm }}</li>
              </ul>
            </div>
          </div>

          <div class="classify">
            <div class="c_tit">
              <span></span>
              <span>设备状态</span>
            </div>
            <div class="c_data">
              <ul>
                <li>通讯状态</li>
                <li v-if="devicesdata.isonline == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.isonline | txzt_filters }}</li>

                <li>断路器状态(bar)</li>
                <li v-if="devicesdata.circuitBreakerStatus == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.circuitBreakerStatus | dlqzt_filters }}</li>
              </ul>
            </div>
          </div>

          <div class="classify">
            <div class="c_tit">
              <span></span>
              <span>交流信息</span>
            </div>
            <div class="c_data">
              <ul>
                <li>发电有功功率</li>
                <li v-if="devicesdata.powerGeneration == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.powerGeneration }}</li>

                <li>L1相发电有功功率</li>
                <li v-if="devicesdata.aPowerGeneration == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aPowerGeneration }}</li>

                <li>L2相发电有功功率</li>
                <li v-if="devicesdata.bPowerGeneration == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bPowerGeneration }}</li>

                <li>L3相发电有功功率</li>
                <li v-if="devicesdata.cPowerGeneration == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cPowerGeneration }}</li>
              </ul>
              <ul>
                <li>发电视在功率</li>
                <li v-if="devicesdata.generatorTotalVA == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatorTotalVA }}</li>

                <li>L1相发电视在功率</li>
                <li v-if="devicesdata.generatorL1VA == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatorL1VA }}</li>

                <li>L2相发电视在功率</li>
                <li v-if="devicesdata.generatorL2VA == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatorL2VA }}</li>

                <li>L3相发电视在功率</li>
                <li v-if="devicesdata.generatorL3VA == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatorL3VA }}</li>
              </ul>
              <ul>
                <li>发电无功功率</li>
                <li v-if="devicesdata.reactivePowerGeneration == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.reactivePowerGeneration }}</li>

                <li>L1相发电无功功率</li>
                <li v-if="devicesdata.aReactivePowerGeneration == undefined">暂无数据</li>
                <li>{{ devicesdata.aReactivePowerGeneration }}</li>

                <li>L2相发电无功功率</li>
                <li v-if="devicesdata.bReactivePowerGeneration == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bReactivePowerGeneration }}</li>

                <li>L3相发电无功功率</li>
                <li v-if="devicesdata.cReactivePowerGeneration == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cReactivePowerGeneration }}</li>
              </ul>
              <ul>
                <li>发电功率因数</li>
                <li v-if="devicesdata.generationPowerFactor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generationPowerFactor }}</li>

                <li>L1相发电功率因数</li>
                <li v-if="devicesdata.aGenerationPowerFactor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aGenerationPowerFactor }}</li>

                <li>L2相发电功率因数</li>
                <li v-if="devicesdata.bGenerationPowerFactor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bGenerationPowerFactor }}</li>

                <li>L3相发电功率因数</li>
                <li v-if="devicesdata.cGenerationPowerFactor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cGenerationPowerFactor }}</li>
              </ul>
              <ul>
                <li>发电机频率</li>
                <li v-if="devicesdata.generationFrequency == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generationFrequency }}</li>

                <li style="font-size:12px;">L1相电流(发电A)</li>
                <li v-if="devicesdata.generatingCurrentA == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatingCurrentA }}</li>

                <li style="font-size:12px;">L2相电流(发电B)</li>
                <li v-if="devicesdata.generatingCurrentB == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatingCurrentB }}</li>

                <li style="font-size:12px;">L3相电流(发电C)</li>
                <li v-if="devicesdata.generatingCurrentC == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatingCurrentC }}</li>
              </ul>
              <ul>
                <li>L1-N相电压(发电压1)</li>
                <li v-if="devicesdata.generatingV1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatingV1 }}</li>

                <li>L2-N相电压(发电压2)</li>
                <li v-if="devicesdata.generatingV2 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatingV2 }}</li>

                <li>L3-N相电压(发电压3)</li>
                <li v-if="devicesdata.generatingV3 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generatingV3 }}</li>
              </ul>
              <ul>
                <li style="font-size:12px;">L1-L2线电压(发电12线压)</li>
                <li v-if="devicesdata.generating12V == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generating12V }}</li>

                <li style="font-size:12px;">L2-L3线电压(发电23线压)</li>
                <li v-if="devicesdata.generating23V == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generating23V }}</li>

                <li style="font-size:12px;">L3-L1线电压(发电31线压)</li>
                <li v-if="devicesdata.generating31V == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.generating31V }}</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>



</template>

<script>
import { getADeviceInfoListByProjectId,getNewDGDataByID } from '@/api/devices.js'
export default {
  name: 'DgDevices',
  data(){
    return {
      id: this.$route.query.projectid,
      valueoptions:[],
      valueselect: {},
      devicesdata:{},
      intervalData:null,
      selectedid:''
    }
  },
  mounted() {
    let _this = this;
    this.$nextTick( ()=>{
      _this.getDevices();
      _this.intervalData = window.setInterval(() => {
        if(_this.selectedid){
          _this.getselectedData();
        }
      }, 1000)
    });
  },
  methods:{

    back(){
      this.$router.go(-1);//返回上一层
    },

    getDevices(){
      getADeviceInfoListByProjectId(this.id,4).then(userdata => {
        let data = userdata.result;
        this.valueoptions = []
        this.valueselect = {};
        this.valueselect = {value:data[0].id,label:data[0].devCN,key:data[0].id};
        for(var i=0;i<data.length;i++){
          this.valueoptions.push({value:data[i].id,label:data[i].devCN,key:data[i].id})
        }
        this.selectedid = data[0].id

      })
    },

    changeProject(valueselect){
      this.selectedid = valueselect.value
    },

    getselectedData(){
      getNewDGDataByID(this.selectedid).then(res => {
        this.devicesdata = res.result;
      })
    },

  },
  filters: {
    txzt_filters: function(value){
      if( value == 0 ){ return "断开" }
      else{ return "正常" }
    },
    dlqzt_filters: function(value){
      if( value == 0 ){ return "断开" }
      else{ return "合闸" }
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
  },
  beforeDestroy(){
    clearInterval(this.intervalData);
    this.intervalData = null;
  }

}
</script>

<style lang="scss" scoped>
.app-container{
  background:transparent;
  height:calc(100% - 10px);
  .back_icon{
    display:block;
    cursor: pointer;
    height:30px;
    margin-bottom:20px;
  }
  .wrap{
    height:calc( 100% - 50px);
    border: 1px solid #043A5F;
    .tit{
      height:50px;
      line-height:50px;
      border-bottom:1px solid #043A5F;
      background: #0B1F37;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 1.4px;
      text-indent:1%;
    }
    .con{
      width:100%;
      height:calc( 100% - 50px);
      background: #08182C;
      .select_wrap{
        width:30%;
        margin:20px;
        height:30px;
        display:inline-block;
        vertical-align: top;
        .select_title{
          display:inline-block;
          vertical-align: center;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #73829E;
          letter-spacing: 1.4px;
        }
        .select_con{
          display:inline-block;
          vertical-align: center;
          ::v-deep{

              .el-input__inner{
                height:30px;
                line-height:30px;
                color:#fff;
                background: #152942;
                border: 1px solid #374766;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                letter-spacing: 0.88px;
              }

              .el-input__suffix{
                color:#56647F;
                top:2px;
              }

          }
        }
      }
      .con_table{
        height:calc( 100% - 70px);
        padding:0 20px;
        overflow-y: auto;

        .classify{
          margin-top:30px;
          .c_tit{
            margin-bottom:10px;
            span{
              display: inline-block;
              vertical-align: middle;
            }
            span:first-child{
              background: #0066FF;
              width:4px;
              height:14px;
              margin-right:15px;
            }
            span:last-child{
              height:19px;
              line-height:19px;
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #FFFFFF;
              letter-spacing: 1.4px;
            }
          }
          .c_data{
            ul{
              display:flex;
              justify-content: center;
              align-items: center;
              li{
                flex:1;
                line-height:50px;
                text-align:center;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                letter-spacing: 1.4px;
                border-left:1px solid #152A44;
                border-bottom:1px solid #152A44;
              }
              li:last-child{
                border-right:1px solid #152A44;
              }
              li:nth-child(odd){
                color: #73829E;
              }
              li:nth-child(even){
                color: #FFFFFF;
              }
            }
            ul:first-child{
              li{
                border-top:1px solid #152A44;
              }
            }


          }

        }
      }


    }

  }



}
</style>

<template>
  <div class="app-container" v-if="devicesdata">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="wrap">
      <div class="tit">STS设备详情</div>
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
              <span>设备状态</span>
            </div>
            <div class="c_data">
              <ul>
                <li>通讯状态</li>
                <li v-if="devicesdata.isonline == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.isonline | lxzx_filters }}</li>

                <li>并离网模式</li>
                <li v-if="devicesdata.parallelOffGridMode == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.parallelOffGridMode | blwms_filters }}</li>

              </ul>
            </div>
          </div>

          <div class="classify">
            <div class="c_tit">
              <span></span>
              <span>设备参数</span>
            </div>
            <div class="c_data">
              <ul>
                <li>AB线电压(V)</li>
                <li v-if="devicesdata.abLineVoltage == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.abLineVoltage }}</li>

                <li>BC线电压(V)</li>
                <li v-if="devicesdata.bcLineVoltage == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bcLineVoltage }}</li>

                <li>CA线电压(V)</li>
                <li v-if="devicesdata.caLineVoltage == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.caLineVoltage }}</li>


              </ul>

              <ul>
                <li>A相电流(A)</li>
                <li v-if="devicesdata.aElectricCurrent == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aElectricCurrent }}</li>

                <li>B相电流(A)</li>
                <li v-if="devicesdata.bElectricCurrent == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bElectricCurrent }}</li>

                <li>C相电流(A)</li>
                <li v-if="devicesdata.cElectricCurrent == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cElectricCurrent }}</li>
              </ul>
              <ul>
                <li>A相有功(kW)</li>
                <li v-if="devicesdata.aActivePower == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aActivePower }}</li>

                <li>B相有功(kW)</li>
                <li v-if="devicesdata.bActivePower == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bActivePower }}</li>

                <li>C相有功(kW)</li>
                <li v-if="devicesdata.cActivePower == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cActivePower }}</li>

              </ul>

              <ul>
                <li>A相视在(kVA)</li>
                <li v-if="devicesdata.aApparentPower == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aApparentPower }}</li>

                <li>B相视在(kVA)</li>
                <li v-if="devicesdata.bApparentPower == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bApparentPower }}</li>

                <li>C相视在(kVA)</li>
                <li v-if="devicesdata.cApparentPower == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cApparentPower }}</li>
              </ul>
              <ul>
                <li>A相功率因数</li>
                <li v-if="devicesdata.aPowerFactor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aPowerFactor }}</li>

                <li>B相功率因数</li>
                <li v-if="devicesdata.bPowerFactor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bPowerFactor }}</li>

                <li>C相功率因数</li>
                <li v-if="devicesdata.cPowerFactor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cPowerFactor }}</li>
              </ul>

              <ul>
                <li>总有功(kW)</li>
                <li v-if="devicesdata.tReactivePower == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tReactivePower }}</li>

                <li>总无功(kVar)</li>
                <li v-if="devicesdata.tApparentPower == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tApparentPower }}</li>

                <li>总视在(kVA)</li>
                <li v-if="devicesdata.tPowerFactor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tPowerFactor }}</li>

                <li>频率(Hz)</li>
                <li v-if="devicesdata.frequency == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.frequency }}</li>
              </ul>
            </div>
          </div>

          <div class="classify" style="margin-bottom:20px;">
            <div class="c_tit">
              <span></span>
              <span>设备参数</span>
            </div>
            <div class="c_data">
              <ul>
                <li>AB线电压1(V)</li>
                <li v-if="devicesdata.abLineVoltage1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.abLineVoltage1 }}</li>

                <li>BC线电压1(V)</li>
                <li v-if="devicesdata.bcLineVoltage1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bcLineVoltage1 }}</li>

                <li>CA线电压1(V)</li>
                <li v-if="devicesdata.caLineVoltage1  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.caLineVoltage1 }}</li>
              </ul>

              <ul>
                <li>A相电流1(A)</li>
                <li v-if="devicesdata.aElectricCurrent1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aElectricCurrent1 }}</li>

                <li>B相电流1(A)</li>
                <li v-if="devicesdata.bElectricCurrent1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bElectricCurrent1 }}</li>

                <li>C相电流1(A)</li>
                <li v-if="devicesdata.cElectricCurrent1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cElectricCurrent1 }}</li>
              </ul>

              <ul>
                <li>A相有功1(kW)</li>
                <li v-if="devicesdata.aActivePower1  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aActivePower1 }}</li>

                <li>B相有功1(kW)</li>
                <li v-if="devicesdata.bActivePower1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bActivePower1 }}</li>

                <li>C相有功1(kW)</li>
                <li v-if="devicesdata.cActivePower1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cActivePower1 }}</li>
              </ul>

              <ul>
                <li>A相视在1(kVA)</li>
                <li v-if="devicesdata.aApparentPower1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aApparentPower1 }}</li>

                <li>B相视在1(kVA)</li>
                <li v-if="devicesdata.bApparentPower1  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bApparentPower1 }}</li>

                <li>C相视在1(kVA)</li>
                <li v-if="devicesdata.cApparentPower1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cApparentPower1 }}</li>
              </ul>

              <ul>
                <li>A相功率因数1</li>
                <li v-if="devicesdata.aPowerFactor1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aPowerFactor1 }}</li>

                <li>B相功率因数1</li>
                <li v-if="devicesdata.bPowerFactor1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bPowerFactor1 }}</li>

                <li>C相功率因数1</li>
                <li v-if="devicesdata.cPowerFactor1  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cPowerFactor1 }}</li>
              </ul>

              <ul>
                <li>总有功1(kW)</li>
                <li v-if="devicesdata.tReactivePower1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tReactivePower1 }}</li>

                <li>总无功1(kVar)</li>
                <li v-if="devicesdata.tApparentPower1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tApparentPower1 }}</li>

                <li>总视在1(kVA)</li>
                <li v-if="devicesdata.tPowerFactor1 == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tPowerFactor1 }}</li>

                <li>频率1(Hz)</li>
                <li v-if="devicesdata.frequency1  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.frequency1 }}</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>



</template>

<script>
import { getADeviceInfoListByProjectId,GetNewSTS_HistoryDataByID } from '@/api/devices.js'
export default {
  name: 'StsDevices',
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
      getADeviceInfoListByProjectId(this.id,7).then(userdata => {
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
      getNewACDataByID(this.selectedid).then(res => {
        this.devicesdata = res.result;
      })
    },

  },
  filters: {
    txzt_filters: function(value){
      if( value == 0 ){ return "离线" }
      else{ return "在线" }
    },
    blwms_filters: function(value){
      if( value == 0 ){ return "并网" }
      else{ return "离网" }
    }
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

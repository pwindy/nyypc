<template>
  <div class="app-container" v-if="devicesdata">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="wrap">
      <div class="tit">空调设备详情</div>
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
              <span>分类一</span>
            </div>
            <div class="c_data">
              <ul>
                <li>室内温度(℃)</li>
                <li v-if="devicesdata.innerTemperature == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.innerTemperature }}</li>

                <li>室外温度(℃)</li>
                <li v-if="devicesdata.condensationTemperature == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.condensationTemperature }}</li>

                <li>盘管温度(℃)</li>
                <li v-if="devicesdata.coilTemperature == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.coilTemperature }}</li>
              </ul>
            </div>
          </div>

          <div class="classify">
            <div class="c_tit">
              <span></span>
              <span>分类二</span>
            </div>
            <div class="c_data">
              <ul>
                <li>内风机</li>
                <li v-if="devicesdata.internalFan == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.internalFan | tzyx_filters }}</li>

                <li>外风机</li>
                <li v-if="devicesdata.externalFan == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.externalFan | tzyx_filters }}</li>

                <li>压缩机</li>
                <li v-if="devicesdata.compressor == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.compressor | tzyx_filters }}</li>

                <li>应急风机</li>
                <li v-if="devicesdata.emergencyFan == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.emergencyFan | tzyx_filters }}</li>
              </ul>

              <ul>
                <li>制冷点</li>
                <li v-if="devicesdata.refrigerationPoint == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.refrigerationPoint }}</li>

                <li>加热点</li>
                <li v-if="devicesdata.heatingPoint == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.heatingPoint }}</li>

                <li>高温点</li>
                <li v-if="devicesdata.highTemperaturePoint == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.highTemperaturePoint }}</li>

                <li>低温点</li>
                <li v-if="devicesdata.lowTemperaturePoint == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.lowTemperaturePoint }}</li>
              </ul>
            </div>
          </div>

          <div class="classify" style="margin-bottom:20px;">
            <div class="c_tit">
              <span></span>
              <span>分类三</span>
            </div>
            <div class="c_data">
              <ul>
                <li>湿度</li>
                <li v-if="devicesdata.humidity == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.humidity }}</li>

                <li>电流(A)</li>
                <li v-if="devicesdata.electricCurrent == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.electricCurrent }}</li>

                <li>交流电压(V)</li>
                <li v-if="devicesdata.acVoltage  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.acVoltage }}</li>

                <li>直流电压(V)</li>
                <li v-if="devicesdata.dcVoltage == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.dcVoltage }}</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>



</template>

<script>
import { getADeviceInfoListByProjectId,getNewACDataByID } from '@/api/devices.js'
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
      getADeviceInfoListByProjectId(this.id,3).then(userdata => {
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
    tzyx_filters: function(value){
      if( value == 0 ){ return "停止" }
      else{ return "运行" }
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

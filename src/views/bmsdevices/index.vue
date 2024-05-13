<template>
  <div class="app-container" v-if="devicesdata">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="wrap">
      <div class="tit">BMS设备详情</div>
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
                <li>SOC</li>
                <li v-if="devicesdata.soc == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.soc }}</li>

                <li>SOH</li>
                <li v-if="devicesdata.soh == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.soh |soh_filters }}</li>

                <li style="font-size:12px;">BMS可充电量(kWH)</li>
                <li v-if="devicesdata.group_RC == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.group_RC }}</li>

                <li style="font-size:12px;">BMS可放电量(kWH)</li>
                <li v-if="devicesdata.group_DQ == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.group_DQ }}</li>
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
                <li>通讯状态</li>
                <li v-if="devicesdata.comState == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.comState |txzt_filters }}</li>

                <li>堆状态</li>
                <li v-if="devicesdata.normalState == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.normalState | dzt_filters(devicesdata.fullState,devicesdata.emptyState,devicesdata.standbyState,devicesdata.stopState) }}</li>

                <li>运行状态</li>
                <li v-if="devicesdata.groupState == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.groupState | yxzt_filters }}</li>
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
                <li>电池组总电压(V)</li>
                <li v-if="devicesdata.group_V == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.group_V }}</li>

                <li>电池组总电流( A)</li>
                <li v-if="devicesdata.group_I == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.group_I }}</li>

                <li>电池最高温(℃)</li>
                <li v-if="devicesdata.mbt  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.mbt }}</li>

                <li>电池最低温(℃)</li>
                <li v-if="devicesdata.lbt == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.lbt }}</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>



</template>

<script>
import { getADeviceInfoListByProjectId,getNewBMSDataByID } from '@/api/devices.js'
export default {
  name: 'BmsDevices',
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
      getADeviceInfoListByProjectId(this.id,2).then(userdata => {
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
      getNewBMSDataByID(this.selectedid).then(res => {
        this.devicesdata = res.result;
      })
    },

  },
  filters: {
    soh_filters: function(value){
      return value/10;
    },
    txzt_filters: function(value){
      if( value == 0 ){ return "断开" }
      else{ return "正常" }
    },
    yxzt_filters: function(value){
      if( value == 0 ){ return "关闭" }
      else{ return "运行" }
    },
    dzt_filters: function(value,fullState,emptyState,standbyState,stopState){
      if( value == 0 ) { return "正常" }
      else if( fullState == 1 ) { return "充满" }
      else if( emptyState == 1 ) { return "放空" }
      else if( standbyState == 1 ) { return "待机" }
      else if( stopState == 1 ) { return "停机" }
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

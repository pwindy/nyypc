<template>
  <div class="app-container" v-if="devicesdata">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="wrap">
      <div class="tit">一级柜设备详情</div>
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
              <span>合闸分闸</span>
            </div>
            <div class="c_data">
              <ul>
                <li>状态</li>
                <li v-if="devicesdata.ioState == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.ioState }}</li>

                <li>合闸按钮</li>
                <li v-if="devicesdata.condensationTemperature == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.condensationTemperature }}</li>

                <li>合闸按钮</li>
                <li v-if="devicesdata.coilTemperature == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.coilTemperature }}</li>
              </ul>
            </div>
          </div>

          <div class="classify">
            <div class="c_tit">
              <span></span>
              <span>电表</span>
            </div>
            <div class="c_data">
              <ul>
                <li>正向有功总电量</li>
                <li v-if="devicesdata.tpap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tpap }}</li>

                <li>正向无功总电量</li>
                <li v-if="devicesdata.tprp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tprp }}</li>

                <li>正向视在总电量</li>
                <li v-if="devicesdata.tpae == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tpae }}</li>
              </ul>

              <ul>
                <li>反向有功总电量</li>
                <li v-if="devicesdata.trap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.trap }}</li>

                <li>反向无功总电量</li>
                <li v-if="devicesdata.trrp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.trrp }}</li>

                <li>电网频率</li>
                <li v-if="devicesdata.pgf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.pgf }}</li>
              </ul>
              <ul>
                <li>A相电压</li>
                <li v-if="devicesdata.apv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.apv }}</li>

                <li>B相电压</li>
                <li v-if="devicesdata.bpv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bpv }}</li>

                <li>C相电压</li>
                <li v-if="devicesdata.cpv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cpv }}</li>
              </ul>
              <ul>
                <li>A相电流</li>
                <li v-if="devicesdata.apc == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.apc }}</li>

                <li>B相电流</li>
                <li v-if="devicesdata.bpc == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bpc }}</li>

                <li>C相电流</li>
                <li v-if="devicesdata.cpc == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cpc }}</li>
              </ul>
              <ul>
                <li>A相失压次数</li>
                <li v-if="devicesdata.apvln == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.apvln }}</li>

                <li>B相失压次数</li>
                <li v-if="devicesdata.bpvln == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bpvln }}</li>

                <li>C相失压次数</li>
                <li v-if="devicesdata.cpvln == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cpvln }}</li>
              </ul>
              <ul>
                <li>A相失压累计时间</li>
                <li v-if="devicesdata.apvlnt == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.apvlnt }}</li>

                <li>B相失压累计时间</li>
                <li v-if="devicesdata.bpvlnt == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bpvlnt }}</li>

                <li>C相失压累计时间</li>
                <li v-if="devicesdata.cpvlnt == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cpvlnt }}</li>
              </ul>
              <ul>
                <li>瞬时总有功功率</li>
                <li v-if="devicesdata.itap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.itap }}</li>

                <li>瞬时总无功功率</li>
                <li v-if="devicesdata.itrp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.itrp }}</li>

                <li>瞬时总视在功率</li>
                <li v-if="devicesdata.itae == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.itae }}</li>
              </ul>
              <ul>
                <li>A相功率因素</li>
                <li v-if="devicesdata.appf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.appf }}</li>

                <li>B相功率因素</li>
                <li v-if="devicesdata.bppf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bppf }}</li>

                <li>C相功率因素</li>
                <li v-if="devicesdata.cppf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cppf }}</li>
              </ul>
              <ul>
                <li>总功率因素</li>
                <li v-if="devicesdata.tppf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tppf }}</li>

              </ul>
            </div>
          </div>

          <div class="classify">
            <div class="c_tit">
              <span></span>
              <span>柜内环境温湿度</span>
            </div>
            <div class="c_data">
              <ul>
                <li>温度</li>
                <li v-if="devicesdata.eTemperature == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.eTemperature }}</li>

                <li>湿度</li>
                <li v-if="devicesdata.eHumidity == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.eHumidity }}</li>

                <li>风机开/关</li>
                <li v-if="devicesdata.tto  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tto }}</li>
              </ul>
            </div>
          </div>

          <div class="classify" style="margin-bottom:20px;">
            <div class="c_tit">
              <span></span>
              <span>铜排温度</span>
            </div>
            <div class="c_data">
              <ul>
                <li>温度</li>
                <li v-if="devicesdata.temperature == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.temperature }}</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>



</template>

<script>
import { getAllDeviceInfoListByTypeId,getNewYJGHistoryDataByID } from '@/api/devices.js'
export default {
  name: 'YjgDevices',
  data(){
    return {
      id: this.$route.query.projectid,
      yjgid: this.$route.query.id,
      valueoptions:[],
      valueselect: {},
      devicesdata:{},
      intervalData:null,
      // selectedid:''
    }
  },
  mounted() {
    let _this = this;
    this.$nextTick( ()=>{
      _this.getDevices();
      _this.intervalData = window.setInterval(() => {
        if(_this.yjgid){
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
      getAllDeviceInfoListByTypeId(8).then(userdata => {
        let data = userdata.result;
        console.log(data);
        // return;
        this.valueoptions = []
        this.valueselect = {};
        this.valueselect = {value:data[0].id,label:data[0].devCN,key:data[0].id};
        for(var i=0;i<data.length;i++){
          this.valueoptions.push({value:data[i].id,label:data[i].devCN,key:data[i].id})
        }
        // this.selectedid = data[0].id

      })
    },

    changeProject(valueselect){
      this.yjgid = valueselect.value
    },

    getselectedData(){
      getNewYJGHistoryDataByID(this.yjgid).then(res => {
        console.log(res);
        // return
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

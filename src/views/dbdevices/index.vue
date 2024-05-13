<template>
  <div class="app-container" v-if="devicesdata">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="wrap">
      <div class="tit">电表设备详情</div>
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
                <li v-else>{{ devicesdata.isonline | txzt_filters }}</li>
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
                <li>正向有功总电量(kWh)</li>
                <li v-if="devicesdata.tpap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tpap }}</li>

                <li>正向无功总电量(kWh)</li>
                <li v-if="devicesdata.tprp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tprp }}</li>

                <li>反向有功总电量(kWh)</li>
                <li v-if="devicesdata.trap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.trap }}</li>

                <li>反向无功总电量(kWh)</li>
                <li v-if="devicesdata.trrp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.trrp }}</li>
              </ul>

              <ul>
                <li>A相电压(V)</li>
                <li v-if="devicesdata.apv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.apv }}</li>

                <li>B相电压(V)</li>
                <li v-if="devicesdata.bpv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bpv }}</li>

                <li>C相电压(V)</li>
                <li v-if="devicesdata.cpv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cpv }}</li>
              </ul>
              <ul>
                <li>A相电流(A)</li>
                <li v-if="devicesdata.apc == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.apc }}</li>

                <li>B相电流(A)</li>
                <li v-if="devicesdata.bpc == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bpc }}</li>

                <li>C相电流(A)</li>
                <li v-if="devicesdata.cpc == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cpc }}</li>
              </ul>

              <ul>
                <li>A相有功(kW)</li>
                <li v-if="devicesdata.aap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aap }}</li>

                <li>B相有功(kW)</li>
                <li v-if="devicesdata.bap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bap }}</li>

                <li>C相有功(kW)</li>
                <li v-if="devicesdata.cap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cap }}</li>
              </ul>

              <ul>
                <li>A相无功(kVar)</li>
                <li v-if="devicesdata.arp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.arp }}</li>

                <li>B相无功(kVar)</li>
                <li v-if="devicesdata.brp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.brp }}</li>

                <li>C相无功(kVar)</li>
                <li v-if="devicesdata.crp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.crp }}</li>
              </ul>

              <ul>
                <li>A相视在(kVA)</li>
                <li v-if="devicesdata.aae == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aae }}</li>

                <li>B相视在(kVA)</li>
                <li v-if="devicesdata.bae == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bae }}</li>

                <li>C相视在(kVA)</li>
                <li v-if="devicesdata.cae == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cae }}</li>
              </ul>

              <ul>
                <li>瞬时总有功功率(kW)</li>
                <li v-if="devicesdata.itap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.itap }}</li>

                <li>瞬时总无功功率(kVar)</li>
                <li v-if="devicesdata.itrp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.itrp }}</li>

                <li>瞬时总视在功率(kVA)</li>
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

        </div>

      </div>

    </div>

  </div>



</template>

<script>
import { getAllDeviceInfoListByTypeId,getNewDLT645_HistoryDataByID } from '@/api/devices.js'
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
      getAllDeviceInfoListByTypeId(9).then(userdata => {
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
      getNewDLT645_HistoryDataByID(this.selectedid).then(res => {
        this.devicesdata = res.result;
      })
    },

  },
  filters: {
    txzt_filters: function(value){
      if( value == 0 ){ return "断开" }
      else{ return "正常" }
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

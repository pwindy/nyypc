<template>
  <div class="app-container" v-if="devicesdata">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="wrap">
      <div class="tit">PCS设备详情</div>
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
              <span>总参数</span>
            </div>
            <div class="c_data">
              <ul>
                <li>总有功功率(kW)</li>
                <li v-if="devicesdata.tap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tap }}</li>

                <li>总无功功率(kW)</li>
                <li v-if="devicesdata.trp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.trp }}</li>

                <li>总视在功率(kW)</li>
                <li v-if="devicesdata.tApparentP == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tApparentP }}</li>

                <li>总功率因数</li>
                <li v-if="devicesdata.tpf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.tpf }}</li>
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
                <li>运行状态</li>
                <li v-if="devicesdata.runState == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.runState | kg_filters }}</li>

                <li>控制模式</li>
                <li v-if="devicesdata.remoteControl == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.remoteControl | kg_filters }}</li>

                <li>并离网</li>
                <li v-if="devicesdata.gridState == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.gridState | blwzt_filters }}</li>
              </ul>
              <ul>
                <li>告警状态</li>
                <li v-if="devicesdata.warnState == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.warnState | kg_filters }}</li>

                <li>交流空开</li>
                <li v-if="devicesdata.acEmpty == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.acEmpty | kg_filters }}</li>

                <li>直流空开</li>
                <li v-if="devicesdata.dcEmpty == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.dcEmpty | kg_filters }}</li>
              </ul>
              <ul>
                <li>交流调度</li>
                <li v-if="devicesdata.acDispatch == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.acDispatch | kg_filters }}</li>

                <li>直流调度</li>
                <li v-if="devicesdata.dcDispatch == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.dcDispatch | kg_filters }}</li>

                <li>直流充电</li>
                <li v-if="devicesdata.dcCharging == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.dcCharging | kg_filters }}</li>
              </ul>
              <ul>
                <li>直流放电</li>
                <li v-if="devicesdata.dcDischarge == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.dcDischarge | kg_filters }}</li>

                <li>直流充满</li>
                <li v-if="devicesdata.dcFull == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.dcFull | kg_filters }}</li>

                <li>直流放空</li>
                <li v-if="devicesdata.dcEmpting == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.dcEmpting | kg_filters }}</li>
              </ul>
            </div>
          </div>

          <div class="classify" style="margin-bottom:20px;">
            <div class="c_tit">
              <span></span>
              <span>交流信息</span>
            </div>
            <div class="c_data">
              <ul>
                <li>AB交流线电压(V)</li>
                <li v-if="devicesdata.abacv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.abacv }}</li>

                <li>BC交流线电压(V)</li>
                <li v-if="devicesdata.bcacv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bcacv }}</li>

                <li>CA交流线电压(V)</li>
                <li v-if="devicesdata.caacv  == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.caacv }}</li>
              </ul>
              <ul>
                <li>A相交流电流(A)</li>
                <li v-if="devicesdata.aaci == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aaci }}</li>

                <li>B相交流电流(A)</li>
                <li v-if="devicesdata.baci == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.baci }}</li>

                <li>C相交流电流(A)</li>
                <li v-if="devicesdata.caci == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.caci }}</li>
              </ul>
              <ul>
                <li>A相有功功率(kW)</li>
                <li v-if="devicesdata.aap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aap }}</li>

                <li>B相有功功率(kW)</li>
                <li v-if="devicesdata.bap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bap }}</li>

                <li>C相有功功率(kW)</li>
                <li v-if="devicesdata.cap == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cap }}</li>
              </ul>
              <ul>
                <li>A相无功功率(kW)</li>
                <li v-if="devicesdata.arp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.arp }}</li>

                <li>B相无功功率(kW)</li>
                <li v-if="devicesdata.brp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.brp }}</li>

                <li>C相无功功率(kW)</li>
                <li v-if="devicesdata.crp == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.crp }}</li>
              </ul>
              <ul>
                <li>A相功率因数</li>
                <li v-if="devicesdata.apf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.apf }}</li>

                <li>B相功率因数</li>
                <li v-if="devicesdata.bpf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bpf }}</li>

                <li>C相功率因数</li>
                <li v-if="devicesdata.cpf == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cpf }}</li>
              </ul>
              <ul>
                <li>A相视在功率(kW)</li>
                <li v-if="devicesdata.aApparentP == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.aApparentP }}</li>

                <li>B相视在功率(kW)</li>
                <li v-if="devicesdata.bApparentP == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.bApparentP }}</li>

                <li>C相视在功率(kW)</li>
                <li v-if="devicesdata.cApparentP == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.cApparentP }}</li>
              </ul>
              <ul>
                <li>交流有功充电电量</li>
                <li v-if="devicesdata.acacv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.acacv }}</li>

                <li>交流有功放电电量</li>
                <li v-if="devicesdata.acadv == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.acadv }}</li>

                <li>交流频率</li>
                <li v-if="devicesdata.acFrequency == undefined">暂无数据</li>
                <li v-else>{{ devicesdata.acFrequency }}</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>



</template>

<script>
import { getADeviceInfoListByProjectId,getNewPCS_HistoryDataByID } from '@/api/devices.js'
export default {
  name: 'PcsDevices',
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
      getADeviceInfoListByProjectId(this.id,1).then(userdata => {
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
      getNewPCS_HistoryDataByID(this.selectedid).then(res => {
        this.devicesdata = res.result;
      })
    },

  },
  filters: {
    kg_filters: function(value){
      if( value == 0 ){ return "关闭" }
      else{ return "开启" }
    },
    blwzt_filters: function(value){
      if( value == 0 ) { return "并网" }
      else { return "离网" }
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

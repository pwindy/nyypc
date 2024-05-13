<template>
  <div class="app-container">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="container_wrap">

      <div class="con_tit">
        {{devName}}
      </div>
      <div class="table_wrap">

          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="昨 日" name="first">

              <div class="btn_con">
                <el-button class="checkdata"  type="primary" plain size="mini" @click="exportOrderData('zuori')">导出Excel</el-button>
              </div>

              <div class="table_con">
                <el-table :data="fenyelist" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}" id="zuori">
                  <el-table-column prop="num" label="序号">
                  </el-table-column>
                  <el-table-column prop="dateTime" label="时间" width="120px">
                  </el-table-column>
                  <el-table-column prop="avgLoadTAP" label="日平均功率">
                  </el-table-column>
                  <el-table-column prop="mAXLoadTAP" label="日最大负载">
                  </el-table-column>
                  <el-table-column prop="mINLoadTAP" label="日最小负载">
                  </el-table-column>
                  <el-table-column prop="avgPF" label="日平均功率因素">
                  </el-table-column>
                  <el-table-column prop="positiveKWh" label="柴油机日发电量">
                  </el-table-column>
                  <el-table-column prop="dPlus" label="柴油机日用油量">
                  </el-table-column>
                  <el-table-column prop="oilConsumption" label="柴油机日发电量油耗">
                  </el-table-column>
                  <el-table-column prop="avgPowerGeneration" label="柴油机日平均发电功率">
                  </el-table-column>
                  <el-table-column prop="tPAP" label="负载日用电量">
                  </el-table-column>
                  <el-table-column prop="failCount" label="停电次数">
                  </el-table-column>
                  <el-table-column prop="engineRunTime" label="发电机日运行时间">
                  </el-table-column>
                  <el-table-column prop="mTOSU" label="储能累计充电量">
                  </el-table-column>
                  <el-table-column prop="lSNST" label="储能累计放电量">
                  </el-table-column>
                  <el-table-column prop="powerEfficiency" label="用电效率">
                  </el-table-column>
                </el-table>
              </div>

              <div class="table_page">
                  <div class="block">
                    <el-pagination background @current-change="handleCurrentChange"
                      :page-size="pagesize"
                      layout="total, prev, pager, next"
                      :total="datalength">
                    </el-pagination>
                  </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="7 日" name="second">
              <div class="btn_con">
                <el-button class="checkdata"  type="primary" plain size="mini" @click="exportOrderData('qiri')">导出Excel</el-button>
              </div>

              <div class="table_con">
                <el-table :data="fenyelist" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}" id="qiri">
                  <el-table-column prop="num" label="序号">
                  </el-table-column>
                  <el-table-column prop="dateTime" label="时间" width="120px">
                  </el-table-column>
                  <el-table-column prop="avgLoadTAP" label="日平均功率">
                  </el-table-column>
                  <el-table-column prop="mAXLoadTAP" label="日最大负载">
                  </el-table-column>
                  <el-table-column prop="mINLoadTAP" label="日最小负载">
                  </el-table-column>
                  <el-table-column prop="avgPF" label="日平均功率因素">
                  </el-table-column>
                  <el-table-column prop="positiveKWh" label="柴油机日发电量">
                  </el-table-column>
                  <el-table-column prop="dPlus" label="柴油机日用油量">
                  </el-table-column>
                  <el-table-column prop="oilConsumption" label="柴油机日发电量油耗">
                  </el-table-column>
                  <el-table-column prop="avgPowerGeneration" label="柴油机日平均发电功率">
                  </el-table-column>
                  <el-table-column prop="tPAP" label="负载日用电量">
                  </el-table-column>
                  <el-table-column prop="failCount" label="停电次数">
                  </el-table-column>
                  <el-table-column prop="engineRunTime" label="发电机日运行时间">
                  </el-table-column>
                  <el-table-column prop="mTOSU" label="储能累计充电量">
                  </el-table-column>
                  <el-table-column prop="lSNST" label="储能累计放电量">
                  </el-table-column>
                  <el-table-column prop="powerEfficiency" label="用电效率">
                  </el-table-column>
                </el-table>
              </div>

              <div class="table_page">
                  <div class="block">
                    <el-pagination background @current-change="handleCurrentChange"
                      :page-size="pagesize"
                      layout="total, prev, pager, next"
                      :total="datalength">
                    </el-pagination>
                  </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="本 月" name="third">

              <div class="btn_con">
                <el-button class="checkdata"  type="primary" plain size="mini" @click="exportOrderData('benyue')">导出Excel</el-button>
              </div>

              <div class="table_con" style="display: none;">
                <el-table :data="usedata" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}" id="benyue">
                  <el-table-column prop="num" label="序号">
                  </el-table-column>
                  <el-table-column prop="dateTime" label="时间" width="120px">
                  </el-table-column>
                  <el-table-column prop="avgLoadTAP" label="日平均功率">
                  </el-table-column>
                  <el-table-column prop="mAXLoadTAP" label="日最大负载">
                  </el-table-column>
                  <el-table-column prop="mINLoadTAP" label="日最小负载">
                  </el-table-column>
                  <el-table-column prop="avgPF" label="日平均功率因素">
                  </el-table-column>
                  <el-table-column prop="positiveKWh" label="柴油机日发电量">
                  </el-table-column>
                  <el-table-column prop="dPlus" label="柴油机日用油量">
                  </el-table-column>
                  <el-table-column prop="oilConsumption" label="柴油机日发电量油耗">
                  </el-table-column>
                  <el-table-column prop="avgPowerGeneration" label="柴油机日平均发电功率">
                  </el-table-column>
                  <el-table-column prop="tPAP" label="负载日用电量">
                  </el-table-column>
                  <el-table-column prop="failCount" label="停电次数">
                  </el-table-column>
                  <el-table-column prop="engineRunTime" label="发电机日运行时间">
                  </el-table-column>
                  <el-table-column prop="mTOSU" label="储能累计充电量">
                  </el-table-column>
                  <el-table-column prop="lSNST" label="储能累计放电量">
                  </el-table-column>
                  <el-table-column prop="powerEfficiency" label="用电效率">
                  </el-table-column>
                </el-table>
              </div>

              <div class="table_con">
                <el-table :data="fenyelist" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}">
                  <el-table-column prop="num" label="序号">
                  </el-table-column>
                  <el-table-column prop="dateTime" label="时间" width="120px">
                  </el-table-column>
                  <el-table-column prop="avgLoadTAP" label="日平均功率">
                  </el-table-column>
                  <el-table-column prop="mAXLoadTAP" label="日最大负载">
                  </el-table-column>
                  <el-table-column prop="mINLoadTAP" label="日最小负载">
                  </el-table-column>
                  <el-table-column prop="avgPF" label="日平均功率因素">
                  </el-table-column>
                  <el-table-column prop="positiveKWh" label="柴油机日发电量">
                  </el-table-column>
                  <el-table-column prop="dPlus" label="柴油机日用油量">
                  </el-table-column>
                  <el-table-column prop="oilConsumption" label="柴油机日发电量油耗">
                  </el-table-column>
                  <el-table-column prop="avgPowerGeneration" label="柴油机日平均发电功率">
                  </el-table-column>
                  <el-table-column prop="tPAP" label="负载日用电量">
                  </el-table-column>
                  <el-table-column prop="failCount" label="停电次数">
                  </el-table-column>
                  <el-table-column prop="engineRunTime" label="发电机日运行时间">
                  </el-table-column>
                  <el-table-column prop="mTOSU" label="储能累计充电量">
                  </el-table-column>
                  <el-table-column prop="lSNST" label="储能累计放电量">
                  </el-table-column>
                  <el-table-column prop="powerEfficiency" label="用电效率">
                  </el-table-column>
                </el-table>
              </div>

              <div class="table_page">
                  <div class="block">
                    <el-pagination background @current-change="handleCurrentChange"
                      :page-size="pagesize"
                      layout="total, prev, pager, next"
                      :total="datalength">
                    </el-pagination>
                  </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="上 月" name="fourth">

              <div class="btn_con">
                <el-button class="checkdata"  type="primary" plain size="mini" @click="exportOrderData('shangyue')">导出Excel</el-button>
              </div>

              <div class="table_con" style="display: none;">
                <el-table :data="usedata" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}" id="shangyue">
                  <el-table-column prop="num" label="序号">
                  </el-table-column>
                  <el-table-column prop="dateTime" label="时间" width="120px">
                  </el-table-column>
                  <el-table-column prop="avgLoadTAP" label="日平均功率">
                  </el-table-column>
                  <el-table-column prop="mAXLoadTAP" label="日最大负载">
                  </el-table-column>
                  <el-table-column prop="mINLoadTAP" label="日最小负载">
                  </el-table-column>
                  <el-table-column prop="avgPF" label="日平均功率因素">
                  </el-table-column>
                  <el-table-column prop="positiveKWh" label="柴油机日发电量">
                  </el-table-column>
                  <el-table-column prop="dPlus" label="柴油机日用油量">
                  </el-table-column>
                  <el-table-column prop="oilConsumption" label="柴油机日发电量油耗">
                  </el-table-column>
                  <el-table-column prop="avgPowerGeneration" label="柴油机日平均发电功率">
                  </el-table-column>
                  <el-table-column prop="tPAP" label="负载日用电量">
                  </el-table-column>
                  <el-table-column prop="failCount" label="停电次数">
                  </el-table-column>
                  <el-table-column prop="engineRunTime" label="发电机日运行时间">
                  </el-table-column>
                  <el-table-column prop="mTOSU" label="储能累计充电量">
                  </el-table-column>
                  <el-table-column prop="lSNST" label="储能累计放电量">
                  </el-table-column>
                  <el-table-column prop="powerEfficiency" label="用电效率">
                  </el-table-column>
                </el-table>
              </div>

              <div class="table_con">
                <el-table :data="fenyelist" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}">
                  <el-table-column prop="num" label="序号">
                  </el-table-column>
                  <el-table-column prop="dateTime" label="时间" width="120px">
                  </el-table-column>
                  <el-table-column prop="avgLoadTAP" label="日平均功率">
                  </el-table-column>
                  <el-table-column prop="mAXLoadTAP" label="日最大负载">
                  </el-table-column>
                  <el-table-column prop="mINLoadTAP" label="日最小负载">
                  </el-table-column>
                  <el-table-column prop="avgPF" label="日平均功率因素">
                  </el-table-column>
                  <el-table-column prop="positiveKWh" label="柴油机日发电量">
                  </el-table-column>
                  <el-table-column prop="dPlus" label="柴油机日用油量">
                  </el-table-column>
                  <el-table-column prop="oilConsumption" label="柴油机日发电量油耗">
                  </el-table-column>
                  <el-table-column prop="avgPowerGeneration" label="柴油机日平均发电功率">
                  </el-table-column>
                  <el-table-column prop="tPAP" label="负载日用电量">
                  </el-table-column>
                  <el-table-column prop="failCount" label="停电次数">
                  </el-table-column>
                  <el-table-column prop="engineRunTime" label="发电机日运行时间">
                  </el-table-column>
                  <el-table-column prop="mTOSU" label="储能累计充电量">
                  </el-table-column>
                  <el-table-column prop="lSNST" label="储能累计放电量">
                  </el-table-column>
                  <el-table-column prop="powerEfficiency" label="用电效率">
                  </el-table-column>
                </el-table>
              </div>

              <div class="table_page">
                  <div class="block">
                    <el-pagination background @current-change="handleCurrentChange"
                      :page-size="pagesize"
                      layout="total, prev, pager, next"
                      :total="datalength">
                    </el-pagination>
                  </div>
              </div>

            </el-tab-pane>
            <el-tab-pane name="fiveth">
              <span slot="label"><i class="el-icon-date"></i> 自定义</span>

              <div style="display:inline-block;margin-bottom: 20px;">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions">
                </el-date-picker>

                <div style="display:inline-block;margin-left: 20px;">
                  <el-button class="checkdata" @click="searchdata" type="primary">查 询</el-button>
                </div>

                <div style="display:inline-block;line-height: 36px;margin-left:20px;">
                  <el-button class="checkdata" style="height:36px;" type="primary" @click="exportOrderData('zidingyi')">导出Excel</el-button>
                </div>

              </div>

              <div class="table_con" style="display:none;">
                <el-table :data="usedata" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}" id="zidingyi">
                  <el-table-column prop="num" label="序号">
                  </el-table-column>
                  <el-table-column prop="dateTime" label="时间" width="120px">
                  </el-table-column>
                  <el-table-column prop="avgLoadTAP" label="日平均功率">
                  </el-table-column>
                  <el-table-column prop="mAXLoadTAP" label="日最大负载">
                  </el-table-column>
                  <el-table-column prop="mINLoadTAP" label="日最小负载">
                  </el-table-column>
                  <el-table-column prop="avgPF" label="日平均功率因素">
                  </el-table-column>
                  <el-table-column prop="positiveKWh" label="柴油机日发电量">
                  </el-table-column>
                  <el-table-column prop="dPlus" label="柴油机日用油量">
                  </el-table-column>
                  <el-table-column prop="oilConsumption" label="柴油机日发电量油耗">
                  </el-table-column>
                  <el-table-column prop="avgPowerGeneration" label="柴油机日平均发电功率">
                  </el-table-column>
                  <el-table-column prop="tPAP" label="负载日用电量">
                  </el-table-column>
                  <el-table-column prop="failCount" label="停电次数">
                  </el-table-column>
                  <el-table-column prop="engineRunTime" label="发电机日运行时间">
                  </el-table-column>
                  <el-table-column prop="mTOSU" label="储能累计充电量">
                  </el-table-column>
                  <el-table-column prop="lSNST" label="储能累计放电量">
                  </el-table-column>
                  <el-table-column prop="powerEfficiency" label="用电效率">
                  </el-table-column>
                </el-table>
              </div>

              <div class="table_con" v-if="usedata.length">
                <el-table :data="fenyelist" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}">
                  <el-table-column prop="num" label="序号">
                  </el-table-column>
                  <el-table-column prop="dateTime" label="时间" width="120px">
                  </el-table-column>
                  <el-table-column prop="avgLoadTAP" label="日平均功率">
                  </el-table-column>
                  <el-table-column prop="mAXLoadTAP" label="日最大负载">
                  </el-table-column>
                  <el-table-column prop="mINLoadTAP" label="日最小负载">
                  </el-table-column>
                  <el-table-column prop="avgPF" label="日平均功率因素">
                  </el-table-column>
                  <el-table-column prop="positiveKWh" label="柴油机日发电量">
                  </el-table-column>
                  <el-table-column prop="dPlus" label="柴油机日用油量">
                  </el-table-column>
                  <el-table-column prop="oilConsumption" label="柴油机日发电量油耗">
                  </el-table-column>
                  <el-table-column prop="avgPowerGeneration" label="柴油机日平均发电功率">
                  </el-table-column>
                  <el-table-column prop="tPAP" label="负载日用电量">
                  </el-table-column>
                  <el-table-column prop="failCount" label="停电次数">
                  </el-table-column>
                  <el-table-column prop="engineRunTime" label="发电机日运行时间">
                  </el-table-column>
                  <el-table-column prop="mTOSU" label="储能累计充电量">
                  </el-table-column>
                  <el-table-column prop="lSNST" label="储能累计放电量">
                  </el-table-column>
                  <el-table-column prop="powerEfficiency" label="用电效率">
                  </el-table-column>
                </el-table>
              </div>

              <div class="table_page" v-if="usedata.length">
                  <div class="block">
                    <el-pagination background @current-change="handleCurrentChange"
                      :page-size="pagesize"
                      layout="total, prev, pager, next"
                      :total="datalength">
                    </el-pagination>
                  </div>
              </div>

            </el-tab-pane>
          </el-tabs>

      </div>


    </div>


  </div>
</template>

<script>
import store from '@/store'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getYesterdayFormatDate, getNowFormatDate, getSevenBeforeDate, getMonthFirstDate, getLastMonth, getFloat4 } from '@/utils/validate.js'
import { GetReport_DeviceDay } from '@/api/asset.js'
export default {
  name: 'AssetData',
  data() {
    return {
      devName: this.$route.query.number,
      devID: this.$route.query.id,
      activeName: 'first',

      value1: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6 // 禁用以后的时间
        },
      },

      usedata: [],
      datalength: 0, // 总条数
      pagesize: 7, // 每页显示条数
      curentpage: 1, // 当前页数
    }
  },
  mounted(){
    this.$nextTick(() => {
      let _this = this;
      _this.getReport_DeviceDay(_this.devID, getYesterdayFormatDate(), getYesterdayFormatDate());
    })
  },
  methods: {
    // 返回按键
    back(){
      this.$router.push({ path: '/asset/asset-check' })
    },
    handleClick(targetName, actions) {
      if (targetName.paneName == "first") {
        // 昨日
        this.usedata = [];
        this.datalength = 0;
        this.curentpage = 1;
        this.getReport_DeviceDay( this.devID, getYesterdayFormatDate(), getYesterdayFormatDate() );
      } else if (targetName.paneName == "second") {
        // 7日
        this.usedata = [];
        this.datalength = 0;
        this.curentpage = 1;
        this.getReport_DeviceDay( this.devID, getSevenBeforeDate(), getNowFormatDate() );
      } else if (targetName.paneName == "third") {
        // 本月
        this.usedata = [];
        this.datalength = 0;
        this.curentpage = 1;
        this.getReport_DeviceDay( this.devID, getMonthFirstDate(), getNowFormatDate() );
      } else if (targetName.paneName == "fourth") {
        // 上月
        this.usedata = [];
        this.datalength = 0;
        this.curentpage = 1;
        this.getReport_DeviceDay( this.devID, getLastMonth()[0], getLastMonth()[1] );
      } else if (targetName.paneName == "fiveth") {
        // 自定义日期
        this.value1 = '';
        this.usedata = [];
        this.datalength = 0;
        this.curentpage = 1;

      }
    },
    changeTime(time){
      return time.split('T')[0]
    },
    handleCurrentChange (currentPage){
      this.curentpage = currentPage
    },
    getReport_DeviceDay(id, start, end){
      GetReport_DeviceDay(id, start, end).then( res => {
        if(res.success){
          this.datalength = res.result.length;
          res.result.forEach((val, index) => {
            this.usedata.push({
              num: index + 1,
              dateTime: this.changeTime(val.time),
              avgLoadTAP: getFloat4(val.avgLoadTAP),
              mAXLoadTAP: getFloat4(val.maxLoadTAP),
              mINLoadTAP: getFloat4(val.minLoadTAP),
              avgPF: getFloat4(val.avgPF),
              positiveKWh: getFloat4(val.positiveKWh),
              dPlus: getFloat4(val.dPlus),
              oilConsumption: getFloat4(val.oilConsumption),
              avgPowerGeneration: getFloat4(val.avgPowerGeneration),
              tPAP: getFloat4(val.tpap),
              failCount: getFloat4(val.failCount),
              engineRunTime: getFloat4(val.engineRunTime),
              mTOSU: getFloat4(val.mtosu),
              lSNST: getFloat4(val.lsnst),
              powerEfficiency: getFloat4(val.powerEfficiency)
            })
          });
        }
      })
    },
    searchdata(){
      if(this.value1){
        this.usedata = [];
        this.getReport_DeviceDay( this.devID, this.value1[0], this.value1[1] );
      }else{
        this.$message({
          message: '请选择开始和结束日期！',
          type: 'warning'
        });
      }
    },
    exportOrderData(id) {
      var name2;
      if(id=="zuori"){
        name2 = '昨日';
      }else if(id=="qiri"){
        name2 = '七日';
      }else if(id=="benyue"){
        name2 = '本月';
      }else if(id=="shangyue"){
        name2 = '上月';
      }else if(id=="zidingyi"){
        name2 = '自定义';
      }
      var xlsxParam = { raw: true };
      var wb = XLSX.utils.table_to_book(document.querySelector('#'+id),xlsxParam);
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
      FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), this.$route.query.number+ '-' + name2+'.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    }
  },
  computed:{
    fenyelist(){
      return this.usedata.slice( (this.curentpage-1)*this.pagesize, this.curentpage*this.pagesize )
    }
  }
}
</script>


<style lang="scss" scoped>
.app-container{
  top:0;
  .back_icon{
    display:block;
    cursor: pointer;
    height:30px;
    margin-bottom:20px;
  }
  .container_wrap{
    width:100%;
    height:calc( 100% - 50px);
    border:1px solid #043A5F;
    background:#08182C;
    // background: rgb(3,25,71);
    .con_tit{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 1.4px;
      background: #0B1F37;
      height:50px;
      line-height:50px;
      border-bottom:1px solid #043A5F;
      text-indent:1%;
    }
    .table_wrap{
      height: calc( 100% - 50px);
      width:100%;
      padding:40px 40px 0;
      position:relative;
      ::v-deep{
        .el-tabs__nav-wrap{
          &::after{
            background-color: transparent;
          }
          .el-tabs__active-bar{
            background: transparent;
          }
          .el-tabs__item{
            padding: 0 15px;
            background: rgb(8,40,83);
            margin-right: 10px;
            color: rgb(138,154,178);
          }
          .is-active{
            color: rgb(241,249,252);
          }
        }
      }
      .btn_con{
        width: 100%;
        height: 28px;
        margin-bottom: 20px;
        button.el-button--primary.is-plain{
          float: right;
          color: #1890ff;
          background: transparent;
          border-color: #233E6A;
        }
      }

      .table_con{
        height:75%;
        overflow-y:auto;
        ::v-deep{

          // 去掉表格的底边框线
          .el-table::before{
            display:none;
          }

          .el-table{
            table.el-table__header{
              thead.has-gutter{
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #73829E;
                letter-spacing: 1.4px;
                tr{
                  th{
                    text-align:center;
                    border:none;
                    background-color: #152A44;
                  }
                }
              }
            }
            table.el-table__body{
              tbody{
                tr.el-table__row{
                  background: #08182C;
                  td{
                    border:none;
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #FFFFFF;
                    letter-spacing: 1.4px;
                    text-align:center;
                    .el-button{
                      display: inline-block;
                      vertical-align: center;
                      font-family: MicrosoftYaHei;
                      font-size: 14px;
                      margin-left: 10px;
                      padding: 0 10px;
                      color: #fff;
                      background: #0066FF;
                      border-radius: 2px;
                      letter-spacing: 0.88px;
                      line-height: 28px;
                      cursor: pointer;
                    }
                  }

                }
                tr.el-table__row:hover{
                  td{
                    background: #08182C;
                  }
                }
                tr.el-table__row--striped{
                  td{
                    background: #08182C;
                  }
                }
                tr.el-table__row--striped:hover{
                  td{
                    background:#08182C;
                  }
                }
              }

            }

          }

          // 表格hover
          .el-table--enable-row-hover{
            .el-table__body{
              tr:hover{
                td{
                  background:rgba(255,255,255,0.5) !important;
                }
              }
            }

          }

        }
      }

      // 页码
      .table_page{
        margin-top:10px;
        text-align:center;
        .block{
          display:inline-block;
          ::v-deep{
            .el-pagination.is-background{
              .el-pagination__total{
                // font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #BFC5D1;
                letter-spacing: 1px;
              }

              button{
                border: 1px solid #426A9D !important;
                border-radius: 1px;
                color:#fff;
                background: #08182C;
              }
              button.btn-prev:disabled{
                color:#606266;
              }
              button.btn-next:disabled{
                color:#606266;
              }


              .el-pager{
                li.number{
                  border: 1px solid #426A9D;
                  border-radius: 1px;
                  background:transparent;
                  // font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #426A9D;
                  letter-spacing: 1px;
                }
                li.number.active{
                  background: #0066FF;
                  border: 1px solid #0066FF;
                  border-radius: 1px;
                  color: #FFFFFF;
                }
                li.more{
                  background:transparent;
                  color: #426A9D;
                }
              }
            }
          }
        }
      }

    }

  }
}
</style>

<template>
  <div class="app-container">
    <div v-if="sbdata && sbdata[0]" id="smallpage" class="small_wrap">
      <div class="monitor_top">

          <div class="top_left">
            <div title="放大" class="img_wrap" @click="showscreen('tobig')">
              <img src="~@/assets/tobig.svg" alt="" />
            </div>
            <small-diagram :sbdata="sbdata"></small-diagram>
          </div>

        <div class="top_right">

          <div class="r_top">
            <ul style="margin-bottom:2%;">
              <li>
                  <div class="liup">
                      <span class="datathree upicon" style="background: #1C4EEA;"></span>
                      <span class="uptit">负载功率</span>
                  </div>
                  <div class="lidown">
                      <span>{{ sbdata[1][5].loadTAP }}</span>
                      <span>kW</span>
                  </div>
              </li>

              <li>
                  <div class="liup">
                      <span class="dataone upicon" style="background: #5EBECE;"></span>
                      <span class="uptit">PCS功率</span>
                  </div>
                  <div class="lidown">
                      <span>{{ sbdata[0][2].tap | zdsh_filters(sbdata[1][2].tap) }}</span>
                      <span>kW</span>
                  </div>
              </li>

              <li>
                  <div class="liup">
                      <span class="dataone upicon" style="background: #6BC784;"></span>
                      <span class="uptit">发电功率</span>
                  </div>
                  <div class="lidown">
                      <span>{{ sbdata[0][1].powerGeneration | zdsh_filters(sbdata[1][1].powerGeneration) }}</span>
                      <span>kW</span>
                  </div>
              </li>
            </ul>
            <ul>
                <li>
                  <div class="liup">
                      <span class="dataone upicon" style="background: #5EBECE;"></span>
                      <span class="uptit">当日用电量</span>
                  </div>
                  <div class="lidown">
                      <span>{{ sbdata[0][4].trrp | zdsh_filters(sbdata[1][4].trrp) }}</span>
                      <span>kW</span>
                  </div>
              </li>
                <li>
                    <div class="liup">
                        <span class="datatwo upicon" style="background: #F6AE17 ;"></span>
                        <span class="uptit">SOC</span>
                    </div>
                    <div class="lidown">
                        <span>{{ sbdata[0][3].soc | zdsh_filters_half(sbdata[1][3].soc) }}</span>
                        <span>%</span>
                    </div>
                </li>
                <li>
                    <div class="liup">
                        <span class="datathree upicon" style="background: #B749DC;"></span>
                        <span class="uptit">SOH</span>
                    </div>
                    <div class="lidown">
                        <span>{{ sbdata[0][3].soh | zdsh_filters_half(sbdata[1][3].soh) }}</span>
                        <span>%</span>
                    </div>
                </li>


            </ul>
          </div>

          <div class="r_bottom">
                <ul class="b_ul">
                  <li>
                    <span class="spanstate">交流调度</span>
                    <img v-if="sbdata[0][2].acDispatch == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[0][2].acDispatch == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">系统警告</span>
                    <img v-if="sbdata[0][2].warnState == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[0][2].warnState == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>

                  <li>
                    <span class="spanstate">直流调度</span>
                    <img v-if="sbdata[0][2].dcDispatch == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[0][2].dcDispatch == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">系统故障</span>
                    <img v-if="sbdata[0][2].failureStatus == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[0][2].failureStatus == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">远程控制</span>
                    <img v-if="sbdata[0][2].remoteControl == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[0][2].remoteControl == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">离网</span>
                    <img v-if="sbdata[0][2].gridState == 0" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[0][2].gridState == 1" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">并网</span>
                    <img v-if="sbdata[0][2].gridState == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[0][2].gridState == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                </ul>
                <ul class="b_ul">
                  <li>
                    <span class="spanstate">交流调度</span>
                    <img v-if="sbdata[1][2].acDispatch == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2][2].acDispatch == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">系统警告</span>
                    <img v-if="sbdata[1][2].warnState == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[1][2].warnState == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>

                  <li>
                    <span class="spanstate">直流调度</span>
                    <img v-if="sbdata[1][2].dcDispatch == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[1][2].dcDispatch == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">系统故障</span>
                    <img v-if="sbdata[1][2].failureStatus == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[1][2].failureStatus == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">远程控制</span>
                    <img v-if="sbdata[1][2].remoteControl == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[1][2].remoteControl == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">离网</span>
                    <img v-if="sbdata[1][2].gridState == 0" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[1][2].gridState == 1" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">并网</span>
                    <img v-if="sbdata[1][2].gridState == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[1][2].gridState == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                </ul>



          </div>

        </div>

      </div>

      <div class="monitor_bottom">

        <div class="fd_wrap qxwrap">
          <div class="tit">
            <span></span>
            <div>实时电网功率(kW)</div>
          </div>
          <div id="ssfdglqx" class="con" ref="ssfdgl"></div>
        </div>

        <div class="pcs_wrap qxwrap">
          <div class="tit">
            <span></span>
            <div>实时PCS功率(kW)</div>
          </div>
          <div id="sspcsglqx" class="con" ref="sspcsgl"></div>
        </div>

        <div class="fz_wrap qxwrap">
          <div class="tit">
            <span></span>
            <div>实时负载功率(kW)</div>
          </div>
          <div id="ssfzglqx" class="con" ref="ssfzgl"></div>
        </div>

      </div>

    </div>

    <div style="display:none;position: relative;" id="largepage" class="large_wrap">
      <div title="缩小" class="img_wrap" @click="showscreen('tosmall')">
        <img src="~@/assets/tosmall.svg" alt="" />
      </div>
      <big-diagram :sbdata="sbdata"></big-diagram>
    </div>




  </div>
</template>

<script>
import SmallDiagram from './components/small-diagram' // Secondary package based on el-pagination
import BigDiagram from './components/big-diagram' // Secondary package based on el-pagination
import echarts from 'echarts'
import { getProjectData } from '@/api/projectinfos.js'
import { getListDGDataByProjectID, getListPCSDataByProjectID, getListDLTDataByProjectID } from '@/api/ynmonitor.js'
import { dealnumber,toFixed } from '@/utilcommon.js'

export default {
  name: 'Zync02MainMonitor',
  components:{
    SmallDiagram,
    BigDiagram
  },

  data() {
    return {

      sbdata: [],
      intervalData: null, // 定时器

      num: -1,


      fdX : [],
      fdseries : [],

      pcsX : [],
      pcsseries : [],

      fzX : [],
      fzseries : [],

      name:['1', '2'],
      onearrdata:[]
    }
  },
  mounted() {
    let _this = this;

    _this.getdata();
    _this.intervalData = window.setInterval(() => {
        _this.num ++;
        if(_this.num == 0){
          _this.getfirstqx();
        }else{
          _this.getdata();
        }
    }, 3000)


  },
  methods: {

    showscreen(pramas) {
      let largepage = document.getElementById('largepage');
      let smallpage = document.getElementById('smallpage');

      if (pramas == 'tobig') {

        // 点击变大
        smallpage.style.display = 'none';
        largepage.style.display = 'block';

      } else if (pramas == 'tosmall') {

        // 点击变小
        smallpage.style.display = 'block';
        largepage.style.display = 'none';

      }
    },
    getfirstqx(){
        // 实时发电功率第一次请求曲线
        getListDGDataByProjectID( this.$route.query.projectid ).then(res => {

          if(res.success){
            let data = res.result;
            for (let i = 0; i <data.length; i++) {
              let fdylist = {};
              fdylist.name = this.name[i];
              let fdlistdata = [];
              for (let j = 0; j< data[i].length; j++){
                if(i==0){this.fdX.push(data[i][j].creationTime);}

                fdlistdata.push(data[i][j].data);
              }
              fdylist.type = 'line';
              fdylist.symbol = 'none';
              fdylist.data = fdlistdata;
              this.fdseries.push(fdylist);
            }

            var ssfdgl = this.$refs.ssfdgl;
            if(ssfdgl){
              let ssfdgl_charts = echarts.init(ssfdgl);
              let option_fd = {
                backgroundColor: 'rgba(255,255,255,0)',
                tooltip: {//提示框组件
                    trigger: 'axis',
                    // formatter: '时间：{b}<br />{a0}: {c0}<br />',
                    formatter: function(params, ticket, callback){
                        var htmlStr = '';
                        for(var i=0;i<params.length;i++){
                          var param = params[i];
                          var xName = param.name;//x轴的名称
                          var seriesName = param.seriesName;//图例名称
                          var value = param.value;//y轴值
                          var color = param.color;//图例颜色

                          if(i===0){
                            htmlStr +='时间:' + xName + '<br/>';//x轴的名称
                          }
                          htmlStr +='<div>';
                          //为了保证和原来的效果一样，这里自己实现了一个点的效果
                          htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                          //圆点后面显示的文本
                          htmlStr += seriesName + ' : ' + value;
                          htmlStr += '</div>';
                        }
                        return htmlStr;
                    },
                    extraCssText:'width:auto;height:auto',
                    axisPointer: {
                        lineStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            fontStyle: 'normal',
                            fontSize: 12,
                            color: '#57617B'
                        }
                    }
                },
                grid: {// 网格
                    left: '8%',
                    right: '8%',
                    bottom: '18%',
                    top: '20%',
                    containLabel: false
                },
                legend: {//图例组件，颜色和名字
                    icon: 'rect',
                    itemWidth: 6,
                    itemHeight: 6,
                    left: 'center',
                    top: '2%',
                    data: this.name,
                    textStyle: {// 文字样式的设置
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.7)',
                        fontStyle: 'normal',
                        fontFamily: 'MicrosoftYaHei'
                    },
                },
                xAxis: [{
                    type: 'category',//类目轴 需要设置data
                    boundaryGap: false,//坐标轴两边留白，控制曲线是否从0点开始
                    data: this.fdX,
                    axisLabel: {//坐标轴文字的设置
                        rotate:0,
                        textStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            color: 'rgba(78,99,135,0.6)',
                            fontStyle: 'normal',
                            fontSize: 10
                        }
                    },
                    axisLine: {//坐标轴线的设置
                        lineStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            color: 'rgba(35,62,106,0.74)',
                            fontStyle: 'normal',
                            fontSize: 10
                        }
                    },
                    axisTick: {//坐标轴刻度线的设置
                        show: true,
                        lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                        },
                        length:4
                    },
                }],
                yAxis: [{
                    type: 'value',//'value' 数值轴，适用于连续数据
                    axisLabel: {// 坐标轴文字的设置
                        textStyle: {
                            color: 'rgba(78,99,135,0.6)',
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 10
                        }
                    },
                    axisLine: {// 坐标轴线的设置
                        lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 9,
                        }
                    },
                    axisTick: {//坐标轴刻度线的设置
                        show: false
                    },
                    splitLine: { // 网格线的设置
                        lineStyle: {
                            // y轴方向的网格线颜色
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12,
                            color: 'rgba(35,62,106,0.4)',
                            type:'dashed'
                        }
                    },
                    splitArea: { // 网格区域的设置
                        show: true,
                        // 背景颜色
                        areaStyle: {
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12,
                            color: ['rgba(255,255,255,0)']
                        }
                    },
                    scale: true
                }],
                series:JSON.parse(JSON.stringify(this.fdseries)),
              };
              ssfdgl_charts.setOption(option_fd);


            }else{
              console.log("没有实时发电功率的DOM");
            }

          }
        });

        // 实时pcs功率第一次请求曲线
        getListPCSDataByProjectID( this.$route.query.projectid ).then(res => {
          if(res.success){
            let datapcs = res.result;
            for(let i = 0; i < datapcs.length; i++){
              let pcsylist = {};
              pcsylist.name = this.name[i];
              let pcslistdata = [];
              for (let j = 0; j< datapcs[i].length; j++){
                if(i==0){this.pcsX.push(datapcs[i][j].creationTime);}
                pcslistdata.push(datapcs[i][j].data);
              }
              pcsylist.type = 'line';
              pcsylist.symbol = 'none';
              pcsylist.data = pcslistdata;
              this.pcsseries.push(pcsylist);
            }

            // 实时pcs功率
            var sspcsgl = this.$refs.sspcsgl;
            if(sspcsgl){
              let sspcsgl_charts = echarts.init(sspcsgl);
              let option_pcs = {
                backgroundColor: 'rgba(255,255,255,0)',
                tooltip: {//提示框组件
                    trigger: 'axis',
                    formatter: function(params, ticket, callback){
                        var htmlStr = '';
                        for(var i=0;i<params.length;i++){
                          var param = params[i];
                          var xName = param.name;//x轴的名称
                          var seriesName = param.seriesName;//图例名称
                          var value = param.value;//y轴值
                          var color = param.color;//图例颜色

                          if(i===0){
                            htmlStr +='时间:' + xName + '<br/>';//x轴的名称
                          }
                          htmlStr +='<div>';
                          //为了保证和原来的效果一样，这里自己实现了一个点的效果
                          htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                          //圆点后面显示的文本
                          htmlStr += seriesName + ' : ' + value;
                          htmlStr += '</div>';
                        }
                        return htmlStr;
                    },
                    extraCssText:'width:auto;height:auto',
                    axisPointer: {
                        lineStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            fontStyle: 'normal',
                            fontSize: 12,
                            color: '#57617B'
                        }
                    }
                },
                grid: {// 网格
                    left: '8%',
                    right: '8%',
                    bottom: '18%',
                    top: '20%',
                    containLabel: false
                },
                legend: {//图例组件，颜色和名字
                    icon: 'rect',
                    itemWidth: 6,
                    itemHeight: 6,
                    left: 'center',
                    top: '2%',
                    data: this.name,
                    textStyle: {// 文字样式的设置
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.7)',
                        fontStyle: 'normal',
                        fontFamily: 'MicrosoftYaHei'
                    },
                },
                xAxis: [{
                    type: 'category',//类目轴 需要设置data
                    boundaryGap: false,//坐标轴两边留白，控制曲线是否从0点开始
                    data: this.pcsX,
                    axisLabel: {//坐标轴文字的设置
                        rotate:0,
                        textStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            color: 'rgba(78,99,135,0.6)',
                            fontStyle: 'normal',
                            fontSize: 10
                        }
                    },
                    axisLine: {//坐标轴线的设置
                        lineStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            color: 'rgba(35,62,106,0.74)',
                            fontStyle: 'normal',
                            fontSize: 12
                        }
                    },
                    axisTick: {//坐标轴刻度线的设置
                        show: true,
                        lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                        },
                        length:4
                    },
                }],
                yAxis: [{
                    type: 'value',//'value' 数值轴，适用于连续数据
                    axisLabel: {// 坐标轴文字的设置
                        textStyle: {
                            color: 'rgba(78,99,135,0.6)',
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 10
                        }
                    },
                    axisLine: {// 坐标轴线的设置
                        lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12,
                        }
                    },
                    axisTick: {//坐标轴刻度线的设置
                        show: false
                    },
                    splitLine: { // 网格线的设置
                        lineStyle: {
                            // y轴方向的网格线颜色
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12,
                            color: 'rgba(35,62,106,0.4)',
                            type:'dashed'
                        }
                    },
                    splitArea: { // 网格区域的设置
                        show: true,
                        // 背景颜色
                        areaStyle: {
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12,
                            color: ['rgba(255,255,255,0)']
                        }
                    },
                    scale: true
                }],
                series: JSON.parse(JSON.stringify(this.pcsseries))
              };
              sspcsgl_charts.setOption(option_pcs);

            }else{
              console.log("没有sspcsgl");
            }

          }
        });

        // 实时负载功率第一次请求曲线
        getListDLTDataByProjectID( this.$route.query.projectid ).then(res => {
          if(res.success){
            let fzdata = res.result;
            for (let i = 0; i <fzdata.length; i++) {
              let fzylist = {};
              fzylist.name = this.name[i];
              let fzlistdata = [];
              for (let j = 0; j< fzdata[i].length; j++){
                if(i==0){this.fzX.push(fzdata[i][j].creationTime);}

                fzlistdata.push(fzdata[i][j].data);
              }
              fzylist.type = 'line';
              fzylist.symbol = 'none';
              fzylist.data = fzlistdata;
              this.fzseries.push(fzylist);
            }

            // 实时负载功率
            var ssfzgl = this.$refs.ssfzgl;
            if(ssfzgl){
              let ssfzgl_charts = echarts.init(ssfzgl);
              let option_fz = {
                backgroundColor: 'rgba(255,255,255,0)',
                tooltip: {//提示框组件
                    trigger: 'axis',
                    formatter: function(params, ticket, callback){
                        var htmlStr = '';
                        for(var i=0;i<params.length;i++){
                          var param = params[i];
                          var xName = param.name;//x轴的名称
                          var seriesName = param.seriesName;//图例名称
                          var value = param.value;//y轴值
                          var color = param.color;//图例颜色

                          if(i===0){
                            htmlStr +='时间:' + xName + '<br/>';//x轴的名称
                          }
                          htmlStr +='<div>';
                          //为了保证和原来的效果一样，这里自己实现了一个点的效果
                          htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                          //圆点后面显示的文本
                          htmlStr += seriesName + ' : ' + value;
                          htmlStr += '</div>';
                        }
                        return htmlStr;
                    },
                    extraCssText:'width:auto;height:auto',
                    axisPointer: {
                        lineStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            fontStyle: 'normal',
                            fontSize: 12,
                            color: '#57617B'
                        }
                    }
                },
                grid: {// 网格
                    left: '8%',
                    right: '8%',
                    bottom: '18%',
                    top: '20%',
                    containLabel: false
                },
                legend: {//图例组件，颜色和名字
                    icon: 'rect',
                    itemWidth: 6,
                    itemHeight: 6,
                    left: 'center',
                    top: '2%',
                    data: this.name,
                    textStyle: {// 文字样式的设置
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.7)',
                        fontStyle: 'normal',
                        fontFamily: 'MicrosoftYaHei'
                    },
                },
                xAxis: [{
                    type: 'category',//类目轴 需要设置data
                    boundaryGap: false,//坐标轴两边留白，控制曲线是否从0点开始
                    data: this.fzX,
                    axisLabel: {//坐标轴文字的设置
                        rotate:0,
                        textStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            color: 'rgba(78,99,135,0.6)',
                            fontStyle: 'normal',
                            fontSize: 10
                        }
                    },
                    axisLine: {//坐标轴线的设置
                        lineStyle: {
                            fontFamily: 'MicrosoftYaHei',
                            color: 'rgba(35,62,106,0.74)',
                            fontStyle: 'normal',
                            fontSize: 12
                        }
                    },
                    axisTick: {//坐标轴刻度线的设置
                        show: true,
                        lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                        },
                        length:4
                    },
                }],
                yAxis: [{
                    type: 'value',//'value' 数值轴，适用于连续数据
                    axisLabel: {// 坐标轴文字的设置
                        textStyle: {
                            color: 'rgba(78,99,135,0.6)',
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 10
                        }
                    },
                    axisLine: {// 坐标轴线的设置
                        lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12,
                        }
                    },
                    axisTick: {//坐标轴刻度线的设置
                        show: false
                    },
                    splitLine: { // 网格线的设置
                        lineStyle: {
                            // y轴方向的网格线颜色
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12,
                            color: 'rgba(35,62,106,0.4)',
                            type:'dashed'
                        }
                    },
                    splitArea: { // 网格区域的设置
                        show: true,
                        // 背景颜色
                        areaStyle: {
                            fontStyle: 'normal',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12,
                            color: ['rgba(255,255,255,0)']
                        }
                    },
                    scale: true
                }],
                series: JSON.parse(JSON.stringify(this.fzseries))
              };
              ssfzgl_charts.setOption(option_fz);
            }else{
              console.log("没有ssfzgl");
            }

          }
        });

    },

    getdata(){

      getProjectData(this.$route.query.projectid).then(res => {
        if(res.success == true){
          let data = res.result;
          this.sbdata = data;
          this.onearrdata = data;


          if(this.num > 1){
            setTimeout(()=> {
              this.fdX.push( this.onearrdata[0][0].creationTime.split('T')[1] );
              this.pcsX.push( this.onearrdata[0][0].creationTime.split('T')[1] );
              this.fzX.push( this.onearrdata[0][0].creationTime.split('T')[1] );
              for (let i = 0; i <this.onearrdata.length; i++) {
                this.fdseries[i].data.push( this.onearrdata[i][1].powerGeneration);
                this.pcsseries[i].data.push( this.onearrdata[i][2].tap);
                this.fzseries[i].data.push( this.onearrdata[i][4].itap);
              }

              // 实时发电功率
              var ssfdgl = this.$refs.ssfdgl;
              if(ssfdgl){
                let ssfdgl_charts = echarts.init(ssfdgl);
                let option_fd = {
                  backgroundColor: 'rgba(255,255,255,0)',
                  tooltip: {//提示框组件
                      trigger: 'axis',
                      // formatter: '时间：{b}<br />{a0}: {c0}<br />',
                      formatter: function(params, ticket, callback){

                          var htmlStr = '';
                          for(var i=0;i<params.length;i++){
                            var param = params[i];
                            var xName = param.name;//x轴的名称
                            var seriesName = param.seriesName;//图例名称
                            var value = param.value;//y轴值
                            var color = param.color;//图例颜色

                            if(i===0){
                              htmlStr +='时间:' + xName + '<br/>';//x轴的名称
                            }
                            htmlStr +='<div>';
                            //为了保证和原来的效果一样，这里自己实现了一个点的效果
                            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                            //圆点后面显示的文本
                            htmlStr += seriesName + '：' + value;
                            htmlStr += '</div>';
                          }
                          return htmlStr;

                      },
                      extraCssText:'width:auto;height:auto',
                      axisPointer: {
                          lineStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              fontStyle: 'normal',
                              fontSize: 12,
                              color: '#57617B'
                          }
                      }
                  },
                  grid: {// 网格
                      left: '8%',
                      right: '8%',
                      bottom: '18%',
                      top: '20%',
                      containLabel: false
                  },
                  legend: {//图例组件，颜色和名字
                      icon: 'rect',
                      itemWidth: 6,
                      itemHeight: 6,
                      left: 'center',
                      top: '2%',
                      data: this.name,
                      textStyle: {// 文字样式的设置
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.7)',
                          fontStyle: 'normal',
                          fontFamily: 'MicrosoftYaHei'
                      },
                  },
                  xAxis: [{
                      type: 'category',//类目轴 需要设置data
                      boundaryGap: false,//坐标轴两边留白，控制曲线是否从0点开始
                      data: this.fdX,
                      axisLabel: {//坐标轴文字的设置
                          rotate:0,
                          textStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              color: 'rgba(78,99,135,0.6)',
                              fontStyle: 'normal',
                              fontSize: 10
                          }
                      },
                      axisLine: {//坐标轴线的设置
                          lineStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              color: 'rgba(35,62,106,0.74)',
                              fontStyle: 'normal',
                              fontSize: 10
                          }
                      },
                      axisTick: {//坐标轴刻度线的设置
                          show: true,
                          lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                          },
                          length:4
                      },
                  }],
                  yAxis: [{
                      type: 'value',//'value' 数值轴，适用于连续数据
                      axisLabel: {// 坐标轴文字的设置
                          textStyle: {
                              color: 'rgba(78,99,135,0.6)',
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 10
                          }
                      },
                      axisLine: {// 坐标轴线的设置
                          lineStyle: {
                              color: 'rgba(35,62,106,0.74)',
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 9,
                          }
                      },
                      axisTick: {//坐标轴刻度线的设置
                          show: false
                      },
                      splitLine: { // 网格线的设置
                          lineStyle: {
                              // y轴方向的网格线颜色
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 12,
                              color: 'rgba(35,62,106,0.4)',
                              type:'dashed'
                          }
                      },
                      splitArea: { // 网格区域的设置
                          show: true,
                          // 背景颜色
                          areaStyle: {
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 12,
                              color: ['rgba(255,255,255,0)']
                          }
                      },
                      scale: true
                  }],
                  series: JSON.parse(JSON.stringify(this.fdseries))
                };
                ssfdgl_charts.setOption(option_fd);
              }else{
                console.log("没有ssfdgl");
              }

              // 实时pcs功率
              var sspcsgl = this.$refs.sspcsgl;
              if(sspcsgl){
                let sspcsgl_charts = echarts.init(sspcsgl);
                let option_pcs = {
                  backgroundColor: 'rgba(255,255,255,0)',
                  tooltip: {//提示框组件
                      trigger: 'axis',
                      formatter: function(params, ticket, callback){
                          var htmlStr = '';
                          for(var i=0;i<params.length;i++){
                            var param = params[i];
                            var xName = param.name;//x轴的名称
                            var seriesName = param.seriesName;//图例名称
                            var value = param.value;//y轴值
                            var color = param.color;//图例颜色

                            if(i===0){
                              htmlStr +='时间:' + xName + '<br/>';//x轴的名称
                            }
                            htmlStr +='<div>';
                            //为了保证和原来的效果一样，这里自己实现了一个点的效果
                            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                            //圆点后面显示的文本
                            htmlStr += seriesName + ' : ' + value;
                            htmlStr += '</div>';
                          }
                          return htmlStr;
                      },
                      extraCssText:'width:auto;height:auto',
                      axisPointer: {
                          lineStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              fontStyle: 'normal',
                              fontSize: 12,
                              color: '#57617B'
                          }
                      }
                  },
                  grid: {// 网格
                      left: '8%',
                      right: '8%',
                      bottom: '18%',
                      top: '20%',
                      containLabel: false
                  },
                  legend: {//图例组件，颜色和名字
                      icon: 'rect',
                      itemWidth: 6,
                      itemHeight: 6,
                      left: 'center',
                      top: '2%',
                      data: this.name,
                      textStyle: {// 文字样式的设置
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.7)',
                          fontStyle: 'normal',
                          fontFamily: 'MicrosoftYaHei'
                      },
                  },
                  xAxis: [{
                      type: 'category',//类目轴 需要设置data
                      boundaryGap: false,//坐标轴两边留白，控制曲线是否从0点开始
                      data: this.pcsX,
                      axisLabel: {//坐标轴文字的设置
                          rotate:0,
                          textStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              color: 'rgba(78,99,135,0.6)',
                              fontStyle: 'normal',
                              fontSize: 10
                          }
                      },
                      axisLine: {//坐标轴线的设置
                          lineStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              color: 'rgba(35,62,106,0.74)',
                              fontStyle: 'normal',
                              fontSize: 12
                          }
                      },
                      axisTick: {//坐标轴刻度线的设置
                          show: true,
                          lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                          },
                          length:4
                      },
                  }],
                  yAxis: [{
                      type: 'value',//'value' 数值轴，适用于连续数据
                      axisLabel: {// 坐标轴文字的设置
                          textStyle: {
                              color: 'rgba(78,99,135,0.6)',
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 10
                          }
                      },
                      axisLine: {// 坐标轴线的设置
                          lineStyle: {
                              color: 'rgba(35,62,106,0.74)',
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 12,
                          }
                      },
                      axisTick: {//坐标轴刻度线的设置
                          show: false
                      },
                      splitLine: { // 网格线的设置
                          lineStyle: {
                              // y轴方向的网格线颜色
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 12,
                              color: 'rgba(35,62,106,0.4)',
                              type:'dashed'
                          }
                      },
                      splitArea: { // 网格区域的设置
                          show: true,
                          // 背景颜色
                          areaStyle: {
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 12,
                              color: ['rgba(255,255,255,0)']
                          }
                      },
                      scale: true
                  }],
                  series: JSON.parse(JSON.stringify(this.pcsseries))
                };
                sspcsgl_charts.setOption(option_pcs);

              }else{
                console.log("没有sspcsgl");
              }

              // 实时负载功率
              var ssfzgl = this.$refs.ssfzgl;
              if(ssfzgl){
                let ssfzgl_charts = echarts.init(ssfzgl);
                let option_fz = {
                  backgroundColor: 'rgba(255,255,255,0)',
                  tooltip: {//提示框组件
                      trigger: 'axis',
                      formatter: function(params, ticket, callback){
                          var htmlStr = '';
                          for(var i=0;i<params.length;i++){
                            var param = params[i];
                            var xName = param.name;//x轴的名称
                            var seriesName = param.seriesName;//图例名称
                            var value = param.value;//y轴值
                            var color = param.color;//图例颜色

                            if(i===0){
                              htmlStr +='时间:' + xName + '<br/>';//x轴的名称
                            }
                            htmlStr +='<div>';
                            //为了保证和原来的效果一样，这里自己实现了一个点的效果
                            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                            //圆点后面显示的文本
                            htmlStr += seriesName + ' : ' + value;
                            htmlStr += '</div>';
                          }
                          return htmlStr;
                      },
                      extraCssText:'width:auto;height:auto',
                      axisPointer: {
                          lineStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              fontStyle: 'normal',
                              fontSize: 12,
                              color: '#57617B'
                          }
                      }
                  },
                  grid: {// 网格
                      left: '8%',
                      right: '8%',
                      bottom: '18%',
                      top: '20%',
                      containLabel: false
                  },
                  legend: {//图例组件，颜色和名字
                      icon: 'rect',
                      itemWidth: 6,
                      itemHeight: 6,
                      left: 'center',
                      top: '2%',
                      data: this.name,
                      textStyle: {// 文字样式的设置
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.7)',
                          fontStyle: 'normal',
                          fontFamily: 'MicrosoftYaHei'
                      },
                  },
                  xAxis: [{
                      type: 'category',//类目轴 需要设置data
                      boundaryGap: false,//坐标轴两边留白，控制曲线是否从0点开始
                      data: this.fzX,
                      axisLabel: {//坐标轴文字的设置
                          rotate:0,
                          textStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              color: 'rgba(78,99,135,0.6)',
                              fontStyle: 'normal',
                              fontSize: 10
                          }
                      },
                      axisLine: {//坐标轴线的设置
                          lineStyle: {
                              fontFamily: 'MicrosoftYaHei',
                              color: 'rgba(35,62,106,0.74)',
                              fontStyle: 'normal',
                              fontSize: 12
                          }
                      },
                      axisTick: {//坐标轴刻度线的设置
                          show: true,
                          lineStyle: {
                            color: 'rgba(35,62,106,0.74)',
                          },
                          length:4
                      },
                  }],
                  yAxis: [{
                      type: 'value',//'value' 数值轴，适用于连续数据
                      axisLabel: {// 坐标轴文字的设置
                          textStyle: {
                              color: 'rgba(78,99,135,0.6)',
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 10,
                          }
                      },
                      axisLine: {// 坐标轴线的设置
                          lineStyle: {
                              color: 'rgba(35,62,106,0.74)',
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 12,
                          }
                      },
                      axisTick: {//坐标轴刻度线的设置
                          show: false
                      },
                      splitLine: { // 网格线的设置
                          lineStyle: {
                              // y轴方向的网格线颜色
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 12,
                              color: 'rgba(35,62,106,0.4)',
                              type:'dashed'
                          }
                      },
                      splitArea: { // 网格区域的设置
                          show: true,
                          // 背景颜色
                          areaStyle: {
                              fontStyle: 'normal',
                              fontFamily: 'MicrosoftYaHei',
                              fontSize: 12,
                              color: ['rgba(255,255,255,0)']
                          }
                      },
                      scale: true
                  }],
                  series: JSON.parse(JSON.stringify(this.fzseries))
                };
                ssfzgl_charts.setOption(option_fz);
              }else{
                console.log("没有ssfzgl");
              }

            },1000);

          }
        }// if语句结束

      });// getProjectData函数结束
    }
  },
  filters:{
    zdsh_filters: function(value,value1){
      return toFixed(value + value1);
    },
    zdsh_filters_half: function(value,value1){
      return toFixed(value/2 + value1/2);
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalData);
    this.intervalData = null;
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  background:transparent;
  height:calc(100% - 10px);
  div.small_wrap{
    width:100%;
    height:100%;
    .monitor_top{
      width: 100%;
      height: 70%;
      margin-bottom:10px;
      .top_left{
        float:left;
        width: 70%;
        margin-right:10px;
        height: 100%;
        position: relative;
        background: #08182C;
        border: 1px solid #043A5F;
        div.img_wrap{
          position: absolute;
          right:1%;
          top:3%;
          width:3%;
          z-index:200;
          cursor:pointer;
          img{
            width:100%;
            height:100%;
          }
        }
      }
      .top_right{
        float:right;
        width: calc(30% - 10px);
        height: 100%;
        background: #08182C;
        border: 1px solid #043A5F;
          .r_top{
            width:90%;
            height:40%;
            margin:auto;
            padding-top:4%;
            border-bottom:1px dashed #224064;
            ul{
                width:100%;
                height:40%;
                display:flex;
                justify-content: center;
                align-items: center;
                li{
                  height:100%;
                    .liup{
                      span{
                        display:inline-block;
                        vertical-align:middle;
                      }
                      span.upicon{
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        margin-right:5px;
                      }
                      span.upicon:after{
                        content: "";
                        display: block;
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background-color: #08182C;
                        position: relative;
                        top: 2.5px;
                        left: 2.5px;
                      }
                      span.uptit{
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        color: #697995;
                        letter-spacing: 0.86px;
                      }
                    }
                    .lidown{
                      margin-top:5px;
                      span{
                        color:#fff;
                      }
                      span:first-child{
                        font-size:18px;
                        letter-spacing: 2px;
                      }
                      span:last-child{
                        font-size: 16px;
                        letter-spacing: 1.14px;
                        line-height: 32px;
                      }
                    }
                }
                li:first-child{
                  flex-basis:40%;
                }
                li:nth-child(2){
                  flex-basis:35%;
                }
                li:last-child{
                  flex-basis:25%;
                }
            }
          }
          .r_bottom{
            width:90%;
            height:60%;
            padding-top:3%;
            margin:auto;
            display:flex;
            justify-content: center;
            align-items: center;
            ul{
              width:50%;
              height:100%;
              padding-left:0;
              margin:1% 0 0;
              li{
                width:100%;
                height:14%;
                span{
                  display:inline-block;
                  width:60%;
                  vertical-align: middle;
                  font-family: MicrosoftYaHei;
                  font-size: 12px;
                  color: #6C7C98;
                  letter-spacing: 0;
                }
                img{
                  display:inline-block;
                  overflow: hidden;
                  vertical-align: middle;
                  width:20%;
                }
              }
            }
          }
      }

    }
    .monitor_bottom{
      width:100%;
      height:calc(30% - 10px);
      background: #08182C;
      border: 1px solid #043A5F;
      .qxwrap{
        float:left;
        width:33%;
        height:100%;
        padding-left:10px;

        .tit{
          margin-top:7px;
          span{
              display:inline-block;
              background: #0066FF;
              width:4px;
              height:13px;
              vertical-align:middle;
              margin-right:10px;

          }
          div{
              display:inline-block;
              line-height:24px;
              font: bold 13px MicrosoftYaHei;
              color: #C2D4F1;
              letter-spacing: 1px;
              vertical-align:middle;
          }
        }
        .con{
          height:calc( 100% - 30px);
        }

      }
    }
  }

  div.large_wrap{
    width:100%;
    height:100%;
    border: 1px solid #043A5F;
    .img_wrap{
      position:absolute;
      right:1%;
      top:3%;
      width:3%;
      cursor:pointer;
      z-index:200;
      img{
        width:100%;
        height:100%;
      }
    }
  }
}

</style>

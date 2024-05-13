<template>
  <div class="app-container">
    <div v-if="sbdata.length" id="smallpage" class="small_wrap">
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
                            <span>{{ sbdata[4].itap | dealNumber }}</span>
                            <span>kW</span>
                        </div>
                    </li>

                    <li>
                        <div class="liup">
                            <span class="dataone upicon" style="background: #5EBECE;"></span>
                            <span class="uptit">PCS功率</span>
                        </div>
                        <div class="lidown">
                            <span>{{ sbdata[2].tap | dealNumber }}</span>
                            <span>kW</span>
                        </div>
                    </li>

                    <li>
                        <div class="liup">
                            <span class="dataone upicon" style="background: #6BC784;"></span>
                            <span class="uptit">发电功率</span>
                        </div>
                        <div class="lidown">
                            <span>{{ sbdata[1].powerGeneration | dealNumber }}</span>
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
                            <span>{{ sbdata[4].trrp | dealNumber }}</span>
                            <span>kW</span>
                        </div>
                    </li>
                      <li>
                          <div class="liup">
                              <span class="datatwo upicon" style="background: #F6AE17 ;"></span>
                              <span class="uptit">SOC</span>
                          </div>
                          <div class="lidown">
                              <span>{{ sbdata[3].soc }}</span>
                              <span>%</span>
                          </div>
                      </li>
                      <li>
                          <div class="liup">
                              <span class="datathree upicon" style="background: #B749DC;"></span>
                              <span class="uptit">SOH</span>
                          </div>
                          <div class="lidown">
                              <span>{{ sbdata[3].soh }}</span>
                              <span>%</span>
                          </div>
                      </li>


                  </ul>
              </div>
              <div class="r_bottom">
                <ul class="b_ul">
                  <li>
                    <span class="spanstate">交流调度</span>
                    <img v-if="sbdata[2].acDispatch == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2].acDispatch == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">系统警告</span>
                    <img v-if="sbdata[2].warnState == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2].warnState == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                </ul>
                <ul class="b_ul">
                  <li>
                    <span class="spanstate">直流调度</span>
                    <img v-if="sbdata[2].dcDispatch == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2].dcDispatch == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">系统故障</span>
                    <img v-if="sbdata[2].failureStatus == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2].failureStatus == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                </ul>
                <ul class="b_ul">
                  <li>
                    <span class="spanstate">PCS通讯状态</span>
                    <img v-if="sbdata[2].runState == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2].runState == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">远程控制</span>
                    <img v-if="sbdata[2].remoteControl == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2].remoteControl == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                </ul>
                <ul class="b_ul">
                  <li>
                    <span class="spanstate">BMS通讯状态</span>
                    <img v-if="sbdata[3].comState == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[3].comState == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">BMS一级告警</span>
                    <img src="~@/assets/onoff-off.svg" alt="">
                  </li>
                </ul>
                <ul class="b_ul">
                  <li>
                    <span class="spanstate">并网</span>
                    <img v-if="sbdata[2].gridState == 1" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2].gridState == 0" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">BMS二级告警</span>
                    <img src="~@/assets/onoff-off.svg" alt="">
                  </li>
                </ul>
                <ul class="b_ul">
                  <li>
                    <span class="spanstate">离网</span>
                    <img v-if="sbdata[2].gridState == 0" src="~@/assets/onoff-on.svg" alt="">
                    <img v-else-if="sbdata[2].gridState == 1" src="~@/assets/onoff-off.svg" alt="">
                  </li>
                  <li>
                    <span class="spanstate">BMS三级告警</span>
                    <img src="~@/assets/onoff-off.svg" alt="">
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
          <div id="ssfdgl" ref="ssfdgl" class="con"></div>
        </div>

        <div class="pcs_wrap qxwrap">
          <div class="tit">
            <span></span>
            <div>实时PCS功率(kW)</div>
          </div>
          <div id="sspcsgl" ref="sspcsgl" class="con"></div>
        </div>

        <div class="fz_wrap qxwrap">
          <div class="tit">
            <span></span>
            <div>实时负载功率(kW)</div>
          </div>
          <div id="ssfzgl" ref="ssfzgl" class="con"></div>
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
import { dealnumber,toFixed,getQueryString } from '@/utilcommon.js'
export default {
  name: 'Zync01MainMonitor',
  components:{
    SmallDiagram,
    BigDiagram
  },
  data(){
    return {

      sbdata: [],
      intervalData: null, // 定时器
      intervalprojectid: null, // 定时器

      num: -1,

      fdX : [],
      fdseries : [],

      pcsX : [],
      pcsseries : [],

      fzX : [],
      fzseries : [],

      name:['4-1', '4-2','5-1', '5-2','6-1', '6-2','7-1', '7-2'],
      onearrdata:[],
      projectidold: this.$route.query.projectid,
      projectidnow: 0

    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
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
        _this.getdata();
    }, 3000);
  },
  methods:{
    showscreen(pramas) {
      let tolarge = document.getElementById('smallpage');
      let tosmall = document.getElementById('largepage');

      if (pramas == 'tobig') {
        // 点击变大
        tolarge.style.display = 'none';
        tosmall.style.display = 'block';
      } else if (pramas == 'tosmall') {
        // 点击变小
        tolarge.style.display = 'block';
        tosmall.style.display = 'none';
      }
    },
    getfirstqx(){
        // 实时发电功率第一次请求曲线
        getListDGDataByProjectID( this.$route.query.projectid ).then(res => {

          if(res.success){
            let data = res.result;
            for (let i = 0; i <data.length; i++) {
              let fdylist = {};
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
                    formatter: '时间：{b}<br />{a0}: {c0}<br />',
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
                    right: '8%',
                    top: '0%',
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
                // series:this.fdseries,
                series: [
                  {
                      name: '实时电网功率',
                      symbol: "none",//去掉折线图上的小点点
                      type: 'line',
                      smooth: false,// 控制曲线形状
                      itemStyle: {
                          normal: {
                              color: '#16CCDC',
                              borderColor: '#e48b4c'
                          },
                      },
                      lineStyle: {// 线条样式设置
                        normal: {
                            width: 2,
                            color: {
                                type: 'linear',

                                colorStops: [{
                                    offset: 0,
                                    color: '#80B0FA' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#0066FF' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(8,107,254,0.29)',
                            shadowBlur: 3,
                            shadowOffsetY: 6
                        }
                      },
                      areaStyle: {// 区域样式设置
                          normal: {
                              color:
                                  // echarts内置的渐变色生成器
                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                      {
                                          offset: 0,
                                          color: 'rgba(79,149,255,0.6)'
                                      },
                                      {
                                          offset: 1,
                                          color: 'rgba(59,137,253,0)'
                                      }
                                  ], false),
                              shadowColor: 'rgba(228, 139, 76, 0.1)',
                              shadowBlur: 20,
                          }
                      },
                      symbolSize: 4,

                      data: this.fdseries[0].data,
                  }
                ]
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
                    formatter: '时间：{b}<br />{a0}: {c0}<br />',
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
                    right: '8%',
                    top: '0%',
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
                // series: this.pcsseries
                series: [
                  {
                      name: '实时pcs功率',
                      symbol: "none",//去掉折线图上的小点点
                      type: 'line',
                      smooth: false,// 控制曲线形状
                      itemStyle: {
                          normal: {
                              color: '#16CCDC',
                              borderColor: '#e48b4c'
                          },
                      },
                      lineStyle: {// 线条样式设置
                          normal: {
                            width: 2,
                            color: {
                                type: 'linear',

                                colorStops: [{
                                    offset: 0,
                                    color: '#22EBC3' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#0FD191' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(14,209,144,0.32)',
                            shadowBlur: 3,
                            shadowOffsetY: 6
                          }
                      },
                      areaStyle: {// 区域样式设置
                          normal: {
                              color:
                                  // echarts内置的渐变色生成器
                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                      {
                                          offset: 0,
                                          color: 'rgba(23,220,166,0.4)'
                                      },
                                      {
                                          offset: 1,
                                          color: 'rgba(53,217,169,0)'
                                      }
                                  ], false),
                              shadowColor: 'rgba(228, 139, 76, 0.1)',
                              shadowBlur: 20,
                          }
                      },
                      symbolSize: 4,

                      data: this.pcsseries[0].data,
                  }
              ]
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
              // fzylist.name = this.name[i];
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
                    formatter: '时间：{b}<br />{a0}: {c0}<br />',
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
                    right: '8%',
                    top: '0%',
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
                // series: this.fzseries
                series: [
                  {
                      name: '实时负载功率',
                      symbol: "none",//去掉折线图上的小点点
                      type: 'line',
                      smooth: false,// 控制曲线形状
                      itemStyle: {
                          normal: {
                              color: '#16CCDC',
                              borderColor: '#e48b4c'
                          },
                      },
                      lineStyle: {// 线条样式设置
                          normal: {
                            width: 2,
                            color: {
                                type: 'linear',

                                colorStops: [{
                                    offset: 0,
                                    color: '#FFA3A3' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#FF014A' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(255,28,89,0.37)',
                            shadowBlur: 3,
                            shadowOffsetY: 6
                          }
                      },
                      areaStyle: {// 区域样式设置
                          normal: {
                              color:
                                  // echarts内置的渐变色生成器
                                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                      {
                                          offset: 0,
                                          color: 'rgba(255,87,122,0.4)'
                                      },
                                      {
                                          offset: 1,
                                          color: 'rgba(255,86,121,0)'
                                      }
                                  ], false),
                              shadowColor: 'rgba(228, 139, 76, 0.1)',
                              shadowBlur: 20,
                          }
                      },
                      symbolSize: 4,

                      data: this.fzseries[0].data,
                  }
              ]
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
          this.onearrdata = data.flat();


          if(this.num > 1){

            setTimeout(()=> {
              this.fdX.push( this.onearrdata[0].creationTime.split('T')[1] );
              this.pcsX.push( this.onearrdata[0].creationTime.split('T')[1] );
              this.fzX.push( this.onearrdata[0].creationTime.split('T')[1] );
              this.fdseries[0].data.push( this.onearrdata[1].powerGeneration);
              this.pcsseries[0].data.push( this.onearrdata[2].tap);
              this.fzseries[0].data.push( this.onearrdata[4].itap);


              // 实时发电功率
              var ssfdgl = this.$refs.ssfdgl;
              if(ssfdgl){
                let ssfdgl_charts = echarts.init(ssfdgl);
                let option_fd = {
                  backgroundColor: 'rgba(255,255,255,0)',
                  tooltip: {//提示框组件
                      trigger: 'axis',
                      formatter: '时间：{b}<br />{a0}: {c0}<br />',
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
                      right: '8%',
                      top: '0%',
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
                  // series: this.fdseries
                  series: [
                    {
                        name: '实时电网功率',
                        symbol: "none",//去掉折线图上的小点点
                        type: 'line',
                        smooth: false,// 控制曲线形状
                        itemStyle: {
                            normal: {
                                color: '#16CCDC',
                                borderColor: '#e48b4c'
                            },
                        },
                        lineStyle: {// 线条样式设置
                          normal: {
                              width: 2,
                              color: {
                                  type: 'linear',

                                  colorStops: [{
                                      offset: 0,
                                      color: '#80B0FA' // 0% 处的颜色
                                  }, {
                                      offset: 1,
                                      color: '#0066FF' // 100% 处的颜色
                                  }],
                                  globalCoord: false // 缺省为 false
                              },
                              shadowColor: 'rgba(8,107,254,0.29)',
                              shadowBlur: 3,
                              shadowOffsetY: 6
                          }
                        },
                        areaStyle: {// 区域样式设置
                            normal: {
                                color:
                                    // echarts内置的渐变色生成器
                                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(79,149,255,0.6)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(59,137,253,0)'
                                        }
                                    ], false),
                                shadowColor: 'rgba(228, 139, 76, 0.1)',
                                shadowBlur: 20,
                            }
                        },
                        symbolSize: 4,

                        data: this.fdseries[0].data,
                    }
                  ]
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
                      formatter: '时间：{b}<br />{a0}: {c0}<br />',
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
                      right: '8%',
                      top: '0%',
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
                  // series: this.pcsseries
                  series: [
                    {
                        name: '实时pcs功率',
                        symbol: "none",//去掉折线图上的小点点
                        type: 'line',
                        smooth: false,// 控制曲线形状
                        itemStyle: {
                            normal: {
                                color: '#16CCDC',
                                borderColor: '#e48b4c'
                            },
                        },
                        lineStyle: {// 线条样式设置
                            normal: {
                              width: 2,
                              color: {
                                  type: 'linear',

                                  colorStops: [{
                                      offset: 0,
                                      color: '#22EBC3' // 0% 处的颜色
                                  }, {
                                      offset: 1,
                                      color: '#0FD191' // 100% 处的颜色
                                  }],
                                  globalCoord: false // 缺省为 false
                              },
                              shadowColor: 'rgba(14,209,144,0.32)',
                              shadowBlur: 3,
                              shadowOffsetY: 6
                            }
                        },
                        areaStyle: {// 区域样式设置
                            normal: {
                                color:
                                    // echarts内置的渐变色生成器
                                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(23,220,166,0.4)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(53,217,169,0)'
                                        }
                                    ], false),
                                shadowColor: 'rgba(228, 139, 76, 0.1)',
                                shadowBlur: 20,
                            }
                        },
                        symbolSize: 4,

                        data: this.pcsseries[0].data,
                    }
                    ]
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
                      formatter: '时间：{b}<br />{a0}: {c0}<br />',
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
                      right: '8%',
                      top: '0%',
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
                  // series: this.fzseries
                  series: [
                    {
                        name: '实时负载功率',
                        symbol: "none",//去掉折线图上的小点点
                        type: 'line',
                        smooth: false,// 控制曲线形状
                        itemStyle: {
                            normal: {
                                color: '#16CCDC',
                                borderColor: '#e48b4c'
                            },
                        },
                        lineStyle: {// 线条样式设置
                            normal: {
                              width: 2,
                              color: {
                                  type: 'linear',

                                  colorStops: [{
                                      offset: 0,
                                      color: '#FFA3A3' // 0% 处的颜色
                                  }, {
                                      offset: 1,
                                      color: '#FF014A' // 100% 处的颜色
                                  }],
                                  globalCoord: false // 缺省为 false
                              },
                              shadowColor: 'rgba(255,28,89,0.37)',
                              shadowBlur: 3,
                              shadowOffsetY: 6
                            }
                        },
                        areaStyle: {// 区域样式设置
                            normal: {
                                color:
                                    // echarts内置的渐变色生成器
                                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(255,87,122,0.4)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(255,86,121,0)'
                                        }
                                    ], false),
                                shadowColor: 'rgba(228, 139, 76, 0.1)',
                                shadowBlur: 20,
                            }
                        },
                        symbolSize: 4,

                        data: this.fzseries[0].data,
                    }
                  ]
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
    sb_four: function(value,value1,value2,value3){
      return toFixed( value + value1 + value2 + value3 );
    },
    sb_two: function(value,value1,value2){
      if(value2 == 0){
        return toFixed( value + value1 );
      }else if(value2 == 1){
        return toFixed( (value + value1)/2 );
      }
    },
    dwhs: function(value){
      return toFixed( value/1000 );
    },
    dealNumber: function(value){
      return toFixed( value );
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
            ul{
              width:100%;
              height:15%;
              display:flex;
              padding-left:0;
              justify-content: center;
              align-items: center;
              margin:1% 0 0;
              li{
                flex:1;
                height:100%;
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
      position: absolute;
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

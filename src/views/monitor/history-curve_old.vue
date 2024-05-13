<template>
  <div class="app-container">
    <div class="tree_wrap left_wrap">
      <div class="left_tit">参数名称</div>
      <el-tree :data="setTree" ref="tree" show-checkbox :props="defaultProps" @check="handleCheckChange"></el-tree>
    </div>

    <div class="right_wrap">
      <div class="right_tit">历史曲线</div>
      <div class="chose_wrap">
        <div class="select_wrap">
          <div class="select_title">时间类型：</div>
          <div class="select_con"  style="width:40%;">
            <el-select v-model="valuetype" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>

        <!-- 分 -->
        <div v-if="valuetype === '0'" class="selecttime_wrap">
          <div class="select_title">时间选择：</div>
          <div class="select_con">
            <el-date-picker v-model="valuedetail" type="datetimerange" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"> </el-date-picker>
          </div>
          <el-button class="checkdata" @click="subdata" type="primary" :loading="loadingbtn">{{loadingbuttext}}</el-button>
        </div>

        <!-- 小时 -->
        <div v-else-if="valuetype === '1'" class="selecttime_wrap">
          <div class="select_title">时间选择：</div>
          <div class="select_con">
            <el-date-picker v-model="valuedetail" type="datetimerange" format="yyyy-MM-dd HH" value-format="yyyy-MM-dd HH" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"> </el-date-picker>
          </div>
          <el-button class="checkdata" @click="subdata" type="primary" :loading="loadingbtn">{{loadingbuttext}}</el-button>
        </div>

        <!-- 日 -->
        <div v-else-if="valuetype === '2'" class="selecttime_wrap">
          <div class="select_title">时间选择：</div>
          <div class="select_con">
            <el-date-picker v-model="valuedetail" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"> </el-date-picker>
          </div>
          <el-button class="checkdata" @click="subdata" type="primary" :loading="loadingbtn">{{loadingbuttext}}</el-button>
        </div>

        <!-- 月 -->
        <div v-else-if="valuetype === '3'" class="selecttime_wrap">
          <div class="select_title">时间选择：</div>
          <div class="select_con">
            <el-date-picker v-model="valuedetail" type="monthrange" format="yyyy-MM" value-format="yyyy-MM" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" :picker-options="pickerOptions"> </el-date-picker>
          </div>
          <el-button class="checkdata" @click="subdata" type="primary" :loading="loadingbtn">{{loadingbuttext}}</el-button>
        </div>
      </div>

      <div class="curve_wrap" id="curveout">
        <div id="curve_wrap">

        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import store from '@/store'
    import {dealnumber} from '@/utilcommon.js'
    import { getHistoryData,getHistoryTreeModelsByUserID } from '@/api/historycurve.js'
    import echarts from 'echarts'


    export default {
      name: 'HistoryCurve',
      data() {
        return {
          loadingbtn:false,// 按钮加载
          loadingbuttext:'查 询',
          setTree:[],
          defaultProps: {
            children: 'children',
            label: 'title'
          },
          options: [
            {
              value: '0',
              label: '分'
            },
            {
              value: '1',
              label: '小时'
            },
            {
              value: '2',
              label: '日'
            },
            {
              value: '3',
              label: '月'
            }
          ],
          valuetype: '',
          valuedetail: [, ],
          trueChecked:[],
          keyid:{},
          chart_curve_wrap: null,
          chartData:{},
          legendarr: [],
          seriesarr:[],
          pickerOptions:{
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
        };
      },
      mounted() {
        var _this = this;
        _this.$nextTick(() => {

          getHistoryTreeModelsByUserID(store.getters.userid).then(data => {
            _this.setTree = data.result;
            _this.getkeyidname();
          });
          _this.chart_curve_wrap = echarts.init(document.getElementById('curve_wrap'));

        })
      },
      beforeDestroy() {
        if (!this.chart_curve_wrap) {
          return
        }
        this.chart_curve_wrap.dispose()
        this.chart_curve_wrap = null
      },
      methods:{
        getkeyidname(){
          this.setTree.forEach(el=>{
            this.keyid[el.key]  = el.title
            if(el.children != null){
            el.children.forEach(el1 => {
              this.keyid[el1.key]  = el1.title
              if(el1.children != null){
                el1.children.forEach(el2 => {
                  this.keyid[el2.key]  = el2.title

                  if(el2.children != null){
                    el2.children.forEach(el3 => {
                      this.keyid[el3.key]  = el3.title

                      if(el3.children != null){
                        el3.children.forEach(el4 => {
                          this.keyid[el4.key]  = el4.title
                        });
                      }

                    });
                  }

                });
              }

            });
            }
          });

        },

        handleCheckChange (data, checked, indeterminate) {
          this.trueChecked = []
          // console.log(checked.checkedNodes);
          checked.checkedNodes.forEach(element => {
            if(element.children == null || element.children.length == 0){
              this.trueChecked.push(element);
              this.trueChecked.forEach(el => {
                el.parentkey = el.key.substring(0,el.key.lastIndexOf("-"));

                // 根据父级的key匹配父级的名称，再赋值给trueChecked
                for(var theparentkey in this.keyid){
                  if( theparentkey == el.parentkey ){
                    el.parenttitle = this.keyid[theparentkey];

                  }
                }

              });
            }
          });
        },

        subdata(){
          if(this.trueChecked.length>0 && this.valuetype !='' && this.valuedetail != ''){
            this.loadingbtn = true;
            this.loadingbuttext = '查询中...';
            if(this.chart_curve_wrap._chartsViews.length > 0){
              document.getElementById('curve_wrap').remove();
              let add_curve = document.createElement('div');
              add_curve.setAttribute('id', 'curve_wrap');
              add_curve.style.width = "100%;"
              add_curve.style.height = '100%';
              document.getElementById('curveout').appendChild(add_curve);
              this.chart_curve_wrap = echarts.init(document.getElementById('curve_wrap'));
              this.legendarr = [];
              this.seriesarr = [];
              this.chartData = {};
            }

            if( this.valuetype == 1 ){
              this.valuedetail[0] = this.valuedetail[0] + ':00';
              this.valuedetail[1] = this.valuedetail[1] + ':00';

            }

            this.trueChecked.forEach(element =>{
              // 提供的查询数据
              let postdata = {
                devid: element.devid,
                typeid: element.typeid,
                timetype: this.valuetype,
                columnName: element.columnName,
                start: new Date(this.valuedetail[0]).valueOf(), // 时间范围的开始时间(new Date()).valueOf();
                end: new Date(this.valuedetail[1]).valueOf(), // 时间范围的结束时间
              };
              let ydataaa = [];
              let xdatatimeaa = [];

              getHistoryData(postdata).then(userdata => {
                if(userdata.success){

                  for (let i = 0; i < userdata.result.length; i++) {
                    let datetime = new Date(userdata.result[i].creationTime);


                    let getFullYear = datetime.getFullYear();
                    let theMonth = datetime.getMonth() + 1;

                    let getMonth = theMonth < 10 ? '0' + theMonth : theMonth;
                    let getDate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
                    let getHours = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
                    let getMinutes = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
                    let getSeconds = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
                    let time;
                    if (this.valuetype == 0) {
                      // 分
                      time = getMonth + '-' + getDate + ' ' + getHours + ':' + getMinutes + ':' + getSeconds;
                    } else if (this.valuetype == 1) {
                      // 时
                      time = getMonth + '-' + getDate + ' ' + getHours + ':' + getMinutes;
                    } else if (this.valuetype == 2) {
                      // 日
                      time = getMonth + '-' + getDate;
                    } else if (this.valuetype == 3) {
                      // 月
                      time = getFullYear + '年' + getMonth + '月';
                    }
                    let userdatadata = dealnumber(userdata.result[i].data);

                    ydataaa.push(userdatadata);
                    xdatatimeaa.push(time);
                  }

                  let seriesdata = {};
                  seriesdata.name = element.parenttitle + element.title;
                  seriesdata.type = 'line';
                  seriesdata.data = ydataaa;
                  this.seriesarr.push(seriesdata);
                  this.legendarr.push(element.parenttitle + element.title);

                  let ll = this.legendarr;

                  if (this.legendarr.length === this.trueChecked.length) {
                    this.chartData = {
                      // title: {
                      //   text: '历史曲线',
                      //   textStyle: {
                      //     color: '#9DAFCE'
                      //   },
                      //   top: '3%',
                      //   left: '0%'
                      // },
                      tooltip: {
                        trigger: 'axis',
                        extraCssText:'width:auto;height:auto'
                      },
                      grid: {
                        left: '4%',
                        right: '4%',
                        bottom: '8%',
                        top: '20%',
                        containLabel: true,
                      },
                      legend: {
                        type: 'scroll',
                        icon: 'diamond',
                        itemGap: 13,
                        data: this.legendarr,
                        top: '8%',
                        bottom: '8%',
                        left: 'center',
                        width: '90%',
                        // height: '100',
                        textStyle: {
                          color: '#6E7889'
                        }
                      },
                      dataZoom: {
                        bottom: '1%',
                        height: '30',
                        dataBackground: {
                          lineStyle: { color: '#39977D' },
                          areaStyle: { color: 'rgba(57,151,125,1)' },
                        },
                        borderColor: 'rgba(57,151,125,0.2)',
                        textStyle: { color: '#39977D' },
                        start: 0,
                        end: 100,
                        xAxisIndex: [0],
                      },
                      toolbox: {
                        right: '20px',
                        itemSize:'32',
                        feature: {
                          dataView: {
                            show: true,
                            title: '数据视图',
                            //readOnly: true, //设置只读，会隐藏刷新按钮。
                            lang: ['数据视图', '关闭', '导出Excel'],

                            contentToOption: function (opts) {
                              $('#tableExcel_Day').table2excel({
                                exclude: '.noExl', //过滤位置的 css 类名
                                filename: '历史曲线excel数据' + '.xls', //文件名称
                                name: 'Excel Document Name.xls',
                                exclude_img: true,
                                exclude_links: true,
                                exclude_inputs: true,
                              });
                            },

                            optionToContent: function (opt) {
                              let axisData = opt.xAxis[0].data; //坐标数据
                              let series = opt.series; //折线图数据
                              let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头第一列
                              let tdBodys = ''; //表数据
                              //组装表头
                              let nameData = ll;
                              for (let i = 0; i < nameData.length; i++) {
                                tdHeads += '<td style="padding: 0 10px">' + nameData[i] + '</td>';
                              }
                              let table =
                                '<table id="tableExcel_Day" border="1" class="table-bordered table-striped" style="width:100%;text-align:center" ><tbody><tr>' +
                                tdHeads +
                                ' </tr>';
                              //组装表数据
                              for (let i = 0, l = axisData.length; i < l; i++) {
                                for (let j = 0; j < series.length; j++) {
                                  let temp = series[j].data[i];
                                  if (temp !== null && temp !== undefined) {
                                    // console.log(temp);
                                    // let thetemp = temp.substring(0, temp.indexOf('.') + 3);
                                    tdBodys += '<td>' + temp + '</td>';
                                  } else {
                                    tdBodys += '<td></td>';
                                  }
                                }
                                table += '<tr><td style="padding: 0 10px">' + axisData[i] + '</td>' + tdBodys + '</tr>';
                                tdBodys = '';
                              }
                              table += '</tbody></table>';
                              return table;
                            },
                          },
                          dataZoom: { show: true, title: { zoom: '区域缩放', back: '区域缩放还原' } },
                          dataZoom: { show: true },
                          saveAsImage: { show: true },
                        },
                      },
                      xAxis: [
                        {
                          type: 'category',
                          boundaryGap: false,
                          data: xdatatimeaa,
                          axisTick: {
                            show: false,
                          },
                          axisLine: { //坐标轴轴线相关设置
                            onZero: false,
                            lineStyle: {
                              color: 'rgba(37,64,107,0.5)'
                            }

                          },
                          axisLabel: {
                            color: ' #657590',
                            fontSize: 12
                          },

                        },
                      ],
                      yAxis: [
                        {
                          type: 'value',
                          axisTick: {
                            show: false,
                          },
                          splitLine: {//坐标轴在gird区域中的分割线
                            lineStyle: {
                              color: 'rgba(37,64,107,0.5)',
                              type: 'dashed'
                            },
                          },
                          axisLine: {//坐标轴轴线相关设置
                            onZero: false,
                            show: false
                          },
                          axisLabel: {//  坐标轴刻度标签相关设置
                            color: ' #657590',
                             fontSize: 12
                          },
                          scale: true,
                        },
                      ],
                      series: this.seriesarr,
                    };
                    console.log(this.legendarr);
                    console.log(this.seriesarr);
                    this.chart_curve_wrap.setOption(this.chartData);
                    this.loadingbtn = false;
                    this.loadingbuttext = '查 询';
                  }
                }
              });
            })
          }else{
            this.$alert('请选择设备和时间', {
              confirmButtonText: '确定',
              center: true
            });
          }

        },



      }
    };

</script>
<style lang="scss" scoped>
.app-container{
  top:0;

  .left_wrap{
    display:inline-block;
    vertical-align: top;
    margin-right: 1%;
    width:20%;
    height:100%;
    border: 1px solid #043A5F;
    overflow:hidden;
    .left_tit{
      width:100%;
      height:50px;
      line-height:50px;
      text-indent:20px;
      border-bottom: 1px solid #043A5F;
      background: #0B1F37;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 1.4px;
    }
    .el-tree {
      width:100%;
      height:calc( 100% - 50px);
      overflow-y:auto;
      padding:20px 0 20px 20px;
      color:#9dafce;
      background: #08182C;


      // 去掉滚动条的代码
      // height:calc( 100% - 50px);
      // padding:20px 0 20px 20px;
      // padding:20px 0 20px 20px;
      // color:#9dafce;
      // background: #08182C;
      // margin-right:-17px;
      // margin-bottom:-17px;
      // overflow: scroll;
      // overflow-x:hidden !important;
    }
  }

  .right_wrap{
    display:inline-block;
    vertical-align: top;
    width:79%;
    height:100%;
    border: 1px solid #043A5F;
      .right_tit{
        width:100%;
        height:50px;
        line-height:50px;
        text-indent:20px;
        border-bottom: 1px solid #043A5F;
        background: #0B1F37;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 1.4px;
      }

      .chose_wrap{
        width:100%;
        height:55px;
        padding: 2% 0 0 2%;
        .select_wrap{
          display:inline-block;
          vertical-align: top;
          width:180px;
          .select_title{
            display:inline-block;
            vertical-align: center;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #6C7B96;
            letter-spacing: 0.88px;
          }
          .select_con{
            display:inline-block;
            vertical-align: center;
            ::v-deep{
              .el-input__inner{
                height:30px;
                line-height:30px;
                background: #152942;
                border: 1px solid #374766;
                font-size:12px;
                padding:0 0 0 5px;
              }
              .el-input__suffix{
                top:3px;
              }

            }

          }
        }

        .selecttime_wrap{
          display:inline-block;
          vertical-align: top;
          width:680px;
          .select_title{
            color:#959bab;
            display:inline-block;
            vertical-align: center;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #6C7B96;
            letter-spacing: 0.88px;
          }
          .select_con{
            display:inline-block;
            vertical-align: center;
            ::v-deep{
              .el-date-editor{
                background-color: #152942;
                border: 1px solid #374766;

                input::-webkit-input-placeholder{
                   font-family: MicrosoftYaHei;
                   font-size: 14px;
                   color: #56647F;
                   letter-spacing: 0.88px;
                }

                input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #56647F;
                  letter-spacing: 0.88px;
                }

                input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #56647F;
                  letter-spacing: 0.88px;
                }

                input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #56647F;
                  letter-spacing: 0.88px;
                }
                .el-range-separator{
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #56647F;
                  letter-spacing: 0.88px;
                }
                .el-range-input{
                  background: #152942;
                }

              }
            }
          }
          .checkdata{
            display:inline-block;
            vertical-align: center;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            margin-left:40px;
            padding:0 10px;
            color: #fff;
            background: #0066FF;
            border-radius: 2px;
            letter-spacing: 0.88px;
            line-height:30px;
            cursor:pointer;

          }
        }

      }


      .curve_wrap{
        width:100%;
        height:calc(100% - 110px);
        // border:1px solid red;
        #curve_wrap{
          width:100%;
          height:95%;
          margin-top:1%;
          // border:1px solid blue;
          ::v-deep{
            >div:first-child{
              height:100%;
              canvas{
                height:100%;
              }
            }
            >div:last-child{
              >div:last-child{
                >div{
                  height:auto;
                }
              }

            }
          }
        }
      }
  }
}




</style>

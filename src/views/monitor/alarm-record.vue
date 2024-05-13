<template>
  <div class="app-container">
    <div class="container_wrap">

      <div class="con_tit">
        报警记录
      </div>
      <div class="table_wrap">

        <div class="table_con">
          <el-table :data="fenyelist" stripe style="width: 100%">
            <el-table-column prop="alarmprogram" label="报警项" width="150">
            </el-table-column>
            <el-table-column prop="alarmdevices" label="报警设备" width="200">
            </el-table-column>
            <el-table-column prop="alarmtime" label="报警时间">
            </el-table-column>
            <el-table-column prop="alarmstate" label="报警状态" width="100">
            </el-table-column>
            <el-table-column prop="unalarmtime" label="报警解除时间">
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

      </div>

    </div>
  </div>
</template>

<script>

import { getAlarmInfoList } from '@/api/alarm.js'

export default {
  name: 'AlarmRecord',
  data() {
    return {
      usedata:[],
      datalength: 0, // 总条数
      pagesize: 10, // 每页显示条数
      curentpage: 1, // 当前页数
      tableData: [
        {
          alarmprogram: '报警项',
          alarmdevices: '报警设备',
          alarmtime: '报警时间',
          alarmstate: '报警状态',
          unalarmtime: '报警解除时间',
        },
        {
          alarmprogram: '报警项',
          alarmdevices: '报警设备',
          alarmtime: '报警时间',
          alarmstate: '报警状态',
          unalarmtime: '报警解除时间',
        },
        {
          alarmprogram: '报警项',
          alarmdevices: '报警设备',
          alarmtime: '报警时间',
          alarmstate: '报警状态',
          unalarmtime: '报警解除时间',
        },
        {
          alarmprogram: '报警项',
          alarmdevices: '报警设备',
          alarmtime: '报警时间',
          alarmstate: '报警状态',
          unalarmtime: '报警解除时间',
        },
        {
          alarmprogram: '报警项',
          alarmdevices: '报警设备',
          alarmtime: '报警时间',
          alarmstate: '报警状态',
          unalarmtime: '报警解除时间',
        },
      ]
    }
  },
  mounted (){
    let _this = this;
    _this.$nextTick( ()=> {
      getAlarmInfoList().then( res => {
        if(res.success){
          _this.datalength = res.result.length;
          res.result.forEach(val => {
            _this.usedata.push({
              alarmprogram: val.remark1,
              alarmdevices: val.devname,
              alarmtime: _this.dealtime(val.alarmtime),
              alarmstate: _this.dealstate(val.alarmstate),
              unalarmtime: _this.dealtime(val.solvetime)
            })
          });
        }
      });
    });
  },
  methods: {
    handleCurrentChange (currentPage){
      this.curentpage = currentPage
    },
    dealtime (value){
      return value.split('T')[0] + ' ' + value.split('T')[1].substring(0,8);
    },
    dealstate (value){
      if(value == 0){ return "告警中" }
      else if(value == 1){ return "已解除" }

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
  .container_wrap{
    width:100%;
    height:100%;
    border:1px solid #043A5F;
    background:#08182C;
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
      // border:1px solid blue;


      .table_con{
        height:85%;

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

                  }

                }
                tr.el-table__row--striped{
                  td{
                    background: #102135;
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

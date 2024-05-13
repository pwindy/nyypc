<template>
  <div class="app-container">

    <div class="container_wrap">

      <div class="con_tit">
        设备管理
      </div>
      <div class="table_wrap">

        <div class="new_search">
          <router-link class="new" tag="div" to='/asset/devices-new' style="cursor:pointer;">添加设备组</router-link>
          <div class="search">
            <input type="text" placeholder="请输入设备组名称搜索" id="inputcon" /><span><img @click="goSearch()" src="@/assets/search.svg" alt="" /></span>
          </div>
          <div class="showall" @click="showall()">显示全部</div>
        </div>

        <div class="table_con">
          <el-table :data="fenyelist" stripe style="width: 100%">
            <el-table-column prop="theid" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="groupName" label="设备组名称">
            </el-table-column>
            <!-- <el-table-column prop="devicetype" label="所属类型" width="60"> -->
            <!-- </el-table-column> -->
            <!-- <el-table-column prop="devicestate" label="设备状态">
            </el-table-column> -->
            <!-- <el-table-column prop="devicedescribe" label="设备描述">
            </el-table-column> -->
            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>
            <!-- <el-table-column prop="creatTime" label="入库时间">
            </el-table-column> -->
            <!-- <el-table-column prop="updataTime" label="更新时间" width="200">
            </el-table-column> -->
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope)">编辑</el-button>
              </template>
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
// getDeviceGroupsBySearch 搜索功能
// getDeviceGroups 获所有设备组取数据
import { getDeviceGroupsBySearch, getDeviceGroups } from '@/api/asset.js'
// import { getuserId } from '@/utils/auth';
export default {
  name: 'DevicesManage',
  data() {
    return {
      usedata:[],
      datalength: 0, // 总条数
      pagesize: 10, // 每页显示条数
      curentpage: 1, // 当前页数
    }
  },
  mounted (){
    let _this = this;
    _this.$nextTick( ()=> {
      getDeviceGroups().then( res => {
        if(res.success){
          _this.datalength = res.result.length;
          res.result.forEach((val,index) => {
            _this.usedata.push({
              theid: index+1,
              groupName: val.groupName, //设备组名称
              projectName: val.projectName, //所属项目
              deviceID: val.deviceID,  //设备ID
              id: val.id  //id
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
    handleEdit (data){
      this.$router.push({ path: `/asset/devices-edit`, query:{ id: data.row.id} });//此处传设备组ID
    },
    // 搜索
    goSearch(){
      if( !$("#inputcon").val()){
          layer.msg('请输入设备组名称', {
            icon: 2,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
          });
      }else{
        var thesearch = $("#inputcon").val();
        getDeviceGroupsBySearch(thesearch).then((res)=>{
          if(res.success){
            this.datalength = res.result.length;
            this.usedata = [];
            res.result.forEach((val,index) => {
              this.usedata.push({
                theid: index+1,
                groupName: val.groupName, //设备组名称
                projectName: val.projectName, //所属项目
                deviceID: val.deviceID,  //设备ID
                id: val.id  //id
              })
            });

          }
        })
      }
    },
    // 显示全部
    showall(){
      getDeviceGroups().then( res => {
        if(res.success){
          $("#inputcon").val('');
          this.datalength = res.result.length;
          this.usedata = [];
          res.result.forEach((val,index) => {
            this.usedata.push({
              theid: index+1,
              groupName: val.groupName, //设备组名称
              projectName: val.projectName, //所属项目
              deviceID: val.deviceID,  //设备ID
              id: val.id  //id
            })
          });
        }
      });
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

      .new_search{
        height: 30px;
        display: flex;
        margin-bottom: 20px;
        .new{
          display: inline-block;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #233E6A;
          border-radius: 2px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #0066FF;
          letter-spacing: 0.88px;
          font-weight: 400;
          margin-right: 20px;
        }
        .search{
          display: inline-block;
          input{
            outline: none;
            width: 180px;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            vertical-align: middle;
            border: 1px solid #233E6A;
            border-right: none;
            border-radius: 2px;
            background: transparent;
            color: #73829E;
            font-size: 12px;
          }
          input::-webkit-input-placeholder {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #73829E;
            letter-spacing: 0.88px;
            font-weight: 400;
            color: red;
          }
          input::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #73829E;
            letter-spacing: 0.88px;
            font-weight: 400;
            color: red;
          }
          input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #73829E;
            letter-spacing: 0.88px;
            font-weight: 400;
            color: red;
          }
          input:-ms-input-placeholder { /* Internet Explorer 10-11 */
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #73829E;
            letter-spacing: 0.88px;
            font-weight: 400;
            color: red;
          }
          span{
            display: inline-block;
            width: 30px;
            height: 30px;
            vertical-align: middle;
            border-radius: 0 1px 1px 0;
            background: #0066FF;
            cursor: pointer;
            img{
              width: 16px;
              display: block;
              margin:7px 0 0 7px;
            }
          }
        }
        .showall{
          display: inline-block;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #233E6A;
          border-radius: 2px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #0066FF;
          letter-spacing: 0.88px;
          font-weight: 400;
          margin-left: 20px;
          cursor: pointer;
        }
      }

      .table_con{
        height:85%;
        // height:50%;
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

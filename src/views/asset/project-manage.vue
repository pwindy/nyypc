<template>
  <div class="app-container">

    <div class="container_wrap">

      <div class="con_tit">
        项目管理
      </div>
      <div class="table_wrap">
        <div class="new_search">
          <router-link class="new" tag="div" to='/asset/project-new' >新建项目</router-link>
          <div class="search">
            <input type="text" placeholder="请输入项目名称搜索" id="inputcon" /><span><img @click="goSearch()" src="@/assets/search.svg" alt="" /></span>
          </div>
          <div class="showall" @click="showall()">显示全部</div>
        </div>

        <div class="table_con">
          <el-table :data="fenyelist" stripe style="width: 100%">
            <el-table-column prop="projectid" label="ID" width="60">
            </el-table-column>
            <el-table-column prop="projectNameCN" label="项目名称" width="350">
            </el-table-column>
            <el-table-column prop="description" label="项目简介">
            </el-table-column>
            <el-table-column prop="personNum" label="设备数量" width="120">
            </el-table-column>
            <el-table-column prop="city" label="所在城市" width="150">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="180">
            </el-table-column>
            <el-table-column prop="updataTime" label="更新时间">
            </el-table-column>


            <el-table-column prop="devicesid" label="数 据" width="100">
              <template slot-scope="scope">
                <el-button type="text" class="buttonText" size="small" style="cursor:pointer" @click="handleData(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="100">
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
import store from '@/store'
import { getProjectInfosByUserid } from '@/api/projectinfos.js'
import { getProjectSearch } from '@/api/asset.js'
import { getuserId } from '@/utils/auth';
export default {
  name: 'ProjectManage',
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
      getProjectInfosByUserid(store.getters.userid).then( res => {
        if(res.success){
          _this.datalength = res.result.length;
          res.result.forEach(val => {
            _this.usedata.push({
              projectid: val.id,
              projectNameCN: val.projectNameCN,
              description: val.description,
              // managerName: val.managerName,
              personNum: val.personNum,
              city: val.city,
              status: val.status,
              updataTime: _this.dealtime(val.updataTime)
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
      this.$router.push({ path: `/asset/project-edit`, query:{ id: data.row.projectid} });//此处只传了一个值id
    },
    handleData (id,data) {
      this.$router.push({ path: `/asset/project-data`, query:{ name: data.projectNameCN, projectid: data.projectid } });
    },
    dealtime (value){
      return value.split('T')[0] + ' ' + value.split('T')[1].substring(0,8);
    },
    // 搜索功能
    goSearch(){
      if( !$("#inputcon").val()){
          layer.msg('请输入项目名称', {
              icon: 2,
              time: 1000 //1秒关闭（如果不配置，默认是3秒）
              }
          );
      }else{
        var thesearch = $("#inputcon").val();
        getProjectSearch(thesearch, getuserId()).then((res)=>{
          if(res.success){
            this.datalength = res.result.length;
            this.usedata = [];
            res.result.forEach(val => {
              this.usedata.push({
                projectid: val.id,
                projectNameCN: val.projectNameCN,
                description: val.description,
                personNum: val.personNum,
                city: val.city,
                status: val.status,
                updataTime: this.dealtime(val.updataTime)
              })
            });

          }
        })
      }
    },

    // 显示全部
    showall(){
      getProjectInfosByUserid(store.getters.userid).then( res => {
        if(res.success){
          $("#inputcon").val('');
          this.datalength = res.result.length;
          this.usedata = [];
          res.result.forEach(val => {
            this.usedata.push({
              projectid: val.id,
              projectNameCN: val.projectNameCN,
              description: val.description,
              personNum: val.personNum,
              city: val.city,
              status: val.status,
              updataTime: this.dealtime(val.updataTime)
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
          width: 80px;
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
          cursor: pointer;
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
        height: 80%;
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

<template>
  <div class="app-container">

    <div class="container_wrap">

      <div class="con_tit">
        用户管理
      </div>
      <div class="table_wrap">

        <div class="table_con">
          <el-table :data="fenyelist" stripe style="width: 100%">
            <el-table-column prop="username" label="用户姓名" width="200">
            </el-table-column>
            <el-table-column prop="userrole" label="用户角色" width="200">
            </el-table-column>
            <el-table-column prop="usertel" label="联系电话">
            </el-table-column>
            <el-table-column prop="useradd" label="邮箱地址">
            </el-table-column>
            <el-table-column prop="userproject" label="用户项目">
            </el-table-column>
            <el-table-column prop="" label="操作">
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
import { getUserInfoListAsync } from '@/api/user.js'
export default {
  name: 'OrderManage',
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
      getUserInfoListAsync().then( res => {
        console.log(res)
        return;
        if(res.success){
          _this.datalength = res.result.length;
          res.result.forEach(val => {
            _this.usedata.push({
              username: '用户姓名',
              userrole: '用户角色',
              usertel: '联系电话',
              useradd: '邮箱地址',
              userproject: '用户项目'
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


      .table_con{
        height:70%;
        // height:50%;
        overflow:hidden;

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

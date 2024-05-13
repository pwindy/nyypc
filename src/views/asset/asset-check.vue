<template>
  <div class="app-container">

    <div class="container_wrap">

      <div class="con_tit">
        项目登记
      </div>
      <div class="table_wrap">

        <div class="select_wrap">
          <div class="select_con" style="width:10%;">
            <el-select v-model="valuetype" placeholder="请选择资产属性" @change="changeProperty($event)">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>



          <!-- 状态搜索下拉框 -->
          <div v-if="valuetype === '4'" class="input_con" style="width:10%;">
            <el-select v-model="statetype" placeholder="请选择状态类型">
              <el-option v-for="item in stateoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>

          <!-- 状态搜索input框 -->
          <div v-else class="input_con" style="width:10%;">
            <input type="text" placeholder="请输入搜索内容" v-model="searchcon" />
          </div>

          <div class="btn_con">
            <el-button class="checkdata" @click="subdata" type="primary" :loading="loadingbtn">{{ loadingbuttext }}</el-button>
          </div>

          <div class="btn_con">
            <el-button class="checkdata"  type="primary" plain size="mini" @click="exportOrderData()">导出Excel</el-button>
          </div>

          <div class="btn_con">
            <el-button class="checkdata"  type="primary" plain size="mini" @click="showallnormal()">重置所有数据</el-button>
          </div>

          <div class="add_btn">
            <el-button class="checkdata" @click="adddevices" type="primary">添加设备</el-button>
          </div>
        </div>


        <div style="display: none;">
          <el-table :data="usedata" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}" id="out-table">
              <el-table-column prop="id" label="序号" width="60">
              </el-table-column>
              <el-table-column prop="devices" label="设备名称" width="270">
              </el-table-column>
              <el-table-column prop="number" label="编号" width="250">
              </el-table-column>
              <el-table-column prop="project" label="所属项目">
              </el-table-column>
              <el-table-column prop="status" label="状态" width="150">
              </el-table-column>
              <el-table-column prop="tips" label="备注信息" width="200">
              </el-table-column>

              <el-table-column prop="devicesid" label="详  情" width="200">
                <template slot-scope="scope">
                  <el-button type="primary" class="buttonText" style="cursor:pointer" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                  <!-- <span></span> -->
                </template>
              </el-table-column>

            </el-table>
        </div>

        <div class="table_con">
          <el-table :data="fenyelist" stripe style="width: 100%" :cell-style="{bdeviceCodeackground:'#08182C'}">
            <el-table-column prop="id" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="devices" label="设备名称" width="270">
            </el-table-column>
            <el-table-column prop="number" label="编号" width="250">
            </el-table-column>
            <el-table-column prop="project" label="所属项目">
            </el-table-column>
            <!-- <el-table-column prop="status" label="状态" width="150" :render-header="icons"> -->
            <el-table-column prop="status" label="状态" width="150" :render-header="renderHeader">
            </el-table-column>
            <el-table-column prop="tips" label="备注信息" width="200">
            </el-table-column>

            <el-table-column prop="devicesid" label="数 据" width="100">
              <template slot-scope="scope">
                <el-button type="text" class="buttonText" size="small" style="cursor:pointer" @click="handleData(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>

            <el-table-column prop="devicesid" label="详  情" width="150">
              <template slot-scope="scope">
                <el-button type="text" class="buttonText" size="small" style="cursor:pointer" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getDevicesCheck , getDevicesSearch } from '@/api/asset.js'
export default {
  name: 'AssetCheck',
  data() {
    return {
      options: [
        {
          value: '1',
          label: '设备名称'
        },
        {
          value: '2',
          label: '编号'
        },
        {
          value: '3',
          label: '所属项目'
        },
        {
          value: '4',
          label: '状态'
        }
      ],
      valuetype: '',   // 资产属性下拉框
      searchcon: '',   // 输入框内容
      stateoptions: [
        {
          value: '1',
          label: '闲置'
        },
        {
          value: '2',
          label: '运行'
        },
        {
          value: '3',
          label: '故障'
        },
        {
          value: '4',
          label: '报废'
        }
      ],
      statetype:'',  // 状态下拉框选中状态
      loadingbtn:false,   // 按钮加载，
      loadingbuttext:'查 询',
      seacrinput: '',

      usedata:[],
      datalength: 0, // 总条数
      pagesize: 10, // 每页显示条数
      curentpage: 1, // 当前页数
    }
  },
  mounted (){
    let _this = this;
    _this.$nextTick( ()=> {
      getDevicesCheck().then( res => {
        // console.log(res);
        if(res.success){
          _this.datalength = res.result.length;
          res.result.forEach(val => {
            _this.usedata.push({
              id: val.id,
              devices: val.devCN,
              number: val.deviceType,
              project: val.projectName,
              status: _this.changeState(val.devicestate),
              devicesid: val.id,
              tips: val.remark1,
              devID: Number(val.deviceCode)
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

    subdata(){
      var _this = this;

      // 非空验证
      if( _this.valuetype ){
        if( _this.valuetype == 4 ){
          if( _this.statetype ){
            _this.seacrinput = _this.statetype;
            _this.loadingbtn = true;
            _this.loadingbuttext = '查询中...';
          }else{
            this.$alert('请选择状态类型', {
              confirmButtonText: '确定',
              center: true
            });
          }
        }else{
          if( _this.searchcon ){
            _this.seacrinput = _this.searchcon;
            _this.loadingbtn = true;
            _this.loadingbuttext = '查询中...';
          }else{
            this.$alert('请输入搜索内容', {
              confirmButtonText: '确定',
              center: true
            });
          }
        }

      }else{
        this.$alert('请选择资产属性', {
          confirmButtonText: '确定',
          center: true
        });
      }

      getDevicesSearch( _this.valuetype , _this.seacrinput ).then( res => {
        if(res.success){
          _this.usedata = [];

          if(res.result){
            console.log(res.result);
            _this.datalength = res.result.length;
            res.result.forEach(val => {
              _this.usedata.push({
                id: val.id,
                devices: val.devCN,
                number: val.deviceType,
                project: val.projectName,
                status: _this.changeState(val.devicestate),
                devicesid: val.id,
                tips: val.remark1,
                devID: Number(val.deviceCode)
              })
            });
          }else{
            _this.datalength = 0;
          }
          this.loadingbtn = false;
          this.loadingbuttext = '查 询';
        }
      });
    },
    adddevices (){
      this.$router.push({ path: '/asset/add-check' })
    },
    handleEdit (id,data) {
      this.$router.push({ path: `/asset/asset-detail`, query:{ id: data.id } });//此处只传了一个值id
    },
    handleData (id,data) {
      console.log(data);
      this.$router.push({ path: `/asset/asset-data`, query:{ id: data.devID, number: data.number} });//此处只传了一个值id
    },
    changeProperty(propertyselect){
      if(propertyselect == 4 ){
        this.statetype = '';
      }else{
        this.searchcon = '';
      }
    },
    changeState (value){
      if(value == 1){
        return '闲置';
      }else if(value == 2){
        return '运行';
      }else if(value == 3){
        return '故障';
      }else if(value == 4){
        return '报废';
      }
    },

    renderHeader () {
      return (
        <div>
          <el-button size='small' on-click={()=>this.showfilters()}>
          状态 <span  class='el-icon-sort'></span>
          </el-button>
        </div>
        )
    },

    showfilters(){
      var filterdata = [], filterdata_xz = [], filterdata_yx = [], filterdata_gz = [], filterdata_bf = [];

      this.usedata.forEach( val => {
        if(val.status == '闲置'){
          filterdata_xz.push(val)
        }
        if(val.status == '运行'){
          filterdata_yx.push(val)
        }
        if(val.status == '故障'){
          filterdata_gz.push(val)
        }
        if(val.status == '报废'){
          filterdata_bf.push(val)
        }
      });
      filterdata = filterdata_xz.concat(filterdata_yx, filterdata_gz, filterdata_bf);
      this.usedata = [];
      this.usedata = filterdata;
    },
    exportOrderData() {
      var xlsxParam = { raw: true };
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'),xlsxParam);
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
      FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '资产登记.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    showallnormal(){
      this.usedata = []
      getDevicesCheck().then( res => {
        if(res.success){
          this.datalength = res.result.length;
          res.result.forEach(val => {
            this.usedata.push({
              id: val.id,
              devices: val.devCN,
              number: val.deviceType,
              project: val.projectName,
              status: this.changeState(val.devicestate),
              devicesid: val.id,
              tips: val.remark1
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

      .select_wrap{
        width:100%;
        height:8%;

        .select_con{
          display:inline-block;
          ::v-deep{
            .el-input__inner{
              height:30px;
              line-height:30px;
              background: #152942;
              border: 1px solid #374766;
              font-size:12px;
              padding:0 0 0 5px;
              color:#fff;
              text-indent:10px;
            }
            .el-input__suffix{
              top:3px;
            }
          }
        }
        .input_con{
          display:inline-block;
          input{
            height:30px;
            line-height:30px;
            background: #152942;
            border: 1px solid #374766;
            font-size:12px;
            padding:0 0 0 10px;
            color:#fff;
            &::placeholder {
              color:rgba(255,255,255,0.7);
            }
            // text-indent:10px;
          }
          ::v-deep{
            .el-input__inner{
              height:30px;
              line-height:30px;
              background: #152942;
              border: 1px solid #374766;
              font-size:12px;
              padding:0 0 0 10px;
              color:#fff;
            }
            .el-input__suffix{
              top:3px;
            }
          }
        }

        .btn_con{
          display:inline-block;
          .checkdata{
            display:inline-block;
            vertical-align: center;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            margin-left:10px;
            padding:0 10px;
            color: #fff;
            background: #0066FF;
            border-radius: 2px;
            letter-spacing: 0.88px;
            line-height:28px;
            cursor:pointer;
          }
        }

        .add_btn{
          float:right;
          .checkdata{
            display:inline-block;
            vertical-align: center;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            margin-left:10px;
            padding:0 10px;
            color: #fff;
            background: #0066FF;
            border-radius: 2px;
            letter-spacing: 0.88px;
            line-height:28px;
            cursor:pointer;
          }
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

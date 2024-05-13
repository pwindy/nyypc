<template>
  <div class="app-container">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="container_wrap">

      <div class="con_tit">
        添加设备
      </div>

      <div class="table_wrap">

        <div class="con_line">
          <div class="select_wrap">
            <div class="select_title">设备名称：</div>
            <div class="select_con">
              <el-input v-model="dev_name" placeholder="请输入设备名称"></el-input>
            </div>
          </div>


          <div class="select_wrap">
            <div class="select_title">编号</div>
            <div class="select_con">
              <el-input v-model="dev_type" placeholder="请输入设备型号"></el-input>
            </div>
          </div>

          <div class="select_wrap">
            <div class="select_title">设备ID：</div>
            <div class="select_con">
              <el-input v-model="dev_num" placeholder="请输入设备编号"></el-input>
            </div>
          </div>

          <div class="select_wrap">
            <div class="select_title">制造日期：</div>
            <div class="select_time">
                <el-date-picker v-model="dev_time" type="date" placeholder="请选择制造日期"></el-date-picker>
            </div>
          </div>
        </div>

        <div class="con_line">
          <div class="select_wrap">
            <div class="select_title">向日葵号：</div>
            <div class="select_con">
              <el-input v-model="dev_xrk" placeholder="请输入向日葵号"></el-input>
            </div>
          </div>

          <div class="select_wrap">
            <div class="select_title">物联卡号：</div>
            <div class="select_con">
              <el-input v-model="dev_wl" placeholder="请输入物联卡号"></el-input>
            </div>
          </div>

          <div class="select_wrap">
            <div class="select_title">状态：</div>
            <div class="select_con">
              <el-select v-model="valuestate" placeholder="请选择状态">
                <el-option v-for="item in optionsstate" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>

          <div class="select_wrap">
            <div class="select_title">所属项目：</div>
            <div class="select_con" style="width: 184px;">
              <el-select v-model="valuepro" filterable placeholder="请选择所属项目">
                <el-option v-for="item in optionspro" :key="item.value" :label="item.label" :value="item"></el-option>
              </el-select>
            </div>
          </div>

        </div>
        <div class="con_line">

          <div class="select_wrap">
            <div class="select_title">备注信息：</div>
            <div class="select_con">
              <el-input v-model="dev_tips" placeholder="请输入备注信息"></el-input>
            </div>
          </div>

        </div>

        <div class="files_upload">
            <el-upload
            class="upload-demo"
            ref="upload"
            action="http://112.74.169.99:21021/api/FileUpload/GatherImageUploadPost"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            :auto-upload="false"
            multiple>
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
        </div>


        <div class="sub_btn">
          <el-button class="checkdata" @click="subdevices" type="primary">确 定</el-button>
        </div>

      </div>


    </div>


  </div>
</template>

<script>
import store from '@/store'
import axios from 'axios'  //引入axios
import { creatOrUpdateAssetInfo  } from '@/api/asset.js'
import { getProjectInfosByUserid } from '@/api/projectinfos.js'
import { isRepeat } from '@/utils/validate'
export default {
  name: 'AddCheck',
  data() {
    return {
      dev_name: '',    //设备名称
      dev_type: '',    //设备型号
      dev_num: '',    //设备编号
      dev_time: '',    //制造日期
      dev_xrk: '',    //向日葵号
      dev_wl: '',    //物联卡号
      valuepro: {},    //选中项目
      optionspro: [{    //项目列表
        value:'0',
        label:'仓库'
      }],
      valuestate: '',    //选中状态
      optionsstate: [    //状态列表
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
      dev_tips: '', //备注信息


      fileList: [ ],
      fileListafter: [],
      fileBefore: []
    }
  },
  mounted (){
    this.updata()
  },
  methods: {
    // 返回按键
    back(){
      this.$router.push({ path: '/asset/asset-check' })
    },
    updata(){
      var _this = this;
      _this.$nextTick( () => {

        getProjectInfosByUserid(store.getters.userid).then(data => {
          if(data.success){
            data.result.forEach(el =>{
              // _this.optionspro.push({value:el.id,label:el.projectNameCN});
              if(el.status != "已完成"){
                _this.optionspro.push({value:el.id,label:el.projectNameCN});
              }

            });
          }
        });
      });
    },

    subdevices(){
      var _this = this;
      var onofftime= false,onoffstate= false,onoffnum= false,onofftype= false,onoffname= false;

      // 非空验证---制造日期
      if( !_this.dev_time ){
        _this.$alert('请选择制造日期', {
          confirmButtonText: '确定',
          center: true
        });
      }else{
        onofftime = true;
      }

      // 非空验证---状态
      if( !_this.valuestate ){
        _this.$alert('请选择状态', {
          confirmButtonText: '确定',
          center: true
        });
      }else{
        onoffstate = true;
      }

      // 非空验证---设备编号
      if( _this.dev_num === '' ){
        _this.$alert('请输入设备编号', {
          confirmButtonText: '确定',
          center: true
        });
      }else{
        onoffnum = true;
      }

      // 非空验证---设备型号
      if( _this.dev_type === '' ){
        _this.$alert('请输入设备型号', {
          confirmButtonText: '确定',
          center: true
        });
      }else{
        onofftype = true;
      }

      // 非空验证---设备名称
      if( _this.dev_name === '' ){
        _this.$alert('请输入设备名称', {
          confirmButtonText: '确定',
          center: true
        });
      }else{
        onoffname = true;
      }

      var params ={
        devCN: _this.dev_name,//设备名称
        deviceCode: _this.dev_num,//设备编号
        deviceType: _this.dev_type,//设备型号
        projectID: _this.valuepro.value,//项目ID
        projectName: _this.valuepro.label,//项目名称
        devicestate: _this.valuestate,//设备状态  1-闲置 2-运行 3-故障 4-报废
        describe: '',//设备描述
        xrkid: _this.dev_xrk,//向日葵ID
        cardID: _this.dev_wl,//物联卡号
        creatTime: _this.dev_time,//创建时间
        remark1: _this.dev_tips,//备注信息
        remark2: JSON.stringify(_this.fileListafter),//上传的文件
        remark3: ''//备注3
      }
      if(onofftime && onoffstate && onoffnum && onofftype && onoffname){
        axios.post("http://112.74.169.99:21021/api/services/app/AssetService/CreatOrUpdateAssetInfo",JSON.stringify(params),{
          headers: {
            'Content-Type': 'application/json',
            "Accept":'application/json, text/plain, */*'
          }
        }).then(function(res){
            if(res.status == 200){
              _this.$router.push({ path: '/asset/asset-check' })
            }
        });
      }

    },

    submitUpload() {
      this.$refs.upload.submit();
    },

    // 上传文件，后端返回的数据
    handleAvatarSuccess(res){
      if(res.success){
        var arrback = [];
        arrback.push(res.result.filename);
        arrback.push(res.result.fileurl);
        this.fileListafter.push(arrback)
      }
    },

    // 上传服务器前，打印出来的上传文件
    beforeUpload(file){
      this.fileBefore.push(file.name)
      if(isRepeat(this.fileBefore)){
        this.$notify({
          title: '提示',
          message: '已删除重复文件'+ file.name
        });
        return false
      }
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

      .con_line{
        width:100%;
        height:8%;
        // border:1px solid red;
        .select_wrap{
          display:inline-block;
          vertical-align: top;
          width:25%;
          .select_title{
            display:inline-block;
            width:25%;
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
              .el-select{
                width:120%;
              }
              .el-input__inner{
                // width:120%;
                height:30px;
                line-height:30px;
                background: #152942;
                border: 1px solid #374766;
                font-size:12px;
                padding:0 0 0 5px;
                color:#fff;
              }
              .el-input__suffix{
                top:3px;
                // right:-25px;
              }
            }
          }
          .select_time{
            display:inline-block;
            vertical-align: center;
            ::v-deep{
              .el-input__inner{
                height:30px;
                line-height:30px;
                background: #152942;
                border: 1px solid #374766;
                font-size:12px;
                color:#fff;
                // padding:0 0 0 5px;
              }
              .el-input__prefix{
                top:-2px;
              }
            }
          }
        }
      }

      .sub_btn{
        margin-top:20px;
        text-align: center;
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

  }
}
</style>

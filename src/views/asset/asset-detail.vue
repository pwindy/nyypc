<template>
  <div class="app-container">
    <img class="back_icon" @click="back" src="~@/assets/back.svg" alt="">
    <div class="container_wrap">

      <div class="con_tit">
        资产登记
      </div>
      <div class="table_wrap">

        <div class="top_wrap">
          <div class="con_line">
            <div class="select_wrap">
              <div class="select_title">设备名称：</div>
              <div class="select_con">
                <p>{{dev_name}}</p>
              </div>
            </div>


            <div class="select_wrap">
              <div class="select_title">设备型号：</div>
              <div class="select_con">
                <p>{{dev_type}}</p>
              </div>
            </div>

            <div class="select_wrap">
              <div class="select_title">设备编号：</div>
              <div class="select_con">
                <p>{{dev_num}}</p>
              </div>
            </div>

            <div class="select_wrap">
              <div class="select_title">制造日期：</div>
              <div class="select_time">
                  <p>{{dev_time}}</p>
              </div>
            </div>
          </div>

          <div class="con_line">
            <div class="select_wrap">
              <div class="select_title">向日葵号：</div>
              <div class="select_con">
                <p>{{dev_xrk}}</p>
              </div>
            </div>


            <div class="select_wrap">
              <div class="select_title">物联卡号：</div>
              <div class="select_con">
                <p>{{dev_wl}}</p>
              </div>
            </div>

            <div class="select_wrap">
              <div class="select_title">状态：</div>
              <div class="select_con">
                <p>{{ chosestate | changeState }}</p>
              </div>
            </div>

            <div class="select_wrap">
              <div class="select_title">所属项目：</div>
              <div class="select_con">
                <p>{{chose_project}}</p>
              </div>
            </div>
          </div>

          <div class="con_line">
            <div class="select_wrap">
              <div class="select_title">备注信息：</div>
              <div class="select_con">
                <p>{{dev_tips}}</p>
              </div>
            </div>
          </div>
          <div class="sub_btn" style="margin: 5px 0 10px 0;">
            <el-button class="checkdata" @click="changedevices" type="primary">修 改</el-button>
          </div>



          <div class="show_upload" id="show_upload">
            <div class="show_list" v-for="(item, index) in back_upload" :key="index">
              <a :href="'http://' +item[1]" class="list_name" title="点击可以下载文档" target="_blank">{{ item[0] }}</a>
              <span class="el-icon-circle-close list_close" @click="deletefiles(index)"></span>
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

          <div class="sub_btn" style="margin: 5px 0 0 0;" v-if="fileBefore.length">
            <el-button class="checkdata" type="primary" @click="subfiles">提交文件修改</el-button>
          </div>

        </div>

        <div class="lzxx_wrap">
          <p style="">流转信息</p>
          <div class="add_btn">
            <el-button class="checkdata" @click="adddevices" type="primary">添 加</el-button>
          </div>
        </div>

        <div class="table_con">
          <el-table :data="fenyelist" stripe style="width: 100%" :cell-style="{background:'#08182C'}">
            <el-table-column prop="projectck" label="项目(仓库)">
            </el-table-column>
            <el-table-column prop="intime" label="入库时间">
            </el-table-column>
            <el-table-column prop="outtime" label="出库时间">
            </el-table-column>
            <el-table-column prop="recorder" label="记录人">
            </el-table-column>
            <el-table-column prop="lz_tips" label="流转备注">
            </el-table-column>

            <el-table-column prop="changeid" label="编辑">
              <template slot-scope="scope">
                <el-button type="primary" class="buttonText" style="cursor:pointer" @click="handleEdit(scope.$index, scope.row)">修 改</el-button>
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

    <div id="popup" class="moduleclass" style="display: none;">

      <div class="con_list">

        <div class="select_wrap">
          <div class="select_title">设备名称：</div>
          <div class="select_con">
            <el-input v-model="dev_name" placeholder="请输入设备名称"></el-input>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">设备型号：</div>
          <div class="select_con">
            <el-input v-model="dev_type" placeholder="请输入设备型号"></el-input>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">设备编号：</div>
          <div class="select_con">
            <el-input v-model="dev_num" placeholder="请输入设备编号"></el-input>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">制造日期：</div>
          <div class="select_time">
              <el-date-picker v-model="dev_time" type="date" placeholder="请选择制造日期" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>

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
            <el-select v-model="chosestate" placeholder="请选择状态">
              <el-option v-for="item in statelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>

        <div class="select_wrap ">
          <div class="select_title">所属项目：</div>
          <div class="select_con">
            <el-select v-model="chose_project" placeholder="请选择所属项目" class="selectpro">
              <el-option v-for="item in projectlist" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">备注信息：</div>
          <div class="select_con">
            <el-input v-model="dev_tips" placeholder="请输入备注信息"></el-input>
          </div>
        </div>

        <div class="sub_btn">
          <el-button class="checkdata" @click="subdevices" type="primary">提 交</el-button>
        </div>

      </div>

    </div>


    <div id="circulation" class="moduleclass" style="display: none;">

      <div class="con_list">

        <div class="select_wrap">
          <div class="select_title">入库时间：</div>
          <div class="select_time">
              <el-date-picker v-model="add_cir_intime" type="date" placeholder="请选择入库时间"></el-date-picker>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">出库时间：</div>
          <div class="select_time">
              <el-date-picker v-model="add_cir_outtime" type="date" placeholder="请选择出库时间"></el-date-picker>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">所属项目：</div>
          <div class="select_con">
            <el-select v-model="add_cir_project" placeholder="请选择所属项目"  class="selectpro">
              <el-option v-for="item in addprojectlist" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">流转备注：</div>
          <div class="select_con">
              <el-input v-model="add_cir_tips" placeholder="请输入流转备注"></el-input>
          </div>
        </div>

        <div class="sub_btn">
          <el-button class="checkdata" @click="subcirculation" type="primary">提 交</el-button>
        </div>
      </div>

    </div>

    <div id="circulationchange" class="moduleclass" style="display: none;">

      <div class="con_list">

        <div class="select_wrap">
          <div class="select_title">入库时间：</div>
          <div class="select_time">
              <el-date-picker v-model="show_change_intime" type="date" placeholder="请选择入库时间" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">出库时间：</div>
          <div class="select_time">
              <el-date-picker v-model="show_change_outtime" type="date" placeholder="请选择出库时间" value-format="yyyy-MM-dd" id="showout"></el-date-picker>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">所属项目：</div>
          <div class="select_con">
            <el-select v-model="show_change_project_cir" placeholder="请选择所属项目" class="selectpro">
              <el-option v-for="item in showprojectlist" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </div>
        </div>

        <div class="select_wrap">
          <div class="select_title">流转备注：</div>
          <div class="select_con">
              <el-input v-model="show_change_tips_cir" placeholder="请输入流转备注"></el-input>
          </div>
        </div>

        <div class="sub_btn">
          <el-button class="checkchangedata checkdata" @click="changecirculation" type="primary">提 交</el-button>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import store from '@/store'
import axios from 'axios'  //引入axios
import { gGetAssetInfoByID , getCirculationByAssetID } from '@/api/asset.js'
import { getProjectInfosByUserid } from '@/api/projectinfos.js'
import { getuserId, getusername } from '@/utils/auth';
import { delSameone, isRepeat, delSameArrInArr } from '@/utils/validate'

export default {
  name: 'AssetCheck',
  data() {
    return {
      dev_name:'',    //设备名称
      dev_type:'',    //设备型号
      dev_num:'',    //设备编号
      dev_time:'',    //制造日期
      dev_xrk:'',    //向日葵号
      dev_wl:'',    //物联卡号
      chosestate:'',    //选中状态
      statelist: [    //状态列表
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
      chose_project:'',    //选中项目
      devicesprojectlist:[{    //项目列表
        value:'0',
        label:'仓库'
      }],

      projectlist:[{    //项目列表
        value:'0',
        label:'仓库'
      }],

      fileList: [],

      dev_tips: '',       //备注信息
      back_upload : [],   //后台返回的上传文件
      add_upload : [],    //增加的上传文件
      fileBefore: [],




      // 新增---流转信息
      add_cir_intime:'', // 入库时间
      add_cir_outtime:'', // 出库时间
      add_cir_project:'',    //选中项目
      addprojectlist:[{    //项目列表
        value:'0',
        label:'仓库'
      }],
      add_cir_tips: '',    //流转备注


      // 显示和修改---流转信息
      show_change_intime:'', // 流转入库时间
      show_change_outtime:'', // 流转出库时间
      show_change_project_cir:'',    //流转选中项目名称
      show_change_tips_cir: '',  // 流转备注
      show_change_projectid_cir:'',    //选中项目id
      showprojectlist:[{    //项目列表
        value:'0',
        label:'仓库'
      }],
      changeid:'',



      usedata: [],
      datalength: 0, // 总条数
      pagesize: 10, // 每页显示条数
      curentpage: 1, // 当前页数
    }
  },
  mounted (){
    let _this = this;
    _this.$nextTick( ()=> {

      // 获取设备信息的列表
      gGetAssetInfoByID(_this.$route.query.id).then( res => {
        if(res.success){
          _this.dev_name = res.result.devCN;//设备名称
          _this.dev_type = res.result.deviceType;//设备型号
          _this.dev_num = res.result.deviceCode;//设备编号
          _this.dev_time = _this.timechange(res.result.creatTime);//制造日期
          _this.dev_xrk = res.result.xrkid;//向日葵号
          _this.dev_wl = res.result.cardID;//物联卡号
          _this.chosestate = res.result.devicestate;//选中状态对应的数值
          _this.chose_project = res.result.projectName;//选中项目名称
          _this.dev_tips = res.result.remark1;//备注信息
          _this.back_upload = delSameArrInArr( JSON.parse(res.result.remark2) )
        }
      });

      // 获取流转信息的列表
      getCirculationByAssetID(_this.$route.query.id).then(res => {
        if(res.success){
          _this.usedata = [];
          if(res.result){
            _this.datalength = res.result.length;
            res.result.forEach(val => {

              if(val.outTime == "2001-01-01T00:00:00"){
                val.outTime = ''
              }
              _this.usedata.push({
                projectck: val.projectName,
                intime: _this.timechange(val.putInTime),
                outtime: _this.timechange(val.outTime),
                recorder: val.userName,
                lz_tips: val.remark1,
                projectid: val.projectID,
                changeid: val.id
              });
            });
          }else{
            _this.datalength = 0;
          }
        }
      })

      // 获取所有项目名称
      getProjectInfosByUserid(store.getters.userid).then(data => {
        if(data.success){
          data.result.forEach(el =>{
            _this.devicesprojectlist.push({value:el.id,label:el.projectNameCN}); //修改资产登记的项目列表
            _this.addprojectlist.push({value:el.id,label:el.projectNameCN}); //新增流行信息的项目列表
            _this.showprojectlist.push({value:el.id,label:el.projectNameCN}); //修改流转信息的项目列表
            _this.projectlist.push({value:el.id,label:el.projectNameCN}); //项目列表
          });
        }
      });

    });
  },
  methods: {
    // 返回按键
    back(){
      this.$router.push({ path: '/asset/asset-check' })
    },
    handleCurrentChange (currentPage){
      this.curentpage = currentPage
    },


    // 修改设备信息按钮---弹框
    changedevices(){
      var _this = this;
        layer.open({
            title:'修改资产登记设备信息',
            type: 1,
            content: $('#popup'),
            area: ['350px', '550px'],
            zIndex:10,
            success: function (layero, index) {}
        });
    },

    // 提交修改设备基本信息
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
      if( !_this.chosestate ){
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

      var params_devices_change ={
        devCN: _this.dev_name,//设备名称
        deviceCode: _this.dev_num,//设备编号
        deviceType: _this.dev_type,//设备型号
        projectID: _this.backprojectid(_this.chose_project),//项目ID
        projectName: _this.chose_project,//项目名称
        devicestate: _this.chosestate,//设备状态  1-闲置 2-运行 3-故障 4-报废
        describe: '',//设备描述
        xrkid: _this.dev_xrk,//向日葵ID
        cardID: _this.dev_wl,//物联卡号
        creatTime: _this.dev_time,//创建时间
        remark1: _this.dev_tips,//备注信息
        remark2: '',//备注2
        remark3: '',//备注3
        id: _this.$route.query.id
      }

      if(onofftime && onoffstate && onoffnum && onofftype && onoffname){
        axios.post("http://112.74.169.99:21021/api/services/app/AssetService/CreatOrUpdateAssetInfo",JSON.stringify(params_devices_change),{
          headers: {
            'Content-Type': 'application/json',
            "Accept":'application/json, text/plain, */*'
          }
        }).then(function(res){
          // var rerurndata = JSON.parse( res.config.data );
          if(res.status == 200){
            layer.closeAll();
            window.location.reload();
          }
        });
      }
    },

    // 新增流转信息按钮---弹框
    adddevices(){
      var _this = this;
      layer.open({
          title:'添加流转信息',
          type: 1,
          content: $('#circulation'),
          area: ['350px', '350px'],
          zIndex:10,
          success: function (layero, index) {}
      });
    },

    // 提交新增流转信息
    subcirculation(){
      var _this = this;

      var onoffin= false,onoffproject= false;

      // 非空验证---所属项目
      if( !_this.add_cir_project ){
        _this.$alert('请选择所属项目', {
          confirmButtonText: '确定',
          center: true
        });
      }else{
        onoffproject = true;
      }

      // 非空验证---入库时间
      if( !_this.add_cir_intime ){
        _this.$alert('请选择入库时间', {
          confirmButtonText: '确定',
          center: true
        });
      }else{
        onoffin = true;
      }

      // 非空验证---出库时间
      if(_this.add_cir_outtime){
        if(_this.add_cir_outtime != '2001-01-01 00:00:00'){
          if( _this.add_cir_intime.getTime() >= _this.add_cir_outtime.getTime() ){
            _this.$alert('出库时间应大于入库时间', {
              confirmButtonText: '确定',
              center: true
            });
          }
        }
      }else{
        _this.add_cir_outtime = '2001-01-01 00:00:00'
      }

      var params_cir_add = {
        assetID: _this.$route.query.id,//资产ID
        projectID: _this.backprojectid(_this.add_cir_project),//项目ID
        projectName: _this.add_cir_project,//项目名称
        userID: getuserId(),//用户ID
        userName: getusername(),//用户名
        putInTime: _this.add_cir_intime,//入库时间
        outTime: _this.add_cir_outtime,//出库时间
        remark1: _this.add_cir_tips,//流转备注
        remark2: '',//备注2
        remark3: '',//备注3
      }

      if(onoffin && onoffproject){

        axios.post("http://112.74.169.99:21021/api/services/app/AssetService/CreatOrUpdateCirculation",JSON.stringify(params_cir_add),{
          headers: {
            'Content-Type': 'application/json',
            "Accept":'application/json, text/plain, */*'
          }
        }).then(function(res){
            if(res.status == 200){
              layer.closeAll();
              window.location.reload();
            }
        });
      }
    },

    // 修改流转信息按钮---弹框
    handleEdit (id,data) {
      // console.log(data)
      var _this = this;
      layer.open({
          title:'修改流转信息',
          type: 1,
          content: $('#circulationchange'),
          area: ['350px', '350px'],
          zIndex:10,
          success: function (layero, index) {}
      });

      _this.changeid = data.changeid;
      _this.show_change_intime = data.intime;
      _this.show_change_tips_cir = data.lz_tips;
      _this.show_change_outtime = data.outtime;
      _this.show_change_project_cir = data.projectck;
      _this.show_change_projectid_cir = data.projectid;


    },

    // 提交修改流转信息
    changecirculation(){

      var _this = this;
      var onoff = false;
      if(_this.show_change_outtime){
          if( new Date(_this.show_change_intime).getTime() > new Date(_this.show_change_outtime).getTime() ){
            _this.$alert('出库时间应大于入库时间', {
              confirmButtonText: '确定',
              center: true
            });
          }else{
            onoff = true;
          }
      }else{
        _this.show_change_outtime = '2001-01-01';
        $("#showout").css("color","rgba(255,255,255,0)");
        onoff = true;

      }

      var params_cir_change = {
        assetID: _this.$route.query.id,//资产ID
        projectID: _this.backprojectid(_this.show_change_project_cir),//项目ID
        projectName: _this.show_change_project_cir,//项目名称
        userID: getuserId(),//用户ID
        userName: getusername(),//用户名
        putInTime: _this.show_change_intime,//入库时间
        outTime: _this.show_change_outtime,//出库时间
        remark1:  _this.show_change_tips_cir,//流转备注
        remark2: '',//备注2
        remark3: '',//备注3
        id: _this.changeid
      }

      if(onoff){

        axios.post("http://112.74.169.99:21021/api/services/app/AssetService/CreatOrUpdateCirculation",JSON.stringify(params_cir_change),{
          headers: {
            'Content-Type': 'application/json',
            "Accept":'application/json, text/plain, */*'
          }
        }).then(function(res){
          if(res.status == 200){
            layer.closeAll();
            window.location.reload();
          }
        });

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

    timechange(time){
      return time.substring(0,10);
    },

    backprojectid(name){
      for( var i=0;i<this.projectlist.length;i++){
        if(name == this.projectlist[i].label ){
          return this.projectlist[i].value;
        }
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
        this.add_upload.push(arrback)
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
    },

    deletefiles(index){
        var arrobj = this.back_upload
        for(let i=0;i<arrobj.length;i++){
            if(i==index){
                arrobj.splice(index,1);//删除第2个元素
            }
        }
        this.back_upload = arrobj
    },



    subfiles(){
      var newupload = delSameone( this.back_upload.concat(this.add_upload) );

      var params_devices_filechange ={
        devCN: this.dev_name,//设备名称
        deviceCode: this.dev_num,//设备编号
        deviceType: this.dev_type,//设备型号
        projectID: this.backprojectid(this.chose_project),//项目ID
        projectName: this.chose_project,//项目名称
        devicestate: this.chosestate,//设备状态  1-闲置 2-运行 3-故障 4-报废
        describe: '',//设备描述
        xrkid: this.dev_xrk,//向日葵ID
        cardID: this.dev_wl,//物联卡号
        creatTime: this.dev_time,//创建时间
        remark1: this.dev_tips,//备注信息
        remark2: JSON.stringify(newupload),//备注2
        remark3: '',//备注3
        id: this.$route.query.id
      }

      axios.post("http://112.74.169.99:21021/api/services/app/AssetService/CreatOrUpdateAssetInfo",JSON.stringify(params_devices_filechange),{
        headers: {
          'Content-Type': 'application/json',
          "Accept":'application/json, text/plain, */*'
        }
      }).then(function(res){
        if(res.status == 200){
          window.location.reload();
        }
      });

    }

  },

  computed:{
    fenyelist(){
      return this.usedata.slice( (this.curentpage-1)*this.pagesize, this.curentpage*this.pagesize )
    },

  },
  filters: {
    changeState: function(value){
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
    // height:calc( 100% - 50px);
    border-top:1px solid #043A5F;
    border-left:1px solid #043A5F;
    border-right:1px solid #043A5F;
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
      .top_wrap{
        border-bottom: 1px dashed #043A5F;
        margin-bottom: 20px;
        padding-bottom: 20px;
        // height:25%;
        .con_line{
          width:100%;
          height:45px;
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
              p{
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #fff;
                letter-spacing: 0.88px;
              }
            }
            .select_time{
              display:inline-block;
              vertical-align: center;
              p{
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #6C7B96;
                letter-spacing: 0.88px;
                color: #fff;
              }
            }
          }
        }
        .show_upload{
          .show_list{
            display: inline-block;
            color:#fff;
            margin-right:15px;
            margin-top: 10px;
            .list_name{
              display: inline-block;
              padding: 5px 10px;
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #0167FF;
              letter-spacing: 0.88px;
              background: rgba(35, 62, 106,0.44);
              border-radius: 2px;
              margin-bottom: 1px;
              margin-right: 1px;
            }
            .list_close{
              cursor: pointer;
            }
          }
        }

        .files_upload{
          margin-top: 20px;
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


      .table_con{
        margin-top:10px;
        // height:55%;
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
    .lzxx_wrap{
      width:100%;
      height:28px;
      margin-bottom:20px;
      position:relative;
      p{
        position:absolute;
        left:0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #73829E;
        letter-spacing: 1.4px;
        font-weight: 400;
      }
      .add_btn{
        position:absolute;
        right:0;
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
  ::v-deep{
    .layui-layer-page{

      .layui-layer-title{
        background-color: #102946;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 1.4px;
        font-weight: 400;
        border: 1px solid #043A5F;
        border-radius:0;
      }

      .layui-layer-content{
        background-color: rgb(11,31,55);
        border: 1px solid #043A5F;
        border-top:none;
        .moduleclass{
          padding:0 40px;
          .con_list{
            margin-top:10px;
            .select_wrap{
              display:inline-block;
              vertical-align: top;
              margin-top:15px;
              .select_title{
                display:inline-block;
                width:85px;
                vertical-align: center;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #6C7B96;
                letter-spacing: 0.88px;
              }
              .select_con{
                width:150px;
                display:inline-block;
                vertical-align: center;
                // .selectpro{
                //   .el-input__inner{
                //     overflow: hidden;
                //     white-space: nowrap;
                //     text-overflow: ellipsis;
                //   }
                // }

                .el-input__inner{
                  height:30px;
                  line-height:30px;
                  background: #152942;
                  border: 1px solid #374766;
                  font-size:12px;
                  padding:0 0 0 5px;
                  color:#fff;
                }
                // 下拉框
                .el-select--medium{
                  width:150px;
                }
                .el-input__suffix{
                  top:3px;
                  // right:-25px;
                }

              }

              .select_time{
                width:150px;
                display:inline-block;
                vertical-align: center;
                // ::v-deep{
                  .el-input{
                    width:150px;
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
                // }
              }
            }

            .sub_btn{
              margin-top:40px;
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
      .layui-layer-setwin{
        .layui-layer-ico{
          background: url("~@/assets/close.svg") no-repeat;
        }
      }


    }
  }



}
</style>

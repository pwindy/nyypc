<template>
	<div class="app-container">
		<img class="back_icon" @click="goback()" src="~@/assets/back.svg" alt="">
		<div class="container_wrap">

		<div class="con_tit">
			编辑项目
		</div>

		<div class="table_wrap">

			<div class="moduleclass">

			<div class="con_list">
				<div class="select_wrap">
					<div class="select_title">项目名称：</div>
					<div class="select_con">
						<el-input v-model="projectNameCN" placeholder="请输入设备名称"></el-input>
					</div>
				</div>

				<div class="select_wrap">
					<div class="select_title">项目状态：</div>
					<div class="select_con">
						<el-select v-model="status" placeholder="请选择项目状态" class="selectpro">
						<el-option v-for="(item, index) in statelist" :key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</div>


				<div class="select_wrap ">
					<div class="select_title">项目设备：</div>
					<div class="select_con">
						<span class="devicesspan" v-for="(item, index) in projectdevicesNAME" :key="index">{{ item }}</span>
            <p class="devices_btn" @click="changedevices()">点击编辑项目设备</p>
					</div>
				</div>

				<div class="select_wrap ">
					<div class="select_title">项目成员：</div>
					<div class="select_con">
            <span class="devicesspan" v-for="(item, index) in projectnumbersNAME" :key="index">{{ item }}</span>
            <p class="devices_btn" @click="changemembers()">点击编辑项目人员</p>
					</div>
				</div>



				<div class="select_wrap ">
					<div class="select_title tit_produce">项目简介：</div>
					<div class="select_con con_produce">
						<el-input type="textarea" v-model="description" placeholder="请输入文字"></el-input>
					</div>
				</div>

				<div class="sub_btn">
				<el-button class="checkdata" type="primary" @click="sub_edit()">确 定</el-button>
				</div>
			</div>

			</div><!-- popup结束 -->

		</div><!-- table_wrap结束 -->

		</div><!-- container_wrap结束 -->

    <div class="layouts" v-show="devicesmodel">
        <div class="layoutsMain">
            <div class="title">添加设备</div>
            <div class="main-wrapper">
                <div class="checkbox_devices checkboxwrapper">
                </div>
            </div>
            <div class="btn-wrapper">
                <span class="a-btn-01" @click="forsuredevices()" style="font-size: 12px;">确定</span>
                <span class="a-btn-02" @click="devicesmodel = false" style="font-size: 12px;">取消</span>
            </div>
        </div>
    </div>

    <div class="layouts" v-show="numbersmodel">
        <div class="layoutsMain">
            <div class="title">添加人员</div>
            <div class="main-wrapper">
                <div class="checkbox_numbers checkboxwrapper">
                </div>
            </div>
            <div class="btn-wrapper">
                <span class="a-btn-01" @click="forsurenumbers()" style="font-size: 12px;">确定</span>
                <span class="a-btn-02" @click="numbersmodel = false" style="font-size: 12px;">取消</span>
            </div>
        </div>
    </div>

	</div>

</template>

<script>
import store from '@/store'
import axios from 'axios'  //引入axios

// getProjectInfoByID 项目编辑
// getProjectEditDevice 项目编辑-编辑设备
// getProjectMemberListByProjectId 项目编辑-获取项目成员
// getUserProject 项目成员
// projectInfoUpdate 项目编辑-提交
import { getProjectInfoByID, getProjectEditDevice, getProjectMemberListByProjectId, getUserProject, projectInfoUpdate } from '@/api/asset.js'
import { log } from 'util';

export default {
	name: 'ProjectEdit',
	data() {
		return {
      projectid: this.$route.query.id,
      editbackdata: {},

      projectNameCN: '',     //项目名称
      description : '',    //项目简介

      status:'',          //项目状态
      statelist: [      //状态列表
        '运行中',
        '通信异常',
        '已完成'
      ],
      projectnumbersNormalNAME: [], // 原始获取到的项目人员名称
      projectnumbersNormalID: [], // 原始获取到的项目人员id
      projectnumbersNAME: [],   //项目人员名称
      projectnumbersID: [],     //项目人员id
      numbersmodel: false,      //添加人员弹框

      projectdevicesNAME: [],   //项目设备名称
      projectdevicesID: [],   //项目设备id
      devicesmodel: false,    // 添加设备弹框

		}
	},
	mounted (){
		let _this = this;
		_this.$nextTick( ()=> {

      // 获取该项目的信息
			getProjectInfoByID(_this.projectid).then((res)=>{
				if(res.success){
          let data = res.result;

          _this.editbackdata = res.result;
					_this.projectNameCN = data.projectNameCN;   //项目名称
          _this.description = data.description;       //项目简介
					_this.status = data.status;                 //选中状态


          if(data.projectDeviceName){
            _this.projectdevicesNAME = data.projectDeviceName.split(",");   //项目设备名称 = data.projectDeviceName.split(",");   //项目设备名称
          }else{
            _this.projectdevicesNAME = [];
          }

          if(data.projectdevicesID){
            _this.projectdevicesID = data.projectDevice.split(",");   //项目设备id
          }else{
            _this.projectdevicesID = [];
          }



				}
			});

      // 获取该项目的项目人员
      getProjectMemberListByProjectId(_this.projectid).then((res)=>{
				if(res.success){

					let data = res.result;
					for(var j=0;j<data.length;j++){
            _this.projectnumbersNormalNAME.push(data[j].userName);
            _this.projectnumbersNormalID.push(data[j].userID);
            _this.projectnumbersNAME.push(data[j].userName);
            _this.projectnumbersID.push(data[j].userID);
          }
				}
      })

		});
	},
	methods: {
		// 返回按键
		goback(){
      this.$router.push({ path: '/asset/project-manage' });
		},

    // 编辑设备
    changedevices(){
			getProjectEditDevice(this.projectid).then((res)=>{
        this.devicesmodel = true;

        if(res.success){
          var checkboxWrap = [],_data = res.result;
          for (var j = 0; j < _data.length; j++) {
              var flag = this.projectdevicesNAME.indexOf(_data[j].groupName) > -1; //精华
              checkboxWrap.push('<label><input style="width:12px;height:12px;border:1px solid rgba(1,103,255,0.3);background:transparent;color:#0167FF;margin-left: 5px;" type="checkbox" ' + (flag ? "checked" : null) + ' name="' + _data[j].groupName + '" value="' + _data[j].deviceID + '"/><span style="font-family: MicrosoftYaHei;font-size: 14px;color: #6C7B96;letter-spacing: 0.88px;font-weight: 400;">' + _data[j].groupName + '</span></label>')
          }
          $('.checkbox_devices').html(checkboxWrap.join(""));
        }

			})
    },

    // 编辑设备弹框---确定按钮
    forsuredevices(){
      var $checkedID = $('.checkbox_devices input[type=checkbox]:checked');
      this.projectdevicesID = [];
      this.projectdevicesNAME = [];
      var thelength = $checkedID.length;
      for (var i = 0; i < thelength; i++) {
        this.projectdevicesID.push( $checkedID.eq(i).val() );
        this.projectdevicesNAME.push( $checkedID.eq(i).attr('name') );
      }
      this.devicesmodel = false;
    },

    // 编辑项目人员
    changemembers(){
      getUserProject().then((res)=>{
        this.numbersmodel = true;

        if(res.success){
          var checkboxWrap = [],_data = res.result;
          for (var j = 0; j < _data.length; j++) {
              var flag = this.projectnumbersNAME.indexOf(_data[j].userName) > -1; //精华
              checkboxWrap.push('<label><input style="width:12px;height:12px;border:1px solid rgba(1,103,255,0.3);background:transparent;color:#0167FF;margin-left: 5px;" type="checkbox" ' + (flag ? "checked" : null) + ' name="' + _data[j].userName + '" value="' + _data[j].userID + '"/><span style="font-family: MicrosoftYaHei;font-size: 14px;color: #6C7B96;letter-spacing: 0.88px;font-weight: 400;">' + _data[j].userName + '</span></label>')
          }
          $('.checkbox_numbers').html(checkboxWrap.join(""));
        }

      })
    },

    // 编辑项目人员弹框---确定按钮
    forsurenumbers(){
      var $checkedID = $('.checkbox_numbers input[type=checkbox]:checked');
      this.projectnumbersID = [];
      this.projectnumbersNAME = [];
      for (var i = 0; i < $checkedID.length; i++) {
        this.projectnumbersID.push( $checkedID.eq(i).val() );
        this.projectnumbersNAME.push( $checkedID.eq(i).attr('name') );
      }
      this.projectnumbersID = this.projectnumbersID.concat( this.projectnumbersNormalID );
      this.projectnumbersNAME = this.projectnumbersNAME.concat( this.projectnumbersNormalNAME );
      this.numbersmodel = false;
    },


    // 编辑项目-提交
    sub_edit(){

      // 项目名称验证
      if(!this.projectNameCN){
        layer.msg('请输入项目名称', {
          icon: 2,
          time: 1000 //1秒关闭（如果不配置，默认是3秒）
        });
        return;
      }

      // 项目状态验证
      if(!this.status){
        layer.msg('请选择项目状态', {
          icon: 2,
          time: 1000 //1秒关闭（如果不配置，默认是3秒）
        });
        return;
      }

      // 项目设备验证
      if(this.projectdevicesID.length == 0){
        layer.msg('请添加项目设备', {
            icon: 2,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
        });
        return;
      }

      let projectInfo = {
        id: this.editbackdata.id,
        projectNameCN: this.projectNameCN,                      //项目名称
        description: this.description,                          //项目简介
        status: this.status,                                    //项目状态
        personNum: this.editbackdata.personNum,                 //项目人数
        managerName: this.projectnumbersID.toString(),          //项目成员
        longitude: this.editbackdata.longitude,                 //经度
        latitude: this.editbackdata.latitude,                   //纬度
        province: this.editbackdata.province,                   //所在省份
        city: this.editbackdata.city,                           //所在城市
        creatTime: this.editbackdata.creatTime,                 //创立时间
        updataTime: this.editbackdata.updataTime,               //更新时间
        endTime: this.editbackdata.endTime,                     //结束时间
        maxAlarmPhone: this.editbackdata.maxAlarmPhone,         //三级告警短信通知号码
        alarmPhone: this.editbackdata.alarmPhone,               //告警短信通知号码
        projectRemark: this.editbackdata.projectRemark,         //项目备注
        projectDevice: this.projectdevicesID.toString(),        //项目设备 DeviceID 字符串
        projectDeviceName: this.projectdevicesNAME.toString(),  //项目设备名称 字符串
        remark1: this.editbackdata.remark1,                     //备注1
        remark2: this.editbackdata.remark2,                     //备注2
        remark3: this.editbackdata.remark3,                     //备注3

      }

      projectInfoUpdate(projectInfo).then((res)=>{
        if(res.success){

          layer.msg('提交成功', {
            icon: 1,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
          });

          this.$router.push({ path: '/asset/project-manage' });
        }
      });

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
				.moduleclass{
					padding:0 40px;
					.con_list{
						margin-top:10px;
						.select_wrap{
							margin-top:40px;
							.select_title{
								display:inline-block;
								width:85px;
								vertical-align: center;
								font-family: MicrosoftYaHei;
								font-size: 14px;
								color: #73829E;
								letter-spacing: 1.4px;
								font-weight: 400;
							}

							.select_con{
								// width:150px;
								display:inline-block;
								::v-deep{
									.el-input--medium{
										.el-input__inner{
											width: 300px;
											height: 30px;
											line-height: 30px;
											background: #152942;
											border: 1px solid #374766;
											font-size: 12px;
											padding:0 0 0 5px;
											color:#fff;
											border-radius: 0;
										}
										.el-textarea__inner{
											width: 388px;
											height: 80px;
											background: #152942;
											border: 1px solid #374766;
											font-size:12px;
											color:#fff;
											border-radius: 0;
										}
										.el-textarea__inner::-webkit-input-placeholder{
											font-family: MicrosoftYaHei;
											font-size: 14px;
											color: #3E4C66;
											letter-spacing: 1.4px;
											font-weight: 400;
										}
										.el-textarea__inner::-webkit-input-placeholder{
											font-family: MicrosoftYaHei;
											font-size: 14px;
											color: #3E4C66;
											letter-spacing: 1.4px;
											font-weight: 400;
										}
										.el-textarea__inner::-webkit-input-placeholder{
											font-family: MicrosoftYaHei;
											font-size: 14px;
											color: #3E4C66;
											letter-spacing: 1.4px;
											font-weight: 400;
										}
										.el-textarea__inner::-webkit-input-placeholder{
											font-family: MicrosoftYaHei;
											font-size: 14px;
											color: #3E4C66;
											letter-spacing: 1.4px;
											font-weight: 400;
										}
									}
								}
								.devicesspan{
                  display: inline-block;
                  padding: 5px 10px;
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #FFFFFF;
                  letter-spacing: 0.88px;
                  font-weight: 400;
								}
                .devices_btn{
                  display: inline-block;
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #0066FF;
                  letter-spacing: 0.88px;
                  font-weight: 400;
                  text-decoration: underline;
                  cursor: pointer;
                }
							}

							.tit_produce{
								vertical-align: top;
							}
						}

						.sub_btn{
							margin-top:60px;
							margin-left: 85px;
							.checkdata{
								display:inline-block;
								width: 80px;
								height: 30px;
								line-height: 30px;
								text-align: center;
								font-family: MicrosoftYaHei;
								font-size: 14px;
								padding: 0;
								color: #fff;
								background: #0066FF;
								border-radius: 2px;
								letter-spacing: 0.88px;
								cursor:pointer;
							}
						}
					}
				}
			}
		}

    .layouts{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .4);
      .layoutsMain{
        width: 610px;
        height: 250px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        background: #0B1F37;
        border: 1px solid #043A5F;
        box-shadow: 0 0 15px 0 rgba(24,36,53,0.80);
        .title{
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-indent: 20px;
          border-bottom: 1px solid #043A5F;
          background: #102946;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 1.4px;
          font-weight: 400;
        }

        .main-wrapper {
          height: 140px;
          overflow-y: auto;
          .checkboxwrapper {
            text-align: center;
            padding: 15px 20px;
            label{
              width: auto;
              height: auto;
              font-size: 12px;
              min-width: 68px;
              display: inline-block;
              cursor: pointer;
              margin-bottom: 5px;
            }
          }
        }
        .btn-wrapper {
            text-align: center;
            height: 60px;
            span{
              display: inline-block;
              width: 80px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border-radius: 2px;
              font-family: MicrosoftYaHei;
              font-size: 12px;
              letter-spacing: 0.88px;
              font-weight: 400;
              margin-top: 15px;
              cursor: pointer;

              &:first-child{
                color: #fff;
                background: #0066FF;
                margin-right: 10px;
              }
              &:last-child{
                color: #666;
                background: #f1f1f1
              }
            }
        }

      }
    }

	}
</style>

<template>
	<div class="app-container">

		<img class="back_icon" @click="goback()" src="~@/assets/back.svg" alt="">
		<div class="container_wrap">

      <div class="con_tit">
        编辑设备组
      </div>

      <div class="table_wrap">

        <div class="moduleclass">

          <div class="con_list">
            <div class="select_wrap">
              <div class="calssify_div">
                <div class="select_title">设备组名称：</div>
                <div class="select_con">
                  <el-input v-model="groupName" placeholder="请输入设备组名称"></el-input>
                </div>
              </div>
            </div>

            <div class="select_wrap">
              <div class="calssify_div">
                <div class="select_title">设备组编号：</div>
                <div class="select_con">
                  <el-input v-model="deviceID" placeholder="请输入设备组编号"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title" style="width:130px;">设备组所在项目：</div>
                <div class="select_con" style="color: #fff;font-size: 12px;">
                  <!-- <el-input v-model="projectName" placeholder="请输入设备组所在项目" readonly></el-input> -->
                  {{projectName}}
                </div>
              </div>
            </div>



            <div class="select_wrap" style="margin-top: 40px;">
              <h4>EMS</h4>
              <div class="calssify_div">
                <div class="select_title">EMS名称：</div>
                <div class="select_con">
                  <el-input v-model="ems_devCN" placeholder="请输入名称" id="name_0"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title" style="width: 90px;">设备编号：</div>
                <div class="select_con">
                  <el-input v-model="ems_remark1" placeholder="请输入设备编号" id="number_0"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备协议标识：</div>
                <div class="select_con">
                  <el-input v-model="ems_remark2" placeholder="请输入设备协议标识" id="remark_0"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备缓存标识：</div>
                <div class="select_con">
                  <el-input v-model="ems_describe" placeholder="请输入设备缓存标识" id="cache_0"></el-input>
                </div>
              </div>
            </div>

            <div class="select_wrap">
              <h4>柴油机</h4>
              <div class="calssify_div">
                <div class="select_title">柴油机名称：</div>
                <div class="select_con">
                  <el-input v-model="cyj_devCN" placeholder="请输入名称" id="name_1"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title" style="width: 90px;">设备编号：</div>
                <div class="select_con">
                  <el-input v-model="cyj_remark1" placeholder="请输入设备编号" id="number_1"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备协议标识：</div>
                <div class="select_con">
                  <el-input v-model="cyj_remark2" placeholder="请输入设备协议标识" id="remark_1"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备缓存标识：</div>
                <div class="select_con">
                  <el-input v-model="cyj_describe" placeholder="请输入设备缓存标识" id="cache_1"></el-input>
                </div>
              </div>
            </div>

            <div class="select_wrap">
              <h4>PCS</h4>
              <div class="calssify_div">
                <div class="select_title">PCS名称：</div>
                <div class="select_con">
                  <el-input v-model="pcs_devCN" placeholder="请输入名称" id="name_2"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title" style="width: 90px;">设备编号：</div>
                <div class="select_con">
                  <el-input v-model="pcs_remark1" placeholder="请输入设备编号" id="number_2"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备协议标识：</div>
                <div class="select_con">
                  <el-input v-model="pcs_remark2" placeholder="请输入设备协议标识" id="remark_2"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备缓存标识：</div>
                <div class="select_con">
                  <el-input v-model="pcs_describe" placeholder="请输入设备缓存标识" id="cache_2"></el-input>
                </div>
              </div>
            </div>

            <div class="select_wrap">
              <h4>BMS</h4>
              <div class="calssify_div">
                <div class="select_title">BMS名称：</div>
                <div class="select_con">
                  <el-input v-model="bms_devCN" placeholder="请输入名称" id="name_3"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title" style="width: 90px;">设备编号：</div>
                <div class="select_con">
                  <el-input v-model="bms_remark1" placeholder="请输入设备编号" id="number_3"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备协议标识：</div>
                <div class="select_con">
                  <el-input v-model="bms_remark2" placeholder="请输入设备协议标识" id="remark_3"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备缓存标识：</div>
                <div class="select_con">
                  <el-input v-model="bms_describe" placeholder="请输入设备缓存标识" id="cache_3"></el-input>
                </div>
              </div>
            </div>

            <div class="select_wrap">
              <h4>电表</h4>
              <div class="calssify_div">
                <div class="select_title">电表名称：</div>
                <div class="select_con">
                  <el-input v-model="db_devCN" placeholder="请输入名称" id="name_4"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title" style="width: 90px;">设备编号：</div>
                <div class="select_con">
                  <el-input v-model="db_remark1" placeholder="请输入设备编号" id="number_4"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备协议标识：</div>
                <div class="select_con">
                  <el-input v-model="db_remark2" placeholder="请输入设备协议标识" id="remark_4"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备缓存标识：</div>
                <div class="select_con">
                  <el-input v-model="db_describe" placeholder="请输入设备缓存标识" id="cache_4"></el-input>
                </div>
              </div>
            </div>

            <div class="select_wrap">
              <h4>控制器</h4>
              <div class="calssify_div">
                <div class="select_title">控制器名称：</div>
                <div class="select_con">
                  <el-input v-model="control_devCN" placeholder="请输入名称" id="name_5"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title" style="width: 90px;">设备编号：</div>
                <div class="select_con">
                  <el-input v-model="control_remark1" placeholder="请输入设备编号" id="number_5"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备协议标识：</div>
                <div class="select_con">
                  <el-input v-model="control_remark2" placeholder="请输入设备协议标识" id="remark_5"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备缓存标识：</div>
                <div class="select_con">
                  <el-input v-model="control_describe" placeholder="请输入设备缓存标识" id="cache_5"></el-input>
                </div>
              </div>
            </div>



<!--
            <div class="select_wrap" v-show="devicevideo.length"  v-for="(v_item, v_index) in devicevideo" :key="v_index">
              <h4>录像机</h4>
              <div class="calssify_div">
                <div class="select_title">录像机名称：</div>
                <div class="select_con">
                  <el-input v-model="v_item.devCN" placeholder="请输入录像机名称" :id="'v_name_'+ v_index"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title" style="width: 90px;">设备编号：</div>
                <div class="select_con">
                  <el-input v-model="v_item.remark1" placeholder="请输入设备编号" :id="'v_num_'+ v_index"></el-input>
                </div>
              </div>
              <div class="calssify_div">
                <div class="select_title">设备协议标识：</div>
                <div class="select_con">
                  <el-input v-model="v_item.remark2" placeholder="请输入设备协议标识" :id="'v_remark_'+ v_index"></el-input>
                </div>
              </div>
            </div> -->

            <div class="sub_btn">
              <el-button class="checkdata" type="primary" @click="sub_edit()">{{sub_btn}}</el-button>
            </div>

          </div>

        </div><!-- popup结束 -->

      </div><!-- table_wrap结束 -->

		</div><!-- container_wrap结束 -->

	</div>
</template>

<script>
import store from '@/store'

// getDeviceGroupByGroupID 根据设备组ID获取数据
// deviceGroupUpdate 编辑设备组-提交数据
import { getDeviceGroupByGroupID, deviceGroupUpdate } from '@/api/asset.js'
import { log } from 'util';

export default {
	name: 'DevicesEdit',
	data() {
		return {
      sub_btn:'确 定',
      groupName: '',         //设备组名称
      deviceID : '',         //设备组编号
      projectName: '',       //设备组所在项目

      resultdata: {},

      // ems
      ems_devCN: '',
      ems_remark1: '',
      ems_remark2: '',
      ems_describe: '',

      // cyj
      cyj_devCN: '',
      cyj_remark1: '',
      cyj_remark2: '',
      cyj_describe: '',

      // pcs
      pcs_devCN: '',
      pcs_remark1: '',
      pcs_remark2: '',
      pcs_describe: '',

      // bms
      bms_devCN: '',
      bms_remark1: '',
      bms_remark2: '',
      bms_describe: '',

      // 电表
      db_devCN: '',
      db_remark1: '',
      db_remark2: '',
      db_describe: '',

      // 控制器
      control_devCN: '',
      control_remark1: '',
      control_remark2: '',
      control_describe: '',


      devicemain: [],        //设备组前6个设备列表
      // devicevideo: []        //设备组最后一个录音机
		}
	},
	mounted (){
		let _this = this;
		_this.$nextTick( ()=> {

      // 获取该设备组的信息
			getDeviceGroupByGroupID(_this.$route.query.id).then((res)=>{
				if(res.success){

          let data = res.result;
          _this.groupName = data.groupName ? data.groupName: '无';               //设备组名称
          _this.deviceID = data.deviceID;                                        //设备组编号
          _this.projectName = data.projectName;                                  //设备组所在项目

          // console.log(data.deviceInfoList.length);
          _this.resultdata = res.result;
          if(data.deviceInfoList.length){

            _this.devicemain = data.deviceInfoList.slice(0,6);

            _this.ems_devCN = _this.devicemain[0].devCN;
            _this.ems_remark1 = _this.devicemain[0].remark1;
            _this.ems_remark2 = _this.devicemain[0].remark2;
            _this.ems_describe = _this.devicemain[0].describe;

            _this.cyj_devCN = _this.devicemain[1].devCN;
            _this.cyj_remark1 = _this.devicemain[1].remark1;
            _this.cyj_remark2 = _this.devicemain[1].remark2;
            _this.cyj_describe = _this.devicemain[1].describe;

            _this.pcs_devCN = _this.devicemain[2].devCN;
            _this.pcs_remark1 = _this.devicemain[2].remark1;
            _this.pcs_remark2 = _this.devicemain[2].remark2;
            _this.pcs_describe = _this.devicemain[2].describe;

            _this.bms_devCN = _this.devicemain[3].devCN;
            _this.bms_remark1 = _this.devicemain[3].remark1;
            _this.bms_remark2 = _this.devicemain[3].remark2;
            _this.bms_describe = _this.devicemain[3].describe;

            _this.db_devCN = _this.devicemain[4].devCN;
            _this.db_remark1 = _this.devicemain[4].remark1;
            _this.db_remark2 = _this.devicemain[4].remark2;
            _this.db_describe = _this.devicemain[4].describe;

            _this.control_devCN = _this.devicemain[5].devCN;
            _this.control_remark1 = _this.devicemain[5].remark1;
            _this.control_remark2 = _this.devicemain[5].remark2;
            _this.control_describe = _this.devicemain[5].describe;

          }



				}
			});


		});
	},
	methods: {
		// 返回按键
		goback(){
      this.$router.push({ path: '/asset/devices-manage' });
		},


    // 编辑设备组-提交
    sub_edit(){

      for(var i=0;i<6;i++){
        if(!$("#name_" +i ).val()){
          layer.msg('请输入设备名称', {
            icon: 2,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
          });
          return;
        }

        if(!$("#number_" +i ).val()){
          layer.msg('请输入设备编号', {
            icon: 2,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
          });
          return;
        }

        if(!$("#remark_" +i ).val()){
          layer.msg('请输入设备协议标识', {
            icon: 2,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
          });
          return;
        }

        if(!$("#cache_" +i ).val()){
          layer.msg('请输入设备缓存标识', {
            icon: 2,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
          });
          return;
        }
      }


      var thedeviceInfoList = [];
      if(this.devicemain.length){
        for(var j=0;j<6;j++){
          var objlist = {};
          objlist.id = this.devicemain[j].id;                                //id
          objlist.deviceTypeid = this.devicemain[j].deviceTypeid;            //类型id
          objlist.typeName = this.devicemain[j].typeName;                    //类型名称
          objlist.devCN = $("#name_" + j ).val();                            //设备名称
          objlist.deviceMark = this.devicemain[j].deviceMark;                //设备标志(录像机标识)
          objlist.devicestate = this.devicemain[j].devicestate;              //设备状态
          objlist.describe = $("#cache_" + j ).val();                        //设备描述(设备缓存标识)
          objlist.deviceproject = this.devicemain[j].deviceproject;          //所属项目
          objlist.deviceprojectid = this.devicemain[j].deviceprojectid;      //所属项目id
          objlist.creatTime = this.devicemain[j].creatTime;                  //入库时间
          objlist.updataTime = this.devicemain[j].updataTime;                //更新时间
          objlist.endTime = this.devicemain[j].endTime;                      //报废时间
          objlist.isalarmdev = this.devicemain[j].isalarmdev;                //是否告警 0不报1报(默认填0)
          objlist.remark1 = $("#number_" + j ).val();                        //备注1(设备编号)
          objlist.remark2 = $("#remark_" + j ).val();                        //备注2(设备协议标识)
          objlist.remark3 = this.devicemain[j].remark3;                      //备注3
          thedeviceInfoList.push(objlist);
        }

        var deviceGroupinfo = {
          groupName : this.groupName,                             //设备组名称
          deviceID : this.deviceID,                               //设备组编号
          projectName : this.resultdata.projectName,              //设备组所在项目名称
          id: this.resultdata.id,                                 //id
          projectID : this.resultdata.projectID,                  //所属项目id
          deviceInfoList : thedeviceInfoList,                        //所属设备列表
        }

      }else {

        for(var j=0;j<6;j++){
          var objlist = {};
          if(j==0){ objlist.deviceTypeid = 16;}
          else if(j==1){ objlist.deviceTypeid = 4;}
          else if(j==2){ objlist.deviceTypeid = 1;}
          else if(j==3){ objlist.deviceTypeid = 2;}
          else if(j==4){ objlist.deviceTypeid = 9;}
          else if(j==5){ objlist.deviceTypeid = 5;}
          else if(j==5){ objlist.deviceTypeid = 5;}                          //类型id

          // objlist.typeName = '';                                             //类型名称
          objlist.devCN = $("#name_" + j ).val();                            //设备名称
          // objlist.deviceMark = '';                                           //设备标志(录像机标识)
          // objlist.devicestate ='';                                           //设备状态
          objlist.describe = $("#cache_" + j ).val();                        //设备描述(设备缓存标识)
          // objlist.deviceproject = '';                                        //所属项目
          objlist.deviceprojectid = 0;                                      //所属项目id
          // objlist.creatTime = '';                                            //入库时间
          // objlist.updataTime = '';                                           //更新时间
          // objlist.endTime = '';                                              //报废时间
          objlist.isalarmdev = 0;                                            //是否告警 0不报1报(默认填0)
          objlist.remark1 = $("#number_" + j ).val();                        //备注1(设备编号)
          objlist.remark2 = $("#remark_" + j ).val();                        //备注2(设备协议标识)
          // objlist.remark3 = '';                                              //备注3
          // objlist.id = 0;

          thedeviceInfoList.push(objlist);
        }

        var deviceGroupinfo = {
          groupName : this.groupName,                             //设备组名称
          deviceID : this.deviceID,                               //设备组编号
          projectName : this.resultdata.projectName,              //设备组所在项目名称
          projectID : 0,                  //所属项目id
          deviceInfoList : thedeviceInfoList,                     //所属设备列表
          id : this.resultdata.id,                                //id
        }

      }

      this.sub_btn = '正在提交...'
      deviceGroupUpdate(deviceGroupinfo).then((res)=>{
        if(res.success){
          layer.msg('提交成功', {
            icon: 1,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
          });

          this.$router.push({ path: '/asset/devices-manage' });
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
				padding:10px 40px 0;
				position:relative;
				.moduleclass{
					padding:0 40px;
					.con_list{
						.select_wrap{
							margin-top:20px;
              h4{
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 1.4px;
                font-weight: 400;
                margin: 10px 0 5px 0;
              }
              .calssify_div{
                display:inline-block;
                margin-right: 40px;
                &:last-child{
                  margin-right: 0;
                }
                .select_title{
                  display:inline-block;
                  width: 110px;
                  vertical-align: center;
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #73829E;
                  letter-spacing: 1.4px;
                  font-weight: 400;
                }

                .select_con{
                  display:inline-block;
                  ::v-deep{
                    .el-input--medium{
                      .el-input__inner{
                        width: 200px;
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
              }
						}

						.sub_btn{
							margin-top:40px;
							margin-left: 110px;
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

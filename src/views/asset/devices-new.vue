<template>
	<div class="app-container">
		<img class="back_icon" @click="goback()" src="~@/assets/back.svg" alt="">
		<div class="container_wrap">

		<div class="con_tit">
			添加设备组
		</div>

		<div class="table_wrap">

			<div class="moduleclass">

			<div class="con_list">
				<div class="select_wrap">
					<div class="select_title">设备组名称：</div>
					<div class="select_con">
						<el-input v-model="groupName" placeholder="请输入设备组名称"></el-input>
					</div>
				</div>

        <div class="select_wrap">
					<div class="select_title">设备组编号：</div>
					<div class="select_con">
						<el-input v-model="deviceID" placeholder="请输入设备组编号" type="number"></el-input>
					</div>
				</div>



				<div class="sub_btn">
				<el-button class="checkdata" type="primary" @click="sub_new()">确 定</el-button>
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


// creatDeviceGroup 新建设备组-提交
import { creatDeviceGroup } from '@/api/asset.js'

export default {
	name: 'DevicesNew',
	data() {
		return {
      groupName: '',     //设备组名称
      deviceID : ''      //设备组编号
		}
	},
	methods: {
		// 返回按键
		goback(){
      this.$router.push({ path: '/asset/devices-manage' });
		},


    // 新增项目组-提交
    sub_new(){

      // 设备组名称验证
      if(!this.groupName){
        layer.msg('请输入设备组名称', {
          icon: 2,
          time: 1000 //1秒关闭（如果不配置，默认是3秒）
        });
        return;
      }

      // 设备组编号验证
      if(!this.deviceID){
        layer.msg('请选择设备组编号', {
          icon: 2,
          time: 1000 //1秒关闭（如果不配置，默认是3秒）
        });
        return;
      }

      let deviceGroupinfo = {
        // id:1,
        groupName: this.groupName,                      //设备组名称
        deviceID: Number(this.deviceID),                //设备组编号
        projectID: 0                                    //项目id
      }

      creatDeviceGroup(deviceGroupinfo).then((res)=>{
        if(res.success){
          layer.msg('提交成功', {
            icon: 1,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
          });

          this.$router.push({ path: `/asset/devices-edit`, query:{ id: res.result} });//此处传设备组ID
          // this.$router.push({ path: '/asset/devices-manage' });
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
								width:100px;
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
							margin-left: 100px;
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

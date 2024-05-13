<template>
  <div class="app-container">
    <div class="container_wrap">
      <div class="con_tit">视频监控</div>
      <div class="video_wrap">
          <div class="selectpart">


            <div class="project_select"  style="margin-right:20px;">
              <el-select v-model="projectselect" placeholder="请选择项目"  @change="changeProject($event)">
                <el-option v-for="item in projectoptions" :key="item.key" :label="item.label" :value="item"></el-option>
              </el-select>
            </div>

          </div>
          <div id="showvideo">
            <div>
                <iframe :src="iframsrc1" width="100%" height="100%" id="ysOpenDevice1" allowfullscreen> </iframe>

            </div>
            <div>
                <iframe :src="iframsrc2" width="100%" height="100%" id="ysOpenDevice2" allowfullscreen> </iframe>
            </div>

            <div>
                <iframe :src="iframsrc3" width="100%" height="100%" id="ysOpenDevice3" allowfullscreen> </iframe>

            </div>
            <div>
                <iframe :src="iframsrc4" width="100%" height="100%" id="ysOpenDevice4" allowfullscreen> </iframe>
            </div>

          </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { getuserId } from '@/utils/auth';
import { log } from 'util';
export default {
  name: 'VideoMonitor',
  data() {
    return {
      projectoptions: [
        // { value: 'C96990721', label: '中交二公局深中通S06新500K', num: 4, key: 1 },
        // { value: 'C96990637', label: '中交二航局深中通S04搅拌站', num: 4, key: 2 },
        // { value: 'C42851769', label: '中交二公局深中通S06旧500K', num: 4, key: 3 },
        // { value: 'C96990811', label: '云南中铁十局引水采石场', num: 4, key: 4 },
        // { value: 'D98470105', label: '深中通保利长大s05', num: 4, key: 5 },
        // { value: 'C78005341', label: '中交二航局深中通S04', num: 4, key: 6 },
        // { value: 'E36270788', label: '大桥局黄茅海跨海通道项目中栈桥', num: 4, key: 7 },


        // { value: 'F32813450', label: '保利长大黄茅海项目西塔1号机', num: 4, key: 8 },
        // { value: 'E36270602', label: '云南滇中引水工程项目7#支洞7号机', num: 4, key: 9 },
        // { value: 'E36270574', label: '云南滇中引水工程项目6#支洞9号机', num: 4, key: 10 },
        // { value: 'E36270824', label: '云南滇中引水工程项目6#支洞10号机', num: 4, key: 11 },
        // { value: 'E67434001', label: '中铁隧道局深江铁路13号机', num: 4, key: 12 },
        // { value: 'E67434251', label: '中铁隧道局深江铁路14号机', num: 4, key: 13 },
        // { value: 'E67434071', label: '中铁二十二局广清北延项目15号机', num: 4, key: 14 },
        // { value: 'E67433875', label: '中铁一局广州地铁项目17号机', num: 4, key: 15 },
        // { value: 'E71062506', label: '中铁一局广州地铁项目21号机', num: 4, key: 16 },
        // { value: 'E71062538', label: '中铁隧道局深江铁路22号机', num: 4, key: 17 },
        // { value: 'E67431977', label: '中铁隧道局深江铁路23号机', num: 4, key: 18 },
        // { value: 'E68433043', label: '中交路建黄茅海T3项目25号机', num: 4, key: 19 },
        // { value: 'E71062628', label: '中交路建黄茅海T3项目26号机', num: 4, key: 20 },
        // { value: 'E71062510', label: '中铁隧道局生活区27号机', num: 4, key: 21 },
        // { value: 'E71062750', label: '中铁隧道局深江铁路29号机', num: 4, key: 22 },
        // { value: 'E71062572', label: '中交路建黄茅海T3项目32号机', num: 4, key: 23 },
        // { value: 'E71062570', label: '清远中铁一局广清城际项目38号机', num: 4, key: 24 },
        // { value: 'E71062452', label: '中铁十局广湛七标阳西制梁场39号机', num: 4, key: 25 },
        // { value: 'E71062444', label: '中铁隧道局清远项目40号机', num: 4, key: 26 },

      ],
      // projectselect: { value: 'C96990721', label: '中交二公局深中通S06新500K', num: 4, key: 1 },
      projectselect: { },
      iframsrc1: "",
      iframsrc2: "",
      iframsrc3: "",
      iframsrc4: "",
      accessToken: ""
    }
  },
  created(){
    var _this = this;
    axios.get("http://112.74.169.99:21021/api/services/app/DeviceService/GetVideoDeviceByUserID",{
      params: {
        userid: getuserId()
      }
    })
    .then( function(data){
      if(data.status == 200){
        var arrobj = [];
        var result = data.data.result;
        for(var i=0;i<result.length;i++){
          arrobj.push({'value': result[i].deviceMark, 'label': result[i].deviceproject, 'num': 4,'key': i+1})
        }
        _this.projectoptions = arrobj;

        _this.projectselect = {
          'value': result[0].deviceMark,
          'label': result[0].deviceproject,
          'num': 4,
          'key': 1
        }
      }
    })
  },
  mounted(){
    var _this = this;

    let params = {
        appKey: "5cfbe13c0e5344faa04f3f2b310ca87d",
        appSecret: "f44aaf48af4440695cd675d262c92789"
    }

    _this.$nextTick( () => {

      axios.post("https://open.ys7.com/api/lapp/token/get", qs.stringify(params) ,{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(res){
          if(res.data.code == 200){
            _this.accessToken = res.data.data.accessToken;

            _this.iframsrc1 = "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" + _this.projectselect.value + "/1.live&autoplay=1&audio=1&accessToken=" + _this.accessToken;
            _this.iframsrc2 = "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" + _this.projectselect.value + "/2.live&autoplay=1&audio=1&accessToken=" + _this.accessToken + "&templete=2";
            _this.iframsrc3 = "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" + _this.projectselect.value + "/3.live&autoplay=1&audio=1&accessToken=" + _this.accessToken + "&templete=2";
            _this.iframsrc4 = "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" + _this.projectselect.value + "/4.live&autoplay=1&audio=1&accessToken=" + _this.accessToken + "&templete=2";

          }else{
            //console.log("请求accessToken失败");
          }
      });

    });
  },
  methods:{
    changeProject(projectselect){
      this.iframsrc1 = "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" + this.projectselect.value + "/1.live&autoplay=1&audio=1&accessToken=" + this.accessToken;
      this.iframsrc2 = "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" + this.projectselect.value + "/2.live&autoplay=1&audio=1&accessToken=" + this.accessToken + "&templete=2";
      this.iframsrc3 = "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" + this.projectselect.value + "/3.live&autoplay=1&audio=1&accessToken=" + this.accessToken + "&templete=2";
      this.iframsrc4 = "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/" + this.projectselect.value + "/4.live&autoplay=1&audio=1&accessToken=" + this.accessToken + "&templete=2";


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
    .video_wrap{
      height: calc( 100% - 50px);
      width:100%;
      padding:40px 40px 0;
      position:relative;
      .selectpart{
        width:100%;
        height:40px;
        >div{
          display:inline-block;
          vertical-align: center;
          ::v-deep{
            .el-select{
              width:300px;
              .el-input__inner{
                height:30px;
                line-height:30px;
                background: #152942;
                border: 1px solid #374766;
              }
            }
          }
        }
      }
      #showvideo{
        width:100%;
        height: calc( 100% - 100px);
        margin-top:30px;
        overflow:auto;
        >div{
          width:40%;
          height:400px;
          display:inline-block;
          margin-right:15px;
          margin-bottom:10px;
        }
      }
    }
  }
}
</style>

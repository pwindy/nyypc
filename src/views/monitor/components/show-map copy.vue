<template>
   <div id="allmap" class="baidumap"></div>
</template>

<script>
import { transactionList } from '@/api/remote-search'
import store from '@/store'
import { getProjectInfosByUserid } from '@/api/projectinfos.js'
export default {
  name: 'ShowMap',
  data() {
    return {
      list: null
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.baiduMap()
    },
    baiduMap(){

      let map = new BMap.Map('allmap'); //创建地图实例
      var cspoint = new BMap.Point(110, 25); //创建点坐标
      map.centerAndZoom(cspoint, 6); //初始化地图，设置中心点坐标和地图级别
      map.setMapStyleV2({
        styleId: '4d8923a8addb6564d15a690f4f357429',
      });
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放


      getProjectInfosByUserid(store.getters.userid).then(res =>{
        console.log(res);
        res.result.forEach(element => {
          let point = new BMap.Point(element.longitude, element.latitude); //创建点坐标
          let marker = new BMap.Marker(point); // 创建点
          addClickHandler('content', marker);
          function addClickHandler(content, marker) {

            marker.addEventListener('click', function (e) {
              let page = "/#/" + element.projectRemark + "?projectid=" + element.id;

              var html =
                `<div class="modal" style="background:#2D416E;">
                <div class="title">
                <p style="margin:0 !important;">` + element.projectNameCN +
                `</p></div>
                <a href="` + page + `"><span class="xq">详情</span></a>
                </div>`;
              var p = e.target;
              var points = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
              var infoWindow = new BMap.InfoWindow(html); // 创建信息窗口对象
              map.openInfoWindow(infoWindow, points); //开启信息窗口

              // setTimeout(() => {
              //   var obj = $("#allmap >div:eq(0) >div:eq(1) >div:eq(0)").get(0);
              //   var imgCollection = obj.getElementsByTagName('img');

              //   for (var i = 0; i < imgCollection.length; i++) {
              //     if (imgCollection[i].getAttribute('src') == 'http://api.map.baidu.com/images/iw3.png') {
              //       imgCollection[i].setAttribute('src', '../../../assets/jiantou.svg');
              //     }
              //   }

              // }, 0);

            });
          }
          if (element.status === '运行中') {
            map.addOverlay(marker);
          }

        })


      });
    },
    // beforeunloadFn(e){
    //   e = e || window.event
    //   if (e) {
    //     e.returnValue = '关闭提示'
    //     console.log('e 刷新PanelGroup');
    //   }
    //   window.sessionStorage.setItem('a',1)
    //   return '关闭提示'
    //   console.log('刷新PanelGroup');
    //   this.getData();
    // }
  },
  watch:{
    '$route': function (to, from) {
      this.init()
    }
  }
  // destroyed() {
  //   window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  // }
}
</script>

<style lang="scss" scoped>
#allmap {
  position:absolute;
  top:0;
  left:40px;
  right:40px;
  bottom:24px;
  height:calc(100% - 10px) !important;


  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }


}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>


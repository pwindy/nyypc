<template>
  <div id="app">
     <router-view keep-alive></router-view>
  </div>
</template>

<script>
import $ from '@/jquery.js'
import { setSelect } from '@/utils/auth';
import layer from "layui-layer";
export default {
  name: 'App',
  data () {
    return {
      theselect: -1
    }
  },
  watch:{
    $route:{
      handler(val,oldval){
        if(val.query && val.query.projectid){
          // console.log(val);
          setSelect(val.query.projectid);// 把获取到的项目id保存到cookie里面去
        }
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

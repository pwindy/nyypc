<template>
  <el-select v-model="valueselect" placeholder="请选择项目" @change="changeProject($event)">
    <el-option
      v-for="item in valueoptions"
      :key="item.key"
      :label="item.label"
      :value="item"
      :id="item.key"
      >
    </el-option>
  </el-select>
</template>

<script>
import store from '@/store'
import { getProjectInfosByUserid } from '@/api/projectinfos.js'
import { logger } from 'runjs/lib/common';
import { getSelect, setSelect } from '@/utils/auth';

export default {
  name: 'ProjectSelect',
  data() {
    return {
      valueoptions: [],
      valueselect: {},
      // theselect:getSelect()
    }
  },
  mounted(){
    this.updata()

  },
  methods: {
    updata(){
      var _this = this;
      _this.$nextTick( () => {

        getProjectInfosByUserid(store.getters.userid).then(data => {
          if(data.success == true){
            // console.log(data.result);
            data.result.forEach(el =>{
              if(el.projectRemark != "null" && el.projectRemark != null){
                _this.valueoptions.push({value:el.projectNameCN,label:el.projectNameCN + '(' + el.status + ')',key:el.id,projectRemark:el.projectRemark});
              }
            });

            if( !getSelect() ){
              _this.valueselect = {}
            }else{
              var changselect = JSON.parse(JSON.stringify(_this.valueselect));
              var changoptions = JSON.parse(JSON.stringify(_this.valueoptions));
              if( _this.isEmptyObject(changselect) ){
                for(var i=0;i<changoptions.length;i++){
                  if(changoptions[i].key == getSelect()){
                    _this.valueselect = changoptions[i];
                  }
                }
              }
            }

          }
        });

      });
    },
    changeProject(valueselect){
      this.$router.push({ path: '/'+ valueselect.projectRemark ,query:{projectid:valueselect.key}});
    },
    isEmptyObject(obj) {
    　　for (var key in obj){
    　　　　return false;//返回false，不为空对象
    　　}　　
    　　return true;//返回true，为空对象
    }

  },
  watch:{
    $route(to,from){
      if(to.query.projectid == undefined){
        this.valueselect = {}
      }
    }
  },
}
</script>

<style scoped lang="scss">
.el-select{
  height: 50px;
  line-height: 50px;
}
.el-select{
  ::v-deep {
      input.el-input__inner{
        width:280px;
        height: 30px;
        line-height: 30px;
        border-radius: 100px;
        background: #132A48;
        border: 1px solid #426A9D;
        color: #fff;
      }
      input.el-input__inner::-webkit-input-placeholder {
        color: #426A9D;
      }
      input.el-input__inner::-moz-placeholder {
        color: #426A9D;
      }
      input.el-input__inner:-moz-placeholder {
        color: #426A9D;
      }
      input.el-input__inner:-ms-input-placeholder {
        color: #426A9D;
      }
      span.el-input__suffix{
        top:-3px;
      }
  }
}

.el-select{
  ::v-deep {
      i.el-select__caret{
        color:#3A87E6;
      }
  }
}





</style>

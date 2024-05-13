<template>
  <div class="navbar">
    <!-- 左边伸缩框的图标 -->
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <project-select style="line-height: 50px;"></project-select>



    <!-- 面包屑 -->
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <!-- 右边菜单栏 -->
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="~@/assets/tx.svg" class="user-avatar">
          <span>admin</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/user-manage">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/monitor/dashboardmonitor">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <div id="bigscreen" class="right-menu-item hover-effect">
            <span @click="toScreen('http://yimiyamgguang.gitee.io/screen')">数据大屏</span>
        </div>

        <!-- <div id="workstation" class="right-menu-item hover-effect">
            <span @click="toScreen('http://112.74.169.99:18001/workstation/#/main/main-page')">工作站</span>
            <span @click="toWork('http://localhost:9527/#/main/main-page')">工作站</span>
        </div> -->



      </template>


    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import Cookies from 'js-cookie'
import ProjectSelect from '@/components/project-select'

import { getToken } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    ProjectSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    toScreen(url){
      location.href= url;
    },
    toWork(url){
      if(!getToken()){
        this.$alert('请登录', {
          confirmButtonText: '确定',
          center: true
        });
      }else{
        location.href= url;
      }

    },
    logout() {
      let _this = this;
      _this.$store.dispatch('user/Logout').then( () => {
        this.$router.push({path:"/login"});
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  line-height:80px;
  overflow: hidden;
  position: relative;
  background: #091E3A;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 80px;
    height: 80px;
    float: left;
    cursor: pointer;
    padding: 0px 20px 0 15px;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 80px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    // 放大和缩小功能
    #screenfull{
      float:right;
      color: #426A9D;
      height:100%;
      width:1em;
      margin-right:40px;
      position:relative;
      ::v-deep{
        .svg-icon{
          position: absolute;
          top:50%;
          margin-top:-0.5em;
        }
      }
    }

    // 跳到数据大屏
    #bigscreen{
      float:right;
      height:100%;
      width:90px;
      margin-right:40px;
      position:relative;
      span{
        width:100%;
        height:30px;
        line-height:30px;
        display:flex;
        justify-content: center;
        text-align: center;
        position: absolute;
        top:50%;
        margin-top:-15px;
        border: 1px solid #426A9D;
        border-radius: 4px;
        background:transparent;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #426A9D;
        letter-spacing: 1.4px;
      }
    }

    // 跳到工作站
    #workstation{
      float:right;
      height:100%;
      width:90px;
      margin-right:40px;
      position:relative;
      span{
        width:100%;
        height:30px;
        line-height:30px;
        display:flex;
        justify-content: center;
        text-align: center;
        position: absolute;
        top:50%;
        margin-top:-15px;
        border: 1px solid #426A9D;
        border-radius: 4px;
        background:transparent;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #426A9D;
        letter-spacing: 1.4px;
      }
    }




    // 图像 用户名 下拉框图标
    .avatar-container {
      float:right;
      margin-right: 20px;
      display: inline-block;

      .avatar-wrapper {
        height:80px;
        display:flex;
        align-items: center;
        justify-content: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius:50%;
        }
        span{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 1px;
          margin:0 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          color:#426A9D;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

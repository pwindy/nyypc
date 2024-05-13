<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
// logo区域背景色
.sidebar-container.has-logo{
  ::v-deep{
    div.el-submenu__title{
      background-color:#091E3A !important;
    }
    li.el-menu-item.submenu-title-noDropdown{
      background-color:#091E3A !important;
    }

  }
}

// 一级项背景色
.sidebar-container.has-logo{
  ::v-deep{
    div.el-submenu__title{
      height:45px;
      line-height:45px;
      background-color:#091E3A !important;
      padding-left:40px !important;
      span{
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #73829E;
        letter-spacing: 1.4px;
      }
    }
    li.el-menu-item.submenu-title-noDropdown{
      background-color:#091E3A !important;
      padding-left:40px !important;
      span{
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #73829E;
        letter-spacing: 1.4px;
      }
    }

  }
}

// 展开项的背景色
#app{
  .sidebar-container.has-logo{
    ::v-deep{
      div.nest-menu{
        a{
          li.el-menu-item{
            height:40px;
            line-height:40px;
            background-color:#091E3A !important;
            text-align: center;
            span{
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #73829E;
              letter-spacing: 1.4px;
            }
          }
          li.el-menu-item.is-active{
            span{
              color: #fff;
            }
          }
        }
      }
    }
  }
}


// 选中选项的背景色改变
#app{
  .sidebar-container.has-logo{
    ::v-deep{
      .el-submenu.is-active{
        div.el-submenu__title{
          background-image: linear-gradient(90deg, rgba(0,102,255,0.62) 0%, rgba(0,102,255,0.00) 100%);
          span{
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 1.4px;
          }
        }
      }
      li.el-menu-item.submenu-title-noDropdown.is-active{
        background-image: linear-gradient(90deg, rgba(0,102,255,0.62) 0%, rgba(0,102,255,0.00) 100%) !important;
      }
    }
  }
}

#app{
  .sidebar-container.has-logo{


    ::v-deep{
      .el-submenu__icon-arrow{
        right:10px;
        top:55%;
      }
    }
  }

}



</style>

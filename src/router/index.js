import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Layout from '@/layout'


export const constantRoutes = [

  // 重定向---redirect
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    name:"登录",
    meta: { title: '登录'}
  },

  // 授权重定向---auth-redirect
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },

  // 404
  {
    path: '/404',
    component: ( ) => import('@/views/error-page/404'),
    name: '404',
    hidden: true
  },

];

export const asyncRoutes = [

  // 监控报警路由---综合监控、历史曲线、报警记录、视频监控
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/dashboardmonitor',
    name: '监控报警',
    meta: {title: '监控报警', icon: 'jkbj', roles:['admin']},
    children: [
      {
        path: 'dashboardmonitor',
        component: () => import('@/views/monitor/dashboard-monitor'),
        name: '综合监控',
        meta: { title: '综合监控', roles:['admin'] }
      },
      {
        path: 'historycurve',
        component: () => import('@/views/monitor/history-curve'),
        name: '历史曲线',
        meta: { title: '历史曲线', roles:['admin'] }
      },
      {
        path: 'alarmrecord',
        component: () => import('@/views/monitor/alarm-record'),
        name: '报警记录',
        meta: { title: '报警记录', roles:['admin'] }
      },
      {
        path: 'videomonitor',
        component: () => import('@/views/monitor/video-monitor'),
        name: '视频监控',
        meta: { title: '视频监控' , roles:['admin']}
      }
    ]
  },

  // 运维管理路由---运维管理
  {
    path: '/devops',
    component: Layout,
    redirect: '/devops/order-manage',
    name: '运维管理',
    alwaysShow: true,
    meta: {title: '运维管理', icon: 'ywgl', roles:['admin']},
    children: [
      {
        path: 'order-manage',
        component: () => import('@/views/devops/order-manage'),
        name: '工单管理',
        meta: { title: '工单管理', roles:['admin'] }
      }
    ]
  },

  // 资产管理路由---项目管理、设备管理、参数管理、设备类型
  {
    path: '/asset',
    component: Layout,
    redirect: '/asset/project-manage',
    name: '资产管理',
    meta: {title: '资产管理', icon: 'zcgl', roles:['admin']},
    children: [
      {
        path: 'project-manage',
        component: () => import('@/views/asset/project-manage'),
        name: '项目管理',
        meta: { title: '项目管理', roles:['admin'] }
      },
        {
          path: 'project-new',
          component: () => import('@/views/asset/project-new'),
          name: '新建项目',
          hidden: true,
          meta: { title: '新建项目', roles:['admin'] }
        },
        {
          path: 'project-edit',
          component: () => import('@/views/asset/project-edit'),
          name: '编辑项目',
          hidden: true,
          meta: { title: '编辑项目', roles:['admin'] }
        },
      {
        path: 'devices-manage',
        component: () => import('@/views/asset/devices-manage'),
        name: '设备组管理',
        meta: { title: '设备组管理', roles:['admin'] }
      },
        {
          path: 'devices-new',
          component: () => import('@/views/asset/devices-new'),
          name: '新建设备组',
          hidden: true,
          meta: { title: '新建设备组', roles:['admin'] }
        },
        {
          path: 'devices-edit',
          component: () => import('@/views/asset/devices-edit'),
          name: '编辑设备组',
          hidden: true,
          meta: { title: '编辑设备组', roles:['admin'] }
        },
      {
        path: 'param-manage',
        component: () => import('@/views/asset/param-manage'),
        name: '参数管理',
        meta: { title: '参数管理', roles:['admin'] }
      },
      {
        path: 'device-type',
        component: () => import('@/views/asset/device-type'),
        name: '设备类型',
        meta: { title: '设备类型', roles:['admin'] }
      },
      {
        path: 'asset-check',
        component: () => import('@/views/asset/asset-check'),
        name: '资产登记',
        meta: { title: '资产登记', roles:['admin'] }
      }
    ]
  },


  //  资产登记---添加设备
  {
    path: "/asset/add-check",
    component: Layout,
    redirect: '/asset/add-check',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/asset/add-check'),
        name: "添加设备",
        meta: { title: '添加设备' , roles:['admin']},
      }
    ]
  },

    //  资产登记---设备详情
    {
      path: "/asset/asset-detail",
      component: Layout,
      redirect: '/asset/asset-detail',
      meta: { roles:['admin'] },
      hidden: true,
      children:[
        {
          path: "",
          component: () => import('@/views/asset/asset-detail'),
          name: "设备详情",
          meta: { title: '设备详情' , roles:['admin']},
        }
      ]
    },
    //  资产登记---数据
    {
      path: "/asset/asset-data",
      component: Layout,
      redirect: '/asset/asset-data',
      meta: { roles:['admin'] },
      hidden: true,
      children:[
        {
          path: "",
          component: () => import('@/views/asset/asset-data'),
          name: "设备数据",
          meta: { title: '设备数据' , roles:['admin']},
        }
      ]
    },
    //  项目管理---数据
    {
      path: "/asset/project-data",
      component: Layout,
      redirect: '/asset/project-data',
      meta: { roles:['admin'] },
      hidden: true,
      children:[
        {
          path: "",
          component: () => import('@/views/asset/project-data'),
          name: "项目数据",
          meta: { title: '项目数据' , roles:['admin']},
        }
      ]
    },

   // 深中二航搅拌站
  {
    path: '/mainmonitor',
    component: Layout,
    redirect: '/mainmonitor',
    meta: { roles:['admin']},
    hidden: true,
    children: [
      {
        path: "",
        component: () => import('@/views/mainmonitor/main-monitor'),
        name: "深中二航搅拌站", //深中二航搅拌站
        meta: { title: '深中二航搅拌站' , roles:['admin']},
      }
    ]
  },

  // 深中二公局S06标段
  {
    path: "/zsmainmonitor",
    component: Layout,
    redirect: '/zsmainmonitor',
    meta: { roles:['admin']},
    hidden: true,
    children: [
      {
        path: "",
        component: () => import('@/views/zsmainmonitor/zs-mainmonitor'),
        name: "深中二公局S06标段", //深中二公局S06标段
        meta: { title: '深中二公局S06标段' , roles:['admin']},
      }
    ]
  },

  // 深中通道保利长大项目
  {
    path: "/hzmainmonitor",
    component: Layout,
    redirect: '/hzmainmonitor',
    meta: { roles:['admin']},
    hidden: true,
    children :[
      {
        path: "",
        component: () => import('@/views/hzmainmonitor/hz-mainmonitor'),
        name: "深中通道保利长大项目",//深中通道保利长大项目
        meta: { title: '深中通道保利长大项目' , roles:['admin']},
      }
    ]
  },

  // 移动储能电源车
  {
    path: "/cncmainmonitor",
    component: Layout,
    redirect: '/cncmainmonitor',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/cncmainmonitor/cnc-mainmonitor'),
        name: "移动储能电源车",//移动储能电源车
        meta: { title: '移动储能电源车' , roles:['admin']},
      }
    ]

  },


  {
    path: "/zycn01mainmonitor",
    component: Layout,
    redirect: '/zycn01mainmonitor',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/zycn01mainmonitor/zycn01-mainmonitor'),
        name: "珠海黄茅海",//珠海黄茅海
        meta: { title: '珠海黄茅海' , roles:['admin']},
      }
    ]
  },

  {
    path: "/zycn01mainmonitor1",
    component: Layout,
    redirect: '/zycn01mainmonitor1',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/zycn01mainmonitor1/zycn01-mainmonitor1'),
        name: "珠海黄茅海",//珠海黄茅海
        meta: { title: '珠海黄茅海' , roles:['admin']},
      }
    ]

  },


  {
    path: "/zycn02mainmonitor",
    component: Layout,
    redirect: '/zycn02mainmonitor',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/zycn02mainmonitor/zycn02-mainmonitor'),
        name: "中铁隧道局",//珠海黄茅海
        meta: { title: '中铁隧道局' , roles:['admin']},
      }
    ]
  },

  {
    path: "/zycn02mainmonitor1",
    component: Layout,
    redirect: '/zycn02mainmonitor1',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/zycn02mainmonitor1/zycn02-mainmonitor1'),
        name: "中铁隧道局",//珠海黄茅海
        meta: { title: '中铁隧道局' , roles:['admin']},
      }
    ]
  },

  // 云南滇中引水项目
  {
    path: "/ynmonitor",
    component: Layout,
    redirect: '/ynmonitor',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/ynmonitor/yn-mainmonitor'),
        name: "云南滇中引水项目",
        meta: { title: '云南滇中引水项目' , roles:['admin']},
      }
    ]

  },

  // 柴油机设备
  {
    path: "/mainmonitor/dg",
    component: Layout,
    redirect: '/mainmonitor/dg',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/dgdevices/index'),
        name: "柴油机设备",
        meta: { title: '柴油机设备' , roles:['admin']},
      }
    ]
  },

  //  一级柜设备
  {
    path: "/mainmonitor/yjg",
    component: Layout,
    redirect: '/mainmonitor/yjg',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/yjgdevices/index'),
        name: "一级柜设备",
        meta: { title: '一级柜设备' , roles:['admin']},
      }
    ]
  },

  //  PCS设备
  {
    path: "/mainmonitor/pcs",
    component: Layout,
    redirect: '/mainmonitor/pcs',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/pcsdevices/index'),
        name: "PCS设备",
        meta: { title: 'PCS设备' , roles:['admin']},
      }
    ]
  },

  //  BMS设备
  {
    path: "/mainmonitor/bms",
    component: Layout,
    redirect: '/mainmonitor/bms',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/bmsdevices/index'),
        name: "BMS设备",
        meta: { title: 'BMS设备' , roles:['admin']},
      }
    ]
  },

  //  AC设备
  {
    path: "/mainmonitor/ac",
    component: Layout,
    redirect: '/mainmonitor/ac',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/acdevices/index'),
        name: "AC设备",
        meta: { title: 'AC设备' , roles:['admin']},
      }
    ]
  },

  //  STS设备
  {
    path: "/mainmonitor/sts",
    component: Layout,
    redirect: '/mainmonitor/sts',
    meta: { roles:['admin'] },
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/stsdevices/index'),
        name: "STS设备",
        meta: { title: 'STS设备' , roles:['admin']},
      }
    ]
  },

  //  DB设备
  {
    path: "/mainmonitor/db",
    component: Layout,
    redirect: '/mainmonitor/db',
    meta: { roles:['admin']},
    hidden: true,
    children:[
      {
        path: "",
        component: () => import('@/views/dbdevices/index'),
        name: "DB设备",
        meta: { title: 'DB设备' ,roles:['admin']},
      }
    ]
  },


  // 个人中心
  {
    path: '/user',
    component: Layout,
    redirect: '/user/user-manage',
    name:"系统管理",
    alwaysShow: true,
    meta:{title: '系统管理',roles:['admin'],icon: 'xtgl',},
    children: [
      {
        path: 'user-manage',
        component: () => import('@/views/user/user-manage'),
        name: '用户管理',
        meta: { title: '用户管理' ,roles:['admin']}
      }
    ]
  },

  // 401页面 404页面路由
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {title: 'Error Pages',icon: '404',roles:['admin']},
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true ,roles:['admin']}
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true ,roles:['admin']}
      }
    ]
  },

  // 错误页面路由
  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug',roles:['admin'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 创建路由实例
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes // 不需要权限的路由
})


//初始化路由实例
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


// 导出
export default router

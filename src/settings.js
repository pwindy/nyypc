module.exports = {
  // 配置项目标题
  title: 'nyy运维后台管理',

  // showSettings用来设置是否显示控制面板
  showSettings: false,

  // tagsView是我们打开某个页面是否有页面标签
  tagsView: false,

  // fixedHeader是内容页面向下滑动时头部是否固定，false是不固定， true是固定
  fixedHeader: false,

  // sidebarLogo控制菜单栏上方是否显示图标
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}

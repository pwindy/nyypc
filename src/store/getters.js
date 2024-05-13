

const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  username: state => state.user.username,
  password: state => state.user.password,
  emailAddress: state => state.user.emailAddress,
  userid: state => state.user.userid,

  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,

  introduction: state => state.user.introduction,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters




import { login, getinfo } from '@/api/user.js';
import { getToken, setToken, removeToken, getuserId,setuserId,removeuserId, getroles,setroles,removeroles, getusername,setusername,removeusername, getpassword,setpassword,removepassword, getEmail,setEmail,removeEmail,removeSelect } from '@/utils/auth';
import router, { resetRouter } from '@/router';


// state 保存数据---对象
const state = {
  token: getToken(),
  roles: getroles(),
  username: getusername(),
  password: getpassword(),
  emailAddress: getEmail(),
  userid: getuserId()
};


// mutations 操控state里面的数据---函数形式,传参
const mutations = {
  SET_TOKEN: ( state, token ) => {
    state.token = token;
  },
  SET_ROLES: ( state, roles ) => {
    state.roles = roles;
  },
  SET_USERNAME: ( state, username ) => {
    state.username = username;
  },
  SET_PASSWORD: ( state, password ) => {
    state.password = password;
  },
  SET_EMAILADDRESS: (state, emailAddress ) => {
    state.emailAddress = emailAddress;
  },
  SET_USERID: (state, userid ) => {
    state.userid = userid;
  }
};


// actions 调用mutations里面的方法(异步)---函数形式,传参
const actions = {

  // 登录
  Login({ commit }, userInfo) {

    const username = userInfo.userNameOrEmailAddress;
    const password = userInfo.password;

    return new Promise((resolve,reject ) => {
      login( {userNameOrEmailAddress:username, password: password, rememberClient: false}).then(response => {
        const accessToken = response.result.accessToken;
        const userId = response.result.userId;
        let roles = [];
        let emailAddress;
        if(userId == 1){
          roles.push('admin');
          emailAddress = ' ';
        }
        commit('SET_TOKEN', accessToken);// 把从后台获取的accessToken存到vuex的vuex中去
        commit('SET_USERID', userId);// 把从后台获取的auserId存到vuex的vuex中去
        commit('SET_ROLES', roles);// 把从后台获取的roles存到vuex的store中去
        commit('SET_USERNAME', username);// 把从后台获取的username存到vuex的store中去
        commit('SET_PASSWORD', password);// 把从后台获取的password存到vuex的store中去


        setToken(accessToken);// 把从后台获取的token保存到浏览器的cookie里面去
        setuserId(userId);// 把从后台获取的token保存到浏览器的cookie里面去
        setroles(roles);// 把从后台获取的token保存到浏览器的cookie里面去
        setusername(username);// 把从后台获取的token保存到浏览器的cookie里面去
        setpassword(password);// 把从后台获取的token保存到浏览器的cookie里面去

        resolve();

      }).catch(error => {
        reject(error);
      });
    });



  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getinfo(state.token).then(response => {
        const { data } = response.result.user;
        if (!response.success) {
          reject('获取用户信息失败，请重新登录!');
        }else{
          let emailAddress = response.result.user.emailAddress;
          if(emailAddress){
            commit('SET_EMAILADDRESS', emailAddress);// 把从后台获取的emailAddress存到vuex的vuex中去
            setEmail(emailAddress);// 把从后台获取的emailAddress保存到浏览器的cookie里面去
          }
          resolve(data);
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 退出
  Logout({ commit , dispatch }) {
    commit('SET_TOKEN', '');
    commit('SET_USERID', '');
    commit('SET_ROLES', []);
    commit('SET_USERNAME', '');
    commit('SET_PASSWORD', '');
    commit('SET_EMAILADDRESS', '');

    removeToken();
    removeuserId();
    removeroles();
    removeusername();
    removepassword();
    removeEmail();
    removeSelect();

    resetRouter();

    // reset visited views and cached views
    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_USERID', '');
      commit('SET_ROLES', []);
      commit('SET_USERNAME', '');
      commit('SET_PASSWORD', '');
      commit('SET_EMAILADDRESS', '');
      removeToken();
      removeEmail();
      resolve();
    })
  },


  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

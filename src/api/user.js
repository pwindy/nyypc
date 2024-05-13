import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/TokenAuth/Authenticate',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export function getinfo(token) {
  return request({
    url: '/services/app/Session/GetCurrentLoginInformations',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getUserInfoListAsync() {
  return request({
    url: '/services/app/User/GetUserInfoListAsync',
    method: 'get'
  })
}

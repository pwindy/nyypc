import request from '@/utils/request';

export function  getProjectInfosByUserid(userid) {
  return request({
    url: '/services/app/ProjectService/GetProjectInfosByUserid?userid='+ userid,
    method: 'get',
  });
}


export function getProjectData(projectid) {
  return request({
    url: '/TokenAuth/GetProjectData?projectid='+ projectid,
    method: 'get',
  });
}




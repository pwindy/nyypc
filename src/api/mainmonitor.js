import request from '@/utils/request';

export function getAppIndexData(userid) {
  return request({
    url: '/TokenAuth/GetAppIndexData?id=0&userid='+ userid,
    method: 'get',
  });
}



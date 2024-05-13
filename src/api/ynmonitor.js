import request from '@/utils/request';


//  实时发电功率第一次请求曲线
export function getListDGDataByProjectID(projectid) {
  return request({
    url: '/services/app/ControlDataService/GetListDGDataByProjectID?id=' + projectid,
    method: 'get',
  });
}

// 实时pcs功率第一次请求曲线
export function getListPCSDataByProjectID(projectid) {
  return request({
    url: '/services/app/ControlDataService/GetListPCSDataByProjectID?id=' + projectid,
    method: 'get',
  });
}

// 负载功率第一次请求曲线
export function getListDLTDataByProjectID(projectid) {
  return request({
    url: '/services/app/ControlDataService/GetListDLTDataByProjectID?id=' + projectid,
    method: 'get',
  });
}

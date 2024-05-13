import request from '@/utils/request';


// 工单管理
export function getAllOrder() {
  return request({
    url: '/services/app/DevOpsService/GetAllOrder',
    method: 'get',
  });
}


import request from '@/utils/request';

export function getListControlDataByID(id) {
  return request({
    url: 'services/app/ControlDataService/GetListControlDataByID?id='+ id,
    method: 'get',
  });
}


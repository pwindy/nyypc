import request from '@/utils/request';

export function getHistoryTreeModelsByUserID(userid) {
  return request({
    url: '/services/app/DeviceService/GetHistoryTreeModelsByUserID?userid='+ userid,
    method: 'get',
  });
}
export function getHistoryData(postdata) {
  return request({
    url: '/services/app/ControlDataService/GetHistoryData?devid='+postdata.devid+'&typeid='+postdata.typeid+'&timetype='+postdata.timetype+'&columnName='+postdata.columnName+'&start='+postdata.start+'&end='+postdata.end,
    method: 'get'
  });
}



import request from '@/utils/request';

export function getADeviceInfoListByProjectId(id,typeid) {
  return request({
    url: '/services/app/DeviceService/GetADeviceInfoListByProjectId?id=' + id + '&typeid=' + typeid,
    method: 'get',
  });
}
export function getNewDGDataByID(id) {
  return request({
    url: '/services/app/ControlDataService/GetNewDGDataByID?Id=' + id,
    method: 'get',
  });
}

export function getNewPCS_HistoryDataByID(id) {
  return request({
    url: '/services/app/ControlDataService/GetNewPCS_HistoryDataByID?Id=' + id,
    method: 'get',
  });
}


export function getNewBMSDataByID(id) {
  return request({
    url: '/services/app/ControlDataService/GetNewBMSDataByID?Id=' + id,
    method: 'get',
  });
}

export function getNewACDataByID(id) {
  return request({
    url: '/services/app/ControlDataService/GetNewACDataByID?Id=' + id,
    method: 'get',
  });
}

// 一级柜请求数据
export function getAllDeviceInfoListByTypeId(id) {
  return request({
    url: '/services/app/DeviceService/GetAllDeviceInfoListByTypeId?id=' + id,
    method: 'get',
  });
}
export function getNewYJGHistoryDataByID(id) {
  return request({
    url: '/services/app/ControlDataService/GetNewYJGHistoryDataByID?Id=' + id,
    method: 'get',
  });
}

// sts请求数据
export function getNewSTS_HistoryDataByID(id) {
  return request({
    url: '/services/app/ControlDataService/GetNewSTS_HistoryDataByID?Id=' + id,
    method: 'get',
  });
}
// 电表请求数据
export function getNewDLT645_HistoryDataByID(id) {
  return request({
    url: '/services/app/ControlDataService/GetNewDLT645_HistoryDataByID?Id=' + id,
    method: 'get',
  });
}






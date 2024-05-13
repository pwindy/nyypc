import request from '@/utils/request';

// 项目管理

  //项目管理-搜索
  export function getProjectSearch(thesearch, userid) {
    return request({
      url: '/services/app/ProjectService/GetProjectInfosBySearchAndUserid?search='+ thesearch + '&userid=' + userid,
      method: 'get',
    });
  }

  //项目管理-项目编辑
  export function getProjectInfoByID(projectid) {
    return request({
      url: '/services/app/ProjectService/GetProjectInfoByID?Id='+ projectid,
      method: 'get',
    });
  }


  //项目管理-项目编辑-编辑设备(根据项目id获取)
  export function getProjectEditDevice(projectid) {
    return request({
      url: '/services/app/ProjectService/GetProjectEditDevice?projectid='+ projectid,
      method: 'get',
    });
  }


  //项目管理-项目编辑-获取项目成员
  export function getProjectMemberListByProjectId(projectid) {
    return request({
      url: '/services/app/ProjectService/GetProjectMemberListByProjectId?id='+ projectid,
      method: 'get',
    });
  }

  //项目管理-项目编辑-提交
  export function projectInfoUpdate(projectInfo) {
    return request({
      url: '/services/app/ProjectService/ProjectInfoUpdate',
      method: 'post',
      data: projectInfo
    });
  }

  //项目管理-项目成员
  export function getUserProject() {
    return request({
      url: '/services/app/ProjectService/GetUserByProjectID',
      method: 'get',
    });
  }

  //项目管理-新建项目-获取设备
  export function getUnUserDevice() {
    return request({
      url: '/services/app/ProjectService/GetUnUserDevice',
      method: 'get',
    });
  }
  //项目管理-新建项目-提交
  export function creatProjectInfo(projectInfo) {
    return request({
      url: '/services/app/ProjectService/CreatProjectInfo',
      method: 'post',
      data: projectInfo
    });
  }



// 设备管理
export function getDeviceGroups() {
  return request({
    url: '/services/app/DeviceGroupService/GetDeviceGroups',
    method: 'get',
  });
}

  //设备组管理-搜索
  export function getDeviceGroupsBySearch(thesearch) {
    return request({
      url: '/services/app/DeviceGroupService/GetDeviceGroupsBySearch?search='+ thesearch,
      method: 'get',
    });
  }


  //设备管理-新建设备组-提交
  export function creatDeviceGroup(deviceGroupinfo) {
    return request({
      url: '/services/app/DeviceGroupService/CreatDeviceGroup',
      method: 'post',
      data: deviceGroupinfo
    });
  }

  //设备组管理-编辑设备组-根据id获取数据
  export function getDeviceGroupByGroupID(deviceID) {
    return request({
      url: '/services/app/DeviceGroupService/GetDeviceGroupByGroupID?id=' + deviceID,
      method: 'get'
    });
  }

  //设备组管理-编辑设备组-提交数据
  export function deviceGroupUpdate(deviceGroupinfo) {
    return request({
      url: '/services/app/DeviceGroupService/DeviceGroupUpdate',
      method: 'post',
      data: deviceGroupinfo
    });
  }












// 参数管理
export function getDevicePropertyListByTypeID(userid) {
  return request({
    url: '/services/app/DeviceService/GetDevicePropertyListByTypeID?id=' + userid,
    method: 'get',
  });
}
// 设备类型
export function getDeviceTypeList() {
  return request({
    url: '/services/app/DeviceService/GetDeviceTypeList',
    method: 'get',
  });
}

// 资产登记
export function getDevicesCheck() {
  return request({
    url: '/services/app/AssetService/GetAssetInfos',
    method: 'get',
  });
}

  // 资产登记---搜索
  export function getDevicesSearch(thetype,thesearch) {
    return request({
      url: '/services/app/AssetService/GetAssetInfoBySearch?type=' + thetype + '&search=' + thesearch,
      method: 'get'
    });
  }

  // 资产登记---设备详情
  export function gGetAssetInfoByID(id) {
    return request({
      url: '/services/app/AssetService/GetAssetInfoByID?id=' + id,
      method: 'get'
    });
  }

  // 资产登记---设备数据
  export function GetReport_DeviceDay(devID, starttime, endtime) {
    return request({
      url: '/services/app/ReportService/GetReport_DeviceDay?devID=' + devID + '&start=' + starttime + '&end=' + endtime,
      method: 'get'
    });
  }

  // 项目管理---项目数据
  export function GetReport_ProjectDay(projectID, starttime, endtime) {
    return request({
      url: '/services/app/ReportService/GetReport_ProjectDay?projectID=' + projectID + '&start=' + starttime + '&end=' + endtime,
      method: 'get'
    });
  }



// 流转信息列表
export function getCirculationByAssetID(id) {
  return request({
    url: '/services/app/AssetService/GetCirculationByAssetID?id=' + id,
    method: 'get',
  });
}

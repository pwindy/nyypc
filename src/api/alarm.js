import request from '@/utils/request';

export function getAlarmInfoList() {
  return request({
    url: '/services/app/AlarmService/GetAlarmInfoList',
    method: 'get',
  });
}


/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}
// 删除数组中重复元素

/**
 * @param {Array} arg
 */
export function delSameone(arg) {
  var newarr=[] ;
  for(var i = 0; i < arg.length; i++){
      if(newarr.indexOf(arg[i]) == -1){
        newarr.push(arg[i]);
      }
  }
  return newarr;
}

// 二维数组去重
export function delSameArrInArr(ary) {
  for (var i = 0; i < ary.length - 1; i++) {
    for (var j = 1; j < ary.length; j++) {
        if (i != j) {
            if (ary[i][0] == ary[j][0]) {
                ary.splice(j, 1);
            }
        }

    }
  }
  return ary;
}

export function isRepeat(arr) {
  var hash = {};
  for(var i in arr) {
    if(hash[arr[i]]) {
      return true;
    }
    // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
    hash[arr[i]] = true;
  }
  return false;
}

//获取当日时间yyyy-MM-dd
export function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 1 && strDate <= 9) {
    strDate = '0' + strDate ;
  }
  var currentdate = year + '-' + month + '-' + strDate;
  return currentdate;
}

//获取昨日时间yyyy-MM-dd
export function getYesterdayFormatDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var yesYear, yesMonth, yesStrDate;

  if(strDate==1){
    if(month==12 || month==10 || month==7 || month==5){
      yesYear = year;
      yesMonth = month -1;
      yesStrDate = 30;
    }else if(month==11 || month==9 || month==8 || month==6 || month==4 || month==2){
      yesYear = year;
      yesMonth = month -1;
      yesStrDate = 31;
    }else if(month==3){
      yesYear = year;
      yesMonth = month -1;
      if(year==2020){
        yesStrDate = 29;
      }else{
        yesStrDate = 28;
      }
    }else if(month==1){
      yesYear = year - 1;
      yesMonth = 12;
      yesStrDate = 31;
    }
  }else{
    yesYear = year;
    yesMonth = month;
    yesStrDate = strDate -1;
  }

  if (yesMonth >= 1 && yesMonth <= 9) {
    yesMonth = '0' + yesMonth;
  }
  if (yesStrDate >= 1 && yesStrDate <= 9) {
    yesStrDate = '0' + yesStrDate ;
  }
  var currentdate = yesYear + '-' + yesMonth + '-' + yesStrDate;
  return currentdate;
}




//获取7天前日期 yyyy-MM-dd
export function getSevenBeforeDate() {
  var end = new Date();
  var start = end.getTime() - 3600 * 1000 * 24 * 7 ;
  var date = new Date(start);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 1 && strDate <= 9) {
    strDate = '0' + strDate ;
  }
  var currentdate = year + '-' + month + '-' + strDate;
  return currentdate;
}

//获取当月1号
export function getMonthFirstDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 1 && strDate <= 9) {
    strDate = '0' + strDate ;
  }
  var currentdate = year + '-' + month + '-1';
  return currentdate;
}
// 获取上一个月
export function getLastMonth() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var lastStart,lastEnd;
  if(month==12){
    lastStart = year + '-11-1';
    lastEnd =  year + '-11-30';
  }else if(month==11){
    lastStart = year + '-10-1';
    lastEnd =  year + '-10-31';
  }else if(month==10){
    lastStart =  year + '-9-1';
    lastEnd =  year + '-9-30';
  }else if(month==9){
    lastStart =  year + '-8-1';
    lastEnd =  year + '-8-31';
  }else if(month==8){
    lastStart =  year + '-7-1';
    lastEnd =  year + '-7-31';
  }else if(month==7){
    lastStart =  year + '-6-1';
    lastEnd =  year + '-6-30';
  }else if(month==6){
    lastStart =  year + '-5-1';
    lastEnd =  year + '-5-31';
  }else if(month==5){
    lastStart =  year + '-4-1';
    lastEnd =  year + '-4-30';
  }else if(month==4){
    lastStart =  year + '-3-1';
    lastEnd =  year + '-3-31';
  }else if(month==3){
    lastStart =  year + '-2-1';
    lastEnd =  year + '-2-28';
  }else if(month==2){
    lastStart =  year + '-1-1';
    lastEnd =  year + '-1-31';
  }else if(month==1){
    lastStart =  year + '-12-1';
    lastEnd =  year + '-12-31';
  }
  return [lastStart, lastEnd];
}

// 获取小数点后四位
export function getFloat4(x) {
    if (x != '.') {
      var f = Math.round(x * 10000) / 10000;
      var s = f.toString();
      var rs = s.indexOf('.');
      if (rs > 0) {
        while (s.length <= rs + 4) {
          s += '0';
        }
      }
      return s;
    } else {
      return '0.00';
    }
  }


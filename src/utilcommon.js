    // 判断是否为整数，不是整数的话取小数点后两位
    export function dealnumber(obj) {
        if (obj % 1 === 0) { // 为整数
            return obj;
        } else { // 为非整数
            var f_x = parseFloat(obj);
            if (isNaN(f_x)) {
                return false;
            }
            f_x = Math.round(f_x * 100) / 100;
            return f_x;
        }
    }

    // 判断是否为整数，不是整数的话取小数点后一位
    export function dealonenumber(obj) {
        if (obj % 1 === 0) { // 为整数
            return obj;
        } else { // 为非整数
            var f_x = parseFloat(obj);
            if (isNaN(f_x)) {
                return false;
            }
            f_x = Math.round(f_x * 10) / 10;
            return f_x;
        }
    }
    // 四舍五入取整数
    export function toFixed(str) {
        var newstr = str.toFixed(0);
        return newstr;
    }

    // 获取地址栏的属性相应的属性值
    export function getQueryString(name) {
      let reg = `(^|&)${name}=([^&]*)(&|$)`
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }

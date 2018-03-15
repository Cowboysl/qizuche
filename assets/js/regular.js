/**
 * Created by 79117 on 2018/3/14.
 */
//车牌验证
function isVehicleNumber(vehicleNumber) {
    var result = false;
    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/;
    result = express.test(vehicleNumber);
    if(vehicleNumber.length == 0){
        result = true;
    }
    return result;
}
//手机号验证
function isPhone(phone){
    var res = false;
    if(phone.length == 11){
        var rsg = /^1[0-9]{10}$/;
        res = rsg.test(phone);
    }
    return res;
}
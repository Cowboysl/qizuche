/**
 * Created by 79117 on 2018/3/9.
 */
var dialog = YDUI.dialog;
!function (win,$) {
    //绑定发送验证码按钮
    var $getCode = $('#get_code');
    /* 定义参数 */
    $getCode.sendCode({
        disClass: 'disabled',
        secs: 60,
        run: false,
        runStr: '剩余{%s}s',
        resetStr: '重新获取'
    });
    $getCode.on('click', function () {
        var user_phone = $('#user_phone').val(); //手机号码
        if(!isPhone(user_phone)){
            $('#user_phone').addClass('input_warning');
            setLabel('user_phone','<div style="color: #FF0000">请输入11位手机号</div>');
        }else{
            $('#user_phone').removeClass('input_warning');
            setLabel('user_phone','手机号');
            dialog.loading.open('发送中');
            var url = setUrl('sendSMS');
            var map = {
                phone:'17621161287'
            };
            sendRequest(url,map,sendCode);
        }
    });
}(window,jQuery);

$(function () {
    //login登录
    var wH = $(window).height();
    var sH = $('section').height();
    $('.agreement').height(wH-sH);
    //v_login  验证登录
    var v_wH = $('.v_login').find('header').height();
    $('.v_login').find('.content').css('margin-top','20%');
    $('.tab_nav').bind('click', function () {
        var self = $(this);
        $('.tab_nav').removeClass('active');
        self.addClass('active');
        var name = self.attr('data-name');
        $('.tab').hide();
        $("#"+name).show();
    });
});
//登录
function doLogin(){
    dialog.loading.open('登录中...');
    setTimeout(function () {
        dialog.toast('登录成功！', 'success', 1000);
        dialog.loading.close();/* 移除loading */
    }, 2000);
}
//验证登录-------
function doLoginValidate(){
    dialog.loading.open('登录中...');
    var flag = true;
    var vin = $('#VIN').val();
    var user_phone = $('#user_phone').val(); //手机号码
    if(!isPhone(user_phone)){
        flag = false;
        $('#user_phone').addClass('input_warning');
        setLabel('user_phone','<div style="color: #FF0000">请输入11位手机号</div>');
    }else{
        $('#user_phone').removeClass('input_warning');
        setLabel('user_phone','手机号');
    }
    var license = $('#license').val(); //车牌号
    if(!isVehicleNumber(license)){
        flag = false;
        $('#license').addClass('input_warning');
        setLabel('license','<div style="color: #FF0000">请正确输入车牌</div>');
    }else{
        $('#license').removeClass('input_warning');
        setLabel('license','车牌号');
    }
    var code = $('#code').val(); //验证码
    if(code.length == 0){
        flag = false;
        $('#code').addClass('input_warning');
        setLabel('code','<div style="color: #FF0000">验证码错误</div>');
    }
    if(vin.length == 0 && license.length == 0){
        flag = false;
        dialog.confirm('温馨提示','vin和车牌号必须填写一个！'[{
            txt:'确定',
            color:'#00BBB2'
        }]);
    }
    if(flag){
        var url = setUrl('register');
        var map = {
            user_phone:user_phone,
            vin:vin,
            license:license,
            code:code
        };
        sendRequest(url,map,register);
    }else{
        dialog.loading.close();/* 移除loading */
        $('#code').addClass('input_warning');
        setLabel('code','<div style="color: #FF0000">验证码错误</div>');
    }
}
//发送请求
function sendRequest(url,map,callback){
    map.key = md5KeyAndToken().key;
    $.ajax({
        url:url,
        data:map,
        dataType:'json',
        success: function (res) {
            console.log(res);
            callback(res);
        },
        error: function (e) {
            dialog.loading.close();
            dialog.toast('验证失败' , 'error', 1500,function (){
                dialog.confirm('温馨提示', '请尝试重新请求~', function () {
                    window.location.reload();
                });
            });
        }
    });
}
//调用摄像头
function openUpImg(self){
    $(self).removeAttr('onclick');
    var url = setUrl('ljnmdvVin');
    var id = $(self).find('input[type="file"]').attr('id');
    document.querySelector('#'+id).addEventListener('change', function () {
        dialog.loading.open('照片识别中,请耐心等待');
        lrz(this.files[0])
            .then(function (rst) {
                // 处理成功会执行
                console.log(rst);
                rst.formData.append("key", md5KeyAndToken().key);
                rst.formData.append('file', rst.formData);
                $.ajax({
                    url: url,
                    type: "POST",
                    data: rst.formData,
                    dataType: 'JSON',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        console.log(data);
                        getCarInfo(data);
                    }
                });
            })
            .catch(function (err) {
                // 处理失败会执行
                console.log('处理失败');
                console.log(err);
                setTimeout(function () {
                    dialog.loading.close();
                    dialog.alert('温馨提示','照片识别失败，请重新拍照或手动输入');
                },1500);
            })
            .always(function () {
                // 不管是成功失败，都会执行
            });
    });
}
//发送验证码
var sendCode = function (res){
    if(res.status == 0){
        setTimeout(function () {
            dialog.loading.close();
            $('#get_code').sendCode('start');
            dialog.toast('发送成功', 'success', 1500);
        },1500);
    }
    if(res.status == 1){
        setTimeout(function () {
            dialog.loading.close();
            $('#get_code').sendCode('start');
            dialog.toast('发送失败，请稍后重试~', 'error', 1500);
        },1500);

    }
};
//拍照获取信息
var getCarInfo = function (res) {
    if(res.status == 0){
        setTimeout(function () {
            dialog.loading.close();
            dialog.toast('识别成功','success',1500);
            $('#VIN').val(res.info.vin);
            $('#license').val(res.info.licence);
        },1500);
        setTimeout(function () {
            dialog.confirm('温馨提示','请确认VIN码是否属实，如果不属实请手动输入或重新拍照识别！',[{
                txt: '确定',
                color: "#00BBB2"
            }]);
        },3000);
    }
    if(res.status == 1){
        setTimeout(function () {
            dialog.loading.close();
            dialog.confirm('温馨提示','照片识别失败，请重新拍照或手动输入！',[{
                txt: '确定',
                color: "#00BBB2"
            }]);
        },1500);
    }
};
//登录结果处理
var register = function (res) {
    //setTimeout(function () {
    //    dialog.loading.close();/* 移除loading */
    //    dialog.toast('登录成功！', 'success', 1000);
    //    go('validate/info_success');
    //}, 2000);
};
//PhotographSample();
//弹窗信息 拍照示例
function PhotographSample(){
    dialog.confirm('<div style="text-align: center;font-size: .4rem;position: relative;padding: 0.35rem 0;">拍行驶证，自动识别填写<i onclick="javascript:dialog.confirm()" class="icon-error-outline" style="position: absolute;font-size: .6rem;right: -.4rem;top: -.3rem;"></i></div>','<img style="width: 70%;margin: auto" src="img/user_info_alert_sample.png" />',[{
        txt:'<div onclick="openUpImg(this);" style="background: #00BBB2;margin: .2rem;border-radius: .1rem">拍摄/上传行驶证（正面）<input id="upImg_alert" type="file" style="opacity: 0;width:100%;height:100%;margin: 0;padding: 0;left:0;position: absolute" accept="image/*" /></div>',
        color:'#fff'
    }]);
}

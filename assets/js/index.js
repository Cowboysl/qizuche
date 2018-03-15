
/**
 * Created by 79117 on 2018/3/8.
 */
$(function () {
    $('.myOrder').bind('click', function () {
        go('order/order_list');
    });
});
//菜单绑定点击事件
$('.footer_menu').find('.tabbar-item').bind('click', function () {
    var menu = $('.footer_menu').find('.tabbar-item');
    changeMenu(menu,this);
});
//切换菜单
function changeMenu(data,self){
    $.each(data, function (k,v) {
        $(v).removeClass('tabbar-active');
    });
    $(self).addClass('tabbar-active');
}
function setUrl(name,type){
    var url = '';
    switch (type){
        case 0:
            url = "http://admin.lifecar.leche7.com/api&action="+name;
            break;
        default:
            url = "http://admin.lifecar.leche7.com/api&action="+name;
            break;
    }
    return url;
}
//控制链接跳转
function go(url_name){
    var url = "../../view/"+url_name+".html";
    window.location.href = url;
}
//set  for Label
function setLabel(id,txt){
    $('label[for="'+ id +'"]').html(txt);
}
//解绑事件
function removeEvent(str,ele,fn){
    ele.detachEvent?ele.detachEvent("on"+str,fn):ele.removeEventListener(str,fn);
}
//key and token
function md5KeyAndToken(key,obj){
    var res = {};
    key = '123456';
    var token = '';
    token = key;//obj数据+key 字典排序后 md5加密
    res.key = key;
    res.token = $.md5(token);
    return res;
}
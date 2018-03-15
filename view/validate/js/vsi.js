/**
 * Created by 79117 on 2018/3/12.
 */
$(function () {
    $('.vis').find('.content').css('margin-top','20%');
    $('.select_city').find('.content').css('margin-top','14%');
    $('.order_sub').find('.content').css('margin-top','13%');
    $('.order_details').find('.content').css('margin-top','14%');
    //轮播
    var select_city = new Swiper ('#js_city_banner',{
        loop: false
    });
});
var dialog = YDUI.dialog;
//用户须知
function user_know(){
    dialog.confirm('<div style="font-size: .36rem;padding: .5rem;text-align: center">用户须知</div>',
        '<div style="font-size: .3rem;margin-top: .2rem;margin-bottom: .7rem;text-align: center">' +
        '个人年租用车：取车时请携带：本人有效身份证、本人驾驶证副本、信用卡或借记卡；<br/>' +
        '企业年租用车：取车时请携带：营业执照副本复印件（行政机关及事业单位无需提供）、组织结构代码证副本复印件（办三证合一的企业提供三证合一证照复印件），加盖公章' +
        '</div>',
        [
            {
                txt: '知道了',
                color: '#00BBB2' /* false:黑色 true:绿色 或 使用颜色值 */
            }
        ]
    );
}
//验证成功信息----------------------------------
function openSr(self){
    var flag = $(self).is(':checked');
    if(flag){
        $('.js_sr').show();
        $('.js_sc').hide();
    }else{
        $('.js_sc').show();
        $('.js_sr').hide();
    }
}

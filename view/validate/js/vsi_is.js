/**
 * Created by 79117 on 2018/3/15.
 */
$(function () {
    $('.vis').find('.content').css('margin-top','20%');
});
var dialog = YDUI.dialog;
//打开上传
function openUpload(self){
    //var url = setUrl('ljnmdvVin');
    var id = $(self).find('input[type="file"]').attr('id');
    document.querySelector('#'+id).addEventListener('change', function () {
        dialog.loading.open('照片上传中,请耐心等待');
        lrz(this.files[0])
            .then(function (rst) {
                // 处理成功会执行
                console.log(rst);
                $(self).find('img').attr('src',rst.base64);
                console.log(rst.base64);
                dialog.loading.close();
                //rst.key = md5KeyAndToken().key;
                //$.ajax({
                //    url: url,
                //    type: "POST",
                //    data: rst.formData,
                //    dataType: 'JSON',
                //    processData: false,
                //    contentType: false,
                //    success: function (data) {
                //        console.log(data);
                //        getCarInfo(data);
                //    }
                //});
            })
            .catch(function (err) {
                // 处理失败会执行
                console.log('处理失败');
                console.log(err);
                setTimeout(function () {
                    dialog.loading.close();
                    dialog.confirm('温馨提示','照片识别失败，请重新拍照或手动输入');
                },1500);
            })
            .always(function () {
                // 不管是成功失败，都会执行
            });
    });
}
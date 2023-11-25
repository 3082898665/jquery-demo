$(function(){
var form=layui.form;
// 定义输入规则
var layer=layui.layer;
form.verify({
    nickname:(value)=>{
        if(value.length>6){
            return '昵称必须在1~6个字符之间！！！';
        }
    }
})
function getuserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:(res)=>{
            if(res.status!=0){
                // 弹窗
                return layui.layer.msg('用户信息获取失败')
            }
            var xixi=res.responseJSON
          console.log(res.database.id);
          form.val('formuserinfo',res.database)
        //   form.val('formuserinfo',)
        }
       
    })
}
getuserinfo()
$('#btnrest').on('click',(e)=>{
e.preventDefault();
getuserinfo();
})
$('.layui-form').on('submit',(e)=>{
    e.preventDefault();
    // console.log($('.layui-card-body [name=nickname').val());
    console.log($('.layui-card-body [name=id]').val());

    $.ajax({
        url:'/my/userinfo',
        method:'POST',
        data:{
            id:$('.layui-card-body [name=id]').val(),
            nickname:$('.layui-card-body [name=nickname').val(),
            email:$('.layui-card-body [name=email').val(),
        },
        success:(res)=>{
         if(res.status!=0){
            return layer.msg(res.message);
         }
         layer.msg(res.message);
         window.parent.getuserinfo();
        }
    })
})
})

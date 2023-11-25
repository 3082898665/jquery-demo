$(function(){
getuserinfo();
})
var layer=layui.layer;
$('#btnlogout').on('click',()=>{
    layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token');
        location.href='/login.html'
        layer.close(index);
      });
    
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
            renderavat(res.database)
        }
       
    })
}
function renderavat(user){
var username=user.nickname||user.username;
console.log(username);
$('#welcome').html('欢迎&nbsp;&nbsp'+username);
if(user.user_pic!=null){
    $('.layui-nav-img').attr('src',user.user_pic);
    $('.text-avatar').hide();
}else{
    $('.layui-nav-img').hide();
    console.log(username)
    var firstword=username[0].toUpperCase();

    $('.text-avatar').html(firstword).show();
}
}
$(function(){
    var form=layui.form;
    // 定义输入规则
    var layer=layui.layer;
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
              form.val('formuserinfo',res.database.id)
            //   form.val('formuserinfo',)
            }
           
        })
    }
    getuserinfo();
    $('#btnrest').on('click',(e)=>{
    e.preventDefault();
    })
    $('.layui-form').on('submit',(e)=>{
        e.preventDefault();
        console.log($('.layui-card-body [name=nickname').val())
        $.ajax({
            url:'/my/updtapwd',
            method:'POST',
            data:{
                oldpwd:$('.layui-card-body [name=oldpwd').val(),
                newpwd:$('.layui-card-body [name=newpwd').val(),
            },
            success:(res)=>{
             if(res.status!=0){
                return layer.msg(res.message);
             }
             layer.msg(res.message);
            }
        })
    })
    })
    
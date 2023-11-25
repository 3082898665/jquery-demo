$(function(){
    $('#link-reg').on('click',function(){
        $('.login-box').hide();
        $('.register-box').show();
    })
    $('#link-login').on('click',function(){
        $('.register-box').hide();
        $('.login-box').show();
    })
    //  获取layui表格内容
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位且不能出现空格'],
        repwd:function(value){
            var pwd=$('.register-box [name=password]').val();
            console.log(value)
            console.log(pwd)
            if(pwd!=value){
                return '两次密码不一致'
            }
        }
    })
    $('#form_reg').on('submit',(e)=>{
        // 阻止默认提交行为
         e.preventDefault();
         $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),
         password:$('#form_reg [name=password]').val()},(res)=>{
            if(res.status!=0){
              return  layer.msg(res.message);
            }
            layer.msg(res.message);
            
         })
         $('#link-login').click()
        })
        $('#form-log').on('submit',(e)=>{
            e.preventDefault();
            $.ajax({
                url:'/api/login',
                method:'POST',
                data:{
                    username:$('#form-log [name=username]').val(),
                    password:$('#form-log [name=password]').val(),
                },
                success:(res)=>{
                    console.log($('#form-log [name=username]').val())
                    if(res.status!=0){
                        return   layer.msg(res.message);
                      }
                      layer.msg(res.message);
                      localStorage.setItem('token',res.token);
                      console.log(res.token);
                      location.href='/myindex.html';
                }
            })
        })
})
// 究极优先级,比ajax请求快，在它的前一步
$.ajaxPrefilter((options)=>{
    console.log(options.url);
    options.url='http://127.0.0.1:8002'+options.url;
    // 设置headers请求头，indexof方法为扫描字符串是否有这个字符
    if(options.url.indexOf('/my')!=-1){
        options.headers={
            Authorization: localStorage.getItem('token') || ""
        }
    }
    // 全局挂载complete回调函数拦截页面的随便调用
    options.complete=(res)=>{
        console.log(res)
        if(res.responseJSON.status==1&&res.responseJSON.message=='错误访问'){
                    // 返回同时删除token以防万一
            location.href='/login.html';
         localStorage.removeItem('token');
        }
    }
})
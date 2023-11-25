$(function(){
    var layer=layui.layer;
    var form=layui.form;
    var laypage = layui.laypage;
//   美化时间的过滤器
     template.defaults.imports.dataFormat=function(date){
        const dt=new Date(date);
    var y=dt.getFullYear();
    var m=dt.getMonth()+1;
    var d=dt.getDate();
    var hh=dt.getHours();
    var min=dt.getMinutes();
    var sc=dt.getSeconds();
    return y+'-'+m+'-'+d+''+hh+':'+min+':'+sc;
     }
     
    var q={
        pagenum:1,
        pagesize:2,
        id:'',
        state:'',
    }
    // 获取文章列表
    initlist();
    function initlist(){
        $.ajax({
            url:'/my/artlist/getlist',
            method:'POST',
            data:q,
            success:(res)=>{
                if(res.status!=0) return layer.msg(res.message);
                var html=template('tpl-table',res);
                console.log(res.data.length);
                $('tbody').html(html);
                difpage(res.data.length)
            }
        })
    }
    // 获取文章分类
    initcate()
   function initcate(){
    $.ajax({
        url:'/my/article/getart',
        method:'GET',
        success:(res)=>{
            if(res.status!=0) return layer.msg(res.message);    
            var html= template('tpl-cate',res)
            $('[name=cate_id]').html(html);
            // 由于这里的layui渲染下拉菜单是没有发现有数据,当ajax请求完成后才有数据
            // 导致下拉菜单没有被渲染，要在后面加一个render方法再让layui渲染一次
            form.render();
        }
        
    })
   }
   $('#form-search').on('submit',function(e){
    e.preventDefault();
      var id=$('[name=cate_id').val();
      console.log(id)
      var state=$('[name=status').val();
      console.log(state);
      q.id=id;
      q.state=state;
      initlist();
   })
   function difpage(number){
    laypage.render({
        elem:'pageBox',
        count:number,
        limit:q.pagesize,
        curr:q.pagenum,
        jump: function(obj,first){
   console.log(obj.curr)
        }
    })
   }
})
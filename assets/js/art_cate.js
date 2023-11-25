$(function(){
    var layer=layui.layer;
    var form=layui.form;
    initart();
    function initart(){
        $.ajax({
            url:'/my/article/getart',
            method:'GET',
            success:(res)=>{
               var html= template('art_table',res);
                //  console.log(res);
             $('tbody').html(html)
            }
        })
    }
    var index=null;
    // 添加文章弹框

    $('#addart').on('click',()=>{
       index= layer.open({
            area:['500px','250px'],
       type:1,
            title: '添加文章分类'
            ,
            content:$('#dialog-add').html()
          });   
     })
    $('body').on('submit','#form-add',(e)=>{
         e.preventDefault();
        console.log($('#form-add [name=alias]').val());
        $.ajax({
            url:'/my/article/addart',
            method:'POST',
            data:{
                name:$('#form-add [name=name]').val(),
                alias:$('#form-add [name=alias]').val(),
            },
             success:(res)=>{
               if(res.status!=0){
                console.log(res.message)
                return layer.msg(res.message);

               } 
               layer.msg(res.message);
               //    根据索引关闭弹框
               layer.close(index);
               initart();
             }
        })
    })
    var indexup=null;
    $('tbody').on('click','.btn-edit',function(){

        var id=$(this).attr('data-id');
        console.log(this);
        indexup= layer.open({
            area:['500px','250px'],
      type:1,
            title: '添加文章分类'
            ,
            content:$('#dialog-edit').html()
          });   
          $.ajax({
            url:'/my/article/getbyid/'+id,
            method:'GET',
            success:function(res){
                if(res.status!=0) return layer.msg(res.message);
                // console.log(res.result[0])
                form.val('formget',res.result[0]);
            }
          })
       })
       $('tbody').on('click','.btn-delect',function(){
        var id=$(this).attr('data-id');
        console.log(id);
        layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
            //do something
           $.ajax({
            url:'/my/article/delart/'+id,
            method:'GET',
            success:(res)=>{
             if(res.status!=0) return layer.msg(res.message);
             layer.msg("删除成功");
             initart(); 
            }
           })
          });
       })
       $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
         console.log($('#form-edit [name=id]').val());
         console.log($('#form-edit [name=name]').val());
         $.ajax({
            url:'/my/article/updatebyid',
            method:'POST',
            data:{
                name:$('#form-edit [name=name]').val(),
                id:$('#form-edit [name=id]').val(),
                alias:$('#form-edit [name=alias]').val(),
            },
            success:(res)=>{
              if(res.status!=0) return layer.msg(res.message);
              layer.msg("更改成功");
              layer.close(indexup);
              initart();
            }
         })
       })

})
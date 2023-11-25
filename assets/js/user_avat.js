   $(function(){
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
          }
         
      })
  }
  getuserinfo()
    // 1.1 获取裁剪区域的 DOM 元素
   var $image = $('#image')
   // 1.2 配置选项
   const options = {
     // 纵横比
     aspectRatio: 1,
     // 指定预览区域
     preview: '.img-preview'
   }
 var layer=layui.layer;
   // 1.3 创建裁剪区域
   $image.cropper(options)
   $('#btnchange').on('click',()=>{
    $('#file').click();
   })
   $('#file').on('change',(e)=>{ 
    var files=e.target.files;
    console.log(files);
    if(files.length===0) layer.msg("请选择图片");
    var filelist=e.target.files[0];
    // 将图片转化为文件路径
    var imgurl=URL.createObjectURL(filelist);
    console.log(imgurl)
    $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', imgurl)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域
   })
   $('#btnload').on('click',()=>{
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      console.log(dataURL);
      $.ajax({
        method:'POST',
        url:'/my/updat/avat',
        data:{avat:dataURL},
        success:(res)=>{
          if(res.status!=0) return layer.msg("更新头像失败");
          layer.msg('成功更换头像');
          window.parent.getuserinfo();
        }
      })
   })
   })
   
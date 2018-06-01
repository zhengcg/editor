<template>
 <div id="rz">
    <div style="color:#303133;font-weight: 700;margin-bottom: 20px;">
        实名认证
    </div>
    <div class="container">
      <div class="articleBox">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="填写信息"></el-step>
          <el-step title="等待审核"></el-step>
          <el-step title="认证成功"></el-step>
        </el-steps>
        <p class="labelTitle">选择认证类型</p>
        <div>
          
          <el-radio v-model="type" label="0" border>个人认证</el-radio>
          <el-radio v-model="type" label="1" border>企业认证</el-radio>
        </div> 
        <div class="box" v-if="type=='0'">
            <p>身份证正、反面照片<span>请上传与注册手机号真实关联的身份证信息</span></p>
            <el-upload
              class="upload-demo" drag action=""  :show-file-list="false">
              <i class="el-icon-picture-outline"></i>
              <div class="el-upload__text">身份证正面</div>
              <div class="imgBox"><img src="" alt=""></div>
            </el-upload>
            <el-upload
              class="upload-demo" drag action=""  :show-file-list="false">
              <i class="el-icon-picture-outline"></i>
              <div class="el-upload__text">身份证反面</div>
              <div class="imgBox"></div>
            </el-upload>
        </div> 
        <div class="box" v-if="type=='1'">
          <p>企业营业执照验证</p>
          <el-upload
              class="upload-demo" drag :action="fileup" 
              :on-success="preview" name="image"  :show-file-list="false">
              <i class="el-icon-picture-outline"></i>
              <div class="el-upload__text">选择文件</div>
              <div class="imgBox"><img :src="base" alt=""></div>
          </el-upload>
          <div style="display:inline-block;height:104px;width:320px;vertical-align:top;margin-top: 20px;">
            <p style="font-size:12px;color:#999;margin-bottom:15px">营业执照清晰可见，照片内容真实有效，不得做任何修改！</p>
            <p style="font-size:12px;color:#999">支持jpg/bmg/gif格式照片，大小不超过2M</p>
          </div>
        </div>
        <div class="box">
          <p style="margin-bottom: 20px;">昵称登记<span>昵称将显示在文章顶部，请登记您的微信公众号名称、或真实姓名、或其他昵称</span></p>
          <el-input v-model="nickName"></el-input>

          
        </div>
        <el-button type="primary">提交认证</el-button> 
        
      </div>
    </div>
    
    
 </div>
</template>
 
<script>
import api from '../api/api';
 export default {
  data() {
   return {
     fileup:api.upload,
     active: 0,
     type:'0',
     nickName:'',
     base:''
    
   }
  },
  computed: {

   
  },
  created(){
    

  },
  mounted() {
   //初始化
     
  },
  methods: {
     preview(response, file, fileList) {
        this.base = response.url;
      }
  
  }

 }
</script>
<style lang="scss">
#rz{
  .el-steps{
    width:80%;
    margin:0 auto 30px auto;
  }
    
  .labelTitle{
    height:40px;
    line-height:40px;
  }
  .box{
    margin:30px 0;
    span{
      margin-left:30px;
      color:#999;
      font-size:12px;
    }
    .upload-demo{
      display:inline-block;
      margin-right:20px;
    }
    .el-upload-dragger{
      display:inline-block;
      margin-top:20px;
      width:170px;
      height:104px;
      .el-icon-picture-outline{
        margin-top:30px
      }
    }
    .imgBox{
      width:170px;
      height:104px;
      position:absolute;
      top:0;
      left:0;
      img{
        width:170px;
        height:104px;
      }
    }
  }
}

</style>
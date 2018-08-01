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
        <div v-if="active==0">
        <p class="labelTitle">选择认证类型</p>
        <div>
          
          <el-radio v-model="type" label="0" border>个人认证</el-radio>
          <el-radio v-model="type" label="1" border>企业认证</el-radio>
        </div> 
        <div class="box" v-if="type=='0'">
            <p>身份证正、反面照片<span>请上传与注册手机号真实关联的身份证信息</span></p>
            <el-upload
              class="upload-demo" drag :action="fileup"  name="File" :data="imgType" :on-success="preview1" :before-upload="beforeAvatarUpload1">
              <i class="el-icon-picture-outline"></i>
              <div class="el-upload__text">身份证正面</div>
              <div class="imgBox" v-show="idZ!==''"><img src="../assets/icon/selected.png" alt=""></div>
            </el-upload>
            <el-upload
              class="upload-demo" drag :action="fileup" name="File" :data="imgType" :on-success="preview2" :before-upload="beforeAvatarUpload2">
              <i class="el-icon-picture-outline"></i>
              <div class="el-upload__text">身份证反面</div>
              <div class="imgBox" v-show="idF!==''"><img src="../assets/icon/selected.png" alt=""></div>
            </el-upload>
        </div> 
        <div class="box" v-if="type=='1'">
          <p>企业营业执照验证</p>
          <el-upload
              class="upload-demo" drag :action="fileup" 
              :on-success="preview"  name="File" :data="imgType" :before-upload="beforeAvatarUpload">
              <i class="el-icon-picture-outline"></i>
              <div class="el-upload__text">选择文件</div>
              <div class="imgBox" v-show="base!==''"><img src="../assets/icon/selected.png" alt=""></div>
          </el-upload>
          <div style="display:inline-block;height:104px;width:320px;vertical-align:top;margin-top: 20px;">
            <p style="font-size:12px;color:#999;margin-bottom:15px">营业执照清晰可见，照片内容真实有效，不得做任何修改！</p>
            <p style="font-size:12px;color:#999">支持jpg/bmg/gif格式照片，大小不超过2M</p>
          </div>
        </div>
        <div class="box">
          <p style="margin-bottom: 20px;">署名登记<span>署名将显示在文章顶部，请登记您的微信公众号名称、或真实姓名、或其他署名</span></p>
          <el-input v-model="nickName" maxlength="16" minlength="2"></el-input>

          
        </div>
        <el-button type="primary" @click="submitFn">提交认证</el-button> 
      </div>
      <div v-if="active==1">
        <div class="statusBox">
            <i class="el-icon-time" style="font-size:40px;color:#409EFF"></i>
            <p>{{info.submitTime}} 提交审核</p>
            <h1>等待审核中</h1>
          </div>       
      </div>
      <div v-if="active==3">
          <div class="statusBox">
            <i class="el-icon-success" style="font-size:40px;color:#409EFF"></i>
            <p>{{info.authTime}} 通过审核</p>
            <h1>认证成功</h1>
          </div>
          <div style="padding:10px 0;width:500px;margin:0 auto;">
            <el-form label-position="right" label-width="80px" :model="info" disabled="true">
              <el-form-item label="认证类型">
                <el-button type="primary" v-if="info.type==1">个人认证</el-button>
                <el-button type="primary" v-if="info.type==2">企业认证</el-button>
              </el-form-item>
              <el-form-item label="姓名" v-if="info.type==1">
                <el-input v-model="info.name"></el-input>
              </el-form-item>
              <el-form-item label="法人姓名" v-if="info.type==2">
                <el-input v-model="info.legalPerson"></el-input>
              </el-form-item>
              <el-form-item label="身份证号"  v-if="info.type==1">
                <el-input v-model="info.idNumber"></el-input>
              </el-form-item>
              <el-form-item label="统一信用代码"  v-if="info.type==2">
                <el-input v-model="info.idNumber"></el-input>
              </el-form-item>
              <el-form-item label="署名登记">
                <el-input v-model="info.authorName"  maxlength="16" minlength="2"></el-input>
                <p style="font-size:12px;color:#999;">（署名将显示在文章顶部，请登记您的微信公众号、或真实姓名、或其他署名）</p>
              </el-form-item>
            </el-form>
          </div>
        
      </div>
      <div v-if="active==2">
        <div class="statusBox">
            <i class="el-icon-circle-close" style="font-size:40px;color:#F56C6C"></i>
            <p>通过不审核，请重新提交署名</p>
            <h1>认证不成功</h1>
          </div>
          <div style="padding:10px 0;width:500px;margin:0 auto;">
            <el-form label-position="right" label-width="80px" >
            <el-form-item label="署名登记">
                <el-input v-model="resetNickName"  maxlength="16" minlength="2"></el-input>
                <p style="font-size:12px;color:#999;">（署名将显示在文章顶部，请登记您的微信公众号、或真实姓名、或其他署名）</p>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
              </el-form-item>
              </el-form>
            
          </div>
        
      </div>
        
      </div>
    </div>
    
    
 </div>
</template>
 
<script>
import api from '../api/api';
 export default {
  data() {
   return {
     fileup:api.fileup,
     active: -1,
     type:'0',
     nickName:'',
     imgType:{type:1},
     idZ:'',
     idF:'',
     base:'',
     info:{},
     resetNickName:''
    
   }
  },
  computed: {

   
  },
  created(){
    this.getStatus() 
    
    

  },
  mounted() {
   //初始化
     
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

     
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    beforeAvatarUpload1(file) {
      const isLt2M1 = file.size / 1024 / 1024 < 2;

     
      if (!isLt2M1) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M1;
    },
    beforeAvatarUpload2(file) {
      const isLt2M2 = file.size / 1024 / 1024 < 2;

     
      if (!isLt2M2) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M2;
    },
    preview(response, file, fileList) {
        this.base = response.result[0];
    },
    preview1(response, file, fileList) {
      this.idZ = response.result[0];
    },
    preview2(response, file, fileList) {
      this.idF = response.result[0];
    },
    submitForm:function(){
      var self=this;
      if(self.resetNickName!==""&&self.resetNickName.length>=2){
         const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'post',
            url:api.sendRZ,
            data:{authorName:self.resetNickName}   
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.$message({
                  message:"提交成功",
                  type: 'success'
                });
               self.getStatus()                          
              }else{
                loading.close();
                self.$message({
                      message:res.data.message,
                      type: 'warning'
                    });        
              }              
            }).catch(function (error) {
                loading.close();         　　
            });

      }else{
        self.$message({
                      message:"请填写2-16个字符的用户署名",
                      type: 'warning'
                    });     

      }
     


    },
    getInfo:function(){
      var self=this;
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.validInfo     
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.info=res.data.result;                              
              }else{
                loading.close();
                self.$message({
                      message:res.data.message,
                      type: 'warning'
                    });        
              }              
            }).catch(function (error) {
                loading.close();         　　
            });

    },
    submitFn:function(){
      var self=this;
      if(self.validateFn()){
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var submitData={
          authorName:self.nickName,
          idCardFront:self.idZ,
          idCardBack:self.idF,
          businessLicence:self.base,
          type:parseInt(self.type)+1

        }
       
        self.axios({
          method: 'post',
          url:api.submitRZ,
          data:submitData   
        }).then(function (res) {
            if(res.data.code==200){
             loading.close();
             self.$message({
                message:"提交成功",
                type: 'success'
              });
             self.getStatus() 
             
            }else{
              loading.close();
              self.$message({
                    message:res.data.message,
                    type: 'warning'
                  });
        
            }
              
          }).catch(function (error) {
          　　
          });
        

      }

    },
    getStatus:function(){
      var self=this;  
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });      
      self.axios.get(api.getUserStatus).then(function (res) {
        if(res.data.code==200){
          loading.close();
          // self.info=res.data.result;
          var authStatus=res.data.result.authStatus;
              if(authStatus>=0){
                if(authStatus==0){
                  self.active=1
                }else if(authStatus==2){
                  self.active=3
                }else if(authStatus==1){
                  self.active=2
                }

                self.getInfo();

              }else{
                self.active=0
              }
          
        }else{
          loading.close();
          self.$message({
                message:res.data.message,
                type: 'warning'
          });   
          
        }
            
      }).catch(function (error) {
      　　
      });
    },
    validateFn:function(){
      var self=this;
      var flag=false;
      if(self.type=='0'){
        if(self.idZ==""){
          flag=false;
          self.$message({
            message: '请上传身份证正面照',
            type: 'warning'
          });
        }else if(self.idF==""){
          flag=false;
          self.$message({
            message: '请上传身份证反面照',
            type: 'warning'
          });

        }else if(self.nickName==""){
          flag=false;
          self.$message({
            message: '请填写署名',
            type: 'warning'
          });

        }else if(self.nickName.length<2){
          flag=false;
          self.$message({
            message: '署名长度为2-16个字符',
            type: 'warning'
          });

        }else{
          flag=true;
        }
      }else{
        if(self.base==""){
          flag=false;
          self.$message({
            message: '请上传企业营业执照',
            type: 'warning'
          });

        }else if(self.nickName==""){
          flag=false;
          self.$message({
            message: '请填写署名',
            type: 'warning'
          });

        }else if(self.nickName.length<2){
          flag=false;
          self.$message({
            message: '署名长度为2-16个字符',
            type: 'warning'
          });

        }else{
          flag=true;
        }
      }
      return flag; 


    }
  
  }

 }
</script>
<style lang="scss">
#rz{
  .statusBox{
    padding:20px 0;
    text-align:center;
    p{
      color:#999;
      font-size:12px;
      margin:15px 0;
    }
    h1{
      font-size:18px;
      color:#333;
    }
  }
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
      line-height:104px;
      position:absolute;
      background:#fff;
      top:0;
      left:0;
      img{
        position:absolute;
        left:50%;
        top:50%;
        margin-left:-64px;
        margin-top:-64px;
        width:128px;
        height:128px;
      }
    }
  }
}

</style>
<template>
<div class="login">
      <div id="header">
        <div class="logoDiv"><img src="../assets/icon/logo.png" alt=""></div>
        <div class="titHead">IPXE 区块链管理后台</div>          
      </div>
      <div class="formBox">
        <div class="inputBox">
          <el-input placeholder="请输入手机号" v-model="telPhone" class="input-with-select" maxlength="11"  @keyup.enter.native="register">
            <el-select v-model="quCode" slot="prepend" placeholder="请选择">
              <el-option label="+86" value="+86"></el-option>
            </el-select>
          </el-input>       
        </div>
        <div class="inputBox" v-if="isShowCode">
          <el-input placeholder="请输入验证码" v-model="tuCode" class="input-with-select"  @keyup.enter.native="register">
            <el-button slot="append" @click="changeCode"><img :src="codeUrl" alt=""></el-button>
          </el-input>
        </div>
        <div class="inputBox">
          <el-input placeholder="请输入短信验证码" v-model="yanCode" class="input-with-select"  @keyup.enter.native="register">
            <el-button slot="append" @click="sendCode">{{text}}</el-button>
          </el-input>
        </div>
        <div class="inputBox">
          <el-input
            placeholder="请请输入8-16位数字与字母的组合密码"
            v-model="password" type="password"   @keyup.enter.native="register"
            clearable>
          </el-input>
        </div>
        <!-- <div class="inputBox">
          <el-input
            placeholder="邀请码，必填"
            v-model="yCode" type="text"
            clearable>
          </el-input>
        </div> -->
        <div class="inputBox" style="margin-top: 20px;">
          <el-button type="primary" style="width:360px;" @click="register">注册</el-button>
        </div>
        <div class="inputBox">
          <el-button  style="width:360px;" @click="gotoLog">登录</el-button>
        </div>      
      </div>      

</div>
</template>

<script>
import api from '../api/api';
export default {
  data () {
    return {
          telPhone:'',
          quCode: '+86',
          tuCode:'',
          yanCode:'',
          yCode:'',
          password:'',
          codeUrl:'',
          isShowCode:true,
          sjs:'',
          text:"获取验证码",
          ableBtn:true
    }
  },
  created(){
    this.getCode()
    
  },
  methods:{
    // 生成6位随机数
    MathRand:function ()
      {
          var Num="";
          for(var i=0;i<6;i++)
          {
              Num+=Math.floor(Math.random()*10);
          }
          return "provider_"+Num
      },
    // 手机号验证
     isPoneAvailable: function (pone) {  
       var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;  
       if (!myreg.test(pone)) {  
         return false;  
       } else {  
         return true;  
       }  
     }, 
     getCode:function(){
      var self=this; 
      self.sjs=self.MathRand()
      // self.axios.get(api.getCode,{params:{method:"register",deviceId:self.sjs}}).then(function (res) {
      //   if(res.data.code==200){
      //    self.codeUrl=res.data.result
      //   }else{
      //     self.$message({
      //       message:res.data.message,
      //       type: 'error'
      //     });
      //   }
            
      // }).catch(function (error) {
      // 　　
      // });
      var url=window.location.href.split("#")[0];

      self.codeUrl=url+'pro/validateCode?method=register&deviceId='+self.sjs
    }, 
     sendCode:function(){
      var self=this;

      if(self.isPoneAvailable(self.telPhone)){

        if(self.tuCode!==""){
          if(self.ableBtn){
            const loading=self.$loading({
              lock: true,
              text: '请求中……',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
        self.axios({
          method: 'post',
          url:api.sendCode,
          params:{mobile:self.telPhone,validateCode:self.tuCode,method:"register",deviceId:self.sjs}         
        }).then(function (res) {
            if(res.data.code==200){
             loading.close();
             self.countDown()
             self.$message({
                message:res.data.message,
                type: 'success'
              });
            }else{
              loading.close();
              self.$message({
                message:res.data.message,
                type: 'error'
              });
            }
              
          }).catch(function (error) {
          　　
          });
        
        }
          

        }else{
          self.$message({
            message: '请输入验证码',
            type: 'warning'
          });

        }
        

      }else{
        self.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
      }


     },
     countDown:function(){
      var self=this;
      var i=60;
      setInterval(function(){
        if(i>0){
          i--
          self.text=i+'s';

        }else{
          self.ableBtn=true;
          self.text="获取验证码"

        }
                
      },1000)

     },
     register:function(){
      var self=this;
      if(self.validateFn()){
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
          method: 'post',
          url:api.register,
          params:{
            mobile:self.telPhone,
            validateCode:self.tuCode,
            mobileValidateCode:self.yanCode,
            password:self.password
            // yCode:self.yCode
          }         
        }).then(function (res) {
            if(res.data.code==200){
             loading.close();
             self.$confirm(res.data.message, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success'
                }).then(() => {
                  self.$router.push({
                     path: '/login'
                    })
                }).catch(() => {
                       
                });
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
     gotoLog:function(){
      var self=this;
      self.$router.push({
       name:'login'
     })
    },
    changeCode:function(){
      // this.codeUrl='http://smart.mingmai.com/servlet/validateCodeServlet?'+new Date().getTime()
      this.getCode();

    },
    validateFn:function(){
      var flag=false;
      var self=this;
      if(!self.isPoneAvailable(self.telPhone)){
        flag=false;
        self.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
      }
      else if(self.tuCode==""){
        flag=false;
        self.$message({
          message: '请输入验证码',
          type: 'warning'
        });
      }
      else if(self.yanCode==""){
        flag=false;
        self.$message({
          message: '请输入短信验证码',
          type: 'warning'
        });
      }else if(self.password==""){
        flag=false;
        self.$message({
          message: '请输入密码',
          type: 'warning'
        });
      }
      // else if(self.yCode==""){
      //   flag=false;
      //   self.$message({
      //     message: '请输入邀请码',
      //     type: 'warning'
      //   });
      // }
      else{
        var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/g;
         if(reg.test(self.password)){
          flag=true;
        }else{
          flag=false;
          self.$message({
            message: '密码必须为8-16位数字与字母组合',
            type: 'warning'
          });

        }
      }

      return flag;
    }

  }
}
</script>

<style lang="scss">


</style>

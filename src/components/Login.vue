<template>
<div class="login">
      <div id="header">
        <div class="logoDiv"><img src="../assets/icon/logo.png" alt=""></div>
        <div class="titHead">IPXE 区块链管理后台</div>          
      </div>
      <div class="formBox">
        <div class="inputBox">
          <el-input placeholder="请输入手机号" v-model="telPhone" class="input-with-select" maxlength="11"  @keyup.enter.native="submit">
            <el-select v-model="quCode" slot="prepend" placeholder="请选择">
              <el-option label="+86" value="+86"></el-option>
            </el-select>
          </el-input>       
        </div>
        
        <div class="inputBox">
          <el-input
            placeholder="请输入8-16位数字与字母的组合密码"
            v-model="password" type="password"  @keyup.enter.native="submit"
            clearable>
          </el-input>
        </div>
        <div class="inputBox" v-if="isShowCode">
          <el-input placeholder="请输入验证码" v-model="yanCode" class="input-with-select"  @keyup.enter.native="submit">
            <el-button slot="append" @click="changeCode"><img :src="codeUrl" alt=""></el-button>
          </el-input>
        </div>
        <div class="inputBox" style="margin-top: 20px;">
          <el-button type="primary" style="width:360px;" @click="submit">登录</el-button>
        </div>
        <div class="inputBox">
          <el-button  style="width:360px;" @click="gotoReg">注册</el-button>
        </div> 
        <div style="text-align: right;padding-right: 20px;margin-top: 5px;"><a @click="gotoForPa" href="javascript:;" style="text-decoration: none;color: #999">忘记密码</a></div>    
      </div>	    

</div>
</template>

<script>
import api from '../api/api';
// http://smart.mingmai.com/servlet/validateCodeServlet
export default {
  data () {
    return {
          telPhone:'',
          quCode: '+86',
          yanCode:'',
          password:'',
          codeUrl:'',
          isShowCode:false
    }
  },
  methods:{
    // 手机号验证
     isPoneAvailable: function (pone) {  
       var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
       if (!myreg.test(pone)) {  
         return false;  
       } else {  
         return true;  
       }  
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
      }else if(self.password==""){
        flag=false;
        self.$message({
          message: '请输入密码',
          type: 'warning'
        });
      }else{
          flag=true;       
      }
      return flag;
    },
  	submit:function(){
      var self=this; 		
      var submitData={
        username:self.telPhone,
        password:self.password,
        mobileLogin:true
      };
      if(self.isShowCode){
        submitData.imgCode=self.yanCode;
        submitData.method="login";
        submitData.deviceId=self.sjs;
      }
       if(self.validateFn()){  
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
          method: 'get',
          url:api.login,
          params:submitData        
        }).then(function (res) {
         
           
            if(res.data.code==200){
             loading.close();
             self.$store.commit("login", res.data.result.provider_sid);            

                  // var path = self.$route.query.redirect;
                  // if(path){
                  //   self.$router.push({
                  //     path: path
                  //   })
                  // }else{
                  //   self.$router.push({
                  //    path: '/'
                  //   })
                  // } 
                  self.$router.push({
                     path: '/'
                    })            
            }else{
              loading.close();
                    
              self.$message({
                    message:res.data.message,
                    type: 'warning'
                  });  
                if(res.data.result.needValidateCode){
                  self.isShowCode=res.data.result.needValidateCode
                  if(self.isShowCode){
                    self.getCode()
                  }

              }       
            }

                   
          }).catch(function (error) {
              loading.close();         　　
          });
        }

  	},
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
    getCode:function(){
      var self=this; 
      self.sjs=self.MathRand()
      // self.axios.get(api.getCode,{params:{method:"login",deviceId:self.sjs}}).then(function (res) {
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
      self.codeUrl='http://smart.mingmai.com/pro/validateCode?method=login&deviceId='+self.sjs

    }, 
    gotoReg:function(){
      var self=this;
      self.$router.push({
       name:'register'
     })

    },
    gotoForPa:function(){
      var self=this;
      self.$router.push({
       name:'forPa'
     })

    },
    changeCode:function(){
      this.getCode();

    }
  }
}
</script>

<style lang="scss">


</style>

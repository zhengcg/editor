<template>
<div class="register">
      <div class="formBox">
        <div class="logo">LOGO</div>
        <div class="inputBox" style="margin-top:30px;">
          <el-input placeholder="请输入手机号" v-model="telPhone" class="input-with-select">
            <el-select v-model="quCode" slot="prepend" placeholder="请选择">
              <el-option label="+86" value="+86"></el-option>
              <el-option label="+852" value="+852"></el-option>
              <el-option label="+853" value="+853"></el-option>
            </el-select>
          </el-input>       
        </div>
        <div class="inputBox">
          <el-input placeholder="请输入短信验证码" v-model="yanCode" class="input-with-select" >
            <el-button slot="append">获取验证码</el-button>
          </el-input>
        </div>
        <div class="inputBox">
          <el-input
            placeholder="请输入密码"
            v-model="password" type="password"
            clearable>
          </el-input>
        </div>
        <div class="inputBox">
          <el-input
            placeholder="邀请码，必填"
            v-model="yCode" type="text"
            clearable>
          </el-input>
        </div>
        <div class="inputBox" style="margin-top: 20px;">
          <el-button type="primary" style="width:360px;">注册</el-button>
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
          yanCode:'',
          yCode:'',
          password:''
    }
  },
  methods:{
    submitForm:function(){
      var self=this;
      if(self.loginData.username==""||self.loginData.password==""){
        alert("用户名和密码不能为空") 
 
      }else{
        self.$store.commit("login", self.loginData.username)
                        var path = self.$route.query.redirect;
                        if(path){
                          self.$router.push({
                            path: path
                          })
                        }else{
                          self.$router.push({
                           path: '/'
                          })

                        }

        // this.axios.post(api.login, {loginName:self.loginData.username,password:self.loginData.password})
     //                .then(response => {
     //                 if(response.data.errorCode=="0"){
     //                   self.$store.commit("login", self.loginData.username)
     //                   var path = self.$route.query;
     //                   if(path){
     //                     self.$router.push({
     //                       path: path.redirect
     //                     })

     //                   }else{
     //                     self.$router.push({
      //                     path: '/'
      //                    })

     //                   }
                
                        
     //                 }else{
     //                   alert("报错了")
     //                 }                        
     //       })
      }
    },
     gotoLog:function(){
      var self=this;
      self.$router.push({
       name:'login'
     })

    }
  }
}
</script>

<style lang="scss">
.register{
  height:100%;
  background:#B3C0D1;
  position:relative;
  .formBox{
    border-radius:5px;
    .logo{
      width:100px;
      height:100px;
      text-align:center;
      line-height:100px;
      border-radius:50%;
      border:1px solid #666;
      margin:0 auto;
    }
    position:absolute;
    width:400px;
    height:500px;
    left:50%;
    top:50%;
    margin:-250px 0 0 -200px;
    padding-top:30px;
    background:#fff;
    .inputBox{
      padding:15px 20px 0 20px!important;
      .el-button{
        display:block;
        a{
          text-decoration: none;
          color: #666;
          display: block;
        }

      }
    }
    .el-select .el-input--suffix{width:100px;}
  }

}

</style>

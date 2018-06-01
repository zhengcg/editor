<template>
<div class="login">
      <div class="formBox">
        <div class="logo">LOGO</div>
        <div class="inputBox" style="margin-top:30px;">
          <el-input placeholder="请输入手机号" v-model="telPhone" class="input-with-select">
            <el-select v-model="quCode" slot="prepend" placeholder="请选择">
              <el-option label="+86" value="+86"></el-option>
            </el-select>
          </el-input>       
        </div>
        
        <div class="inputBox">
          <el-input
            placeholder="请输入密码"
            v-model="password" type="password"
            clearable>
          </el-input>
        </div>
        <div class="inputBox" v-if="isShowCode">
          <el-input placeholder="请输入验证码" v-model="yanCode" class="input-with-select" >
            <el-button slot="append" @click="changeCode"><img :src="codeUrl" alt=""></el-button>
          </el-input>
        </div>
        <div class="inputBox" style="margin-top: 20px;">
          <el-button type="primary" style="width:360px;" @click="submitForm">登录</el-button>
        </div>
        <div class="inputBox">
          <el-button  style="width:360px;" @click="gotoReg">注册</el-button>
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
          password:'',
          codeUrl:'http://smart.mingmai.com/servlet/validateCodeServlet',
          isShowCode:false
    }
  },
  methods:{
  	submitForm:function(){
  		var self=this;
      var submitData={
        username:self.telPhone,
        password:self.password,
        mobileLogin:true
      };
      if(self.isShowCode){
        submitData.validateCode=self.yanCode
      }
  		if(self.telPhone==""||self.password==""){
        self.$message({
          message: '用户名和密码不能为空',
          type: 'warning'
        });
  		}else{
        // self.$store.commit("login", self.telPhone)
        //                 var path = self.$route.query.redirect;
        //                 if(path){
        //                   self.$router.push({
        //                     path: path
        //                   })
        //                 }else{
        //                   self.$router.push({
        //                    path: '/'
        //                   })

        //                 }


  			// this.axios.post(api.login, data:submitData)
        this.axios({
          method: 'post',
          url:api.login,
          params: submitData
        }).then(response => {
          self.isShowCode=response.data.result.needValidateCode
                    	if(response.data.code=="200"){
                    		self.$store.commit("login", self.loginData.username)
                    		var path = self.$route.query;
                    		if(path){
                    			self.$router.push({
      				            	path: path.redirect
      				          	})

                    		}else{
                    			self.$router.push({
    				            	 path: '/'
    				          		})

                    		}
				  			
                        
                    	}else{
                    		self.$message({
                          message:response.data.message,
                          type: 'warning'
                        });
                    	}                        
       		})
  		}
  	},
    gotoReg:function(){
      var self=this;
      self.$router.push({
       name:'register'
     })

    },
    changeCode:function(){
      this.codeUrl='http://smart.mingmai.com/servlet/validateCodeServlet?'+new Date().getTime()

    }
  }
}
</script>

<style lang="scss">
.login{
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
      padding:20px 20px 0 20px;
      .el-input-group__append{
        .el-button{
          padding:0;
          width:70px;
        }
      }
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

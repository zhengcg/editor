<template>
 <div id="personalInfo">
  <div class="container">
    <div class="listBox">
      <a href="javascript:;"><span>手机号</span>{{info.mobile
}}</a>
    </div>
    <div class="listBox"><a href="javascript:;" @click="dialogVisible = true"><span>密码</span>修改</a></div>
    <div class="listBox">
      <router-link :to="{name:'personalAuth'}"><span>实名认证</span><em v-if="info.authStatus==1||info.isSubmit==1" style="font-style: normal">未认证，立即认证获得IPE收益</em><em v-if="info.authStatus==0" style="font-style: normal">待审核</em><em v-if="info.authStatus==2" style="font-style: normal">已认证</em></router-link>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="inputBox">
          <el-input
            placeholder="旧密码"
             type="password"
            clearable v-model="oldPassword">
          </el-input>
      </div>
      <div class="inputBox">
          <el-input
            placeholder="新密码"
             type="password"
            clearable v-model="newPassword">
          </el-input>
      </div>
      <div class="inputBox">
          <el-input
            placeholder="确认新密码"
             type="password"
            clearable v-model="confirmPassword">
          </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePwd">确 定</el-button>
      </span>
    </el-dialog>
    </div>
 </div>
</template>
 
<script>
import api from '../api/api';
 export default {
  data() {
   return {
     dialogVisible: false,
     info:{},
     oldPassword:'',
     newPassword:'',
     confirmPassword:''
    
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
   handleClose(done) {
      done();
    },
    updatePwd:function(){
      var self=this;  
      if(self.validateFn()){
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        }); 
        self.axios({
            method: 'get',
            url:api.updatePassword,
            params:{
              oldPassword:self.oldPassword,
              newPassword:self.newPassword
            }        
          }).then(function (res) {
        if(res.data.code==200){
          loading.close();
          self.dialogVisible=false;
          self.$message({
                message:"密码修改成功",
                type: 'warning'
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
    validateFn:function(){
      var self=this;
      var flag=false;
      if(self.oldPassword==""){
        flag=false;
        self.$message({
          message: '请输入原始密码',
          type: 'warning'
        });
      }else if(self.newPassword==""){
        flag=false;
        self.$message({
          message: '请输入新密码',
          type: 'warning'
        });
      }else if(self.confirmPassword==""){
        flag=false;
        self.$message({
          message: '请确认新密码',
          type: 'warning'
        });
      }else if(self.confirmPassword!==self.newPassword){
        flag=false;
        self.$message({
          message: '确认密码不一致',
          type: 'warning'
        });
      }else{
        var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/g;
         if(reg.test(self.newPassword)){
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
          self.info=res.data.result;
          
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
 
   
  }

 }
</script>
<style lang="scss">
#personalInfo{
  .listBox{
    height: 100px;
    line-height: 100px;
    text-align: right;
    border:1px solid  #e6e6e6;
    padding: 0 30px;
    margin-bottom: 30px;
    a{
      display: block;
      line-height: 100px;
      color: #333;
      text-decoration: none;
      span{
        float: left;
      }
    }
  }
  .inputBox{
    margin-bottom: 20px;
  }

}
</style>
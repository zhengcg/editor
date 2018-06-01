<template>
 <div id="personalInfo">
  <div class="container">
    <div class="listBox">
      <a href="javascript:;"><span>手机号</span>1515****1561</a>
    </div>
    <div class="listBox"><a href="javascript:;" @click="dialogVisible = true"><span>密码</span>修改</a></div>
    <div class="listBox">
      <router-link :to="{name:'personalAuth'}"><span>实名认证</span>未认证</router-link>
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
            clearable>
          </el-input>
      </div>
      <div class="inputBox">
          <el-input
            placeholder="新密码"
             type="password"
            clearable>
          </el-input>
      </div>
      <div class="inputBox">
          <el-input
            placeholder="确认新密码"
             type="password"
            clearable>
          </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
     dialogVisible: false
    
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
    gotoTab:function(){
      var self=this;
      self.$router.push({
       name:'personalAuth'
     })
    },
   handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
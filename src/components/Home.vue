
<template>
  <div id="home">
        <div id="header">
          <div class="logoDiv"><img src="../assets/icon/logo.png" alt=""></div>
          <div class="titHead">IPXE 区块链管理后台</div>
          <div style="float: right;padding-right: 30px;">
            <el-dropdown  @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 15px;color:#fff"></i>
              
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a" >我的</el-dropdown-item>
                <el-dropdown-item command="b">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span v-if="info.authorName">{{info.authorName}}</span>
            <span v-else>{{info.mobile}}</span>
            
          </div>
        </div>
        <div id="aside">
          <el-menu :default-active="$route.path" @select="handleSelect" v-if="info.authStatus==2">
              <el-menu-item index="/home/articleManagement">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">文章管理</span>
              </el-menu-item>
              <el-menu-item  index="/home/myAssets">
                <i class="el-icon-sold-out"></i>
                <span slot="title">我的收益</span>
              </el-menu-item>
            </el-menu>
        </div>
        <div id="main">
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  name: 'home',
  data () {
    return {
      name:"",
      info:{}
    }
  },
  created(){
    this.getStatus()
    
  },
  mounted(){    
    
  },
  computed: {

  },
  methods:{
      logout:function(){
        var self=this;
        this.$confirm('你确认要退出吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.axios.get(api.logout).then(function (res) {
            if(res.data.code==200){
              self.$store.commit("logout");
              self.$router.push({
                path: '/login'
                // query: {redirect: self.$router.currentRoute.fullPath}  
              }) 
            }else{
              self.$message({
                    message:res.data.message,
                    type: 'warning'
              });   
              
            }
                
          }).catch(function (error) {
          　　
          });

          
        }).catch(() => {
                 
        });       
              
      },
      handleCommand:function(command) {
        var self=this;
        if(command=='b'){
          self.logout()
        }else{
          self.$router.push({
            name:'personalInfo',
            
          }) 

        }
      },
      handleSelect:function(select){
        var self=this;
        self.$router.push({
            path:select
          })        
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
          if(self.info.authStatus!==2&&self.$router.currentRoute.fullPath=='/home/myAssets'){
            self.$router.push({
                name:'personalInfo',
                
              }) 

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
    }
 
  }
}
</script>

<style lang="scss">
#aside{
  display: block;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width:160px;
  background-color: #B3C0D1;
  .el-menu-item.is-active{
     background:#ecf5ff;
  }
}
#main{
  // position: absolute;
  margin-left:160px;
  padding-top:60px;
  overflow-y:auto;
  transition: left .3s ease-in-out;
  background: #f0f0f0;
  min-height:100%;
  box-sizing:border-box;
  .content{
    padding:20px;
    .el-breadcrumb{
      margin-bottom:20px;
    }
    .container{
      padding: 30px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  }
}



</style>

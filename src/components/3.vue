
<template>
  <div id="home">
      <el-container style="height:100%">
        <el-header style="text-align: right; font-size: 12px;padding-right:30px;">
          <div class="logoDiv">LOGO</div>
          <div class="titHead">IPTrade 区块链管理后台</div>
          <el-dropdown  @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a" >认证中心</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu :default-active="$route.path" @select="handleSelect">
              <el-menu-item index="/home/articleManagement">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">文章管理</span>
              </el-menu-item>
              <el-menu-item  index="/home/myAssets">
                <i class="el-icon-sold-out"></i>
                <span slot="title">我的资产</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  name: 'home',
  data () {
    return {
      name:""
    }
  },
  created(){
    
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
          self.$store.commit("logout")
          self.$router.push({
            path: '/login',
            query: {redirect: self.$router.currentRoute.fullPath}  
          }) 
        }).catch(() => {
                 
        });       
              
      },
      handleCommand:function(command) {
        var self=this;
        if(command=='b'){
          self.logout()
        }else{
          self.$router.push({
            name:'personalAuth'
          }) 

        }
      },
      handleSelect:function(select){
        var self=this;
        self.$router.push({
            path:select
          })        
      }
  }
}
</script>

<style lang="scss">
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding:0;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-menu-item.is-active{
     background:#ecf5ff;
  }
  .el-main {
    background-color: #fff;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .logoDiv{
    width:200px;
    background:#409EFF;
    color:#fff;
    float:left;
    text-align:center;
  }
  .titHead{
    float:left;
    padding-left:30px;
    font-size:18px;
  }


</style>

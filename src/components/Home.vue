
<template>
  <div id="home">
        <div id="header">
          <div class="logoDiv">LOGO</div>
          <div class="titHead">IPTrade 区块链管理后台</div>
          <div style="float: right;padding-right: 30px;">
            <el-dropdown  @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a" >认证中心</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
          </div>
        </div>
        <div id="aside">
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
#header{
  height:60px;
  line-height:60px;
  position:relative;
  padding:0;
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  .logoDiv{
    width:200px;
    background:#409EFF;
    color:#fff;
    float:left;
    text-align:center;
    height:60px;
    line-height:60px;
  }
  .titHead{
    float:left;
    padding-left:30px;
    font-size:18px;
    height:60px;
    line-height:60px;
  }
}
#aside{
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  width:200px;
  background-color: #B3C0D1;
  .el-menu-item.is-active{
     background:#ecf5ff;
  }
}
#main{
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  transition: left .3s ease-in-out;
  background: #f0f0f0;
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

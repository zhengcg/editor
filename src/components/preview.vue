<template>
 <div id="preview">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ name: 'articleManagement' }">文章管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>预览文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listDiv">
      <div class="box">
        <div class="imgBox"></div>
        <p>迅雷发布区块链应用“迅雷链”：拥有百万级并发处理能力</p>
        <p style="text-align: right;"><span>周日 00:00</span></p>
      </div>
    </div>
    <div class="articleDiv">
      <div class="header">迅雷发布区块链应用“迅雷链”：拥有百万级并发处理能力</div>
      <div class="info">
        <span>作者姓名就是我呀</span>
        <span>今天</span>
      </div>
      <div class="article">
        黄金卡是否会尽快发货速度快放假还是开发商的苏菲的世界反馈都是
      </div>
    </div>
      
 </div>
</template>
 
<script>
import api from '../api/api';
 export default {
  data() {
   return {
    
   }
  },
  computed: {
    
   
  },
  created(){
    var id=this.$route.query.id;


  },
  mounted() {
   //初始化
     
  },
  methods: {
    
  }

 }
</script>
<style lang="scss">
#preview{
  .listDiv,.articleDiv{
      background: #fff;     
      width:320px;
      float: left;
      height: 500px;
      margin-right:30px;
      position:relative;
        .box{
              font-size:14px;
              padding-bottom:20px;
              border: 1px solid #ddd;
              width:280px;
              margin-top:20px;
              margin-left:auto;
              margin-right:auto;
              .imgBox{
                height:158px;
                background:#f0f0f0;
              }
              p{
                  padding:0 20px;
                  color:#333;
                  margin-top:20px;
                  line-height:1.5;
                  span{
                    color:#999;
                    font-size:12px;
                  }
                }
            }
      .header{
        padding:20px;
        color:#333;
        font-size:16px;
      }
      .info{
        padding:0 20px;
        font-size:12px;
        color:#999;
        span{
          margin-right:30px;
        }
      }
      .article{
        color:#333;
        font-size:14px;
        margin-top:30px;
      }

  }


  

}
</style>
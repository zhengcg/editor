<template>
 <div id="preview">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'articleManagement' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>预览文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <div class="yBox yList">
          <div class="box">
            <div class="imgBox"><img :src="info.coverImg"/></div>
            <p>{{info.title}}</p>
            <p style="text-align: right;padding-bottom:20px"><span>{{info.addTime}}</span></p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <div class="yBox yDetail">
          <div class="header">{{info.title}}</div>
          <div class="info">
            <span>{{info.nickName}}</span>
            <span>{{info.addTime}}</span>
          </div>
          <div class="article" v-html="info.content"></div>
          <div class="smBox">
            <span>声明：本作品已被IPXE区块链记录，不可篡改！</span>
            <p style="float: right;margin-top:0">阅读0000</p>
          </div>
          <div class="commentDiv">评论</div>
          <div class="botBox">
            <span style="padding-left: 20px">优质评论最高可获得0.5个水晶</span>
            
            <a href="javascript:;" >上链查询</a>
            <span style="float:right"><i class="icon-heart"></i><em style="vertical-align: middle;font-style: normal">00</em></span>
          </div>
          
        </div>
      </el-col>
    </el-row>
      
 </div>
</template>
 
<script>
import api from '../api/api';
 export default {
  data() {
   return {
    info:{}
    
   }
  },
  computed: {
    
   
  },
  created(){
    var id=this.$route.query.id;
    this.getInfo(id)
  },
  mounted() {
   //初始化
     
  },
  methods: {
    getInfo:function(id){
      var self=this;
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.viewArticle,
            params:{id:id}        
          }).then(function (res) {
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
                loading.close();         　　
            });

    }
    
  }

 }
</script>
<style lang="scss">
#preview{
  .yBox{
    background:#fff;
    border-radius:5px;
    position:relative;
    margin-bottom:20px;
  }
  .yList{
    padding:20px;
    .box{
      border:1px solid #ddd;
      border-radius:5px;
      overflow:hidden;
      .imgBox{
        background:#f0f0f0;
        img{
          width:100%;
        }
      }
      p{
        padding:0 20px;
        color:#333;
        margin-top:20px;
        line-height:1.5;
        font-size:14px;
        span{
          color:#999;
          font-size:12px;
        }
      }

    }
  }
  .yDetail{
    .header{
      padding:20px;
      color:#333;
      font-size:16px;
      line-height:30px;
       font-weight:bolder;
    }
    .info{
      padding:0 20px;
      font-size:12px;
      color:#999;
      span{
        margin-right:30px;
      }
    }
    .botBox{
      font-size:10px;
      height:30px;
      line-height:30px;
      color:#999;
      a{
        display:block;
        float:right;
        height:30px;
        background-color:#bbb;
        color:#fff;
        text-decoration:none;
        padding:0 20px;
        margin-left:20px
      }
    }
    .commentDiv{
      text-align:center;
      margin-top:20px;
      color:#666;
      font-size:14px;
      height:30px;
      line-height:30px;
      border-top:1px solid #ddd;
      border-bottom:1px solid #ddd;
    }
    .smBox{
      font-size:10px;
      color:#999;
      padding:10px 20px;
      p{
        text-align:right;
        margin-top:20px;
      }
    }
    .article{
      padding:0 20px;
      margin-top:20px;
      img{
        max-width:100%
      }

    }
    // .article{
    //     color:#333;
    //     font-size:14px;
    //     margin-top:30px;
    //     color:#666;
    //     line-height:1.5;
    //     padding-bottom:20px;
    //     p,div,h1,h2,h3,h4,h5,h6,h7{
    //       padding:0 20px;
    //     }
    //     ol,ul{
    //       margin-left:20px;
    //     }
    //     pre{
    //       word-break: break-all;
    //       padding: 20px;
    //       white-space: normal;
    //       background-color: #23241f;
    //       color: #f8f8f2;
    //       font-size:12px;
    //     }
    //     img{
    //       display:block;
    //       margin:10px auto;
    //       max-width:100%;
    //     }

    //   }
  }






  

}
</style>
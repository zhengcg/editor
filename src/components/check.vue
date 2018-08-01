<template>
 <div id="check">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'articleManagement' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container"  v-if="info.article">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="tjBox"  v-if="stat.refreshTime">
              <ul>
                <li>
                  <span>截止{{stat.refreshTime}}</span>
                  <a href="javascript:;" @click="getStat">
                    <i class="el-icon-refresh"></i>
                  </a>
                </li>
                <li>
                  <span>本文章总收益</span>
                  <em  style="font-style: normal;width: 150px;">{{(stat.createIpe+stat.likesIpe+stat.commentsIpe-stat.rewordIpe).toFixed(5)}}个IPE</em>
                </li>
                <li>
                  <span>赞</span>
                  <em  style="font-style: normal">{{stat.likes}}</em>
                  <em style="font-style: normal">{{stat.likesIpe}}个IPE</em>
                </li>
                <li>
                  <span>评</span>
                  <em style="font-style: normal">{{stat.comments}}</em>
                  <em style="font-style: normal">{{stat.commentsIpe}}个IPE</em>
                </li>
                <li>
                  <span>分享评论</span>
                  <em style="color:red;font-style: normal">{{stat.sumTop}}</em>
                  <em style="color:red;font-style: normal">-{{stat.rewordIpe}}个IPE</em>
                </li>
                <li>
                  <span>浏览量</span>
                  <em style="font-style: normal">{{stat.views}}</em>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid-content bg-purple">
            <div class="commentList">
              <div class="title">
                <span>精华评论{{info.commentList.length}}/7</span>
              </div>
              <a href="javascript:;" @click="checkComment(item)" class="listBox iconMore" v-for="item in info.commentList" v-if="info.commentList.length>0">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class="imgBox">
                      <img :src="item.avatar" alt="">
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <h3><em style="font-style: normal">{{item.nickName}}</em><em style="margin-left:15px;font-style: normal" v-if="item.isAuther">作者</em></h3>
                    <span>{{item.createDate}}</span>
                  </el-col>
                 
                </el-row>
              </a>
            </div>
            
            
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple" style="padding:0">
            <div class="yBox yDetail">
              <div class="header">{{info.article.title}}</div>
              <div class="info">
                <span>{{info.article.nickName}}</span>
                <span>{{info.article.releaseTime}}</span>
              </div>
              <div class="article" v-html="info.article.content"></div>
              <div class="smBox">
                <span>声明：本作品已被IPXE区块链记录，不可篡改！</span>
                <p style="float:right;margin-top: 0;">阅读{{stat.views}}</p>
              </div>
              <div class="commentDiv">评论</div>
              <div class="botBox">
                <span style="padding-left: 20px">优质评论最高可获得0.5个水晶</span>
                
                <a href="javascript:;" >上链查询</a>
                <span style="float:right"><i class="icon-heart"></i><em style="vertical-align: middle;font-style: normal;">{{stat.likes}}</em></span>
              </div>
              
            </div>
          </div>
          <div class="grid-content bg-purple">
            <div class="tjBox">
              <ul>
                <li>
                  <span>区块链证书</span>
                  <em style="display: inline;font-style: normal">{{info.blockChainFile.createDate}}发放</em>
                </li>
                <div class="zs">
                  <p><span>用户hash</span>{{info.blockChainFile.userHash}}</p>
                  <p><span>区块hash</span>{{info.blockChainFile.blockHash}}</p>
                  <p><span>区块高度</span>{{info.blockChainFile.blockHeight}}</p>
                  <p><span>交易hash</span>{{info.blockChainFile.tradeHash}}</p>
                  <p><span>前一区块hash</span>{{info.blockChainFile.blockHashPre}}</p>
                  <p><span>内容上传ipfs返回的hash</span>{{info.blockChainFile.contentHash}}</p>
                </div>
              </ul>
            </div>
            
            
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="commentList" style="height: 800px;overflow: auto;overflow-x: hidden;">
              <div class="title">
                <span>评论（{{count}}）</span>
                <em style="font-style: normal"></em>
              </div>
              <div class="listBox" v-for="item in comments" v-if="comments.length>0">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class="imgBox">
                      <img :src="item.avatar" alt="">
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <h3><em style="font-style: normal">{{item.nickName}}</em><em style="margin-left:15px;font-style: normal" v-if="item.isAuther">作者</em></h3>
                    <span>{{item.createDate}}</span>
                    <p>{{item.commentRepl}}</p>
                  </el-col>
                  <el-col :span="6">
                    <div style="text-align:right">
                      <el-button-group>
                        <el-button  size="mini" @click="jFn(item.id)" style="padding:5px 8px">精</el-button>
                        <el-button  size="mini"  @click="pFn(item.id)" style="padding:5px 8px" v-if="item.showStatus==1">隐</el-button>
                        <el-button  size="mini"  @click="xFn(item.id)" style="padding:5px 8px" v-if="item.showStatus==2">显</el-button>
                      </el-button-group>
                   </div>
                  </el-col>
                </el-row>
               
              </div>
               <a href="javascript:;" style="text-align:center;margin-top: 15px;font-size:14px;display: block;text-decoration: none" @click="moreFn">{{more}}</a>
            </div>
          </div>
        </el-col>
        
      </el-row>
    </div>

    <el-dialog
      title="评论详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="commentDiv" v-if="commentDetail.id">
        <div class="listBox" style="border-bottom: none;">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class="imgBox">
                      <img :src="commentDetail.avatar" alt="">
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <h3><em  style="font-style: normal">{{commentDetail.nickName}}</em><em style="margin-left:15px;font-style: normal" v-if="commentDetail.isAuther">作者</em></h3>
                    <span>{{commentDetail.createDate}}</span>
                    <p>{{commentDetail.commentRepl}}</p>
                  </el-col>
                  <el-col :span="6">
                    <div style="text-align:right">
                      <el-button-group>
                        <el-button  size="mini" @click="qFn(commentDetail.id)" style="padding:5px 8px">取</el-button>
                        <el-button  size="mini"  @click="pFn(commentDetail.id)" style="padding:5px 8px" v-if="commentDetail.showStatus==1">隐</el-button>
                        <el-button  size="mini"  @click="xFn(commentDetail.id)" style="padding:5px 8px" v-if="commentDetail.showStatus==2">显</el-button>
                      </el-button-group>
                   </div>
                  </el-col>
                </el-row>
              </div>
        
      </div>
    </el-dialog>
 
      
 </div>
</template>
 
<script>
import api from '../api/api';
 export default {
  data() {
   return {
        id:'',
        stat:{},
        info:{},
        dialogVisible: false,
        commentDetail:{},
        page:1,
        count:0,
        comments:[],
        more:"查看更多",
        isOutLimit:0,
        topCounts:0
    
   }
  },
  computed: {
    
   
  },
  created(){
    this.id=this.$route.query.id;
    this.getStat();
    this.getDetail();
    this.getList();


  },
  mounted() {
   //初始化
     
  },
  methods: {
    handleClose(done) {
         done();
    },
    checkComment:function(item){
      this.commentDetail=item;
      this.dialogVisible=true;


    },
    qFn:function(id){
      var self=this;
       this.$confirm('确定取消精华吗?', '取消精华', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.cancelTop,
            params:{id:id}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.$message({
                      message:"已取消置顶",
                      type: 'success'
                    }); 
                    self.getDetail() 
                    self.dialogVisible=false;  
                    self.comments=[];
                    self.page=1;
                    self.getList();                              
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
          
        }).catch(() => {
                
        });
      


    },
    jFn:function(id){
      var self=this;
      var i=self.topCounts+1;
      var text='这是您设置的第'+i+'/7个精华评论，您将付出0.1个IPE，生态将为您配置0.4个IPE,一共0.5个IPE奖励优质评论者！'
      if(self.isOutLimit==1){
        text='这是您设置的第'+i+'次精华评论，您将付出0.5个IPE奖励优秀评论者！'
      }else{
        text='这是您设置的第'+i+'/7个精华评论，您将付出0.1个IPE，生态将为您配置0.4个IPE,一共0.5个IPE奖励优质评论者！'
      }
       this.$confirm(text, '设为精华', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.toTop,
            params:{articleId:self.id,commentId:id}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.$message({
                      message:"已置顶",
                      type: 'success'
                    }); 
                    self.getDetail();
                    self.comments=[];
                    self.page=1;
                    self.getList();                              
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
          
        }).catch(() => {
                  
        });



    },
    pFn:function(id){
      var self=this;
       this.$confirm('设为隐藏后，浏览者无法查看该条评论', '设为隐藏', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.hiddenComment,
            params:{id:id}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.$message({
                      message:"屏蔽成功",
                      type: 'success'
                    }); 
                    self.getDetail();
                    self.page=1;
                    self.comments=[];
                    self.getList(); 
                    self.dialogVisible=false;                                   
              }else{
                loading.close();
                self.$message({
                      message:res.data.message,
                      type: 'success'
                    });        
              }              
            }).catch(function (error) {
                loading.close();         　　
            });
          
        }).catch(() => {
                  
        });
    

    },
    xFn:function(id){
      var self=this;
       this.$confirm('取消隐藏后，浏览者可以查看该条评论', '取消隐藏', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.hiddenComment,
            params:{id:id}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.$message({
                      message:"取消成功",
                      type: 'success'
                    }); 
                    self.getDetail();
                    self.comments=[];
                    self.page=1;
                    self.getList(); 
                    self.dialogVisible=false;                                  
              }else{
                loading.close();
                self.$message({
                      message:res.data.message,
                      type: 'success'
                    });        
              }              
            }).catch(function (error) {
                loading.close();         　　
            });
          
        }).catch(() => {
                  
        });
    

    },
    getDetail:function(){
      var self=this;
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.checkArticle,
            params:{id:self.id}        
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

    },
    // 查看统计信息
     getStat:function(){
      var self=this;
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.checkArticleStat,
            params:{id:self.id}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.stat=res.data.result;                              
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

    },
    moreFn:function(){
      if(this.comments.length<this.count){
        this.page++;
        this.getList();
      }else{
        this.more="没有更多";
      }
    },
    // 评论
    getList:function(){
      var self=this;
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.checkArticleList,
            params:{id:self.id,pageSize:12,pageNo:self.page}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.count=res.data.result.count;
               self.isOutLimit=res.data.result.isOutLimit;
               self.topCounts=res.data.result.topCounts;
               self.comments=self.comments.concat(res.data.result.list);
               if(self.comments.length<self.count){
                  self.more="查看更多";
                }else{
                  self.more="没有更多";
                }

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
#check{
  .bg-purple {
    padding: 10px;
    background-color: #ecf5ff;
    margin-bottom:20px;
    border-radius:3px;
  }
  .listBox.iconMore{
    background:url("../assets/icon/icon02.png") no-repeat right center;
    background-size:16px 16px;
    display:block;
    text-decoration:none;


  }
     .listBox{
      color:#666;
      font-size:12px;
      padding:10px 0;
      border-bottom:1px solid #ebeef5;
      .imgBox{
        overflow:hidden;
        border-radius:50%;
        width:45px;
        height:45px;
        img{
          width:100%;
        }
      }
      a{
        color:#999;
        padding-right:20px;
        display:block;
        text-decoration:none;
        text-align:right;
        span{
          float:left;
        }
      }
      h3{
        font-weight:normal;
        font-size:12px;
        color:#333;
        text-align:right;
        height:28px;
        line-height:28px;
        em{
          float:left;
          display:block;
          line-height:28px;
          text-align:left;
        }
      }
      p{
        margin-top:10px;
      }
    }
  .commentList{
    .title{
      padding-bottom:10px;
      border-bottom:1px solid #ebeef5;
      // text-align:right;
      // span{
      //   float:left
      // }
    }
 
  }

  .yBox{
    border-radius:5px;
    position:relative;
    margin-bottom:20px;
  }

  .yDetail{
    height:500px;
    overflow:auto!important;
    
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
  .tjBox{
    ul{
      div{
        padding:10px 0;
        img{
          width:100%;
        }
      }
      list-style-type:none;
      li{
        font-size:14px;
        color:#666;
        height:30px;
        line-height:30px;
        border-bottom:1px solid #ebeef5;
        text-align:right;
        span{
          color:#000;
          float:left;
        }
        em:first-of-type{
          text-align:left;
        }
        em:last-of-type{
          text-align:right;
        }
        em{
            width:100px;
            display:inline-block;
        }
      }
      li:last-of-type{
        border-bottom:none;
      }
    }

  }
  .zs p{
    margin:10px 0;
    word-wrap:break-word;
    color:#999;
    font-size:12px;
  }
  .zs p span{
    display:block;
    font-weight:bold;
    color:#333;
  }
  
  
}
</style>
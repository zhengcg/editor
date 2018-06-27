<template>
 <div>
  <div class="articelNum">
    文章总数：{{totalCount}}
    <el-button type="primary" style="float:right" @click="gotoNew">新建文章</el-button>
  </div>
  <div class="container" v-if="tableData.length>0">

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="80">
        <template slot-scope="scope">
          {{(currentPage-1)*10+scope.$index+1}}     
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="artStatus"
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="viewsNumber"
        label="浏览"
        width="100">
      </el-table-column>
      <el-table-column
        prop="likesNumber"
        label="赞"
        width="100">
      </el-table-column>
      <el-table-column
        prop="commentsNumber"
        label="评论"
        width="100">
      </el-table-column>
      <el-table-column
        prop="artStatus"
        label="操作"
        width="240">
        <template slot-scope="scope">
          <div v-if="scope.row.artStatus=='未发布'" style="text-align: left">
            <a href="javascript:;" @click="preview(scope)">预览</a>
            <a href="javascript:;" @click="updateFn(scope)">修改</a>
            <a href="javascript:;" @click="deleteFn(scope)">删除</a>
            <a href="javascript:;" @click="publish(scope)">发布</a>
          </div>
          <div v-if="scope.row.artStatus=='发布中'" style="text-align: left">
            <a href="javascript:;" @click="preview(scope)">预览</a>
            <!-- <a href="javascript:;" @click="updateFn(scope)">修改</a>
            <a href="javascript:;" @click="deleteFn(scope)">删除</a> -->
            <!-- <a href="javascript:;" @click="publish(scope)">发布</a> -->
          </div>
          <div v-if="scope.row.artStatus=='已发布'" style="text-align: left">
            <a href="javascript:;" @click="check(scope)">查看</a>
            <a href="javascript:;" @click="getBlockChainFile(scope)">证书</a>
          </div>       
        </template>
      </el-table-column>
    </el-table>
    <div class="pageBox">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount" 
        @current-change="getList"
        >
      </el-pagination> 
    </div>
    
  </div>
  <div v-else class="container" style="text-align: center">暂无数据</div>
  <el-dialog
      title="确认发布文章？"
      :visible.sync="isPublish"
      width="30%">
      <div>成功发布原创文章将获得资产奖励，已发布的文章将不可被修改。一旦确认发布文章，则意味着该文章和您的相关数据将会在IPTrade链上进行记录。文章发布后您将获得专属区块链证书。</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isPublish = false">取 消</el-button>
        <el-button type="primary" @click="publishFn">确 定</el-button>
      </span>
    </el-dialog>

 </div>
</template>
 
<script>
import api from '../api/api';
 export default {
  data() {
   return {
    isPublish:false,
    totalCount:0,
    tableData: [],
    currentPage:1,
    id:''
    
   }
  },
  computed: {

   
  },
  created(){
    

  },
  mounted() {
   //初始化
   this.getList(1)
     
  },
  methods: {
    gotoNew:function(){
      var self=this;
      self.$router.push({
       name:'newArticle'
     })
    },
    publish:function(scope){
      this.id=scope.row.id;
      this.isPublish=true
    },
    publishFn:function(){
      var self=this;
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      self.axios({
            method: 'get',
            url:api.publish,
            params:{id:self.id}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.$message({
                  type: 'success',
                  message: '发布中，请稍后查看!'
                });
               self.isPublish=false;
               self.getList(self.currentPage)
                               
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
    updateFn:function(scope){
      var self=this;
      self.$router.push({
                     name: 'newArticle',
                     query:{
                      id:scope.row.id
                     }
              })

    },
    deleteFn:function(scope){
      var self=this;
      this.$confirm('确定要删除该篇文章吗？', '提示', {
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
            method: 'post',
            url:api.deleteArticle,
            params:{id:scope.row.id}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.$message({
                  type: 'success',
                  message: '删除成功!'
                });
               self.getList(self.currentPage)
                               
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
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getList:function(currentPage){
      var self=this;
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.getArticleList,
            params:{pageNo:currentPage,pageSize:10}        
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               var list=res.data.result.list

               for(var i=0;i<list.length;i++){
                list[i].createTime=self.formatDate(new Date(list[i].createTime));

               }

               self.totalCount=res.data.result.count;
               self.tableData=res.data.result.list;
               self.currentPage=currentPage;
                               
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
    formatDate:function(now){
    var year= now.getFullYear(); 
    var month = (now.getMonth()+1) >= 10 ? now.getMonth()+1 : "0" + (now.getMonth()+1);
    var date = now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();
    var hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
    var minute = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
    var second= now.getSeconds()>= 10 ? now.getSeconds() : "0" + now.getSeconds();
    return year+ "-" + month + "-" + date + " " + hour + ":" + minute+":"+second; 
     // return year+ "-" + month + "-" + date; 

    },
    preview:function(scope){
      var self=this;
      self.$router.push({
       name:'preview',
       query:{id:scope.row.id}
     })

    },
    check:function(scope){
      var self=this;
      self.$router.push({
       name:'check',
       query:{id:scope.row.id}
     })

    },
    getBlockChainFile:function(scope){
       var self=this;
      const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        self.axios({
            method: 'get',
            url:api.getBlockChainFile,
            params:{contentId:scope.row.id,category:1}           
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               var info=res.data.result;
               var html='<p><span>用户hash</span>'+info.userHash+'</p><p><span>区块hash</span>'+info.blockHash+'</p><p><span>区块高度</span>'+info.blockHeight+'</p><p><span>交易hash</span>'+info.tradeHash+'</p><p><span>前一区块hash</span>'+info.blockHashPre+'</p><p><span>内容上传ipfs返回的hash</span>'+info.contentHash+'</p>'

               self.$alert(html, '证书', {
                  dangerouslyUseHTMLString: true
                });
              
                               
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
.cell{
  text-align:center;
  a{
    text-decoration:none;
    color:#606266;
    margin:0 10px;
  }
  a:hover{
    color:#409EFF
  }
}
tr td:nth-child(2) .cell{
  text-align:left
} 
.articelNum{
  height:40px;
  line-height:40px;
  margin-bottom:20px;
}
.pageBox{
  text-align:center;
  margin-top:40px;
}
.el-message-box__message p{
  margin:10px 0;
  word-wrap:break-word
}
.el-message-box__message p span{
  display:block;
  font-weight:bold;
}
</style>
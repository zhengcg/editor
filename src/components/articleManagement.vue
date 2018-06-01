<template>
 <div>
  <div class="articelNum">
    文章总数：{{totalCount}}
    <el-button type="primary" style="float:right" @click="gotoNew">新建文章</el-button>
  </div>
  <div class="container">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="datetime"
        label="时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="read"
        label="浏览"
        width="100">
      </el-table-column>
      <el-table-column
        prop="zan"
        label="赞"
        width="100">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="评论"
        width="100">
      </el-table-column>
      <el-table-column
        prop="do"
        label="操作"
        width="240">
        <template slot-scope="scope">
          <div v-if="scope.row.do=='0'" style="text-align: left">
            <a href="javascript:;" @click="preview(1)">预览</a>
            <a href="javascript:;" >修改</a>
            <a href="javascript:;" @click="deleteFn">删除</a>
            <a href="javascript:;" @click="isPublish = true">发布</a>
          </div>
          <div v-else style="text-align: left">
            <a href="javascript:;" @click="check(1)">查看</a>
            <a href="javascript:;" >证书</a>
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
  <el-dialog
      title="确认发布文章？"
      :visible.sync="isPublish"
      width="30%">
      <div>成功发布原创文章将获得资产奖励，已发布的文章将不可被修改。一旦确认发布文章，则意味着该文章和您的相关数据将会在IPTrade链上进行记录。文章发布后您将获得专属区块链证书。</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isPublish = false">取 消</el-button>
        <el-button type="primary" @click="isPublish = false">确 定</el-button>
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
    tableData: [{
          id: '1',
          title: '黄金时代回家撒活动结束的粉红色的减肥还是多久发货时代峻峰好的机会说的就是',
          datetime: '2018-09-28 17:38',
          status:'未发布',
          read:'0',
          zan:'0',
          comment:'0',
          do:'0'
        }, {
          id: '2',
          title: '黄金时代回家撒活动结束的粉红色的减肥还是多久发货时代峻峰好的机会说的就是',
          datetime: '2018-09-28 17:38',
          status:'已发布',
          read:'100000+',
          zan:'45',
          comment:'456',
          do:'1'
        }]
    
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
    deleteFn:function(){
      this.$confirm('确定要删除该篇文章吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getList:function(currentPage){
      console.log(currentPage);
      this.totalCount=100;

    },
    preview:function(id){
      var self=this;
      self.$router.push({
       name:'preview',
       query:{id:id}
     })

    },
    check:function(id){
      var self=this;
      self.$router.push({
       name:'check',
       query:{id:id}
     })

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
</style>
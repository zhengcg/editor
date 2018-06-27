<template>
 <div id="newArticle">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'articleManagement' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container clearfix" >
      <div class="articleBox">
          <div class="box">
            <label>标题</label>
            <el-input
              placeholder="不多于28个汉字字符"
              v-model="title"
              clearable 
              maxlength="28">
            </el-input>
          </div>
          <div class="box">
            <label>标签</label>
            <el-select v-model="labels" multiple filterable allow-create default-first-option placeholder="标签最多5个，输入后按回车键生成标签">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </div>
          <div class="box">
            <label>内容</label>
            <quill-editor ref="myTextEditor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)">
            </quill-editor>
          </div>
          <div class="box">
            <label>封面图<span>封面图比例为16:9，建议640px*360px，不大于2M</span></label>
            <el-upload class="upload-demo" drag :action="fileup" name="File" :data="imgType" :show-file-list="false" :on-success="preview" :before-upload="beforeAvatarUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将图片拖到此处，或<em  style="font-style: normal">点击上传</em></div>
              <div class="imgBox" v-show="img!==''">
                <img :src="img" alt="">
              </div>
            </el-upload>
          </div>
          <div class="box">
            <el-button type="primary" @click="saveFn">保存</el-button>
            <!-- <el-button @click="centerDialogVisible = true">预览</el-button> -->
            <p>
              <label><span style="margin:0">*保存 ≠ 发布，发布请移步到文章管理列表中</span>
              </label>
            </p>
          </div>
      </div>
      <div id="preview" class="clearfix">
      <label style="margin-bottom:10px;display:block">预览</label>
            <div class="yBox yDetail">
              <div class="header">{{title}}</div>
              <div class="info">
                <!-- <span>{{info.nickName}}</span>
                <span>{{info.addTime}}</span> -->
              </div>
              <div class="article" v-html="content"></div>
              <div class="smBox">
                <span>声明：本文数据已被IPTrade区块链记录，不可篡改！</span>
                <p>阅读0000</p>
              </div>
              <div class="commentDiv">评论</div>
              <div class="botBox">
                <span style="padding-left: 20px">优质评论最高可获得0.5个水晶</span>
                
                <a href="javascript:;" >上链查询</a>
                <span style="float:right"><i class="el-icon-star-on"></i>00</span>
              </div>
              
            </div>
          
     </div>

    </div>

    <!-- <el-dialog
      title="预览"
      :visible.sync="centerDialogVisible"
      center width="30%"
      :before-close="handleClose">
      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

    


      
 </div>
</template>
 
<script>
import Vue from 'vue'
import api from '../api/api';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import {editorOptions} from '../assets/js/vue-quill-editor-config.js';
Vue.use(VueQuillEditor);
 export default {
  data() {
   return {
    centerDialogVisible: false,
    id:'',
    fileup:api.fileup,
    imgType:{type:3},
    title:'',
     options: [{
          value: '1',
          label: '科技'
        }, {
          value: '2',
          label: '生活'
        }, {
          value: '3',
          label: '学术'
        }, {
          value: '4',
          label: '时尚'
        }, {
          value: '5',
          label: 'IT'
        }],
        labels: [],
        uploadUrl:api.upload,
        content: '<p>请开始你的创作</p>',
        img:'',
        editorOption: editorOptions,
        isSave:false
      
   }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
   
  },
  created(){
    this.id=this.$route.query.id;
    if(this.id){
      this.getDetail(this.id)
    }
  },
  mounted() {
   //初始化
     
  },
  beforeRouteLeave (to, from, next) {
    var self=this;
    if(!self.isSave){
      this.$confirm('是否保存', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '离开',
          type: 'warning',
          showClose:false,
          closeOnClickModal:false
        }).then(() => {          
             self.saveFn();                  
          }).catch(function (error) {
          　　next()
          });

    }else{
      next()
    }
    
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

     
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleClose(done) {
        
            done();
          
      },
  
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },
    
    getDetail:function(id){
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
               self.title=res.data.result.title;
               self.labels=res.data.result.tag.split(",");
               self.content=res.data.result.content;
               self.img=res.data.result.coverImg;
                               
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
    saveFn:function(){
       var self=this;
      if(self.validateFn()){
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var submitData={
          title:self.title,
          tag:self.labels.toString(),
          content:self.content,
          coverImg:self.img

        }
        if(self.id){
          submitData.id=self.id
        }
        self.axios({
          method: 'post',
          url:api.addArticle,
          data:submitData   
        }).then(function (res) {
            if(res.data.code==200){
             loading.close();
             self.$message({
                message:res.data.message,
                type: 'success'
              });
             self.isSave=true;
              self.$router.push({
                     name: 'articleManagement'
              })            
             
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
    preview(response, file, fileList) {
      var self=this;
      if(response.code==200){

        this.img = response.result[0];
      }else{
        self.$message({
          message: response.message,
          type: 'warning'
        });

      }
      },
    validateFn:function(){
      var self=this;
      var flag=false;
      if(self.title==""){
        flag=false;
        self.$message({
          message: '请输入标题',
          type: 'warning'
        });
      }else if(self.labels.length==0){
        flag=false;
        self.$message({
          message: '请选择文章标签',
          type: 'warning'
        });

      }else if(self.labels.length>5){
        flag=false;
        self.$message({
          message: '文章标签不能多于5个',
          type: 'warning'
        });

      }else if(self.labels.toString().length>30){
        flag=false;
        self.$message({
          message: '文章标签不能多于60个字符',
          type: 'warning'
        });

      }else if(self.content==""){
        flag=false;
        self.$message({
          message: '请写文章',
          type: 'warning'
        });

      }else if(self.img==""){
        flag=false;
        self.$message({
          message: '请上传封面图',
          type: 'warning'
        });

      }else{
        flag=true
      }
      return flag; 


    }
   


  }

 }
</script>
<style lang="scss">
#newArticle{
  .articleBox{
    float:left;
    width:500px;
  .box{
    margin-bottom:30px;
    label{
      span{
        margin-left:30px;
        font-size:12px;
        color:#999;
      }
    }
    .el-upload-dragger{
      width:320px;
    }
    .imgBox{
      width:320px;
      height:180px;
      position:absolute;
      top:0;
      left:0;
      background:#fff;
      img{
        width:320px;
        height:180px;
      }
    }
    .el-input{
      display:block;
      margin-top:10px
    }
    .el-select{
      display:block;
    }
    .quill-editor{
      margin-top:10px
    }
    .ql-editor{
      min-height:350px;
    }
    .el-upload-dragger{
      margin-top:10px
    }
  }
 }

}
#newArticle{
 
  #preview{
    width:400px;
    margin-left:550px
  }
.yBox{
    background:#fff;
    border-radius:5px;
    position:relative;
    margin-bottom:20px;
    border:1px solid #ddd;
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
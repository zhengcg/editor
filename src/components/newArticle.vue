<template>
 <div id="newArticle">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'articleManagement' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <div class="articleBox">
          <div class="box">
            <label>标题</label>
            <el-input
              placeholder="不多于28个汉字字符"
              v-model="title"
              clearable>
            </el-input>
          </div>
          <div class="box">
            <label>标签</label>
            <el-select v-model="labels" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
            <el-upload class="upload-demo" drag :action="fileup" name="File" :data="imgType" :show-file-list="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
              <div class="imgBox"></div>
            </el-upload>
          </div>
          <div class="box">
            <el-button type="primary">保存</el-button>
            <el-button >预览</el-button>
            <p>
              <label><span style="margin:0">*保存 ≠ 发布，发布请移步到文章管理列表中</span>
              </label>
            </p>
          </div>
      </div>
    </div>
      
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
    fileup:api.fileup,
    imgType:{type:1},
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
        editorOption: editorOptions
      
   }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
   
  },
  created(){
    

  },
  mounted() {
   //初始化
     
  },
  methods: {
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
    }
   


  }

 }
</script>
<style lang="scss">
#newArticle{
  .articleBox{
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
      min-height:150px;
    }
    .el-upload-dragger{
      margin-top:10px
    }
  }
 }

}
</style>
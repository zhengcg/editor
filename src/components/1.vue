
<template>
  <div id="home">
      <quill-editor ref="myTextEditor"
              v-model="content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)">
      </quill-editor>
      <el-button type="primary" @click="submit">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <router-link :to="{name:'editor',query:{url:info}}" v-show="info">预览</router-link>
  </div>
</template>

<script>
import api from '../api/api';
import {editorOptions} from '../assets/js/vue-quill-editor-config.js';

export default {
  name: 'home',
  data () {
    return {
      name:"",
      uploadUrl:api.upload,
      content: '<h2>开始整吧！</h2>',
      editorOption: editorOptions,
      info:""
    }
  },
  created(){
    
  },
  mounted(){  
    // this.getInfo()  
     // console.log('this is my editor', this.editor)    
    
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  methods:{
   getInfo(){     
    var self=this;        
    self.axios.get(api.test).then(function (res) {
       self.name=res.data.name
          
    }).catch(function (error) {
    　　
    });
     
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
    submit:function(){
      var self=this;
      self.axios.post(api.postMsg,{
        wen:self.content
      }).then(function(res){
        self.info=res.data.info

      }).catch(function (error) {
    　　
      });

    }
   
   
        

  }
}
</script>

<style lang="scss">


</style>

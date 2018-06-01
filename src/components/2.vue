<template>
 <div>
  <router-link :to="{name:'home'}">回去接着编</router-link>
  <div v-html="content"></div>

 </div>
</template>
 
<script>
import api from '../api/api';
 export default {
  data() {
   return {
    content:'加载中……'
   
   }
  },
  computed: {

   
  },
  created(){
    var url=this.$route.query.url;
    this.getInfo(url)

  },
  mounted() {
   //初始化
     
  },
  methods: {
    getInfo(url){     
    var self=this;        
    self.axios.get(api.getMsg,{params:{url:url}}).then(function (res) {
      if(res.data.code==200){
       self.content=res.data.info
      }else{
        alert(res.data.msg)
      }
          
    }).catch(function (error) {
    　　
    });
     
    }
   
  }

 }
</script>
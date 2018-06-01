<template>
 <div id="check">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ name: 'articleManagement' }">文章管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>查看文章</el-breadcrumb-item>
    </el-breadcrumb>
 
      
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
#check{
  
}
</style>
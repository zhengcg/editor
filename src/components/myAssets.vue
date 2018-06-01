<template>
 <div>
  <div class="articelNum">
    我的资产（单位：个/IPE）
    <span>IPE资产暂不支持提币，敬请期待</span>
  </div>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple">
        总收益
        <div>345</div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        今日收益
        <div>30</div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        最近7日收益
        <div>60</div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        最近30日收益
        <div>100</div>
      </div></el-col>
    </el-row>
    <div class="chart">
      <div>
        <schart canvasId="line"  :data="data1" width="500" height="400"  type="line" :options="options1"></schart>
      </div>
      
    </div>
  </div>

 </div>
</template>
 
<script>
import api from '../api/api';
import Schart from 'vue-schart';
 export default {
  data() {
   return {
    data1:[
        {name:'01',value:5},
        {name:'02',value:14},
        {name:'03',value:5},
        {name:'04',value:8},
        {name:'05',value:7},
        {name:'06',value:15},
        {name:'07',value:23},
        {name:'08',value:9},
        {name:'09',value:23},
        {name:'10',value:14},
        {name:'11',value:11},
        {name:'12',value:7},
        {name:'13',value:20},
        {name:'14',value:16},
        {name:'15',value:12},
        {name:'16',value:14},
        {name:'17',value:5},
        {name:'18',value:18},
        {name:'19',value:13},
        {name:'20',value:12},
        {name:'21',value:6},
        {name:'22',value:14},
        {name:'23',value:12},
        {name:'24',value:14},
        {name:'25',value:11},
        {name:'26',value:12},
        {name:'27',value:17},
        {name:'28',value:13},
        {name:'29',value:14},
        {name:'30',value:14}
    ],
    options1: {
        title: '最近30日收益折线图',
        bgColor: '#ecf5ff',
        titleColor: '#333',
        fillColor: '#409EFF',
        axisColor: '#999',
        contentColor: '#999',
        autoWidth: true,
        showValue: true,  
        yEqual: 5, 
    },
    
   }
  },
  components:{
      Schart
    },
  computed: {

   
  },
  created(){
    

  },
  mounted() {
   //初始化
     
  },
  methods: {
 
   
  }

 }
</script>
<style lang="scss">
.articelNum{
  height:40px;
  line-height:40px;
  margin-bottom:20px;
  span{
    float:right;
  }
}
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #ecf5ff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align:center;
    padding:30px 0;
    div{
      font-size:20px;
      margin-top:10px;
      font-weight:bold
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .chart{
       
        display:block;
        margin:20px auto;
        text-align:center;
        padding:30px;
        background:#ecf5ff;
        // div{
        //   width:800px;
        //   margin:0 auto;
        // }
    }
    #line{
      width:100%;
      height:350px;
    }
</style>
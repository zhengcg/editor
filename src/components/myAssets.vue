<template>
 <div id="myAssets">
  <div class="articelNum">
    我的收益（单位：个/IPE）
    <span>IPE资产暂不支持提币，敬请期待</span>
  </div>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <el-col :span="4"><div class="grid-content bg-purple">
        总资产
        <div>{{info.ipeBalance}}</div>
      </div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">
        昨日收益
        <div>{{info.day}}</div>
      </div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">
        累计收益
        <div>{{info.ipeTotal}}</div>
      </div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">
        最近7日收益
        <div>{{info.week}}</div>
      </div></el-col>
       <el-col :span="4"><div class="grid-content bg-purple">
        最近30日收益
        <div>{{info.month}}</div>
      </div></el-col>
    </el-row>
    <div style="padding: 20px;background:#ecf5ff">
      <div class="charts">
        <h3 style="text-align: center">最近30日收益</h3>
        <div id="myChart" :style="{height:'400px'}"></div>   
      </div>
    </div>
    
  </div>

 </div>
</template>
 
<script>
import api from '../api/api';

var echarts=require('echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title')
 export default {
  data() {
   return {
    info:{}
    
   }
  },
  computed: {

   
  },
  created(){
    
    

  },
  mounted() {
   //初始化
   this.getInfo()
     
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
            url:api.asset      
          }).then(function (res) {
              if(res.data.code==200){
               loading.close();
               self.info=res.data.result; 
               var list=res.data.result.list;
               var date=res.data.result.dateList;
               var value=res.data.result.ipeList;
              
                var option={
                        
                      xAxis: {
                          type: 'category',
                          data: date,
                          name:'日期',
                          axisLabel: {
                                rotate: 50,
                            }
                      },
                      tooltip: {
                          trigger: 'axis'
                      },
                      yAxis: {
                          type: 'value',
                          name:'IPE值'
                      },
                      
                      series: [{
                          data: value,
                          type: 'line'
                      }]
                  };
                  let chartBox = document.getElementsByClassName('charts')[0]
                  let myChart = document.getElementById('myChart')

                  // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
                  function resizeCharts () {
                    myChart.style.width = chartBox.style.width + 'px'
                    myChart.style.height = chartBox.style.height + 'px'
                  }
                  // 设置容器高宽
                  resizeCharts()
                  let myCharts=echarts.init(myChart);
                  myCharts.setOption(option)

                                            
              }else{
                loading.close();  
              }              
            }).catch(function (error) {
                loading.close();         　　
            });

    }
 
   
  }

 }
</script>
<style lang="scss">
#myAssets{
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
    }
</style>
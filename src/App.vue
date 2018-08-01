<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    // import * as types from './store/types'
    // import {mapState} from 'vuex'

    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
            }
        },
        watch:{
            '$route':function(to,from){
　　　　　　　　　　 document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0; 
           }
        },
   /*     computed: mapState({
            title: state => state.title,
            token: state => state.token
        }),*/
          
        methods: {
   
        }
    }
</script>

<style  lang="scss">
html,body{
    height:100%;

}
.clearfix:after{content: '';display: block;height: 0;clear: both;-ms-zoom: 1;}
#app,#home{
    height:100%;
}
*{
    margin:0;
    padding:0;
    word-break: break-all;
}

.el-upload-list{
    display:none;
}

.container{
    min-width:950px;
    overflow:auto;
}
blockquote{
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
}
pre.ql-syntax {
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
    white-space: pre-wrap;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 5px 10px;
    border-radius:3px;
}
.ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 3em;
}
.ql-align-right{
    text-align:right;
}
.ql-size-huge {
    font-size: 2.5em;
}
.ql-size-large {
    font-size: 1.5em;
}
.ql-size-small {
    font-size: 0.75em;
}
.ql-align-center {
    text-align: center;
}
.ql-align-justify {
    text-align: justify;
}
.icon-heart{
      display:inline-block;
      width:16px;
      height:16px;
      background:url("assets/icon/icon01.png") no-repeat center;
      background-size:contain;
      vertical-align:middle;
    }
#header{
  height:60px;
  line-height:60px;
  position:fixed;
  padding:0;
  width:100%;
  top:0;
  background-color: #4A4A4A;
  color: #fff;
  text-align: center;
  z-index:1001;
  span{
    font-size:12px
  }
  .logoDiv{
    width:160px;
    background:#24383A;
    color:#fff;
    float:left;
    text-align:center;
    height:60px;
    line-height:60px;
    img{
      display:block;
      width:120px;
      margin:0 auto;
      margin-top:8px;
    }
  }
  .titHead{
    float:left;
    padding-left:30px;
    font-size:18px;
    height:60px;
    line-height:60px;
  }
}

.login{
  height:100%;
  background:#B3C0D1;
  position:relative;
  .formBox{
    border-radius:5px;
    position:absolute;
    width:400px;
    height:370px;
    left:50%;
    top:50%;
    margin:-185px 0 0 -200px;
    padding-top:30px;
    background:#fff;
    .inputBox{
      padding:15px 20px 0 20px!important;
      
      .el-button{
        display:block;
        a{
          text-decoration: none;
          color: #666;
          display: block;
        }

      }
    }
    .el-select .el-input--suffix{width:100px;}
  }


}

// img{
//   opacity: 1!important;
// }
</style>

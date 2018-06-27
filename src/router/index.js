import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
            requireAuth: true
            },
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [{
            path: '/home/personalAuth',
            name: 'personalAuth',
            meta: {
            requireAuth: true,
            },
            component: resolve => require(['../components/personalAuth.vue'], resolve)
        },{
            path: '/home/articleManagement',
            name: 'articleManagement',
            meta: {
            requireAuth: true,
            },
            component: resolve => require(['../components/articleManagement.vue'], resolve)
        },{
            path: '/home/myAssets',
            name: 'myAssets',
            meta: {
            requireAuth: true,
            },
            component: resolve => require(['../components/myAssets.vue'], resolve)
        },{
            path: '/home/personalInfo',
            name: 'personalInfo',
            meta: {
            requireAuth: true,
            },
            component: resolve => require(['../components/personalInfo.vue'], resolve)
        },{
            path: '/home/newArticle',
            name: 'newArticle',
            meta: {
            requireAuth: true,
            },
            component: resolve => require(['../components/newArticle.vue'], resolve)
        },{
            path: '/home/preview',
            name: 'preview',
            meta: {
            requireAuth: true,
            },
            component: resolve => require(['../components/preview.vue'], resolve)
        },{
            path: '/home/check',
            name: 'check',
            meta: {
            requireAuth: true,
            },
            component: resolve => require(['../components/check.vue'], resolve)
        },{
            path:'/home',
            redirect:'/home/myAssets'
        }]
    },
     { 
        path: '/register',
        name: 'register',
        component: resolve => require(['../components/Register.vue'], resolve)
    },
     { 
        path: '/forPa',
        name: 'forPa',
        component: resolve => require(['../components/forPa.vue'], resolve)
    },
    { 
        path: '/login',
        name: 'login',
        component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
        path:'/',
        redirect:'/home'
    }
  ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit("login", window.localStorage.getItem('token'))
}
var self=this;

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
            if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/home/newArticle'){            
                Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                    confirmButtonText: '确定'
                });
            }else{
                next();
            }
        }
        else {
            next({
                path: '/login'
 
            })
        }
    }
    else {
        next();
    }
})


export default router;
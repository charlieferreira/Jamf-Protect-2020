import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    component: NotFoundPage
  },
  {
    path: '/step1',
    name: 'step1',
    //'Product Selection
    component: () => import(/* webpackChunkName: "step1" */ '../views/Step1.vue')
  },
  {
    path: '/step2',
    name: 'step2',
    //Support Packages
   // component: () => import(/* webpackChunkName: "step2" */ '../views/Step2.vue')
//      component: () => import(/* webpackChunkName: "step3" */ '../views/Step3.vue')
      component: () => import(/* webpackChunkName: "step5" */ '../views/Step5.vue')
  },
  // {
  //   path: '/step3',
  //   name: 'step3',
  //   component: () => import(/* webpackChunkName: "step3" */ '../views/Step3.vue')
  // },
  // {
  //   path: '/step4',
  //   name: 'step4',
  //   component: () => import(/* webpackChunkName: "step4" */ '../views/Step4.vue')
  // },
  {
    path: '/step3',
    name: 'step3',
    //Subscription
    //component: () => import(/* webpackChunkName: "step5" */ '../views/Step5.vue')
    component: () => import(/* webpackChunkName: "step3" */ '../views/Step3.vue')
  },
  {
    path: '/step6',
    name: 'step6',
    component: () => import(/* webpackChunkName: "step6" */ '../views/Step6.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router

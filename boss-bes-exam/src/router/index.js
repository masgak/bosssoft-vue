import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../views/exam/UserInfo.vue'], resolve)
    },
    {
      path: '/answerPaper',
      component: resolve => require(['../views/exam/AnswerPaper.vue'], resolve)
    }
  ]
})

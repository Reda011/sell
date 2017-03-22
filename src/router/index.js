import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import sellers from '../components/sellers/sellers';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'good',
      component: goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },{
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },{
      path: '/sellers',
      name: 'sellers',
      component: sellers
    }
  ],
  linkActiveClass: 'active'
})

import Vue from '../../node_modules/vue'

import Router from '../../node_modules/vue-router'

import Index from '../views/index.vue'

import About from '../views/about.vue'

import Blogs from '../views/blogs.vue'

import SignUp from '../views/signUp.vue'

import Login from '../views/login.vue'

import Admin from '../views/admin.vue'

import Detail from '../views/detail.vue'

import Game from '../views/game.vue'

Vue.use(Router)
export default new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/index', component: Index },
        { path: '/about', component: About },
        { path: '/blogs', component: Blogs },
        { path: '/signUp', component: SignUp },
        { path: '/login', component: Login },
        { path: '/admin', component: Admin },
        { path: '/game', component: Game },
        // { path: '/ask/:page(\\d+)?', component: createListView('ask') },
        // { path: '/job/:page(\\d+)?', component: createListView('job') },
        // { path: '/item/:id(\\d+)', component: ItemView },
        { path: '/detail/:id', name: 'detail', component: Detail },
        { path: '*', redirect: '/index' }
    ]
})

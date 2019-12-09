import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import NotFound from './pages/NotFound';
import Login from './pages/Login';
import FTP from './pages/FTP';

export default new VueRouter({
	mode: 'history',
	routes: [
		// Default layout
		{
			path: '/',
			component: Login,
		},
		{
			path: '/ftp',
			component: FTP,
		},
		// 404 route - keep last
		{path: '*', component: NotFound},
	],
});

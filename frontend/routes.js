import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import NotFound from './pages/NotFound';
import App from './App';

export default new VueRouter({
	mode: 'history',
	routes: [
		// Default layout
		{
			path: '/',
			component: App,
		},
		// 404 route - keep last
		{path: '*', component: NotFound},
	],
});

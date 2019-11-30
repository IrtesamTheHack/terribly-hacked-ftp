// Import style stuff
import './styles/main.scss';

// Import libraries
import Vue from 'vue';
import router from './routes';

// Create the Vue instance
// NOTE: Not mounted yet because we have to register routing guards for
//       authentication before mounting the element. If we don't wait to mount,
//       the initial page load won't have the navigation guard registered in
//       time.
import App from './App';
const vm = new Vue({
	router,
	render: create => create(App),
});

// Now that we have authentication set up, mount the Vue instance to the page
vm.$mount('#app');

import Vue from 'vue';
import Vuex from 'vuex';
const axios = require('axios');

Vue.use(Vuex);

async function makeRequest (path, method = 'GET', body) {
	if (typeof body === 'object' && body != null) {
		body = JSON.stringify(body);
	}
	try {
		const result = await fetch(path, {method, body});
		if (!result.ok) {
			const json = await result.json();
			throw json.error;
		}
		if (result.status === 204) {
			return;
		}
		return await result.json();
	} catch (error) {
		window.alert(error);
		throw error;
	}
}

const store = new Vuex.Store({
    state: {
		fileData: null,
		auth: false,
		downloadedFile: null,
    },
    mutations: {
		GET_FILES (state,fileData) {
			state.fileData = fileData;
		},
    },
    getters: {
		isAuth(state) {
			return state.auth;
		},
    },
    actions: {
		async getFiles({commit}) {
			const files = await makeRequest('/api/dirlist');
			commit('GET_FILES',files);
		},
		async downloadFile({commit},fileName) {
			setTimeout(() => {
				const response = {
				  file: `/api/download/${fileName}`,
				};
				window.open(response.file);
			  }, 50);
		},
    },
});

export default store;
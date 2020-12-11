import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountData:[],
  },
  getters: {
    
  },
  mutations: {
    createAccountData(store, response) {
      store.accountData = response;
    },
  },
  actions: {
    createUserAccount({ commit }, {email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          commit('createAccountData', response);
          router.push('/dashboard');
          console.log(response);
        })
        .catch(() => {
          alert('登録できません');
        })
    },
    loginUserAccount({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          commit('createAccountData', response);
          router.push('/dashboard');
        })
        .catch(() => {
          alert('ログインできません');
        })
      },
  }
});
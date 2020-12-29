import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: '',
    accountData:[]
  },
  getters: {
    getName(state) {
      return state.accountData.name;
    },
    getEmail(state) {
      return state.accountData.email;
    },
    getWallet(state) {
      return state.accountData.wallet;
    },
    getLoginUser(state) {
      return state.loginUser;
    }
  },
  mutations: {
    createAccountData(state, data) {
      state.accountData = data;
    },
    updateLoginUser(state, uid) {
      state.loginUser = uid;
    }
  },
  actions: {
    autoLogin({ commit }) {
      const uid = localStorage.getItem('uid');
      if(!uid) return;
      commit('updateLoginUser', uid);
      this.dispatch('fetchData', uid);
    },
    createUserAccount({ commit }, {name, email, password }) {
      const userData = {
        name: name,
        email: email,
        wallet: 500
      };
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          firebase
            .firestore().collection(`users/${response.user.uid}/data`)
            .add(userData)
            .then(() => {
              localStorage.setItem('uid', response.user.uid);
              commit('updateLoginUser', response.user.uid);
              commit('createAccountData', userData);
              router.push('/dashboard');
            })
            .catch(() => {
              console.log('error');
            });
        })
        .catch(() => {
          console.log('error');
        });
    },
    loginUserAccount({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          localStorage.setItem('uid', response.user.uid);
          commit('updateLoginUser', response.user.uid);
          this.dispatch('fetchData', response.user.uid);
          router.push('/dashboard');
        })
        .catch(() => {
          console.log('error');
        });
    },
    fetchData({ commit }, uid) {
      firebase
        .firestore()
        .collection(`users/${uid}/data`).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            commit('createAccountData',doc.data())
          });
        })
        .catch(() => {
          console.log('error');
        });
    },
    logout({ commit }) {
      commit('updateLoginUser', null);
      localStorage.removeItem('uid');
      router.push('/login');
    }
  }
});
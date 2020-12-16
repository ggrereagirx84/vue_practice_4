import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
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
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    createAccountData(state, data) {
      state.accountData = data;
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user);
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
          firebase
            .firestore()
            .collection(`users/${response.user.uid}/data`).get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                commit('createAccountData',doc.data())
              });
            });
          router.push('/dashboard');
        })
        .catch(() => {
          console.log('error');
        })
      
    },
  }
});
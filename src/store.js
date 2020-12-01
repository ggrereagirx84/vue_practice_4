import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    mailAddress: '',
    password: '',
    accountData:[],
  },
  getters: {
    getUserName(state) {
      return state.userName;
    },
    getMailAddress(state) {
      return state.mailAddress;
    },
    getPassword(state) {
      return state.password;
    },
  },
  mutations: {
    changeUserName(store, userName) {
      store.userName = userName;
    },
    changeMailAddress(store, mailAddress) {
      store.mailAddress = mailAddress;
    },
    changePassword(store, password) {
      store.password = password;
    },
    createAccountData(store, response) {
      store.accountData = response;
    },
  },
  actions: {
    createUserAccount({ commit }, data) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.mailAddress, data.password)
        .then(response => {
          commit('createAccountData', response);
        })
    },
    changeUserName({ commit }, userName) {
      commit('changeUserName', userName);
    },
    changeMailAddress({ commit }, mailAddress) {
      commit('changeMailAddress', mailAddress);
    },
    changePassword({ commit }, password) {
      commit('changePassword', password);
    },
  }
});
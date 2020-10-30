import Vue from 'vue';
import Vuex from 'vuex';

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
    accountData(store, accountData) {
      store.accountData = accountData;
    }
  },
  actions: {
    changeUserName({ commit }, userName) {
      commit('changeUserName', userName);
    },
    changeMailAddress({ commit }, mailAddress) {
      commit('changeMailAddress', mailAddress);
    },
    changePassword({ commit }, password) {
      commit('changePassword', password);
    },
    createAcountData({ commit }, accountData) {
      commit('accountData', accountData);
    }
  }
});
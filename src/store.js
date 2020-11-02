import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
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
    createUserAccount(store, data) {
      axios.post(
        "https://firestore.googleapis.com/v1/projects/vue-practice-4/databases/(default)/documents/users",
        {
          fields: {
            userName: {
              stringValue: data.userName
            },
            mailAddress: {
              stringValue: data.mailAddress
            },
            password: {
              stringValue: data.password
            }
          },
        }
      ).then(response => {
        store.accountData = response;
        console.log(response);
      }).catch(error => {
        console.log(error)
      });
    },
    changeUserName(store, userName) {
      store.userName = userName;
    },
    changeMailAddress(store, mailAddress) {
      store.mailAddress = mailAddress;
    },
    changePassword(store, password) {
      store.password = password;
    },
  },
  actions: {
    createUserAccount({ commit }, data) {
      commit('createUserAccount', data);
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
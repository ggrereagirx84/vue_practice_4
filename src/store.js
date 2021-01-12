import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: '',
    accountData:[],
    users:[]
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
    },
    getUsers(state) {
      return state.users;
    }
  },
  mutations: {
    createAccountData(state, data) {
      state.accountData = data;
    },
    updateLoginUser(state, uid) {
      state.loginUser = uid;
    },
    updateUsers(state, snapshot) {
      const users = [];
      snapshot.forEach(doc => {
        let user = doc.data();
        user["uid"] = doc.id;
        users.push(user);
      });
      state.users = users;
    },
    updateAccountData(state, uid) {
      state.users.forEach((user, index) => {
        if(user.uid === uid) {
          state.accountData = state.users.splice(index, 1)[0];
          return true;
        }
      });
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
            .firestore().collection("users").doc(response.user.uid)
            .set(userData)
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
        .collection('users').get()
        .then(snapshot => {
          commit('updateUsers', snapshot);
          commit('updateAccountData', uid);
        })
        .catch(() => {
          console.log('error');
        });
    },
    logout({ commit }) {
      commit('updateLoginUser', null);
      localStorage.removeItem('uid');
      router.push('/login');
    },
  }
});
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    loginUser:[],
    users:[],
    loginError: '',
    sendError: ''
  },
  getters: {
    loginUserName(state) {
      return state.loginUser.name;
    },
    loginUserEmail(state) {
      return state.loginUser.email;
    },
    loginUserWallet(state) {
      return state.loginUser.wallet;
    },
    token(state) {
      return state.token;
    },
    users(state) {
      return state.users;
    },
    loginUserId(state) {
      return state.loginUser.uid
    },
    loginError(state) {
      return state.loginError;
    },
    sendError(state) {
      return state.sendError;
    }
  },
  mutations: {
    createLoginUser(state, data) {
      state.loginUser = data;
    },
    updateToken(state, uid) {
      state.token = uid;
    },
    updateUsers(state, snapshot) {
      const users = [];
      snapshot.forEach(doc => {
        let user = doc.data();
        user['uid'] = doc.id;
        users.push(user);
      });
      state.users = users;
    },
    updateLoginUser(state, uid) {
      state.users.forEach((user, index) => {
        if(user.uid === uid) {
          state.loginUser = state.users.splice(index, 1)[0];
          return true;
        }
      });
    },
    updateWallet(state, {clickUserId, loginUserWallet, clickUserWallet}) {
      state.loginUser.wallet = loginUserWallet;
      state.users.forEach((user, index) => {
        if(user.uid === clickUserId) {
          state.users[index].wallet = clickUserWallet;
          return true;
        }
      });
    },
    loginError(state) {
      state.loginError = 'ログインエラー！';
    },
    sendError(state) {
      state.sendError = '残高が足りません！';
    }
  },
  actions: {
    autoLogin({ commit }) {
      const uid = localStorage.getItem('uid');
      if(!uid) return;
      commit('updateToken', uid);
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
            .firestore().collection('users').doc(response.user.uid)
            .set(userData)
            .then(() => {
              localStorage.setItem('uid', response.user.uid);
              commit('updateToken', response.user.uid);
              commit('createLoginUser', userData);
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
          commit('updateToken', response.user.uid);
          this.dispatch('fetchData', response.user.uid);
          router.push('/dashboard');
        })
        .catch(() => {
          commit('loginError');
        });
    },
    fetchData({ commit }, uid) {
      firebase
        .firestore()
        .collection('users').get()
        .then(snapshot => {
          commit('updateUsers', snapshot);
          commit('updateLoginUser', uid);
        })
        .catch(() => {
          console.log('error');
        });
    },
    sendMoney({ commit, state }, {uid, amount}) {
      const loginUserRef = firebase.firestore().collection('users').doc(state.loginUser.uid);
      const recipientRef = firebase.firestore().collection('users').doc(uid);
      firebase.firestore().runTransaction(async transaction =>{
        const loginUser = await transaction.get(loginUserRef);
        const recipient = await transaction.get(recipientRef);
        const newLoginUserWallet = loginUser.data().wallet - amount;
        const newRecipientWallet = Number(recipient.data().wallet) + Number(amount);
        transaction.set(loginUserRef,
          {wallet: newLoginUserWallet},
          {merge: true}
        )
        transaction.set(recipientRef,
          {wallet: newRecipientWallet},
          {merge: true}
        )
        commit('updateWallet', {
          clickUserId: uid,
          loginUserWallet: newLoginUserWallet,
          clickUserWallet: newRecipientWallet
        });
      })
      .catch(() => {  
        console.log('error');
      });
    },
    sendError({ commit }) {
      commit('sendError');
    },
    logout({ commit }) {
      commit('updateToken', null);
      localStorage.removeItem('uid');
      router.push('/login');
    },
  }
});
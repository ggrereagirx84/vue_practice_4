<template>
  <div class="hello">
    <div id="user">
      <div id="name">{{ loginUserName }}さんようこそ!!</div>
      <div id="wallet">残高: {{ loginUserWallet }}</div>
      <div 
        class="button" 
        id="logout"
        @click="logout"
      >ログアウト</div>
    </div>
    <h1>ユーザー一覧</h1>
    <div 
      v-if="modal"
      id="mask" 
      class="hidden"
    ></div>
    <table>
      <thead>
        <th>
          ユーザー名
        </th>
        <th class="margin"></th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.index">
          <td>{{ user.name }}</td>
          <td class="margin"></td>
          <td><div 
            @click="showModal(user.name, user.wallet)"
            class="button" 
            id="checkWallet"
          >walletを見る</div></td>
          <td><div class="button" id="send">送る</div></td>
        </tr>
      </tbody>
    </table>

    <section 
      v-if="modal"
      id="modal" 
      class="hidden"
    >
      <div id="modalBody">
        <h1>{{ clickUserName }}さんの残高</h1>
        <p>{{ clickUserWallet }}</p>
      </div>
      <div id="modalFootter">
        <div 
          @click="closeModal"
          id="close"
        >close</div>
      </div>
    </section>

    <footer>
      <p>Copyright ©2019 ○○ Inc. All rights reserved</p>
      <div>gifts.com</div>
    </footer>

  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      clickUserName: '',
      clickUserWallet: ''
    };
  },
  computed: {
    loginUserName() {
      return this.$store.getters.getName;
    },
    loginUserEmail() {
      return this.$store.getters.getEmail;
    },
    loginUserWallet() {
      return this.$store.getters.getWallet;
    },
    users() {
      return this.$store.getters.getUsers;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    showModal(name, wallet) {
      this.clickUserName = name;
      this.clickUserWallet = wallet;
      this.modal = true;
    },
    closeModal() {
      this.clickUserName = '';
      this.clickUserWallet = '';
      this.modal = false;
    }
  }
}
</script>

<style scoped>
fieldset {
  width: 500px;
  border: none;
  display: flex;
  flex-direction: column;
  text-align: right;
  margin: auto;
}

label {
  width: 300px;
  margin: auto;
}

.button {
  border-radius: 5px;
  line-height: 30px;
  cursor: pointer;
  padding: 5px;
}

#logout {
  border: solid 2px rgb(84, 183, 223);
  border-radius: 5px;
  color: rgb(84, 183, 223);
  cursor: pointer;
}
#logout:hover {
  color: #fff;
  background: rgb(84, 183, 223);
}

#checkWallet, #send {
  background: rgb(21, 178, 184);
  color: #fff;
}


.swich {
  color: rgb(84, 183, 223);
  cursor: pointer;
}
.swich:hover {
  text-decoration: underline rgb(84, 183, 223);
}
footer > p {
  margin-top: 60px;
}
footer > div {
  margin: 100px 0 0 auto;
  background: #bbb;
  width: 70px;
  height: 20px;
  border-radius: 5px;
  color: #fff;
}

table {
  margin: 0 auto;
}
.margin {
  width: 300px;
}
#user {
  display: flex;
}
#name {
  margin: 0 auto 0 0;
}
#wallet {
  margin: 0 0 0 auto;
}

#mask {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

#modal {
  background: #fff;
  width: 200px;
  height: 150px;
  padding: 0;
  position: fixed;
  border-radius: 5px;
  top: 300px;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 150px;
  display: flex;
  flex-direction: column;
}

#modalBody > h1, p {
  margin: 0;
  height: 50px;
  line-height: 50px;
  font-weight: normal;
  border-radius: 5px;
}

#modalBody > p {
  font-size: 24px;
} 

#modalFootter {
  height: 50px;
  background: #ddd;
  border-radius: 5px;
}

#close {
  font-size: 16px;
  color: #fff;
  background: red;
  height: 30px;
  width: 50px;
  line-height: 30px;
  margin: 10px auto 10px 130px;
  border-radius: 5px;
  cursor: pointer;
}

</style>

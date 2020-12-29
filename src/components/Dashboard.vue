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
          <td>{{ user }}</td>
          <td class="margin"></td>
          <td><div class="button" id="checkWallet">walletを見る</div></td>
          <td><div class="button" id="send">送る</div></td>
        </tr>
      </tbody>
    </table>

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
      users: [
        'test7','test2','test13','test12','aaa','test5','test','test3','userA'
      ],
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
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
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

</style>

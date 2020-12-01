<template>
  <div class="hello">
    <h1>ログイン画面</h1>
    <div>
      <fieldset>
        <label>
          メールアドレス
          <input 
            type="text" 
            placeholder="E-mail" 
            v-model="userAccountData.mailAddress" @change="changeMailAddress"
          >
        </label>
        <label>
          パスワード
          <input 
            type="text" 
            placeholder="Password" 
            v-model="userAccountData.password" 
            @change="changePassword"
          >
        </label>
      </fieldset>
    </div>

    <div 
      class="button" 
      @click="loginUserAccount"
    >
      ログイン
    </div>
    <div 
      class="swich"
      @click="toSineUp"
    >
      新規登録はこちらから
    </div>

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
      userAccountData: {
        userName: this.$store.getters.getUserName,
        mailAddress: this.$store.getters.getMailAddress,
        password: this.$store.getters.getPassword,
      },
    };
  },
  methods: {
    loginUserAccount() {
      this.$store.dispatch('loginUserAccount', this.userAccountData);
    },
    changeUserName() {
      this.$store.dispatch('changeUserName', this.userAccountData.userName);
    },
    changeMailAddress() {
      this.$store.dispatch('changeMailAddress', this.userAccountData.mailAddress);
    },
    changePassword() {
      this.$store.dispatch('changePassword', this.userAccountData.password);
    },
    toSineUp() {
      this.$router.push('/');
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
  border: solid 2px rgb(84, 183, 223);
  width: 100px;
  height: 50px;
  border-radius: 5px;
  margin: 20px auto 0;
  line-height: 50px;
  color: rgb(84, 183, 223);
  cursor: pointer;
}

.button:hover {
  color: #fff;
  background: rgb(84, 183, 223);
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
</style>

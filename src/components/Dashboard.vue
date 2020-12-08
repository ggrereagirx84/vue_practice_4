<template>
  <div class="hello">
    <h1>ユーザー一覧</h1>
    <table>
      <thead>
        <th>
          ユーザー名
        </th>
        <th>
        </th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.index">
          <td>{{ user }}</td>
          <td><button>walletを見る</button></td>
          <td><button>送る</button></td>
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
      ]
    };
  },
  methods: {
    
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

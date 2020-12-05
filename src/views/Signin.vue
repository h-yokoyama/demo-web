<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="signIn">Signin</button>
    <p>
      You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signin",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          user => {
            console.log(user);
            // IDロークン(JWT)取得
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(token => {
                // ローカルストレージに保存
                localStorage.setItem("token", token);
              });

            alert("Success!");
            this.$router.push("/");
          },
          err => {
            alert(err.message);
          }
        );
    },
    async getIdToken() {
      return await firebase.auth().currentUser.getIdToken(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>

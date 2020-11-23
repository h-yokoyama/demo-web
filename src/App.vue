<template>
  <div id="app">
    <!--
        <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >-->
    <el-menu mode="horizontal">
      <el-menu-item index="1"
        ><router-link to="/">Home</router-link></el-menu-item
      >
      <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-submenu index="4">
        <template slot="title">実験計画</template>
        <el-menu-item index="4-1"
          ><router-link to="/plan/plan">実験計画</router-link></el-menu-item
        >
        <el-menu-item index="4-2"
          ><router-link to="/plan/NewPlan"
            >実験計画作成</router-link
          ></el-menu-item
        >
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">配合表</template>
        <el-menu-item index="5-1"
          ><router-link to="/plan/plan">配合表検索</router-link></el-menu-item
        >
        <el-menu-item index="5-2"
          ><router-link to="/plan/plan">配合表作成</router-link></el-menu-item
        >
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">マスタメンテナンス</template>
        <el-menu-item index="6-1"
          ><router-link to="/master/material"
            >材料マスタ</router-link
          ></el-menu-item
        >
      </el-submenu>
      <el-button v-if="!login" size="large" type="success" @click="signIn"
        >ログイン</el-button
      >
      <el-button v-if="login" size="large" type="success" @click="signOut"
        >ログアウト</el-button
      >
    </el-menu>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
      login: false
    };
  },
  methods: {
    signIn() {
      this.$router.push("/signin");
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        });
    },
    redirectSignIn() {
      this.$router.push("/signin");
    }
  },
  mounted() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.login = true;
    } else {
      this.login = false;
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

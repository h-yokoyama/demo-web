<template>
  <div id="app">
    <!--
        <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >-->
    <el-menu class="el-menu-demo" mode="horizontal">
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
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item
      >
      <el-submenu index="5">
        <template slot="title">マスタメンテナンス</template>
        <el-menu-item index="5-1"
          ><router-link to="/master/material"
            >材料マスタ</router-link
          ></el-menu-item
        >
      </el-submenu>
    </el-menu>
    <router-view />
  </div>
</template>

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

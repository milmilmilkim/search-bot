<template>
  <div class="container">
    <nav>
      <router-link to="/">Home</router-link> | <router-link to="/user">User</router-link> |
      <router-link to="/chat">Chat</router-link>
    </nav>
    <div class="inner"><router-view /></div>
  </div>
</template>

<style lang="scss" scoped>
nav {
  padding: 20px;
}
.container {
  width: 800px;
  border: 1px solid #000;
  margin: auto;
  margin-top: 50px;

  .inner {
    padding: 20px;
  }
}
</style>

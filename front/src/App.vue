<template>
  <div class="container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
.container {
  width: 800px;
  border: 1px solid #000;
  margin: auto;
  padding: 20px;
}
</style>

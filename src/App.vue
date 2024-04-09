<template>
  <div>
    <router-link class="go-home" to="/">Go to Home</router-link>
    <router-link class="go-about" to="/about">Go to About</router-link>
    <KeepAlive include="About">
      <router-view />
    </KeepAlive>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
@import url("./style/index.css");
</style>

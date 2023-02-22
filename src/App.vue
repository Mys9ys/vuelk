<template>
  <router-view></router-view>
  <pre>

  </pre>
  <div style="position: absolute; bottom: 3px; width: 100%">
    <LKNavbar
        :active_route="this.$route.path"
    ></LKNavbar>
  </div>

</template>

<script>
import LKNavbar from "@/components/LKNavbar";

export default {
  name: 'App',
  components: {
    LKNavbar
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 100vw;
  margin: 0 auto;
  font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height: 100vh;
  /*height: 896px;*/
  /*max-height: calc(100% - 47px);*/

}
</style>

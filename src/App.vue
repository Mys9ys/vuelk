<template>
  {{$store.state.token}}
  <p>Auth: {{$store.state.auth.isAuth}}</p>
  <div v-if="$store.state.loading">
    <LoadingStart></LoadingStart>
  </div>
  <transition-group name="fade">
    <router-view></router-view>
  </transition-group>
</template>

<script>
import LoadingStart from "@/components/LoadingStart";

export default {
  name: 'App',
  components: {
    LoadingStart
  },
  mounted:function(){
    this.method1() //method1 will execute at pageload
  },
  methods:{
    method1:function(){
      this.$store.state.auth.isAuth = true
      this.$router.push('main')
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: 'Roboto';
  src: url('@/font/Roboto-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('@/font/Roboto-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('@/font/Roboto-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('@/font/Roboto-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

#app {
  width: 100vw;
  margin: 0 auto;
  font-family: 'Roboto';
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height: 100vh;
  /*height: 896px;*/
  /*max-height: calc(100% - 47px);*/

}
</style>

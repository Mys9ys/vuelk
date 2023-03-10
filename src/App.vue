<template>

  <!--  {{$store.state.auth}}-->
  <div v-if="$store.state.loading">
    <LoadingStart></LoadingStart>
  </div>
  <div v-else>
    <div v-if="$store.state.auth">
      <router-view></router-view>

      <div style="position: absolute; bottom: 3px; width: 100%">
        <LKNavbar
            :active_route="this.$route.path"
        ></LKNavbar>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LKNavbar from "@/components/LKNavbar";
import LoadingStart from "@/components/LoadingStart";

export default {
  name: 'App',
  components: {
    LKNavbar,
    LoadingStart
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

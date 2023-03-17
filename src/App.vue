<template>
  <!--  <p>Auth: {{$store.state.auth.isAuth}}</p>-->
  <!--  <p>LoginData: {{$store.state.auth.loginData}}</p>-->
  <!--  <p>User: {{$store.state.auth.userInfo}}</p>-->
  <div v-if="$store.state.loading">
    <LoadingStart></LoadingStart>
  </div>
  <transition-group name="fade">
    <router-view></router-view>
  </transition-group>
</template>

<script>
import LoadingStart from "@/components/LoadingStart";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: 'App',
  components: {
    LoadingStart
  },
  data() {
    return {
      arr: []
    }
  },

  methods: {
    ...mapMutations({
      setLoginError: 'auth/setLoginError',
    }),
    ...mapActions({
      loginRequest: 'auth/loginRequest',
    }),

    checkValue(arr) {
      console.log('value',arr)
    },

    loadLogin: function () {

      // this.loginRequest()

      if (this.token) {
        console.log('this.loginError', this.loginError)
        console.log('this.userInfo', this.userInfo)
        console.log('this.authData', this.authData)
        console.log('this.$store.state.auth.isAuth', this.$store.state.auth.loginError)
        // if(!this.loginError) this.$router.push('main')
      }

      // this.$store.state.auth.isAuth = true
      //
    }
  },
  computed: {
    ...mapState({
      // loginError: state => state.auth.loginError,
      authData: state => state.auth.authData,
      token: state => state.auth.authData.token,
      userInfo: state => state.auth.userInfo,

    })
  },

  mounted: function () {
    // this.loadLogin()

    //method1 will execute at pageload

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

<template>
  <h2>ProfilePage</h2>
    <div @click="logoutLK($router, $store)"><img src="@/assets/icon/profile/exit.svg" alt="">Выйти из приложения</div>
</template>

<script>
export default {
  name: "ProfilePage",
  methods: {
    logoutLK($router, $store) {
      $store.state.auth = false
      if(!$store.state.auth) $router.push('/hello')
    }
  }
}
</script>

<style scoped>

</style>
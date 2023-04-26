<template>
  <div class="loader_wrapper">
    <img src="@/assets/icon/loader/loader.gif" alt="">
  </div>

</template>

<script>
export default {
  name: "LoaderMini"
}
</script>

<style lang="less" scoped>
.loader_wrapper{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  img{
    width: 20%;
  }
}
</style>
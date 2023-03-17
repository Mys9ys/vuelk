<template>
  <div class="wrapper">
    <div class="logo_block">
      <div class="logo">
        <img class="logo_img" :src="$store.state.logo">
      </div>
      <div class="loader_line">
        <div class="loader_fill_line"></div>
      </div>
    </div>

    <div class="footer_title_box">
      <div class="title_rus">{{$store.state.partner_title_rus}}</div>
      <div class="title_eng">{{$store.state.partner_title_eng}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoadingStart",
  mounted() {
    setInterval(() => {
      this.$store.state.loading = false
    }, 1100)
    // this.loginRequest()
  },
}
</script>

<style lang="less" scoped>
.wrapper{
  position: relative;
  background: #FFFFFF;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  text-align: center;
  z-index: 3;

  .logo_block{
    display: block;
    position: relative;
    top: 46%;
  }
  .logo{
    .logo_img{
      //width: 176px;
      //height: 55px;
      //transform: translateZ(0);
      //image-rendering: -webkit-optimize-contrast;
      //image-rendering: crisp-edges;
      //background-repeat: no-repeat;
      //background-position: center center;
    }
  }
  .loader_line{
    margin: 0 auto;
    position: relative;
    margin-top: 20px;
    width: 60%;
    height: 6px;

    /* Бледно-серый */
    background: #E7E7E7;
    border-radius: 10px;
    .loader_fill_line{
      position: absolute;
      top: 0;
      left: 0;
      width: 15%;
      height: 6px;

      /* Корп цвет */
      background: #43BAC0;
      border-radius: 10px;
      animation: animateThis 1s ease-in;
      -webkit-animation: animateThis 1s ease-in;
      -webkit-animation-fill-mode: forwards;
    }
  }
  .footer_title_box{
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .title_rus{
      width: 100%;
      height: 18px;

      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
      /* identical to box height, or 138% */

      text-align: center;
      letter-spacing: -0.408px;

      /* Серый */
      color: #8A8A8E;
    }
    .title_eng{
      width: 100%;
      height: 16px;

      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 183% */

      text-align: center;
      //letter-spacing: -0.408px;

      /* Серый */

      color: #8A8A8E;
    }
  }

  @keyframes animateThis {
    0% {
      width: 15%;
    }
    100% {
      width: 100%;
    }
  }
}

</style>
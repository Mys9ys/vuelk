<template>
  <div class="wrapper">
    <div class="logo_block">
      <div class="logo">
        <img class="logo_img" :src="$store.state.logo" alt="">
      </div>
      <div class="footer_title_box">
        <div class="title_rus">{{$store.state.partner_title_rus}}</div>
        <div class="title_eng">{{$store.state.partner_title_eng}}</div>
      </div>
    </div>

    <div class="btn_block">
      <BlueBtn @click="$router.push('/register')">Зарегистрироваться</BlueBtn>
      <TransparentBtn @click="$router.push('/auth')">Войти</TransparentBtn>
      <PrivacyPolicy>Регистрируясь</PrivacyPolicy>
    </div>

  </div>

</template>

<script>
import BlueBtn from "@/components/ui/btn/BlueBtn";
import TransparentBtn from "@/components/ui/btn/TransparentBtn";
import PrivacyPolicy from "@/components/ui/btn/PrivacyPolicy";

export default {
  name: "NotAuthHello",
  components: {
    BlueBtn,
    TransparentBtn,
    PrivacyPolicy
  }

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
    .logo_block{
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translateX(-50%);
      .logo{
        width: 300px;
        .logo_img{
          width: 100%;
        }
      }
      .footer_title_box{
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
    }

    .btn_block{
      width: 100%;
      position: absolute;
      bottom: 45px;
      left: 50%;
      transform: translateX(-50%);

      padding: 0 24px;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

    }

  }
</style>
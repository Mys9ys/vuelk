<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">Профиль</div>
      <div class="filter"></div>
    </div>
    <AvaComponent></AvaComponent>
    <div class="info">
      <div class="name">{{$store.state.profile_info.name}}</div>
      <div class="phone">{{$store.state.profile_info.phone}}</div>
      <div class="mail">{{$store.state.profile_info.mail}}</div>
    </div>
    <div class="statistic">
      <div class="patients s_block">
        <div class="count">{{$store.state.profile_info.patients}}</div>
        <div class="description">Пациентов</div>
      </div>
      <div class="contracts s_block">
        <div class="count">{{$store.state.profile_info.contracts}}</div>
        <div class="description">Договоров</div>
      </div>
      <div class="bonuses s_block">
        <div class="count">{{$store.state.profile_info.bonuses}}</div>
        <div class="description">Бонусов за <br>
          все время</div>
      </div>
    </div>
    <div class="btns">
      <a class="btn" href="tel:8 (800) 500-11-61"><img src="@/assets/icon/profile/call.svg" alt=""><span>Связаться с нами</span></a>
      <div class="btn"><img src="@/assets/icon/profile/shield.svg" alt=""><span>Политика конфиденциальности</span></div>
      <div class="btn"><img src="@/assets/icon/profile/pen.svg" alt=""><span>Изменить профиль</span></div>
      <div class="btn" @click="outLink"><img src="@/assets/icon/profile/link.svg" alt=""><span>Наш сайт</span></div>
      <div @click="logoutLK($router, $store)" class="btn"><img src="@/assets/icon/profile/exit.svg" alt=""><span>Выйти из приложения</span></div>
    </div>

  </div>
  <LKNavbar
      :active_route="this.$route.path"
  ></LKNavbar>
</template>

<script>
import AvaComponent from "@/components/AvaComponent";
import LKNavbar from "@/components/LKNavbar";

export default {
  name: "ProfilePage",
  components: {
    AvaComponent,
    LKNavbar
  },
  methods: {
    logoutLK($router, $store) {
      $store.state.auth.isAuth = false
      if(!$store.state.auth.isAuth) $router.push('/')
    },
    outLink(){
      window.location.href = 'https://lk-partners.eurokappa.ru';
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  background: #FFFFFF;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  text-align: center;
  padding: 0 24px;
  padding-top: 35px;
  padding-bottom: 69px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12px;

    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 138% */

      letter-spacing: -0.408px;

      /* Черный */
      color: #000000;
    }

  }

  .info{
    display: flex;
    flex-direction: column;
    margin-top: 11px;
    justify-content: center;
    align-items: center;
    .name{
      font-weight: 500;
      font-size: 16px;
      line-height: 135%;
      /* identical to box height, or 22px */

      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.01em;

      /* Черный */

      color: #000000;
    }
    .phone, .mail{
      font-weight: 400;
      font-size: 12px;
      line-height: 130%;
      /* identical to box height, or 16px */

      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.03em;

      /* Серый */

      color: #8A8A8E;

    }
  }
  .statistic{
    width: calc(100% - 60px);
    margin: 0 auto;
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    padding-bottom: 32px;
    border-bottom: 2px dashed #8A8A8E;

    .s_block{
      display: flex;
      flex-direction: column;

      align-items: center;
      .count{
        font-weight: 500;
        font-size: 18px;
        line-height: 135%;
        /* or 24px */

        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.01em;

        /* Черный */

        color: #000000;
      }

      .description{
        font-weight: 400;
        font-size: 12px;
        line-height: 130%;
        /* identical to box height, or 16px */

        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.03em;

        /* Серый */

        color: #8A8A8E;

      }
    }
  }
  .btns{
    width: calc(100% - 110px);
    margin: 0 auto;
    margin-top: 44px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 28px;
    padding-bottom: 80px;
    .btn{
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 16px;

      font-weight: 500;
      font-size: 14px;
      line-height: 116%;
      /* or 16px */

      /* Черный */
      color: #000000;

      text-decoration: none;

      span{
        text-align: left;
      }
    }
  }
}
</style>
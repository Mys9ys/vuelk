<template>
  <div class="lk_navbar_wrapper">
    <div
        class="lkn_item_box"
        v-for="(btn, index) in btns"
        :key="index"
        @click="$router.push(btn.url)"
        :class="active_route === btn.url ? 'active': ''"
    >
      <div class="lkn_icon" v-if="active_route === btn.url"><img class="lkn_icon_svg" :src="btn.img_w" alt=""></div>
      <div class="lkn_icon" v-else><img class="lkn_icon_svg" :src="btn.img" alt=""></div>
      <div class="lkn_title">{{btn.title}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LKNavbar",
  props: {
    active_route:{
      type: String,
    }
  },
  data() {
    return {
      btns: [
        {img: require('@/assets/icon/navbar/nb1.svg'),img_w: require('@/assets/icon/navbar/nb1_w.svg'), title: 'Обзор', url: '/'},
        {img: require('@/assets/icon/navbar/nb2.svg'), img_w: require('@/assets/icon/navbar/nb2_w.svg'), title: 'Пациенты' , url: '/patients'},
        {img: require('@/assets/icon/navbar/nb3.svg'), img_w: require('@/assets/icon/navbar/nb3_w.svg'), title: 'Бонусы', url: '/bonus' },
        {img: require('@/assets/icon/navbar/nb4.svg'), img_w: require('@/assets/icon/navbar/nb4_w.svg'), title: 'Профиль', url: '/profile'}
      ]
    }
  },

}
</script>

<style lang="less" scoped>
.lk_navbar_wrapper{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.lkn_item_box{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  border-radius: 20px;
  gap: 10px;
  height: 47px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;

  .lkn_icon{
    width: 20.8px;
    height: 24px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .lkn_title{
    display: none;
    height: 22px;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    /* identical to box height, or 138% */
    letter-spacing: -0.408px;

    /* Белый */
    color: #FFFFFF;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
  }

  &.active{
    /* Корп цвет */
    background: #43BAC0;
    .lkn_title{
      display: block;
    }
  }
}

</style>
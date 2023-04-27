<template>
  <div class="patient">
    <div class="ava">
      <img src="@/assets/icon/other/bonus.svg" alt="">
    </div>
    <div class="info">
      <div class="header">
        <div class="name">{{ el.name }}</div>
        <div class="money" >{{el.bonus}}<span class="b_icon">ᴃ</span></div>
      </div>
      <div class="status"><span class="text">{{ el.b_status }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientEl",
  props: {
    el: {
      type: Object
    }
  },
}
</script>

<style lang="less" scoped>

.patient {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;

  padding: 12px 0;

  &:not(:last-child){
    border-bottom: 1px solid #E7E7E7;
  }

  .ava {
    width: 40px;
    height: 40px;
    font-weight: 600;
    font-size: 24px;
    line-height: 22px;
    /* identical to box height, or 92% */

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    /* Серый */
    color: #fff;
    border-radius: 10px;
    background: #E7E7E7;

  }

  .info{
    width: 100%;
    text-align: left;

    .header{

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .name{
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        /* identical to box height, or 183% */

        letter-spacing: -0.408px;

        /* Черный */

        color: #000000;
      }
      .money{
        font-weight: 700;
        font-size: 12px;
        line-height: 22px;
        /* identical to box height, or 183% */

        text-align: right;
        letter-spacing: -0.408px;

        /* Черный */

        color: #000000;
      }
    }


    .status{
      display: inline-block;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      /* identical to box height, or 183% */

      padding: 0 8px;
      border-radius: 20px;

      /* Темно-серый */

      color: #535355;


      /* Inside auto layout */
      .text{
        mix-blend-mode: difference;
      }

    }
  }
}
</style>
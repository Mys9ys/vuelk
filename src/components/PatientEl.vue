<template>
  <div class="patient">
    <div class="ava" :class="el.ava">{{ el.name.charAt(0).toUpperCase() }}</div>
    <div class="info">
      <div class="name">{{ el.name }}</div>
      <div class="status" :class="el.status_bg"><span class="text">{{ el.status }}</span></div>
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
@max1: #f1416c;
@max2: #50cd89;
@max3: #ffc700;
@max4: #009ef7;
@max5: #90a4ae;
@max6: #7239ea;
@max7: #8a1538;

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

    &.ava1 {
      background: @max1;
    }
    &.ava2 {
      background: @max2;
    }
    &.ava3 {
      background: @max3;
    }
    &.ava4 {
      background: @max4;
    }
    &.ava5 {
      background: @max5;
    }
    &.ava6 {
      background: @max6;
    }
    &.ava7 {
      background: @max7;
    }

  }

  .info{

    .name{
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      /* identical to box height, or 183% */

      letter-spacing: -0.408px;

      /* Черный */

      color: #000000;
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

      &.bg1{
        background: #FFEAA1;
      }
      &.bg2{
        background: #B4E3E6;
      }
      &.bg4{
        background: #FFC8C8;
      }
      &.bg3{
        background: @max2;
      }

    }
  }
}
</style>
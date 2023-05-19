<template>
  <div class="patient">
    <div class="ava" :class="el.status.color ?? 'grey'">{{ el.name.charAt(0).toUpperCase() }}</div>
    <div class="info">
      <div class="name">{{ el.name }}</div>
      <div class="status" :class="el.status.color ?? 'grey'"><span class="text">{{ el.status.name }}</span></div>
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
@max8: rgb(219, 241, 153);;

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

    &.grey{
      background: #90a4ae;
    }

  }

  .info{

    text-align: left;

    .name{
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      /* identical to box height, or 183% */

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


    }
  }
}

.grey{
  background: @max5;
}
.clrFFBDBC{
  background: #FFEAA1;
}
&.clrACE9FB{
  background: #B4E3E6;
}
.clrff5752, &.clrFFBEBD{
  background: #FFC8C8;
}
.clr00ffff, .clrDBF199{
  background: @max2;
}
.clr00FF00{
  background: @max8;
}

</style>
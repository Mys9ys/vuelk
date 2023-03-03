<template>
  <form class="form_code">
    <AuthInput
        v-for="(el, index) in inputs"
        :key="index"
        :inputInfo ="el"
    ></AuthInput>

    <BlueBtn @click="$router.push('/recover_success')">Изменить пароль</BlueBtn>
  </form>
</template>

<script>
import AuthInput from "@/components/ui/input/AuthInput";
import BlueBtn from "@/components/ui/btn/BlueBtn";

export default {
  name: "FormCode",
  components: {
    AuthInput,
    BlueBtn
  },

  data(){
    return {
      inputs: [
        { f_icon: require('@/assets/icon/form/code.svg'), title: 'Проверочный код', l_icon: ''},
        { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Пароль', l_icon: require('@/assets/icon/form/eye.svg')},
        { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Повторите пароль', l_icon: require('@/assets/icon/form/eye.svg')},
      ]
    }
  },
}
</script>

<style lang="less" scoped>
  .form_code{
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
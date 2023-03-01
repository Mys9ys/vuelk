<template>
  <div class="input_wrapper" :class="{wrapper_active : activeInput}" @click="clickActiveInput">
    <div class="first_icon">
      <img :src="inputInfo.f_icon" alt="">
    </div>
    <div class="placeholder">{{inputInfo.title}}</div>
    <input v-if="activeInput" type="text" class="input" v-focus v-on:blur="focusOut" v-model="inputText">
    <div class="last_icon" v-if="inputInfo.l_icon">
      <img :src="inputInfo.l_icon" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthInput",
  props: {
    inputInfo: {
      type: Object
    }
  },
  data() {
    return {
      activeInput: false,
      inputText: ''
    }
  },
  methods: {
    clickActiveInput() {
      this.activeInput = true
    },
    focusOut(){
      if(!this.inputText) this.activeInput = false
    }
  }
}
</script>

<style lang="less" scoped>
.input_wrapper {
  position: relative;
  height: 56px;
  padding: 8px 24px 8px 47px;

  background: #FFFFFF;

  /* Серый */
  border: 2px solid #8A8A8E;
  border-radius: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.wrapper_active {
    justify-content: space-between;
    border: 2px solid #43BAC0;
  }

  .first_icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
  }

  .last_icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  .placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 116%;
    /* or 16px */

    display: flex;
    align-items: center;

    /* Серый */

    color: #8A8A8E;


    /* Inside auto layout */

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .input {
    width: 100%;

    font-weight: 500;
    font-size: 14px;
    line-height: 112%;
    /* or 16px */

    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    //font-feature-settings: 'salt' on, 'liga' off;

    /* Черный */
    color: #000000;

    border: none;
    //border-bottom: 1px solid #8A8A8E;
    &:active, &:focus {
      outline: none;
    }
  }
}
</style>
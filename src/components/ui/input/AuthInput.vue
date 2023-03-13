<template>
  <div class="input_wrapper" :class="{wrapper_active : activeInput, wrapper_error: error}" @click="clickActiveInput">
    <div v-if="error" class="error_mes">{{ error }}</div>
    <div class="first_icon">
      <img :src="inputInfo.f_icon" alt="">
    </div>
    <div class="placeholder">{{ inputInfo.title }}</div>
    <input v-if="activeInput"
           :type="inputInfo.l_icon && !openPass ? 'password' : 'text'"
           v-focus
           class="input"
           @focusout="focusOut(inputInfo.title)"
           v-model="inputText"
           @input="inputChange($event.target.value)"
           @error="error"
    >
    <div class="last_icon" v-if="inputInfo.l_icon" @click="openPassword">
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
      inputText: null,
      openPass: false,
      error: null
    }
  },
  methods: {
    clickActiveInput() {
      this.activeInput = true
      this.error = null
    },
    focusOut(type) {
      if (!this.inputText) {
        console.log('viwel', type)
        this.error = 'Введите ' + type
        this.$emit('update:error', this.error)
        console.log(' this.error',  this.error)
      } else {
        if (type === 'E-mail') {
          if (!this.emailValidate(this.inputText)) {
            this.error = 'Укажите корректный ' + type
            this.$emit('update:error', this.error)
          } else {
            this.error = ''
            this.$emit('update:error', this.error)
          }
        }
      }
    },
    openPassword() {
      this.openPass = !this.openPass
    },
    inputChange(value){
      this.$emit('update:value', value)
    },

    emailValidate(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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

  &.wrapper_error {
    border: 2px solid #FF6262;
  }

  .error_mes {
    position: absolute;
    left: 10px;
    top: -22px;
    color: #FF6262;
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
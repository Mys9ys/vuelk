<template>
  <div class="ava_wrapper">
    <div class="background">
      <img v-if="img" class="icon" :src="url+img">
      <img v-else class="icon_empty" src="@/assets/icon/auth/profile.svg">
    </div>
    <input class="file_container"
           type="file" id="file"
           ref="file" accept="image/png, image/gif, image/jpeg"
           @change="handleFileUpload()"/>
    <div class="plus" @click="loadFile()">+</div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "AvaComponent",
  data() {
    return {
      url:  window.location.href.includes('localhost') ? 'http://git.lk-partners' :  'https://lk-partners.eurokappa.ru',
    }
  },
  props: {
    img: {
      type: String
    }
  },

  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
    })
  },

  methods: {
    ...mapMutations({
      setAvaFile: 'auth/setAvaFile',
    }),
    ...mapActions({
      avaSetRequest: 'auth/avaSetRequest',
    }),

    loadFile(){
      this.$refs.file.click();
    },
    async handleFileUpload(){

      this.setAvaFile( this.$refs.file.files[0])
      // this.formDataFile.append('token', this.token)
      //
      if(this.token) {
        await this.avaSetRequest()
        location.reload()
      }

    }
  }
}
</script>

<style lang="less" scoped>
.ava_wrapper {
  position: relative;
  display: inline-block;
  margin: 0 auto;
  margin-top: 24px;

  .file_container{
    display: none;
  }

  .background {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    /* Согласие, кнопка прозр */
    background: #B4E3E6;
    border-radius: 100px;
    overflow: hidden;
    .icon{
      width: 100%;
    }
  }

  .plus {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 20px;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background: #43BAC0;
    /* Белый */

    border: 3px solid #FFFFFF;
    border-radius: 100px;

    color: #FFFFFF;
  }
}
</style>
<template>
  <div id="loader" class="loader_box">
    <div class="loader">
      <div class="loader_block">1</div>
      <div class="loader_block"></div>
      <div class="loader_block"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoaderEK",
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>

@duration: 1.5s;
@container: 150px;
@box: 33px;
@radius: 15%;
@body-background: #eef2f4;
@link-color: #1058d0;


.loader_box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.7)
}

.loader {
  width: @container;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%)
}

.loader_block {
  width: @box;
  height: @box;
  position: relative;
  display: block;
  transform-origin: -50% center;
  border-radius: @radius;
}

.loader_block:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: lightblue;
  border-radius: @radius;
}

.loader_block:nth-child(1) {
  -webkit-animation: slide @duration ease-in-out infinite alternate;
  animation: slide @duration ease-in-out infinite alternate;
}

.loader_block:nth-child(1):after {
  -webkit-animation: color-change @duration ease-in-out infinite alternate;
  animation: color-change @duration ease-in-out infinite alternate;
}

.loader_block:nth-child(2) {
  -webkit-animation: flip-2 @duration ease-in-out infinite alternate;
  animation: flip-2 @duration ease-in-out infinite alternate;
}

.loader_block:nth-child(2):after {
  -webkit-animation: squidge-2 @duration ease-in-out infinite alternate;
  animation: squidge-2 @duration ease-in-out infinite alternate;
}

.loader_block:nth-child(3) {
  -webkit-animation: flip-3 @duration ease-in-out infinite alternate;
  animation: flip-3 @duration ease-in-out infinite alternate;
}

.loader_block:nth-child(3):after {
  -webkit-animation: squidge-3 @duration ease-in-out infinite alternate;
  animation: squidge-3 @duration ease-in-out infinite alternate;
}

@-webkit-keyframes slide {
  0% {
    background-color: #1795ff;
    transform: translateX(0vw);
  }
  100% {
    background-color: #23d3fb;
    transform: translateX(calc(@container - @box));
  }
}

@keyframes slide {
  0% {
    background-color: #1795ff;
    transform: translateX(0vw);
  }
  100% {
    background-color: #23d3fb;
    transform: translateX(calc(@container - @box));
  }
}

@-webkit-keyframes color-change {
  0% {
    background-color: #006a9a;
  }
  100% {
    background-color: #60cfdf;
  }
}

@keyframes color-change {
  0% {
    background-color: #006a9a;
  }
  100% {
    background-color: #60cfdf;
  }
}

@-webkit-keyframes flip-2 {
  0%, 30% {
    transform: rotate(0);
  }
  80%, 100% {
    transform: rotate(-180deg);
  }
}

@keyframes flip-2 {
  0%, 30% {
    transform: rotate(0);
  }
  80%, 100% {
    transform: rotate(-180deg);
  }
}

@-webkit-keyframes flip-3 {
  0%, 45% {
    transform: rotate(0);
  }
  95%, 100% {
    transform: rotate(-180deg);
  }
}

@keyframes flip-3 {
  0%, 45% {
    transform: rotate(0);
  }
  95%, 100% {
    transform: rotate(-180deg);
  }
}

@-webkit-keyframes squidge-2 {
  20% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(1);
  }
  30% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(0.7);
  }
  40%, 35% {
    transform-origin: center bottom;
    transform: scalex(0.8) scaley(1.4);
  }
  70%, 100% {
    transform-origin: center top;
    transform: scalex(1) scaley(1);
  }
  55% {
    transform-origin: center top;
    transform: scalex(1.5) scaley(1.5);
  }
  0% {
    background-color: #3192d0;
  }
  100% {
    background-color: #006a9a;
  }
}

@keyframes squidge-2 {
  20% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(1);
  }
  30% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(0.7);
  }
  40%, 35% {
    transform-origin: center bottom;
    transform: scalex(0.8) scaley(1.4);
  }
  70%, 100% {
    transform-origin: center top;
    transform: scalex(1) scaley(1);
  }
  55% {
    transform-origin: center top;
    transform: scalex(1.5) scaley(1.5);
  }
  0% {
    background-color: #3192d0;
  }
  100% {
    background-color: #006a9a;
  }
}

@-webkit-keyframes squidge-3 {
  35% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(1);
  }
  45% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(0.7);
  }
  55%, 50% {
    transform-origin: center bottom;
    transform: scalex(0.8) scaley(1.4);
  }
  85%, 100% {
    transform-origin: center top;
    transform: scalex(1) scaley(1);
  }
  70% {
    transform-origin: center top;
    transform: scalex(1.5) scaley(1.5);
  }
  0% {
    background-color: #60cfdf;
  }
  100% {
    background-color: #3192d0;
  }
}

@keyframes squidge-3 {
  35% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(1);
  }
  45% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(0.7);
  }
  55%, 50% {
    transform-origin: center bottom;
    transform: scalex(0.8) scaley(1.4);
  }
  85%, 100% {
    transform-origin: center top;
    transform: scalex(1) scaley(1);
  }
  70% {
    transform-origin: center top;
    transform: scalex(1.5) scaley(1.5);
  }
  0% {
    background-color: #60cfdf;
  }
  100% {
    background-color: #3192d0;
  }
}

</style>
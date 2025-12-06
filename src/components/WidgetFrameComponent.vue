<template>
  <div class="widget">
    <slot name="img"></slot>
    <div class="widget__top">
      <slot name="top"></slot>
    </div>
    <div class="widget__bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.widget {
  position: relative;
  border-radius: 16px;
  width: 510px;
  height: 632px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.widget__top {
  border-radius: 16px 16px 0 0;
  width: 100%;
  height: 75%;
  padding: 74px 0 0 73px;
  position: relative;
}
.widget__bottom {
  border-radius: 0 0 16px 16px;
  width: 100%;
  height: 25%;
  padding: 30px 30px 25px 35px;
  background: #fff;
}
@media (max-width: 1199px) {
  .widget__top {
    padding: 64px 0 0 63px;
  }
}
@media (max-width: 987px) {
  .widget {
    width: 410px;
    height: 532px;
  }
  .widget__top {
    padding: 44px 0 0 43px;
  }
  .widget__bottom {
    padding: 15px 20px 15px 20px;
  }
}
@media (max-width: 767px) {
  .widget {
    width: 370px;
    height: 482px;
  }
  .widget__top {
    padding: 35px 0 0 33px;
  }
}
@media (max-width: 575px) {
  .widget {
    width: 310px;
    height: 432px;
  }
}
@media (max-width: 459px) {
  .widget {
    width: 243px;
    height: 332px;
  }
  .widget__top {
    padding: 24px 0 0 23px;
  }
  .widget__bottom {
    padding: 16px 20px 17px 16px;
  }
}
</style>

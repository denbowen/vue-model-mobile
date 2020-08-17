<template>
  <div class="home">
    <div>首页</div>
    <van-button type="info">信息按钮</van-button>
  </div>
</template>

<script>
import { Button as VanButton } from 'vant';

export default {
  name: 'index',
  components: {
    VanButton,
  },
};
</script>

<style lang="less" scoped>
.home {
  img {
    display: block;
    width: 170px;
    height: auto;
    font-size: 12px;
  }
}
</style>

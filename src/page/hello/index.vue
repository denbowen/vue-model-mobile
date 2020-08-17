<template>
  <div class="hello">
    <div>hello页面</div>
    <div>hello world</div>
    <hello-image />
    <van-button type="info" @click="onButtonClick">点击</van-button>
  </div>
</template>

<script>
import { Dialog, Button as VanButton } from 'vant';
import HelloImage from '@src/component/image/index.vue';

export default {
  name: 'index',
  components: {
    VanButton,
    HelloImage,
  },
  methods: {
    onButtonClick() {
      Dialog.alert({
        title: '欢迎',
        message: '欢迎使用Vant',
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.hello {
  > div:first-child {
    font-size: 24px;
    font-weight: bold;
  }

  > div:last-child {
    font-size: 14px;
    color: aqua;
  }
}
</style>

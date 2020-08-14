<template>
  <div class="hello">
    <div>hello页面</div>
    <div>hello world</div>
    <hello-image/>
  </div>
</template>

<script>
import HelloImage from '@src/component/image/index.vue';

export default {
  name: 'index',
  components: {
    HelloImage,
  },
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

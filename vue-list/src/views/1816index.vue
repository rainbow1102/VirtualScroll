<template>
  <div id="wrap">
    <virtual-scroll
      :msg="msg"
      :oneHeight="oneHeight"
      :requestUrl="requestUrl"
      :requestNum="requestNum"
    />
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        msg: '数据请求或中……',
        oneHeight: 100,   // 记录单条数据的高度
        requestUrl: 'http://localhost:9090/api/v2/banner/list?num=',
        requestNum: 20,   // 请求条数
      }
    }
  }
</script>

<style>
  #wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

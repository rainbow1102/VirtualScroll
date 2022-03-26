<template>
  <div id="wrap">
    <virtual-scroll
      :msg="msg" :oneHeight="oneHeight"
      :requestUrl="requestUrl" :requestNum="requestNum"
      v-slot:default="oneItem"
    >
      <div class="item-box">
        <li class="left-item">
          <p>{{oneItem.thisItem.from}}</p>
          <p>{{oneItem.thisItem.reads}}</p>
        </li>
        <li class="right-item">
          <img :src="oneItem.thisItem.image" class="img">
        </li>
      </div>
    </virtual-scroll>
    >
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

  .item-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 99px;
    background-color: #F5F5F5;
    padding: 0 30px;
    border-bottom: 1px solid deeppink;
  }

  .img {
    width: 100px;
    height: 80px;
  }
</style>

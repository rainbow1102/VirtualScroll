<template>
  <div id="wrap">
    <!-- 滚动容器 -->
    <div class="scroll-container" ref="scrollContainer"
         @scroll.passive="handleScroll"
    >
      <div :style="blankFillStyle">
        <ul class="list" v-for="(item, index) in showDataList" :key="index">
          <li class="left-item">
            <p>{{item.from}}</p>
            <p>{{item.reads}}</p>
          </li>
          <li class="right-item">
            <img :src="item.image" class="img">
          </li>
        </ul>
        <!-- 提示 -->
        <div v-if="isRequestStatus">
          <h2>{{msg}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  //import 'whatwg-fetch'
  export default {
    name: 'app',
    data() {
      return {
        allDataList: [],   // all allDataList data
        // 数据请求状态
        isRequestStatus: true,
        msg: '数据请求或中……',
        oneHeight: 100,   // 记录单条数据的高度
        containSize: 0,    // 容器的最多容积
        startIndex: 0,   // 记录当前滚动的第一个元素的索引
        // endIndex: 0,   // 记录当前滚动的最后一个元素的索引
        isScrollStatus: true,   // 记录当前滚动有效的状态
      }
    },
    async created() {
      let newList = await this.getNewsList()
      if (!newList) return
      this.allDataList = newList
    },
    mounted() {
      this.getContainSize()
      // 屏幕缩放
      window.onresize = this.getContainSize
      // 屏幕翻转
      window.onorientationchange = this.getContainSize
    },
    computed: {
      // 容器中最后一个元素的索引
      endIndex() {
        let endIndex = this.startIndex + this.containSize
        if (!this.allDataList[endIndex]) {
          endIndex = this.allDataList.length - 1
        }
        return endIndex
      },
      // 待显示的数组列表元素
      showDataList() {
        return this.allDataList.slice(this.startIndex, this.endIndex)
      },
      // 上留白的高度
      topBlankFill() {
        return this.startIndex * this.oneHeight
      },
      // 下留白的高度
      bottomBlankFill() {
        return (this.allDataList.length - this.endIndex) * this.oneHeight
      },
      // 上下留白填充样式
      blankFillStyle() {
        return {
          paddingTop: this.startIndex * this.oneHeight + 'px',
          paddingBottom: (this.allDataList.length - this.endIndex) * this.oneHeight + 'px'
        }
      },
    },
    methods: {
      getNewsList() {
        // 请求数据
        let num = 20
        return axios.get(`/api/v2/banner/list?num=${num}`).then(res => {
          //console.log('数据：', res.data.list)
          // this.allDataList = res.data.list
          this.isRequestStatus = false
          return res.data.list
        })
        .catch(error => {
          console.log(error)
          return false
        })
      },
      // 计算容器的最多容积
      getContainSize() {
        this.containSize = ~~(this.$refs.scrollContainer.offsetHeight / this.oneHeight) + 2
      },
      // 定义滚动行为事件方法
      handleScroll() {
        if (this.isScrollStatus) {
          this.isScrollStatus = false
          /**
           *  1s才允许进行下一次 scroll 滚动事件
           * */
          let myTimer = setTimeout(() => {
            this.isScrollStatus = true
            clearTimeout(myTimer)
          }, 30)
          this.setDataStartIndex()
        }
      },
      async setDataStartIndex() {
        // 当前滚动的顶部索引
        let currentIndex = ~~(this.$refs.scrollContainer.scrollTop / this.oneHeight)
        if (this.startIndex === currentIndex) return
        this.startIndex = currentIndex
        // 记录当前滚动的第一个元素的索引
        //this.startIndex = ~~(this.$refs.scrollContainer.scrollTop / this.oneHeight)
        /**
         *  处理二次数据请求
         * */
        if (this.startIndex + this.containSize > this.allDataList.length - 1 && !this.isRequestStatus) {
          console.log('滚动到底部了')
          let newList = await this.getNewsList()
          if (!newList) return
          this.allDataList = [...this.allDataList, ...newList]
        }
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .scroll-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .list {
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

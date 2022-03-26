<template>
  <!-- 滚动容器 -->
  <div class="scroll-container" ref="scrollContainer"
       @scroll.passive="handleScroll"
  >
    <div :style="blankFillStyle">
      <ul class="list" v-for="(item, index) in showDataList" :key="index"
          @click="clickListDeta(item)"
      >
        <!-- item通过thisItem分发给父组件 -->
        <slot :thisItem="item"/>
      </ul>
      <!-- 提示 -->
      <div v-if="isRequestStatus">
        <h2>{{msg}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  //import 'whatwg-fetch'
  export default {
    name: 'VirtualScroll',
    props: {
      msg: {
        type: String,
        default: () => "数据请求或中……"
      },
      oneHeight: {
        type: Number,
        default: () => 100
      },
      requestUrl: {
        type: String,
        default: () => "http://localhost:9090/api/v2/banner/list?num="
      },
      requestNum: {
        type: Number,
        default: () => 20
      },
    },
    data() {
      return {
        allDataList: [],   // all allDataList data
        // 数据请求状态
        isRequestStatus: true,
        //msg: '数据请求或中……',
        //oneHeight: 100,   // 记录单条数据的高度
        containSize: 0,    // 容器的最多容积
        startIndex: 0,   // 记录当前滚动的第一个元素的索引
        // endIndex: 0,   // 记录当前滚动的最后一个元素的索引
        currentScrollTop: 0, // 当前滚动的距离顶部的位移
      }
    },
    async created() {
      let newList = await this.getNewsList()
      if (!newList) return
      this.allDataList = newList
    },
    /**
     *  处理 列表进入详情，回来停留在当前位置(进入的位置)
     *    App.vue 配置 keep-alive
     * */
    activated() {
      this.$nextTick(() => {
        this.$refs.scrollContainer.scrollTop = this.currentScrollTop
      })
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
        let endIndex = this.startIndex + this.containSize * 2
        if (!this.allDataList[endIndex]) {
          endIndex = this.allDataList.length - 1
        }
        return endIndex
      },
      // 待显示的数组列表元素
      showDataList() {
        let startIndex = 0
        // 上
        if (this.startIndex <= this.containSize) {
          startIndex = 0
        } else {
          startIndex = this.startIndex - this.containSize
        }
        return this.allDataList.slice(startIndex, this.endIndex)
      },
      /*// 上留白的高度
      topBlankFill() {
        return this.startIndex * this.oneHeight
      },
      // 下留白的高度
      bottomBlankFill() {
        return (this.allDataList.length - this.endIndex) * this.oneHeight
      },*/
      // 上下留白填充样式
      blankFillStyle() {
        let startIndex = 0
        // 上
        if (this.startIndex <= this.containSize) {
          startIndex = 0
        } else {
          startIndex = this.startIndex - this.containSize
        }
        return {
          paddingTop: startIndex * this.oneHeight + 'px',
          paddingBottom: (this.allDataList.length - this.endIndex) * this.oneHeight + 'px'
        }
      },
    },
    methods: {
      getNewsList() {
        // 请求数据
        return axios.get(this.requestUrl + this.requestNum).then(res => {
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
        let requestAnimationFrame = window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame

        let fps = 30
        let interval = 100 / fps
        let then = Date.now()   // 最开始新的时间
        requestAnimationFrame(() => {
          // 当前时间戳
          let now = Date.now()
          this.setDataStartIndex()
          if (now - then >= interval) {
            then = now
            requestAnimationFrame(arguments.callee)
          }
        })
      },
      async setDataStartIndex() {
        this.currentScrollTop = this.$refs.scrollContainer.scrollTop
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
      },


      clickListDeta(item) {
        this.$router.push({
          name: 'IndexDeta',
          params: {
            id: item.id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .scroll-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
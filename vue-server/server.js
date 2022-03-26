const express = require('express')
const Mock = require('mockjs')
const Random = Mock.Random

// 创建服务器
const server = express()

/**
 *  设置跨域请求头
 * */
server.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/**
 *  传入参数 num，生成 num 条数据列表
 * */
function generatorList(num) {
  return Mock.mock({
    [`list|${num}`]: [{
      'id|+1': 1,   // id
      title: "@ctitle(15, 25)",   // 模拟标题，中文字符串长度15位到25位
      image: '@image(["200x200"], "@color", "@color", "@name")',
      reads: "@natural(0, 99999)",   // 模拟访问人数，自然数从0位到99999位
      from: "@ctitle(3, 10)",   // 模拟新闻来源，中文字符串长度3位到15位
      data: "@date('yyyy-MM-dd')"
    }]
  })
}

/**
 *  拦截请求
 * */
server.get('/api/v2/banner/list', (req, res) => {
  const {num} = req.query
  return res.send(generatorList(num))
})

/**
 *  启动服务器
 * */
server.listen('9090', 'localhost', res => {
  console.log('服务器启动成功');
});

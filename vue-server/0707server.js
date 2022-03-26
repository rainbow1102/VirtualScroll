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
 *  拦截请求
 * */
server.get('/api/v2/banner/list', (req, res) => {
  // 伪造数据
  let data = Mock.mock({
    'list|10': [
      {
        'name': '@first@last',
        'age|20-40': 0,
        'sex|1': ['男', '女'],
        // email: Random.email()
        email: '@email',
        // headerImage: Random.image()
        headerImage: '@image(["200x200"], "@color", "@color", "@name")',
        address: '@city'
      }
    ]
  });
  // 响应客户端
  res.json(data);
})

/**
 *  启动服务器
 * */
server.listen('9090', 'localhost', res => {
  console.log('服务器启动成功');
});

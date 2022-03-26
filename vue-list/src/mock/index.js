import Mock from 'mockjs'

// 设置拦截请求后，响应请求的时间
Mock.setup({
  timeout: 100
  // timeout: '500-5000'
})

var Random = Mock.Random

var data = Mock.mock(
  {
    // 'name|min-max': string
    'str|1-5': 'hello',
    // 'name|count': string
    'str1|2': 'hello',
    // 'name|+1': number
    'num|+1': 1,
    'list|1-10': [
      {
        'id|+1': 1
      }
    ],
    //'name|min-max': number
    'num1|10-50': 0,
    // 'name|min-max.dmin-dmax': number
    'num2|10-20.3-5': 0,
    'num3|10-20.2': 0,
    //'name|1': boolean
    'bool|1': false,
    //'name|min-max': value
    'bool|1-99': false, //  1/1+99
    //'name|count': object
    'obj|2': {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e'
    },
    // 'name|min-max': object
    'obj1|2-4': {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e'
    },
    // 'name|1': array
    'arr|1': ['a', 'b', 'c', 'd'],
    // 'name|+1': array
    'arr1|+1': ['a', 'b', 'c', 'd'],
    'list1|1-10': [
      {
        'id|+1': 1,
        'letter|+1': ['a', 'b', 'c', 'd']
      }
    ],
    // 'name|min-max': array
    // 'name|count': array
    'arr2|3': [1, 2],

    // 'name': function
    // 自定义生成随机数据的规则
    'func|1-10': function (info) {
      // console.log(info);

      return 'test func';
    },

    // 'name': regexp
    'regexp1': /[a-z][A-Z][0-9]/,

    name: {
      'age|20-60': 0,
      f: '@FIRST',
      m: '@FIRST',
      l: '@LAST',
      full: '@f @m @l , age is @age'
    }
  }
)
// console.log(data)


// 参数1：拦截的url请求
// 参数2：拦截请求的方式GET,POST(无效)
// 参数3: template生成随机数据的规则
//        function( options )函数执行返回的结果作为拦截请求的结果
//              options请求的信息，url，method，body

//Mock.mock( rurl?, rtype?, template|function( options ) )


Mock.mock('/api/v2/banner/list', {
  'list|10': [
    {
      'name': '@FIRST @LAST',
      'age|20-40': 0,
      'sex|1': ['男', '女'],
      headerImage: '@image(["200x200"], "@color", "@color", "@name")',
      email: '@email'
    }
  ]
})

// mock插件在前端可以拦截axios发出的请求，但是不能拦截fetch的请求

/*Mock.mock('/api/v2/banner/list', function (options) {
  // console.log(options);//请求的信息
  return Mock.mock({
    'list|10': [
      {
        'name': '@first@last',
        'age|20-40': 0,
        'sex|1': ['男', '女'],
        //  email: Random.email()
        email: '@email',
        // headerImage: Random.image()
        headerImage: '@image(["200x200"], "@color", "@color", "@name")'
      }
    ]
  })
})*/

console.log('mock执行了');

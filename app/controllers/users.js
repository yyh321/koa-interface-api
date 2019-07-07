
class User {
  topic(ctx) {
    ctx.body = '<h1>用户主题页!</h1>'
  }

  create(ctx) {
      ctx.verifyParams({
        name: {type:'string', required:true},
        age: {type: 'number', required: false}
      })
      ctx.body = '<h1> 创建新用户 </h1>'
  }
}

module.exports = new User()


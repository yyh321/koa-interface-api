const User = require("../models/users");

class UserCtrl {
  async find(ctx) {
    ctx.body = await User.find();
  }

  async findById(ctx) {
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, "该用户不存在!");
    }
    ctx.body = user;
  }

  topic(ctx) {
    ctx.body = "<h1>用户主题页!</h1>";
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true }
    });

    const { name } = ctx.request.body;
    const repeatedUser = User.findOne({ name });
    if (repeatedUser) {
      ctx.throw(409, "该用户已存在");
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      password: { type: "string", required: false }
    });

    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  async deleteUser(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存");
    }
    ctx.status = 204;
  }
}

module.exports = new UserCtrl();

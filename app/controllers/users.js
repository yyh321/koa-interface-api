const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");
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
    const repeatedUser = await User.findOne({ name });

    if (repeatedUser) {
      ctx.throw(409, "该用户已存在");
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  // 检查是否是用户本人
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, "没有权限");
    }
    await next();
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

  async login(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true }
    });

    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, "用户名或密码不正确");
    }

    const { _id, name } = user;

    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: "1d" });
    ctx.body = { token };
  }
}

module.exports = new UserCtrl();

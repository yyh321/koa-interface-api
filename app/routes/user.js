const Router = require("koa-router");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require('koa-jwt')
const { secret } = require("../config");
const {
  topic,
  create,
  find,
  findById,
  update,
  deleteUser,
  login,
  checkOwner
} = require("../controllers/users");

const router = new Router({ prefix: "/user" });

// 自己编写的用户认证中间件
// const auth = async (ctx, next) => {
//   const { authorization = "" } = ctx.request.header;
//   const token = authorization.replace("Bearer ", "");

//   try {
//     // 捕获401未认证错误
//     const user = jsonwebtoken.verify(token, secret);
//     ctx.state.user = user;
//   } catch (err) {
//     ctx.throw(401, err.message);
//   }

//   await next();
// };

const auth = jwt({ secret })

router.get("/topic", topic);

router.get("/findAll", find);

router.get("/findUser/:id", findById);

router.post("/create", create);
router.patch("/update/:id", auth, checkOwner, update);
router.delete("/delete/:id", auth, checkOwner, deleteUser);
router.post("/login", login);

module.exports = router;

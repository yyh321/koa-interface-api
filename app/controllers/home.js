
const path = require('path')

class HomeController {
  home(ctx) {
    ctx.body = '<h1>这是主目录 </h1>'
  }

  upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path); // 获取文件名+扩展名
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` }; //ctx.origin = http://localhost:3000 
  }
}

module.exports = new HomeController();


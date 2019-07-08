
class HomeController {
  home(ctx) {
    ctx.body = '<h1>这是主目录 </h1>'
  }

  upload(ctx) {
    const file = ctx.request.files.file;
    ctx.body = { path: file.path };
  }
}

module.exports = new HomeController();


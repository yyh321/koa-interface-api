const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('./routes/index')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const koaStatic = require('koa-static')
const path = require('path')

const {connectionStr} = require('./config')

const app = new Koa()

mongoose.connect(
  connectionStr, 
  {
  useNewUrlParser: true
 }, 
 ()=> {
  console.log('mongodb connection success!')
})
mongoose.connection.on('error', console.error)

app.use(koaStatic(path.join(__dirname,'public')))

app.use(error({
  postFormat: (e, {stack,...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack,...rest}
}))

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname,'/public/uploads'),
    keepExtensions: true, // 文件扩展名
  }
}));
app.use(parameter(app))
router(app)

app.listen(3000,() => {
  console.log('start listening 3000 port')
})
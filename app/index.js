const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes/index')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')

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

app.use(error({
  postFormat: (e, {stack,...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack,...rest}
}))

app.use(bodyParser())
app.use(parameter(app))
router(app)

app.listen(3000,() => {
  console.log('start listening 3000 port')
})
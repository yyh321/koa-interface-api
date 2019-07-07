const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes/index')
const error = require('koa-json-error')
const parameter = require('koa-parameter')

const app = new Koa()



app.use(error({
  postFormat: (e, {stack,...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack,...rest}
}))

app.use(bodyParser())
app.use(parameter(app))
router(app)

app.listen(3000,() => {
  console.log('start listening 3000 port')
})
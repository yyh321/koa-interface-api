const mongoose = require('mongoose')

const { Schema,model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select:false },
  name: { type: String, required: true},
  password: { type: String, required: true,select:false } // select:false 表示查询时不显示该字段
})

module.exports = model('User',userSchema)



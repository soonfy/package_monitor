import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const monitorSchema = new Schema({
  task: {
    type: String,
  },
  name: {
    type: String,
  },
  ip: {
    type: String,
  },
  mac: {
    type: String,
  },
  update: {
    type: Date,
  },
})

const monitorModel = mongoose.model('MONITOR', monitorSchema, 'monitors');
export {monitorModel}
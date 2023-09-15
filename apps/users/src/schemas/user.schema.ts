import * as mongoose from 'mongoose';

export const UserCustomSchema = new mongoose.Schema({
  name: String,
  phoneNo: Number,
  emailID: String,
  Age: Number,
  password: String,
});

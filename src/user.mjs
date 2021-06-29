import mongoose from 'mongoose';
import PostSchema from './post.mjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "The name must be longer than 2 characters"
    },
    required: [true, 'Name is required']
  },
  email: String,
  postCount: Number,
  posts: [PostSchema] //a new nested Schema or SubDocument
})

const User = mongoose.model('user', UserSchema)

export default User;

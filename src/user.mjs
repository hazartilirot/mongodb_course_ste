import mongoose from 'mongoose';
import PostSchema from './post.mjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'The name must be longer than 2 characters',
    },
    required: [true, 'Name is required'],
  },
  email: String,
  posts: [PostSchema], //a new nested Schema or SubDocument
  likes: Number,
  blogPost: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'   // reference to BlogPost collection
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

export default User;

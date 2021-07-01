import mongoose from 'mongoose';

const Schema = new mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
})

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

export default BlogPost;
import mongoose from 'mongoose';

const Schema = new mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Comment = mongoose.model('comment', CommentSchema);

export default Comment;
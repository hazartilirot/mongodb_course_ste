import assert from 'assert';
import User from '../src/user.mjs';
import Comment from '../src/comment.mjs';
import BlogPost from '../src/blogPost.mjs';

describe('Association', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
    });
    blogPost = new BlogPost({
      title: 'Learn JavaScript',
      content: 'It\'s the most flexible and fantastic language',
    });
    comment = new Comment({
      content: 'I\'ve just finished reading Javascript book',
    });
    //Associate joe with other collections (set up relations)
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([
      joe.save(),
      blogPost.save(),
      comment.save(),
    ])
      .then(() => done());
  });
  it('saves a relations between a user and blogPost', done => {
    User.findOne({ email: 'joe@example.com' })
      .populate('blogPosts') // fetch data of blogPosts by its objectId
      .then(user => {
        assert(user.blogPosts[0].title === 'Learn JavaScript');
        done();
      });
  });
  it('saves a full relation graph', done => {
    User.findOne({ email: 'joe@example.com' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'Learn JavaScript');
        assert(user.blogPosts[0].comments[0].content === 'I\'ve just finished reading Javascript book');
        assert(user.blogPosts[0].comments[0].user.email === 'joe@example.com')
        done();
      });
  });
});
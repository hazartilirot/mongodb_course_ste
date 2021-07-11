import mongoose from 'mongoose';
import assert from 'assert';
import User from '../src/user.mjs';
import BlogPost from '../src/blogPost.mjs';

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
    });
    blogPost = new BlogPost({
      title: 'Learn JavaScript',
      content: 'It\'s the most flexible and fantastic language',
    });
    
    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });
  
  it('users clean up dangling blogPosts on remove', done => {
    joe.remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0)
        done();
      });
  })
});

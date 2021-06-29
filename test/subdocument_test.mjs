import assert from 'assert';
import User from '../src/user.mjs';

describe('Testing subdocuments', () => {
  it('creates a subdocument', done => {
    const joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
      postCount: 1,
      posts: [{ title: 'Make up a title for your post' }],
    });
    joe.save()
      .then(() => User.findOne({ email: 'joe@example.com' }))
      .then(user => {
        assert(user.posts[0].title === 'Make up a title for your post');
        done();
      });
  });
  it('creates a subdocument and then adds another one', done => {
    const joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
      posts: [
        {
          title: 'Make up a title for you post'
        }
      ],
    });
    joe.save()
      .then(() => User.findOne({ email: 'joe@example.com' }))
      .then(user => {
        user.posts = [
          ...user.posts,
          { title: 'Make up a 2nd title for you post' }
        ];
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[1].title === 'Make up a 2nd title for you post');
        done();
      })
  });
});
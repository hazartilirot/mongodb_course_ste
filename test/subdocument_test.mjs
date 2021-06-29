import assert from 'assert';
import User from '../src/user.mjs';

describe('Testing subdocuments', () => {
  it('creates a subdocument', done => {
    const joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
      postCount: 0,
      posts: [
        {
          title: 'Make up a title for your post',
        },
      ],
    });
    joe.save()
      .then(() => User.findOne({ email: 'joe@example.com' }))
      .then(user => {
        assert(user.posts[0].title === 'Make up a title for your post');
        done();
      });
  });
});
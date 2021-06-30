import assert from 'assert';
import User from '../src/user.mjs';

describe('Virtual types', () => {
  it('postCount returns the number of posts', done => {
    const joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
      posts: [{
        title: 'Make up a title for you post',
      }],
    });
    joe.save()
      .then(() => User.findOne({ email: 'joe@example.com' }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});
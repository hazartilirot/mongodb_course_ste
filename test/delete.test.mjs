import assert from 'assert';
import User from '../src/user.mjs';

describe('Deletes records', () => {

  let joe;

  beforeEach(done => {
    joe = new User({
      name: 'Joe',
      email: 'joe@gmail.com',
    });
    joe.save()
      .then(() => done());
  });

  it('model instance remove', done => {
    joe.remove()
      .then(() => User.findOne({ email: 'joe@example.com' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  /*DEPRECATED*/
  it('class method remove', done => {
    User.remove({
      name: 'Joe',
      email: 'joe@gmail.com',
    })
      .then(() => User.findOne({ email: 'joe@example.com' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', done => {
    User.findOneAndRemove({ email: 'joe@example.com' })
      .then(() => User.findOne({ id: joe._id }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', done => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'joe@example.com' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
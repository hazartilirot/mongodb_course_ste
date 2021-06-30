import assert from 'assert';
import User from '../src/user.mjs';

const assertName = (obj, done) => {
  obj
    .then(() =>
      User.findOne({ email: 'john@example.com' }))
    .then(user => {
      assert(user.name === 'Joe');
      done();
    });
};

describe('update records', () => {
  let joe;
  beforeEach(done => {
    joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
      postCount: 0,
      likes: 0
    });
    joe.save()
      .then(() => done());
  });

  it('instance type using set n save', done => {
    joe.set({
      name: 'Joe',
      email: 'john@example.com',
    });
    assertName(joe.save(), done);

  });
  /*DEPRECATED*/
  it('instance type using update', done => {
    assertName(
      joe.update({
        name: 'Joe',
        email: 'john@example.com',
      }), done);

  });
  /*DEPRECATED*/
  it('a model class can update', done => {
    assertName(User.update(
      { email: 'joe@example.com' },
      { email: 'john@example.com' },
    ), done);
  });
  it('a model class can update one record', done => {
    assertName(User.findOneAndUpdate(
      { email: 'joe@example.com' },
      { email: 'john@example.com' },
    ), done);
  });
  it('a model class can find a record with an Id and update', done => {
    assertName(User.findByIdAndUpdate(
      joe._id,
      { email: 'john@example.com' },
    ), done);
  });
  it('increments a user postCount by 1', done => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.likes === 1);
        done();
      });

  });
});
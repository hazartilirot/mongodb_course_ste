import assert from 'assert';
import User from '../src/user.mjs';

let joe;

describe('Read a user out of the database', () => {
  beforeEach(done => {
    joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
    });
    joe.save().then(() => done());
  });

  it('finds all users with a name of Joe', done => {
    User.find({ name: 'Joe' })
      .then(users => {
        assert(users[0]._id + '' === joe._id + '');
        done();
      });
  });
  
  it('finds a user with a specific id', done => {
    User.findOne({ _id: joe._id })
      .then(user => {
        assert(user.email === 'joe@example.com');
        done();
      });
  });
});
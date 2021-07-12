import assert from 'assert';
import User from '../src/user.mjs';

let joe, maria, alex, zach;

describe('Read a user out of the database', () => {
  beforeEach(done => {
    maria = new User({
      name: 'Maria',
      email: 'maria@example.com'
    });
    joe = new User({
      name: 'Joe',
      email: 'joe@example.com',
    });
    alex = new User({
      name: 'Alex',
      email: 'alex@example.com'
    })
    zach = new User({
      name: 'Zach',
      email: 'zach@example.com'
    })
    
    Promise.all([maria.save(), joe.save(), alex.save(), zach.save()])  
       .then(() => done());
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
//skip and limit is the way to paginate a result. Mind we use a sort fn so that
//we guarantee a specific order in which Alex would be skipped and the
//result consists of Joe, then Maria.
  it('can skip and limit the result set', done => {
    User.find({})
      .sort({ name: 1})
      .skip(1)
      .limit(2)
        .then(users => {
          assert(users.length === 2);
          assert(users[0].name === 'Joe')
          assert(users[1].name === 'Maria')
          done();
        })
  });
});
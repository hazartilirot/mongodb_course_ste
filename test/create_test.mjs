import assert from 'assert';
import User from '../src/user.mjs';

describe('Create a record', () => {
  /*once we created an instance of User it has initial value of isNew equal to
  true. When eventually a record is created in our DB the instance property isNew
  switches to false.*/
  it('saves a user', done => {
    const joe = new User({ name: 'Joe', email: 'joe@example.com' });
    joe.save()
      .then(() => {
        assert(joe.isNew === false);
        done();
      });

  });
});
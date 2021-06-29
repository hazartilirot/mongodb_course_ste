import assert from 'assert';
import User from '../src/user.mjs';


describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required');
  });

  it('requires a user\'s name longer than 2 character', () => {
    const user = new User({ name: 'Ka' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'The name must be longer than 2 characters');
  });
  
  it('prevents a new record from being saved', done => {
    const user = new User({ name: 'El' });
    user.save()
      .catch(validationResult => {
        const { message } = validationResult.errors.name;
        assert(message, 'The name must be longer than 2 characters');
        done();
      });
  });
});
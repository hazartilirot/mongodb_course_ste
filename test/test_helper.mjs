import mongoose from 'mongoose';

before(done => {
  mongoose.connect('mongodb://localhost:27017/test',
    { useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false },
  );

  const db = mongoose.connection;
  db.on('error', error => console.warn('warning', error));
  db.once('open', () => done());
});

/*In order to prevent "create user" test from creating multiple copies of the 
same user, we pass a callback fn "done" as an argument. Once we drop the whole
collection with record(s) we create a record to test it. Mind we call done()
as soon as drop function deletes the collection*/
beforeEach(done =>
  mongoose.connection.collections.users.drop(() =>
    done(),
  ),
);
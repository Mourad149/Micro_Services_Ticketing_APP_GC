import request from 'supertest';
import { app } from '../../app';

it('responds with  details abt  the current user', async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
  console.log(response.body);
});

it('responds with null  if  not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});

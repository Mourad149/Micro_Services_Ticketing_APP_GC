import request from 'supertest';

import { app } from '../../app';

it('fails when  supplying  an email  that doeas not  exists', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied ', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '1234' })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: '12344' })
    .expect(400);
});

it('check for cookies when a correct email and password are supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '1234' })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: '1234' })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

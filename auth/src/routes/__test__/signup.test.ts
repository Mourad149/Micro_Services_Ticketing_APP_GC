import request from 'supertest';

import { app } from '../../app';

it('return a 201 status on signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
    })
    .expect(201);
});

it('return a 400 status with an invalid  email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'flldds.com',
      password: '1234',
    })
    .expect(400);
});
it('return a 400 status with an invalid  password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'flldds.com',
      password: '14',
    })
    .expect(400);
});

it('return a 400 status with missing email  and  password', async () => {
  await request(app).post('/api/users/signup').send({}).expect(400);
});

it('disallow  duplicates email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
    })
    .expect(400);
});

it('sets a cookie', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

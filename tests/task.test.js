const request = require('supertest');
const app = require('../app');
describe('Task API', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/tasks/create')
      .send({ title: 'Test Task' });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Test Task');
  });
});

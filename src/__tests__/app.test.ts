import request from 'supertest';
import app from '../app';

describe('GET /api/hello', () => {
  it('should respond with a message', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, world!');
  });
});

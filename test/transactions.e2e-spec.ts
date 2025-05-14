import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('POST /transactions (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve criar uma transação válida (201)', async () => {
    const now = new Date().toISOString();

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 123.45,
        timestamp: now,
      });

    expect(response.status).toBe(201);
  });

  it('deve rejeitar uma transação com timestamp no futuro (422)', async () => {
    const future = new Date(Date.now() + 60000).toISOString();

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 10,
        timestamp: future,
      });

    expect(response.status).toBe(422);
    expect(response.body.message).toContain('Transaction timestamp cannot be in the future');
  });

  it('deve rejeitar um JSON malformado (400)', async () => {
    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: -10,
        timestamp: 'not-a-date',
      });

    expect(response.status).toBe(400);
  });
});

describe('DELETE /transactions (e2e)', () => {

  let app: INestApplication;

  it('deve limpar todas as transações e retornar 200', async () => {
    await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 50,
        timestamp: new Date().toISOString(),
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .delete('/transactions')
      .expect(200);

    expect(response.body).toEqual({});
  });

  it('deve retornar 200 mesmo sem transações existentes', async () => {
    const response = await request(app.getHttpServer())
      .delete('/transactions')
      .expect(200);

    expect(response.body).toEqual({});
  });
});

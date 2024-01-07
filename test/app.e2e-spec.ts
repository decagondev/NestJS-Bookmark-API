import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
describe('APP e2e', () => {

  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    
    const moduleRef = await Test.createTestingModule({ imports: [AppModule]}).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => app.close());

  describe('Auth', () => {
    describe('Signup', () => {
      it('Should Signup"', () => {
        const dto : AuthDto = { email: "tom@decadev.co.uk", password: "123" };

        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      });
    });
    describe('Signin', () => {
      it.todo("Should Signin");
    });
  });
  describe('User', () => {
    describe('Get user', () => {});
    describe('Edit user', () => {});
  });
  describe('Bookmark', () => {
    describe('Get empty bookmarks', () => {});
    describe('Create bookmark', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmark by id', () => {});
    describe('Update bookmark by id', () => {});
    describe('Delete bookmark by id', () => {});
  });

  it.todo('this should pass if all startup / teardown are working');
});
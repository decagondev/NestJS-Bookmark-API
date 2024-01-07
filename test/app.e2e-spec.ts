import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
describe('APP e2e', () => {

  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    
    const moduleRef = await Test.createTestingModule({ imports: [AppModule]}).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
  });

  afterAll(() => app.close());

  describe('Auth', () => {
    describe('Signup', () => {
      it.todo("Should Signup");
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
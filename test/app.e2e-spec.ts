import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from '../src/bookmark/dto';
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
    const dto : AuthDto = { email: "tom@decadev.co.uk", password: "123" };

    describe('Signup', () => {
      it('Should Throw if email missing', () => {
        return pactum.spec().post('/auth/signup').withBody({ password: dto.password }).expectStatus(400);
      })

      it('Should Throw if password missing', () => {
        return pactum.spec().post('/auth/signup').withBody({ email: dto.email }).expectStatus(400);
      });

      it('Should Throw if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('Should Signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('Should Throw if email missing', () => {
        return pactum.spec().post('/auth/signin').withBody({ password: dto.password }).expectStatus(400);
      });
      
      it('Should Throw if password missing', () => {
        return pactum.spec().post('/auth/signin').withBody({ email: dto.email }).expectStatus(400);
      });
      
      it('Should Throw if no body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('Should Signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).stores('userToken', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get user', () => {
      it('Should throw with no user token', () => {
        return pactum.spec().get('/users/dash').expectStatus(401);
      });
      it('Should get user', () => {
        return pactum.spec().get('/users/dash').withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('Should Edit user with a first name provided', () => {
        const dto: EditUserDto = { firstName: "Tom" };
        return pactum.spec().patch('/users').withHeaders({ Authorization: 'Bearer $S{userToken}' }).withBody(dto).expectStatus(200).expectBodyContains(dto.firstName);
      });
    });
  });

  describe('Bookmark', () => {

    describe('Get empty bookmarks', () => {
      it('Should throw if no Auth header present', () => {
        return pactum.spec().get('/bookmarks')
        .expectStatus(401);
      });

      it('Should get bookmarks', () => {
        return pactum.spec().get('/bookmarks')
        .withHeaders({ Authorization: 'Bearer $S{userToken}' })
        .expectStatus(200).expectBody([]);
      });
    });

    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = { title: 'First Bookmark', link: 'https://github.com/decagondev' };

      it('Should create bookmark', () => {
        return pactum.spec().post('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userToken}' })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });

    describe('Get bookmarks', () => {
      it('Should get bookmarks', () => {
        return pactum.spec().get('/bookmarks')
        .withHeaders({ Authorization: 'Bearer $S{userToken}' })
        .expectStatus(200).expectJsonLength(1);
      });
    });

    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum.spec().get('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({ Authorization: 'Bearer $S{userToken}' })
        .expectStatus(200)
        .expectBodyContains('$S{bookmarkId}');
      });
    });

    describe('Update bookmark by id', () => {

      const dto: EditBookmarkDto = {
        title: 'Decagon Dev Github Profile.',
        description: 'The profile of my github account holding my random projects and repositories.',
      };

      it('should edit bookmark', () => {
        return pactum.spec().patch('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({ Authorization: 'Bearer $S{userToken}' })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.title)
        .expectBodyContains(dto.description);
      });
    });

    describe('Delete bookmark by id', () => {
      it('Should delete bookmark', () => {
        return pactum.spec().delete('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({ Authorization: 'Bearer $S{userToken}' })
        .expectStatus(204);
      });

      it('Should get empty bookmarks', () => {
        return pactum.spec().get('/bookmarks')
        .withHeaders({ Authorization: 'Bearer $S{userToken}' })
        .expectStatus(200).expectJsonLength(0);
      });
    });
  });
});
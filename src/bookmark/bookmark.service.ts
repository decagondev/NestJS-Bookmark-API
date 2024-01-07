import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    createBookmark(userId: number) {}
    
    getBookmark(userId: number) {}

    getBookmarksById(userId: number) {}

    editBookmarkById(userId: number) {}

    deleteBookmarkById(userId: number) {}
}

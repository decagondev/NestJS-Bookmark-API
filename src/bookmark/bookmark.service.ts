import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    createBookmark(userId: number) {}
    
    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({ where: { userId } });
    }

    getBookmarksById(userId: number, bookmarkId: number) {}

    editBookmarkById(userId: number, bookmarkId: number) {}

    deleteBookmarkById(userId: number, bookmarkId: number) {}
}

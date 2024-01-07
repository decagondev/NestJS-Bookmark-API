import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        const bookmark = await this.prisma.bookmark.create({ data: { userId, ...dto} });
        return bookmark;
    }
    
    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({ where: { userId } });
    }

    getBookmarksById(userId: number, bookmarkId: number) {}

    editBookmarkById(userId: number, bookmarkId: number) {}

    deleteBookmarkById(userId: number, bookmarkId: number) {}
}

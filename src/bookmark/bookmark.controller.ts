import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto } from './dto';


@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private bookmarkService: BookmarkService) {}
    
    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(userId, dto);
    }
    
    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarksById(@GetUser('id') userId: number, @Param('id') bookmarkId: number) {
        return this.bookmarkService.getBookmarkById(userId, bookmarkId);
    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId: number, @Param('id') bookmarkId: number) {}

    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number, @Param('id') bookmarkId: number) {}

    
}

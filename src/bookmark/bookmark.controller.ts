import { Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';


@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private bookmarkService: BookmarkService) {}
    
    @Post()
    createBookmark(@GetUser('id') userId: number) {}
    
    @Get()
    getBookmark(@GetUser('id') userId: number) {}

    @Get(':id')
    getBookmarksById(@GetUser('id') userId: number, @Param('id') bookmarkId: number) {}

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId: number, @Param('id') bookmarkId: number) {}

    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number, @Param('id') bookmarkId: number) {}

    
}

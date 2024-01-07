import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
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

    @Get()
    getBookmarksById(@GetUser('id') userId: number) {}

    @Patch()
    editBookmarkById(@GetUser('id') userId: number) {}

    @Delete()
    deleteBookmarkById(@GetUser('id') userId: number) {}

    
}

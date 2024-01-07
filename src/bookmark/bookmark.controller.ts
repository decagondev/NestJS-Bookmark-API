import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';


@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    
    constructor(private bookmarkService: BookmarkService) {}
    
    @Post()
    createBookmark() {}
    
    @Get()
    getBookmark() {}

    @Get()
    getBookmarksById() {}

    @Patch()
    editBookmarkById() {}

    @Delete()
    deleteBookmarkById() {}

    
}

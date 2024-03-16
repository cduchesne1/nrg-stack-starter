import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { Module } from '@nestjs/common';

@Module({
  exports: [PostService],
  controllers: [],
  providers: [PostService, PostResolver],
})
export class PostModule {}

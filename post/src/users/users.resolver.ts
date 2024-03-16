/* eslint-disable @typescript-eslint/no-unused-vars */
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/post/entities/user.entity';
import { PostService } from 'src/post/post.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly postsService: PostService) {}

  @ResolveField((of) => [Post])
  public posts(@Parent() user: User): Post[] {
    return this.postsService.forUser(user.id);
  }
}

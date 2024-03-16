/* eslint-disable @typescript-eslint/no-unused-vars */
import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => Int)
  @Directive('@external')
  id: number;

  @Field((type) => [Post])
  posts?: Post[];
}

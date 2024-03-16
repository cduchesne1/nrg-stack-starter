/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'Post id' })
  id: number;

  @Field()
  title: string;

  @Field((type) => Int)
  userId: number;

  @Field((type) => User)
  user?: User;
}

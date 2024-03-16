import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'Post id' })
  id: number;

  @Field()
  title: string;
}

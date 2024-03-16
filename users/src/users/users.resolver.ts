/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Args, Int, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findObjectById(id);
  }

  @Query((returns) => [User])
  async users() {
    return this.usersService.findAll();
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): User {
    return this.usersService.findObjectById(reference.id);
  }
}

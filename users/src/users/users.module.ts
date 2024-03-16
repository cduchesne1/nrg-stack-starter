import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  exports: [UsersService],
  controllers: [],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'john', password: 'changeme' },
    { id: 2, username: 'christine', password: 'neverguess' },
  ];

  findObjectById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}

import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  private posts: Post[] = [];

  create(id: number, title: string): Post {
    this.posts.push({ id, title });
    return this.posts.slice(-1)[0];
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((post) => post.id == id);
  }
  //
  // update(id: number, updatePostInput: UpdatePostInput) {
  //   const index = this.posts.findIndex((post) => post.id == id);
  //   this.posts[index].title = updatePostInput.title;
  //   this.posts[index].description = updatePostInput.description;
  //   this.posts[index].image = updatePostInput.image;
  //   this.posts[index].number_of_comments = updatePostInput.number_of_comments;
  //
  //   return id;
  // }

  remove(id: number) {
    this.posts.filter((post) => post.id != id);
  }
}

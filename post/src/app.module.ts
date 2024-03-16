import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PostModule } from './post/post.module';
import { UsersResolver } from './users/users.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        path: 'schema.gql',
        federation: 2,
      },
    }),
    PostModule,
  ],
  providers: [UsersResolver],
})
export class AppModule {}

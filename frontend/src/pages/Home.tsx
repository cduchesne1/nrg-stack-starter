import { useEffect, useState } from "react";
import graphqlClient from '../../graphql/client';
import { gql } from "@apollo/client";
import { PrivateRoute } from "@/components/private-route";

interface Post {
  id: string;
  title: string;
  content: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await graphqlClient.query({
        query: gql`
          query {
            userPosts {
              id
              title
              content
            }
          }
        `,
      });
      setPosts(response.data.userPosts);
    }
    fetchUserPosts();
  }, []);

  return (
    <PrivateRoute>
      {
        posts.map((post: any) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      }
    </PrivateRoute>
  );
}

export default Home;

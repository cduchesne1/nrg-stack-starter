import { useEffect, useState } from "react";
import graphqlClient from '../../graphql/client';
import { gql } from "@apollo/client";

function Home() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await graphqlClient.query({
        query: gql`
          query GetFirstUserUsername {
            user(id: 1) {
              username
            }
          }
        `
      });

      setUsername(response.data.user.username);
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Hi {username}!</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;

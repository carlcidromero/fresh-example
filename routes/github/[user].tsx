/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, context) {
    const { user } = context.params;
    const response = await fetch(`https://api.github.com/users/${user}`);

    if (response.status === 404) {
      return context.render(null);
    }

    const fetchedUser: User = await response.json();
    
    return context.render(fetchedUser);
  },
};

export default function UserPage({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found.</h1>;
  }

  return (
    <div>
      <img src={data.avatar_url} width={64} height={64} />
      <h1>{data.name}</h1>
      <p>{data.login}</p>
    </div>
  );
}


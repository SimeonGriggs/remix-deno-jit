import { type LoaderArgs, json } from "@remix-run/deno";
import { Link, useLoaderData } from "@remix-run/react";
import groq from "groq";

import { client } from "~/sanity/client.tsx";

export async function loader({}: LoaderArgs) {
  const articles = await client.fetch(
    groq`*[_type == "article" && defined(slug.current) && unlisted != true]|order(published desc)`
  );

  return json({ articles: articles ?? [] });
}

export default function Index() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <main class="container mx-auto bg-white p-4 md:p-12 prose prose-blue">
      <h1>Articles</h1>
      {articles?.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article._id}>
              <Link to={`/${article.slug.current}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found</p>
      )}
    </main>
  );
}

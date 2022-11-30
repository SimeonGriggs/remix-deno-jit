import { type LoaderArgs, json, MetaFunction } from "@remix-run/deno";
import { Link, useLoaderData } from "@remix-run/react";
import type { SanityImageSource } from "@sanity/asset-utils";
import imageUrlBuilder from "@sanity/image-url";
import groq from "groq";

import { config, client } from "~/sanity/client.tsx";

export const meta: MetaFunction = ({data}) => ({
  title: data?.article?.title ?? `Untitled`,
  description: data?.article?.summary ?? ``,
  viewport: "width=device-width, initial-scale=1",
});

export const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder(config).image(source);

export async function loader({ params }: LoaderArgs) {
  const article = await client.fetch(
    groq`*[_type == "article" && slug.current == $slug][0]{
        title,
        summary,
        image,
    }`,
    params
  );

  if (!article) {
    throw new Response(`Article not found`, { status: 404 });
  }

  return json({ article });
}

export default function Index() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <main class="container mx-auto bg-white p-4 md:p-12 prose prose-blue">
      <Link to="/">Home</Link>
      <hr />
      <h1>{article.title}</h1>
      {article.image ? (
        <img
          src={urlFor(article.image).width(800).height(300).url()}
          width="800"
          height="300"
          alt=""
        />
      ) : null}
      <p>{article.summary}</p>
      {/* <PortableText value={article.content} /> */}
    </main>
  );
}

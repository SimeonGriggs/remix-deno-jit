import { type MetaFunction } from "@remix-run/deno";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Remix",
  description: "Welcome to Remix on Deno!",
  viewport: "width=device-width, initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
      </head>
      <body class="bg-blue-100 p-4 md:p-12">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload port={Number(window.location.port)} />
      </body>
    </html>
  );
}

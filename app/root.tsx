import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import * as deepl from "deepl-node";
import "dotenv/config";

import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import appStylesHref from "./app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

const authKey = process.env.DEEPL_API;
const translator = new deepl.Translator(authKey!);

export const loader = async () => {
  const targetLang: deepl.TargetLanguageCode = "en-GB";
  const translations = await translator.translateText(
    ["お元気ですか？", "¿Cómo estás?"],
    null,
    targetLang
  );
  return json({ translations });
};

export default function App() {
  const { translations } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Multi Translate</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {translations.length ? (
              <ul>
                {translations.map((translation) => (
                  <li>{translation.text}</li>
                ))}
              </ul>
            ) : (
              <p>
                <i>Enter some text to begin translation</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

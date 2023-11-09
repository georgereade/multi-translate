import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
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
  useActionData,
} from "@remix-run/react";

import appStylesHref from "./app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

const authKey = process.env.DEEPL_API;
const translator = new deepl.Translator(authKey!);

export const loader = async () => {
  const targetLang: deepl.TargetLanguageCode = "en-GB";
  const demoTranslations = await translator.translateText(
    ["お元気ですか？", "¿Cómo estás?"],
    null,
    targetLang
  );
  return json({ demoTranslations });
};

export default function App() {
  const { demoTranslations } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

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
            <Form id="search-form" method="post" action="/output">
              <p>
                <input
                  aria-label="Enter text for translation"
                  placeholder="Enter text for translation"
                  type="text"
                  name="textInput"
                />
                {actionData?.errors?.textInput ? (
                  <em>{actionData?.errors.textInput}</em>
                ) : null}
              </p>
              <div id="search-spinner" aria-hidden hidden={true} />
              <button type="submit">Translate</button>
            </Form>
          </div>
          <nav>
            {demoTranslations.length ? (
              <ul>
                {demoTranslations.map((demoTranslation) => (
                  <li>{demoTranslation.text}</li>
                ))}
              </ul>
            ) : (
              ""
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const textInput = String(formData.getAll("textInput"));

  const errors: any = {};

  if (textInput === "I gay") {
    errors.textInput = "Please enter some text.";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // Redirect to dashboard if validation is successful
  return redirect("/");
}

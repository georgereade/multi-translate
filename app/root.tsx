import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
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
// const targetLanguages: string[] = ["de", "es"];

// export const action = async () => {
//   // for (var i = 0; i < targetLanguages.length; i++) {
//   const targetLang: deepl.TargetLanguageCode = "en-GB";
//   const translations = await translator.translateText(
//     request.formData(),
//     null,
//     targetLang
//   );
//   return json({ translations });
//   // }
// };

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const targetLang: deepl.TargetLanguageCode = "en-GB";
//   const formData = await request.formData();
//   const translationText = formData.getAll("textInput").toString();

// const errors = {
//   textInput: textInput ? null | undefined : "Text is required",
// };
// const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
// if (hasErrors) {
//   return json(errors);
// }

//   const translations:deepl.TextResult = await translator.translateText(
//     translationText,
//     null,
//     targetLang
//   );
//   return translations;
// };

// export async function action({ request }: ActionFunctionArgs) {
//   const targetLang: deepl.TargetLanguageCode = "en-GB";
//   const formData = await request.formData();
//   const translationText = formData.getAll("textInput").toString() || "";

//   const translations: deepl.TextResult = await translator.translateText(
//     translationText,
//     null,
//     targetLang
//   );
//   return translations;
// }

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
              <input
                id="q"
                aria-label="Enter text for translation"
                placeholder="Enter text for translation"
                type="text"
                name="textInput"
              />
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

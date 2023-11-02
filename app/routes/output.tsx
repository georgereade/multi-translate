import * as deepl from "deepl-node";
import "dotenv/config";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

const authKey = process.env.DEEPL_API;
const translator = new deepl.Translator(authKey!);

export async function action({ request }: ActionFunctionArgs) {
  const targetLang: deepl.TargetLanguageCode = "zh";
  const formData = await request.formData();
  const translationText = formData.getAll("textInput").toString();
  // const errors = {
  //   translationText: translationText === null ? "Text is required" : "",
  // };
  // const errors = {}
  // if (translationText === ""){
  //   errors.textInput = "Please enter some text";
  // }
  const translations: deepl.TextResult = await translator.translateText(
    translationText,
    null,
    targetLang
  );

  // const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  // if (Object.keys(errors).length > 0) {
  //   return json(errors)};
  // } else {
  return json({ text: translations.text });
}

export default function Output() {
  const data = useActionData<typeof action>();
  return <div> {data ? data.text : <p>Please enter some text</p>}</div>;
}

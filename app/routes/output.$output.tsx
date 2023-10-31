import * as deepl from "deepl-node";
import "dotenv/config";

const authKey = process.env.DEEPL_API;
const translator = new deepl.Translator(authKey!);

export default function TranslationOutput() {
  async () => {
    const targetLang: deepl.TargetLanguageCode = "fr";
    const results = await translator.translateText(
      ["Hello, world!", "How are you?"],
      null,
      targetLang
    );
    results.map((result: deepl.TextResult) => {
      return console.log(result.text);
    });
  };
}

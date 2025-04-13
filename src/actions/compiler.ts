"use server";
import { LANGUAGES, TLanguageValue } from "@/app/(private)/portal/compiler/data"

function getVersionByValue(value: TLanguageValue): string | undefined {
  const language = LANGUAGES.find((lang) => lang.value === value);
  return language?.version;
}

export const executeCode = async (
  code: string,
  language: TLanguageValue,
  input?: string | undefined
) => {
  const request = input
    ? {
        language,
        stdin: input,
        version: getVersionByValue(language),
        files: [{ content: code }],
      }
    : {
        language,
        version: getVersionByValue(language),
        files: [{ content: code }],
      };
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    body: JSON.stringify(request),
  });
  const result = await response.json();
  return result;
};
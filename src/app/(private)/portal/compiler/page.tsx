"use client";
import { executeCode } from "@/actions/compiler"
import { Button } from "@/elements/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/elements/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/elements/select";
import { Skeleton } from "@/elements/skeleton";
import { Textarea } from "@/elements/textarea";
import { cn } from "@/lib/utils";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CODE_SNIPPETS, LANGUAGES, TLanguageValue } from "./data";

const CompilerPage = () => {
  const [isMounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const [language, setLanguage] = useState<TLanguageValue>("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS[language] || "");

  const [isRunning, setIsRunning] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState({
    stdout: "",
    isError: false,
  });

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const stdin = input.length > 0 ? input : undefined;
      const result = await executeCode(code, language, stdin);
      const isError = result.run.stderr.length > 0;
      setOutput({
        isError,
        stdout: isError ? result.run.stderr : result.run.stdout,
      });
    } catch (error) {
      console.error(error);
      setOutput({
        isError: true,
        stdout: "An error occurred while running the code",
      });
    }
    setIsRunning(false);
  };

  const languageExtension = language === "javascript" ? javascript() : java();

  const changeCode = (current: TLanguageValue, nextLang: TLanguageValue) => {
    if (code === CODE_SNIPPETS[current]) {
      setCode(CODE_SNIPPETS[nextLang] || "");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <main className="h-app w-full p-8 grid grid-cols-2 gap-4">
        <Skeleton className="h-full w-full rounded-md" />
        <section className="flex flex-col gap-4">
          <Skeleton className="h-2/5 w-full rounded-md" />
          <Skeleton className="h-3/5 w-full rounded-md" />
        </section>
      </main>
    );
  }

  return (
    <main className="h-app w-full p-8 flex flex-col">
      <section className="grow max-h-full w-full border rounded-md">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={50}
            className="h-full rounded-l-md relative w-full"
          >
            <CodeMirror
              theme={theme === "light" ? vscodeLight : vscodeDark}
              id="code-editor"
              value={code}
              lang={language}
              onChange={setCode}
              maxHeight={`${window.innerHeight - 128}px`}
              height={`${window.innerHeight - 128}px`}
              className="rounded-md h-full text-xl font-sans font-semibold"
              autoFocus
              extensions={[languageExtension]}
            />

            <div className="absolute bottom-2 right-2 h-fit w-fit rounded-md flex items-center gap-2 p-2 bg-slate-400 dark:bg-background">
              <Select
                defaultValue={language}
                onValueChange={(lang: TLanguageValue) => {
                  changeCode(language, lang)
                  setLanguage(lang)
                }}
              >
                <SelectTrigger className="w-40 bg-background">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem
                      key={lang.value}
                      value={lang.value}
                      className="cursor-pointer"
                    >
                      {lang.label}
                      <span className="opacity-25 text-xs ml-1">
                        {lang.version}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleRun} isLoading={isRunning}>
                Run Code
              </Button>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel
                defaultSize={40}
                className="p-4 flex flex-col gap-2"
              >
                <h1 className="font-semibold">Input</h1>
                <Textarea
                  placeholder="Enter input here if applicable"
                  className="resize-none text-xl"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={100}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel
                defaultSize={60}
                className="p-4 flex flex-col gap-2"
              >
                <h1 className="font-semibold">Output</h1>
                <Textarea
                  rows={100}
                  readOnly
                  onFocus={(e) => e.preventDefault()}
                  id="output"
                  value={output.stdout}
                  placeholder="Output will appear here"
                  className={cn("resize-none focus-visible:ring-0", {
                    "text-red-500": output.isError,
                  })}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </main>
  )
};

export default CompilerPage;
// Copyright 2020 Mauricio Vieira. All rights reserved. MIT license.

import { urlParse } from "https://deno.land/x/url_parse/parse.ts";

function dirNameFromUrl(url_: string): string {
  const parsed = urlParse(url_);

  return `${parsed.hostname}${parsed.pathname}`;
}

async function main(): Promise<void> {
  const url_ = Deno.args[0];
  const res = await fetch(url_);
  const body = new Uint8Array(await res.arrayBuffer());

  const dirname = dirNameFromUrl(url_);

  await Deno.mkdir(dirname, { recursive: true });
  const filename = `${dirname}/index.html`;
  const bytesWritten = await Deno.writeFile(filename, body);
  console.log(`${bytesWritten} chars were written from ${url_} to ${filename}`);
}

if (import.meta.main) {
  await main();
}

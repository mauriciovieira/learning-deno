// Copyright 2020 Mauricio Vieira. All rights reserved. MIT license.

function filenameFromUrl(url: string): string | undefined {
  const parsed = new URL(url);
  const pathname = parsed.pathname;

  const paths = pathname.split("/");
  const lastPart = paths.pop();
  if (lastPart === "") {
    return "index.html";
  } else {
    return lastPart;
  }
}

function dirnameFromUrl(url: string): string {
  const parsed = new URL(url);
  const pathname = parsed.pathname;

  let paths = pathname.split("/");
  paths.pop();
  paths.shift();

  return [...[parsed.hostname], ...paths].join("/");
}

async function main(): Promise<void> {
  const url_ = Deno.args[0];
  const res = await fetch(url_);
  const body = new Uint8Array(await res.arrayBuffer());

  const dirname = dirnameFromUrl(url_);
  const filename = filenameFromUrl(url_);

  await Deno.mkdir(dirname, { recursive: true });
  const fullpath = `${dirname}/${filename}`;

  await Deno.writeFile(fullpath, body);
  console.log(`Content was written from ${url_} to ${fullpath}`);
}

if (import.meta.main) {
  await main();
}

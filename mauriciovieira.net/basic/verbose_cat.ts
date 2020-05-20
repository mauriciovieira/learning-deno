// Copyright 2020 Mauricio Vieira. All rights reserved. MIT license.
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  console.log(`Printing ${filename}`);
  await Deno.copy(file, Deno.stdout);
  file.close();
}

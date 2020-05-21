// Copyright 2020 Mauricio Vieira. All rights reserved. MIT license.

const url_ = Deno.args[0];
const filename = Deno.args[1];

const res = await fetch(url_);
const body = new Uint8Array(await res.arrayBuffer());

const file = await Deno.open(filename, { write: true, createNew: true });

const bytesWritten = await Deno.write(file.rid, body);
console.log(`${bytesWritten} chars were written from ${url_} to ${filename}`);

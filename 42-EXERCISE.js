const fs = require('fs');

/**
 * EXERCISE: implement AsyncIterable operators so that
 * this script prints out a file line by line with:
 *
 * - line count shown on the left of each line
 * - uppercase letters
 * - line wrapping at 50 columns
 *
 * See file `42-EXERCISE-doc.md`
 */

function map(f) {
  return inputIterable =>
    (async function* outputIterable() {
      for await (let x of inputIterable) {
        yield f(x);
      }
    })();
}

function scan(f, seed) {
  return inputIterable =>
    (async function* outputIterable() {
      let acc = seed;
      for await (let x of inputIterable) {
        acc = f(acc, x);
        yield acc;
      }
    })();
}

function pipe(...cbs) {
  let res = cbs[0];
  for (let i = 1, n = cbs.length; i < n; i++) res = cbs[i](res);
  return res;
}

async function* chunksToLines(chunks) {
  let previous = '';
  for await (const chunk of chunks) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf('\n')) >= 0) {
      // line includes the EOL
      const line = previous.slice(0, eolIndex + 1);
      yield line;
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

async function main(inputFilePath) {
  const chunks = fs.createReadStream(inputFilePath, {
    encoding: 'utf8',
    highWaterMark: 1024,
  });

  const lines = pipe(
    chunks,
    chunksToLines,
    // EXERCISE: add more operations here
  );

  for await (const line of lines) {
    process.stdout.write(line);
  }
}

main('./42-EXERCISE.js');

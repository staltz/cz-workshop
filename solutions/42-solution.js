const fs = require('fs');

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

function addLineCounter(acc, line) {
  if (acc) {
    const prev = acc[0];
    const next = prev + 1;
    return [next, `${next < 10 ? ' ' : ''}${next}: ${line}`];
  } else {
    return [1, ` 1: ${line}`];
  }
}

function wrap(n) {
  return inputIterable =>
    (async function* () {
      for await (const line of inputIterable) {
        let s = line;
        while (s.length > n) {
          yield s.substr(0, n) + '\n';
          s = s.substr(n);
        }
        yield s;
      }
    })();
}

async function main(inputFilePath) {
  const chunks = fs.createReadStream(inputFilePath, {
    encoding: 'utf8',
    highWaterMark: 1024,
  });

  const numberedLines = pipe(
    chunks,
    chunksToLines,
    map(s => s.toUpperCase()),
    wrap(50),
    scan(addLineCounter),
    map(([_, line]) => line),
  );

  for await (const line of numberedLines) {
    process.stdout.write(line);
  }
}

main('./42-EXERCISE.js');

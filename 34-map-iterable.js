function map(f) {
  return inputIterable => function* outputIterable() {
    for (let x of inputIterable) {
      yield f(x)
    }
  }
}

function* range(from, to) {
  for (let x = from; x <= to; x++) {
    yield x;
  }
}

function pipe(...cbs) {
  let res = cbs[0];
  for (let i = 1, n = cbs.length; i < n; i++) res = cbs[i](res);
  return res;
}

const numbers = pipe(
  range(40, 49),
  map(x => x / 10),
)();

for (let x of numbers) {
  console.log(x);
}

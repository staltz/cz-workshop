function map(f) {
  return inputIterable => function* outputIterable() {
    for (let x of inputIterable) {
      yield f(x)
    }
  }
}

function pipe(...cbs) {
  let res = cbs[0];
  for (let i = 1, n = cbs.length; i < n; i++) res = cbs[i](res);
  return res;
}

function* bfs(root) {
  const fifo = [root];
  while (fifo.length) {
    const elem = fifo.shift();
    for (let child of elem.children) {
      fifo.push(child);
    }
    yield elem;
  }
}

const ids = pipe(
  bfs(document.body),
  map(elem => elem.id)
);

for (let id of ids()) {
  console.log(id);
}

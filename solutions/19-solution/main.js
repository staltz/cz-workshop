function bfs(root) {
  return {
    [Symbol.iterator]() {
      const fifo = [root];
      return {
        next() {
          if (fifo.length) {
            const elem = fifo.shift();
            for (let child of elem.children) {
              fifo.push(child);
            }
            return { done: false, value: elem };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
}

function* bfsAlternative(root) {
  const fifo = [root];
  while (fifo.length) {
    const elem = fifo.shift();
    for (let child of elem.children) {
      fifo.push(child);
    }
    yield elem;
  }
}

for (let elem of bfs(document.body)) {
  console.log(elem.id);
}

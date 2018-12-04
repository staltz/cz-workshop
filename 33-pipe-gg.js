function map(f) {
  return inputGG =>
    function outputGG() {
      const inputG = inputGG();
      return function outputG() {
        const x = inputG();
        const y = f(x);
        return y;
      };
    };
}

function tap(f) {
  return inputGG =>
    function outputGG() {
      const inputG = inputGG();
      return function outputG() {
        const x = inputG();
        f(x);
        return x;
      };
    };
}

function prepend(initial, getterGetter) {
  return () => {
    let getter = getterGetter();
    let initialSent = false;
    return () => {
      if (initialSent) {
        const x = getter();
        return x;
      } else {
        initialSent = true;
        return initial;
      }
    };
  };
}

function pipe(...cbs) {
  let res = cbs[0];
  for (let i = 1, n = cbs.length; i < n; i++) res = cbs[i](res);
  return res;
}

const empty = () => () => {};

const listGG = pipe(
  prepend(10, prepend(20, prepend(30, prepend(40, empty)))),
  tap(x => console.log('before ' + x)),
  map(x => x / 2),
  tap(x => console.log('after ' + x)),
);

const listG = listGG();

console.log(listG());
console.log(listG());
console.log(listG());
console.log(listG());

const ten = 10;

function map(f) {
  return (inputGetter) => function outputGetter() {
    const x = inputGetter();
    const y = f(x);
    return y;
  }
}

function tap(f) {
  return (inputGetter) => function outputGetter() {
    const x = inputGetter();
    f(x);
    return x;
  }
}

const getTen = () => {
  return 10;
}

const getTenWithSideEffect = tap(x => console.log('hi!'))(getTen);

const getFifty = map(x => x * 5)(getTen);

console.log(ten);
console.log(getTen());
console.log(getFifty());

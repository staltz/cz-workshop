const ten = 10;

function getTen() {
  console.log('hi');
  return 10;
}

function map(f) {
  return (inputGetter) => function outputGetter() {
    const x = inputGetter();
    const y = f(x);
    return y;
  }
}

const getFifty = map(x => x * 5)(getTen);

console.log(ten);
console.log(getTen());
console.log(getFifty());

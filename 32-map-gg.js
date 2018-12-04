const ten = 10;

function map(f) {
  return inputGetter =>
    function outputGetter() {
      const x = inputGetter();
      const y = f(x);
      return y;
    };
}

function tap(f) {
  return inputGetter =>
    function outputGetter() {
      const x = inputGetter();
      f(x);
      return x;
    };
}

const fetchData = () => {
  return fetch(url);
};

const fetchDataWithSideEffects = tap(x => console.log('fetched ' + x))(
  fetchData,
);

console.log(fetchDataWithSideEffects());

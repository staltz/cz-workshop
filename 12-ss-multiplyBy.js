function multiplyByTen(inputSS) {
  // implement
}

function randomSS(cb) {
  cb(Math.random());
}

const largerRandomSS = multiplyByTen(randomSS);

largerRandomSS(x => console.log(x));

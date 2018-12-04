function tenSS(cb) {
  cb(10);
}

function randomSS(cb) {
  cb(Math.random());
}

/**
 * Exercise: implement merge() for setter-setters
 * and use it to create `tenOrRandomSS` as a setter-setter.
 */

function merge(xSS, ySS) {
  return function zSS(cb) {
    xSS(cb);
    ySS(cb);
  }
}

const tenOrRandomSS = merge(tenSS, randomSS);

tenOrRandomSS(x => console.log(x));

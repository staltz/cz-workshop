function wait(period) {
  return new Promise(resolve => {
    setTimeout(resolve, period);
  });
}

function range(from, to) {
  return {
    [Symbol.iterator]: function() {
      return {
        current: from,
        last: to,

        next() {
          if (this.current <= this.last) {
            return {done: false, value: this.current++};
          } else {
            return {done: true};
          }
        },
      };
    },
  };
}

const iterable = range(40, 49);
const iterator = iterable[Symbol.iterator]();

function loop(it) {
  let res;
  while (!(res = it.next()).done) {
    console.log(res.value);
  }
}

loop(iterator);

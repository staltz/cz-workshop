// Works in Firefox 57+, Chrome 70+

async function* users(from, to) {
  for (let x = from; x <= to; x++) {
    const res = await fetch('http://jsonplaceholder.typicode.com/users/' + x);
    const json = await res.json();
    yield json;
  }
}

function map(f) {
  return async function*(source) {
    for await (let x of source) {
      yield f(x);
    }
  };
}

function filter(condition) {
  return async function*(source) {
    for await (let x of source) {
      if (condition(x)) {
        yield x;
      }
    }
  };
}

async function main() {
  const userNames = map(u => u.name)(users(1, 10));
  const cUserNames = filter(name => name[0] === 'C')(userNames);
  for await (let x of cUserNames) {
    console.log(x);
  }
}

main();

// Works in Firefox 57+, Chrome 70+

async function* users(from, to) {
  for (let x = from; x <= to; x++) {
    const res = await fetch('http://jsonplaceholder.typicode.com/users/' + x);
    const json = await res.json();
    yield json;
  }
}

async function main() {
  for await (let x of users(1, 10)) {
    console.log(x);
  }
}

main();

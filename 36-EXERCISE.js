// Works in Firefox 57+, Chrome 70+

async function* users(from, to) {
  /**
   * EXERCISE: implement this async iterable
   * to fetch user data from jsonplaceholder
   * in the range
   * http://jsonplaceholder.typicode.com/users/${from}
   * to
   * http://jsonplaceholder.typicode.com/users/${to}
   */
}

function map(f) {
  return async function*(source) {
    for await (let x of source) {
      yield f(x);
    }
  };
}

function filter(condition) {
  /**
   * EXERCISE: implement this
   */
}

async function main() {
  /**
   * EXERCISE: use users(1, 10), map(), and filter()
   * to iterate over all `name` fields of users where
   * the first letter in the `name` is "C".
   */
}

main();

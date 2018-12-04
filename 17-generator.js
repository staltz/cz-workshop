function* makeArrayIterable(arr) {
  let i = 0;
  while (i < arr.length) {
    yield arr[i++];
  }
}

const iter = makeArrayIterable([1, 2, 3]);

for (let num of iter) {
  console.log(num);
}

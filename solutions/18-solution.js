function* range(from, to) {
  let current = from;
  const last = to;
  while (current <= last) {
    yield current++;
  }
}

function* rangeAlternative(from, to) {
  for (let x = from; x <= to; x++) {
    yield x;
  }
}

for (let num of range(40, 49)) {
  console.log(num);
}

function wait(period) {
  return new Promise(resolve => {
    setTimeout(resolve, period);
  });
}

async function* windGustIter() {
  const host = 'http://api.oceandrivers.com:80';
  const version = 'v1.0';
  const path = 'getWeatherDisplay/cnarenal/?period=latestdata';
  while (true) {
    const res = await fetch(`${host}/${version}/${path}`);
    const json = await res.json();
    yield json.TWS_GUST;
    await wait(4000);
  }
}

const windGust$ = {
  async subscribe(observer) {
    for await (let x of windGustIter()) {
      observer.next(x);
    }
  },
};

console.log('before');
windGust$.subscribe({
  next: x => {
    twsgust.innerText = '' + x;
  },
});
console.log('after');

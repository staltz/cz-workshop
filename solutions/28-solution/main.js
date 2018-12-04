const windGust$ = {
  subscribe(observer) {
    const host = 'http://api.oceandrivers.com:80';
    const version = 'v1.0';
    const path = 'getWeatherDisplay/cnarenal/?period=latestdata';
    const poll = () => {
      fetch(`${host}/${version}/${path}`)
        .then(res => res.json())
        .then(res => observer.next(res.TWS_GUST));
    };
    poll();
    setInterval(poll, 4000);
  },
};

windGust$.subscribe({
  next: x => {
    twsgust.innerText = '' + x;
  },
});

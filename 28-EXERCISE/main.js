const windGust$ = {
  /**
   * EXERCISE implement this observable so that it fetches data from
   * http://api.oceandrivers.com:80/v1.0/getWeatherDisplay/cnarenal/?period=latestdata
   * every 4 seconds and emits the JSON field `TWS_GUST` to the observer.
   */
};

windGust$.subscribe({
  next: x => {
    twsgust.innerText = '' + x;
  },
});
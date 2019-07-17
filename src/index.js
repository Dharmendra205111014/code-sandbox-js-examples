(() => {
  const doc = document.getElementById("test");
  const Throttle = function(callback, time) {
    let timer = false;
    return function(context, ...args) {
      if (!timer) {
        callback.call(context, ...args);
        timer = setTimeout(function() {
          timer = false;
        }, time);
      }
    };
  };
  const handler = Throttle(function(e) {
    console.log(e, "throttled", this.value);
  }, 200);
  doc.addEventListener("keyup", function(e) {
    handler(this, e);
  });

  const debounce = function(callback, time) {
    let timer = 0;
    return function(context, ...args) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        timer = 0;
        callback.call(context, ...args);
      }, time);
    };
  };

  const scrollMe = debounce(function(e) {
    console.log(e, "scroll debounced");
  }, 500);

  window.onscroll = function(e) {
    scrollMe(this, e);
  };
})();

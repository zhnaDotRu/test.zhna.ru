//Полифил для window.performance.now()
if (!window.performance || !window.performance.now) {
  Date.now || ( Date.now = function() {
    return new this().getTime();
  });
  (window.performance || ( window.performance = {})).now = function (){
    return Date.now() - offset;
  };
  var offset = ( window.performance.timing || ( window.performance.timing = {} ) ).navigatorStart || ( window.performance.timing.navigationStart = Date.now() );
}
//Полифил для elements.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
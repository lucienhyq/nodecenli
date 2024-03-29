(function (doc, win) {
  var isAndroid = win.navigator.appVersion.match(/android/gi);
  var isIPhone = win.navigator.appVersion.match(/iphone/gi);
  var ua = window.navigator.userAgent.toLowerCase();

  var scale = 1.0;
  // var ratio = 1
  // if(isIPhone) {
  //   if (window.devicePixelRatio == 2) {
  //     scale *= 0.5;
  //     ratio *= 2;
  //   }
  //   if (window.devicePixelRatio == 3) {
  //     scale *= (1/3);
  //     ratio *= 3;
  //   }
  // }
  if (
    !navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) &&
    !/wallet/.test(ua)
  ) {
    var httpEquiv = '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />';
    document.write(httpEquiv);
  }

  var text = '<meta name="viewport" content="initial-scale=' + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", width=device-width," + ' user-scalable=no" />';
  document.write(text);

  var docEl = doc.documentElement;
  var resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
  var recalc = function () {
    var clientWidth;
    if (!isAndroid && !isIPhone) {
      clientWidth = 375;
    } else {
      clientWidth = docEl.clientWidth;
    }
    // isAndroid && clientWidth>800 为了防止企业微信跳转微信的时候出现clientWidth=1080 字体过大
    if (!clientWidth || (isAndroid && clientWidth > 800)) return;
    docEl.style.fontSize = 16 * (clientWidth / 375) + "px";

    // 解决部分rem特别大的问题
    var docElFontSize = docEl.style.fontSize.replace(/px/gi, "");
    var computedFontSize = win.getComputedStyle(docEl)["font-size"].replace(/px/gi, "");

    console.log("docElFontSize", docElFontSize, computedFontSize);
    //老人机字体过大
    // docElFontSize != computedFontSize && (docEl.style.fontSize = (docElFontSize * docElFontSize) / computedFontSize + 'px')
  };
  if (!doc.addEventListener) return;
  recalc();
  win.addEventListener(resizeEvt, recalc, false);
  // doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
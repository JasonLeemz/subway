/**
 * Created by jason on 2016/10/18.
 */
var dpr, rem;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');

// 设置data-dpr属性，留作的css hack之用
dpr = window.devicePixelRatio || 1;
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
//设计稿是750 除以75
rem = document.documentElement.getBoundingClientRect().width / 7.5;
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
};

var calcClientH = dpr * docEl.clientHeight;
var calcClientW = dpr * docEl.clientWidth;
window.dpr = dpr;
window.rem = rem;

(()=>{var e,t={101:(e,t,n)=>{"use strict";var r=n(592),o=n(638);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}o(window).on("load",(function(){var e;(e=o("[data-slider-id]")).length&&e.each((function(){var e=o(this),t=e.data("slider-id"),n=e.data("slider-prev"),a=e.data("slider-next"),s=o('[data-slider-button="'.concat(n,'"]')),d=o('[data-slider-button="'.concat(a,'"]')),l=o("[data-slider-buttons]");l.length&&e.find(".swiper-slide").length<+l.data("slider-buttons")&&l.addClass("hidden");var u={slidesPerView:"auto",spaceBetween:10,speed:500,breakpoints:c({},1280,{spaceBetween:20})};switch(t){case"main":u={slidesPerView:1,spaceBetween:0,loop:!0,speed:500,autoplay:{delay:6500,disableOnInteraction:!1},pagination:{el:".swiper-pagination"},navigation:{nextEl:"[data-main-next]"},on:{init:function(){},slideChange:function(e){var t=document.querySelector("[data-slider-fraction]"),n=e.realIndex+1;t.textContent=n<10?"0".concat(n):n}}};break;case 2:u=i(i({},u),{},{loop:!0})}var p=new r.Z(e[0],u);s.on("click",(function(){p.slidePrev()})),d.on("click",(function(){p.slideNext()}))}))}));n(818),n(849)},818:()=>{document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".header");function t(){window.scrollY<1?e.classList.remove("header--scroll"):e.classList.add("header--scroll")}t(),window.addEventListener("scroll",t)}))},849:()=>{window.addEventListener("load",(function(){document.body.classList.remove("body--notransition")}))}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var a=n[e]={exports:{}};return t[e].call(a.exports,a,a.exports,r),a.exports}r.m=t,e=[],r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(l=0;l<e.length;l++){for(var[n,o,a]=e[l],c=!0,s=0;s<n.length;s++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(c=!1,a<i&&(i=a));if(c){e.splice(l--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[n,o,a]},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0,532:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,c,s]=n,d=0;if(i.some((t=>0!==e[t]))){for(o in c)r.o(c,o)&&(r.m[o]=c[o]);if(s)var l=s(r)}for(t&&t(n);d<i.length;d++)a=i[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(l)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[761,532],(()=>r(101)));o=r.O(o)})();
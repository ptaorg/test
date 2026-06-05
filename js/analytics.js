/* PTA適正化推進委員会 — GA4 common loader */
(function(){
  'use strict';
  var MEASUREMENT_ID = 'G-0D18ZSSLMH';
  if (window.__PTA_GA4_LOADED__) return;
  window.__PTA_GA4_LOADED__ = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(script);
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title
  });
})();

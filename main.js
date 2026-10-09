(function () {
  'use strict';

  var WHATSAPP_NUMBER = '260978438009'; // international format, no plus sign
  var SHOP = 'Sich Cuts Executive Barbershop';

  function waLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  // Service booking buttons: message includes service and price
  document.querySelectorAll('.book-service').forEach(function (a) {
    var service = a.getAttribute('data-service');
    var price = a.getAttribute('data-price');
    var msg = 'Hello ' + SHOP + ', I would like to book ' +
      (/^[AEIOU]/i.test(service) ? 'an ' : 'a ') + service + ' (' + price + '). ' +
      'Please let me know your available times.';
    a.href = waLink(msg);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Generic booking buttons
  var genericMsg = 'Hello ' + SHOP + ', I would like to book an appointment. ' +
    'Please let me know your available times and prices.';
  document.querySelectorAll('.book-generic').forEach(function (a) {
    a.href = waLink(genericMsg);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Mobile menu
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  function setMenu(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(!links.classList.contains('open'));
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Image fallback: if a photo is missing, show a branded placeholder
  document.querySelectorAll('.media img').forEach(function (img) {
    function miss() { img.parentElement.classList.add('img-missing'); }
    img.addEventListener('error', miss);
    if (img.complete && img.naturalWidth === 0) miss();
  });

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

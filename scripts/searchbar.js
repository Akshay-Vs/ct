$(document).ready(function () {
  $('#lookup').click(function () {
    $('#search').css({ 'opacity': '100%', 'z-index': '8' });
    $('input').focus();
    if (window.matchMedia("(max-width: 767px)").matches) $('#nav').click();
  });
  $('#search-submit').click(function () {
    $('#search').css({ 'opacity': '0', 'z-index': '-1', 'transition': 'all 0.5s ease-in-out' });

  });
});
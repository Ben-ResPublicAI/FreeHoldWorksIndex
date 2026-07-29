/* The audio bed, opt in.
   The page is silent until someone asks for sound, and it forgets that they
   did. No autoplay, not even muted. No cookie, no localStorage, nothing that
   remembers the visitor between visits, so the feature raises no consent
   question at all. The control is written into the page only if the browser
   can actually play one of the two files, so a browser that cannot is shown
   nothing rather than a button that fails. */
(function () {
  'use strict';

  var btn = document.getElementById('sound-toggle');
  var bed = document.getElementById('sound-bed');
  if (!btn || !bed || typeof bed.canPlayType !== 'function') return;

  var playable = bed.canPlayType('audio/ogg; codecs=opus') ||
                 bed.canPlayType('audio/mpeg');
  if (!playable) return;

  var label = btn.querySelector('.sound-label');
  var TARGET = 0.34;          // quiet by design, this sits under the page
  var FADE = 700;             // ms, so it arrives and leaves rather than cutting
  var timer = null;

  function fade(to, done) {
    if (timer) clearInterval(timer);
    var from = bed.volume, t0 = Date.now();
    timer = setInterval(function () {
      var k = Math.min(1, (Date.now() - t0) / FADE);
      bed.volume = from + (to - from) * k;
      if (k === 1) {
        clearInterval(timer);
        timer = null;
        if (done) done();
      }
    }, 25);
  }

  function state(on) {
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.classList.toggle('is-playing', on);
    if (label) label.textContent = on ? 'Stop' : 'Listen';
  }

  btn.addEventListener('click', function () {
    if (bed.paused) {
      bed.volume = 0;
      var p = bed.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { state(false); });
      }
      fade(TARGET);
      state(true);
    } else {
      fade(0, function () { bed.pause(); });
      state(false);
    }
  });

  /* Keep the label honest if playback stops for any other reason. */
  bed.addEventListener('pause', function () { if (!timer) state(false); });
  bed.addEventListener('ended', function () { state(false); });

  btn.hidden = false;
})();

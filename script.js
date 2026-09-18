// Тойға дейінгі есептегіш
(function countdown() {
  var target = new Date(2026, 9, 10, 19, 0, 0).getTime(); // 10 қазан 2026, 19:00

  var elDays = document.getElementById('t-days');
  var elHours = document.getElementById('t-hours');
  var elMins = document.getElementById('t-mins');
  var elSecs = document.getElementById('t-secs');
  var elTimer = document.getElementById('timer');
  var elDone = document.getElementById('timer-done');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) {
      elTimer.hidden = true;
      elDone.hidden = false;
      clearInterval(interval);
      return;
    }
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }

  tick();
  var interval = setInterval(tick, 1000);
})();

// Мини-күнтізбе (2026 жылғы қазан, 10-күн белгіленген)
(function miniCalendar() {
  var grid = document.getElementById('mini-calendar-grid');
  if (!grid) return;

  var leadingPrevDays = 3;   // 28, 29, 30 қыркүйек — аптаның алдыңғы күндері
  var daysInMonth = 31;      // қазан айындағы күн саны
  var highlightDay = 10;
  var prevMonthLastDay = 30; // қыркүйектегі соңғы күн

  var totalCells = Math.ceil((leadingPrevDays + daysInMonth) / 7) * 7;
  var html = '';

  for (var i = 0; i < totalCells; i++) {
    var dayNum = i - leadingPrevDays + 1;

    if (i < leadingPrevDays) {
      html += '<span class="day day--muted">' + (prevMonthLastDay - leadingPrevDays + i + 1) + '</span>';
    } else if (dayNum <= daysInMonth) {
      var cls = 'day' + (dayNum === highlightDay ? ' day--highlight' : '');
      html += '<span class="' + cls + '">' + dayNum + '</span>';
    } else {
      html += '<span class="day day--muted"></span>';
    }
  }

  grid.innerHTML = html;
})();

// Скролл кезінде пайда болу анимациясы
(function reveal() {
  var items = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (item) { observer.observe(item); });
})();

// Фондық әуен — тек батырманы басқанда ғана қосылады
(function music() {
  var audio = document.getElementById('bg-music');
  var btn = document.getElementById('music-toggle');

  function play() {
    audio.play().then(function () {
      btn.classList.add('is-playing');
    }).catch(function () {
      btn.classList.remove('is-playing');
    });
  }

  function pause() {
    audio.pause();
    btn.classList.remove('is-playing');
  }

  btn.addEventListener('click', function () {
    if (audio.paused) { play(); } else { pause(); }
  });
})();

// Ұшып түсетін гүл жапырақтары
(function petals() {
  var container = document.querySelector('.petals');
  if (!container) return;
  var symbols = ['🌸', '🌼', '❀'];
  var count = window.innerWidth < 640 ? 10 : 18;

  for (var i = 0; i < count; i++) {
    var span = document.createElement('span');
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = Math.random() * 100 + 'vw';
    span.style.fontSize = 12 + Math.random() * 14 + 'px';
    span.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    span.style.animationDuration = 14 + Math.random() * 14 + 's';
    span.style.animationDelay = -(Math.random() * 20) + 's';
    container.appendChild(span);
  }
})();

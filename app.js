/* eslint-disable no-undef */
/* =====================================================
   DRIFT — Sleep Companion App
   Main application logic
   ===================================================== */

// ===== THEME TOGGLE =====
(function(){
  var toggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var isDark = matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = isDark ? 'dark' : 'dark'; // default to dark for sleep app
  root.setAttribute('data-theme', theme);

  function updateToggleUI() {
    var label = toggle.querySelector('span');
    if (theme === 'dark') {
      label.textContent = 'Light mode';
      toggle.querySelector('svg').innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    } else {
      label.textContent = 'Dark mode';
      toggle.querySelector('svg').innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
  }
  updateToggleUI();

  if (toggle) {
    toggle.addEventListener('click', function() {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateToggleUI();
      // Rebuild charts with new colors
      buildAllCharts();
    });
  }
})();

// ===== MOBILE MENU =====
(function(){
  var btn = document.getElementById('mobileMenuBtn');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('mobileOverlay');

  btn.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', function() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
})();

// ===== PAGE NAVIGATION =====
function switchPage(pageId, btn) {
  document.querySelectorAll('.page-section').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById('page-' + pageId).classList.add('active');
  document.querySelectorAll('.sidebar-nav button').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');

  // Close mobile menu
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('active');

  // Scroll to top
  document.getElementById('mainContent').scrollTop = 0;

  // Rebuild charts for the page
  buildAllCharts();
}

// ===== CHART THEME =====
function getChartColors() {
  var style = getComputedStyle(document.documentElement);
  return {
    text: style.getPropertyValue('--color-text').trim(),
    textMuted: style.getPropertyValue('--color-text-muted').trim(),
    textFaint: style.getPropertyValue('--color-text-faint').trim(),
    primary: style.getPropertyValue('--color-primary').trim(),
    deep: style.getPropertyValue('--color-deep').trim(),
    rem: style.getPropertyValue('--color-rem').trim(),
    lightSleep: style.getPropertyValue('--color-light-sleep').trim(),
    awake: style.getPropertyValue('--color-awake').trim(),
    success: style.getPropertyValue('--color-success').trim(),
    warning: style.getPropertyValue('--color-warning').trim(),
    error: style.getPropertyValue('--color-error').trim(),
    info: style.getPropertyValue('--color-info').trim(),
    surface: style.getPropertyValue('--color-surface').trim(),
    border: style.getPropertyValue('--color-border').trim(),
    divider: style.getPropertyValue('--color-divider').trim()
  };
}

function baseChartOptions(c) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: c.surface,
        titleColor: c.text,
        bodyColor: c.textMuted,
        borderColor: c.border,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: { family: 'General Sans', weight: '600' },
        bodyFont: { family: 'General Sans' }
      }
    },
    scales: {
      x: {
        grid: { color: c.divider, drawBorder: false },
        ticks: { color: c.textFaint, font: { family: 'General Sans', size: 11 } },
        border: { display: false }
      },
      y: {
        grid: { color: c.divider, drawBorder: false },
        ticks: { color: c.textFaint, font: { family: 'General Sans', size: 11 } },
        border: { display: false }
      }
    }
  };
}

// ===== CHART REGISTRY =====
var chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

function createChart(id, config) {
  destroyChart(id);
  var canvas = document.getElementById(id);
  if (!canvas) return null;
  chartInstances[id] = new Chart(canvas, config);
  return chartInstances[id];
}

// ===== BUILD KPIs =====
function buildKPIs() {
  var avg = getAverages();
  var comp = getWeekComparison();
  var bedtime = getBedtimeVariability();

  var kpis = [
    {
      label: 'Avg Sleep Score',
      value: avg.avgScore,
      delta: comp.scoreChange,
      unit: '',
      accent: 'var(--color-primary)'
    },
    {
      label: 'Avg Duration',
      value: avg.avgDuration + 'h',
      delta: comp.durationChange,
      unit: 'h',
      accent: 'var(--color-deep)'
    },
    {
      label: 'Avg HRV',
      value: avg.avgHRV + ' ms',
      delta: comp.hrvChange,
      unit: 'ms',
      accent: 'var(--color-success)'
    },
    {
      label: 'Efficiency',
      value: avg.avgEfficiency + '%',
      delta: comp.efficiencyChange,
      unit: '%',
      accent: 'var(--color-info)'
    }
  ];

  var grid = document.getElementById('kpiGrid');
  grid.innerHTML = kpis.map(function(k) {
    var deltaClass = k.delta > 0 ? 'positive' : k.delta < 0 ? 'negative' : 'neutral';
    var arrow = k.delta > 0 ? '↑' : k.delta < 0 ? '↓' : '→';
    var deltaText = Math.abs(k.delta) + (k.unit === 'h' ? 'h' : k.unit === '%' ? '%' : k.unit === 'ms' ? 'ms' : '');
    return '<div class="kpi-card" style="--kpi-accent:' + k.accent + '">' +
      '<div class="kpi-label">' + k.label + '</div>' +
      '<div class="kpi-value">' + k.value + '</div>' +
      '<span class="kpi-delta ' + deltaClass + '">' + arrow + ' ' + deltaText + ' vs prior 2 wk</span>' +
    '</div>';
  }).join('');
}

// ===== BUILD RECOMMENDATIONS =====
function buildRecommendations() {
  var avg = getAverages();
  var bedtime = getBedtimeVariability();
  var recs = [];

  // Bedtime consistency
  if (bedtime.stdMinutes > 60) {
    recs.push({
      emoji: '\u{1F319}', title: 'Fix Bedtime Consistency',
      text: 'Your bedtime varies by \u00B1' + bedtime.stdMinutes + ' min. Aim for the same time within 30 min each night. Set a "wind down" alarm at 11:00 PM.',
      priority: 'high'
    });
  }

  // Late bedtimes
  var lateBedtimes = SLEEP_DATA.filter(function(d) {
    var h = parseInt(d.bedtime.split(':')[0]);
    return h >= 1 && h <= 5;
  }).length;
  if (lateBedtimes > 5) {
    recs.push({
      emoji: '\u{23F0}', title: 'Move Bedtime Earlier',
      text: lateBedtimes + ' of ' + SLEEP_DATA.length + ' nights you went to bed after 1 AM. Late bedtimes correlate with lower scores in your data.',
      priority: 'high'
    });
  }

  // Sleep latency
  if (avg.avgLatency > 12) {
    recs.push({
      emoji: '\u{1F9D8}', title: 'Reduce Sleep Latency',
      text: 'You take ~' + avg.avgLatency + ' min to fall asleep on average. Try 10 min of deep breathing or progressive relaxation before bed.',
      priority: 'medium'
    });
  }

  // HRV improvement
  if (avg.avgHRV < 30) {
    recs.push({
      emoji: '\u{1F49A}', title: 'Boost Recovery (HRV)',
      text: 'Your avg sleep HRV is ' + avg.avgHRV + 'ms. Prioritize stress management, limit alcohol, and maintain consistent exercise to improve recovery.',
      priority: 'medium'
    });
  }

  // Wakeups
  if (avg.avgWakeups > 6) {
    recs.push({
      emoji: '\u{1F6CF}\u{FE0F}', title: 'Reduce Night Wakeups',
      text: 'You wake up ' + avg.avgWakeups + ' times per night on average. Consider room temperature (65-68\u00B0F), blackout curtains, and limiting fluids before bed.',
      priority: 'medium'
    });
  }

  // Deep sleep
  if (avg.avgDeep < 1.5) {
    recs.push({
      emoji: '\u{1F4AA}', title: 'Increase Deep Sleep',
      text: 'Averaging ' + avg.avgDeep + 'h of deep sleep (target 1.5-2h). Intense exercise earlier in the day and a cooler bedroom can help.',
      priority: 'low'
    });
  }

  var container = document.getElementById('recommendations');
  container.innerHTML = '<h2>Personalized Recommendations</h2><div class="rec-grid">' +
    recs.map(function(r) {
      return '<div class="rec-card">' +
        '<span class="rec-priority ' + r.priority + '">' + r.priority + '</span>' +
        '<span class="rec-emoji">' + r.emoji + '</span>' +
        '<h3>' + r.title + '</h3>' +
        '<p>' + r.text + '</p>' +
      '</div>';
    }).join('') +
  '</div>';
}

// ===== BUILD SLEEP LOG =====
function buildSleepLog() {
  var body = document.getElementById('sleepLogBody');
  if (!body) return;
  var sorted = [...SLEEP_DATA].sort(function(a, b) { return b.date.localeCompare(a.date); });
  body.innerHTML = sorted.map(function(d) {
    var scoreClass = d.sleepScore >= 85 ? 'excellent' : d.sleepScore >= 75 ? 'good' : d.sleepScore >= 65 ? 'fair' : 'poor';
    return '<tr>' +
      '<td>' + shortDate(d.date) + ' <span style="color:var(--color-text-faint)">' + dayOfWeek(d.date) + '</span></td>' +
      '<td><span class="score-badge ' + scoreClass + '">' + d.sleepScore + '</span></td>' +
      '<td>' + formatTime(d.bedtime) + '</td>' +
      '<td>' + formatTime(d.wakeTime) + '</td>' +
      '<td>' + toHours(d.totalAsleep) + 'h</td>' +
      '<td>' + toHours(d.deepSleep) + 'h</td>' +
      '<td>' + toHours(d.remSleep) + 'h</td>' +
      '<td>' + Math.round(d.efficiency * 100) + '%</td>' +
      '<td>' + d.hrv.toFixed(0) + '</td>' +
      '<td>' + d.avgHR.toFixed(0) + '</td>' +
      '<td>' + d.wakeups + '</td>' +
    '</tr>';
  }).join('');
}

// ===== BUILD INSIGHTS =====
function buildInsights() {
  var grid = document.getElementById('insightsGrid');
  if (!grid) return;

  var avg = getAverages();
  var bedtime = getBedtimeVariability();

  // Calculate correlations
  var bestNights = SLEEP_DATA.filter(function(d) { return d.sleepScore >= 85; });
  var worstNights = SLEEP_DATA.filter(function(d) { return d.sleepScore < 70; });

  var bestAvgBedtime = bestNights.length ? bestNights.reduce(function(s, d) {
    var parts = d.bedtime.split(':').map(Number);
    var m = parts[0] * 60 + parts[1];
    if (m < 720) m += 1440;
    return s + m;
  }, 0) / bestNights.length : 0;

  var worstAvgBedtime = worstNights.length ? worstNights.reduce(function(s, d) {
    var parts = d.bedtime.split(':').map(Number);
    var m = parts[0] * 60 + parts[1];
    if (m < 720) m += 1440;
    return s + m;
  }, 0) / worstNights.length : 0;

  var bestHR = bestNights.length ? bestNights.reduce(function(s, d) { return s + d.avgHR; }, 0) / bestNights.length : 0;
  var worstHR = worstNights.length ? worstNights.reduce(function(s, d) { return s + d.avgHR; }, 0) / worstNights.length : 0;

  grid.innerHTML =
    '<div class="insight-card">' +
      '<h3>\u{1F50D} Key Findings</h3>' +
      '<div class="insight-item">' +
        '<div class="insight-icon ' + (bestAvgBedtime < worstAvgBedtime ? 'good' : 'warn') + '">\u{1F319}</div>' +
        '<div class="insight-text">Your best nights (score 85+) had an average bedtime of <span class="highlight">' + minutesToTime(bestAvgBedtime) + '</span>, while worst nights (<70) averaged <span class="highlight">' + minutesToTime(worstAvgBedtime) + '</span>.</div>' +
      '</div>' +
      '<div class="insight-item">' +
        '<div class="insight-icon good">\u{2764}\u{FE0F}</div>' +
        '<div class="insight-text">On your best nights, sleeping HR averaged <span class="highlight">' + bestHR.toFixed(0) + ' bpm</span> vs <span class="highlight">' + worstHR.toFixed(0) + ' bpm</span> on worst nights. Lower HR strongly predicts better sleep.</div>' +
      '</div>' +
      '<div class="insight-item">' +
        '<div class="insight-icon info">\u{1F4CA}</div>' +
        '<div class="insight-text">Your bedtime variability is <span class="highlight">\u00B1' + bedtime.stdMinutes + ' minutes</span>. Research suggests keeping this under 30 minutes for optimal sleep quality.</div>' +
      '</div>' +
    '</div>' +
    '<div class="insight-card">' +
      '<h3>\u{1F3AF} Your Sleep Goals</h3>' +
      buildGoalBar('Sleep Score', avg.avgScore, 85, 100) +
      buildGoalBar('Duration', avg.avgDuration, 7.5, 9) +
      buildGoalBar('Deep Sleep', avg.avgDeep, 1.5, 2.5) +
      buildGoalBar('Efficiency', avg.avgEfficiency, 90, 100) +
      buildGoalBar('HRV', avg.avgHRV, 30, 50) +
    '</div>';
}

function minutesToTime(totalMins) {
  var m = Math.round(totalMins) % 1440;
  var h = Math.floor(m / 60);
  var min = m % 60;
  var ampm = h >= 12 ? 'PM' : 'AM';
  var h12 = h % 12 || 12;
  return h12 + ':' + String(min).padStart(2, '0') + ' ' + ampm;
}

function buildGoalBar(label, current, target, max) {
  var pct = Math.min(100, Math.round((current / target) * 100));
  var met = current >= target;
  return '<div class="goal-bar-container">' +
    '<div class="goal-label"><span>' + label + '</span><span>' + current + ' / ' + target + (met ? ' \u2705' : '') + '</span></div>' +
    '<div class="goal-bar"><div class="goal-bar-fill" style="width:' + pct + '%;background:' + (met ? 'var(--color-success)' : 'var(--color-primary)') + '"></div></div>' +
  '</div>';
}

// ===== CHART BUILDERS =====
function buildAllCharts() {
  var c = getChartColors();
  var labels = SLEEP_DATA.map(function(d) { return shortDate(d.date); });

  // Score chart
  var scoreMA = movingAverage(SLEEP_DATA.map(function(d) { return d.sleepScore; }), 7);
  createChart('scoreChart', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Score',
          data: SLEEP_DATA.map(function(d) { return d.sleepScore; }),
          borderColor: c.primary,
          backgroundColor: c.primary + '18',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: c.primary,
          borderWidth: 2
        },
        {
          label: '7-day MA',
          data: scoreMA,
          borderColor: c.textFaint,
          borderDash: [6, 4],
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        ...baseChartOptions(c).scales,
        y: { ...baseChartOptions(c).scales.y, min: 30, max: 100 }
      }
    }
  });

  // Duration chart
  createChart('durationChart', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Hours',
        data: SLEEP_DATA.map(function(d) { return toHours(d.totalAsleep); }),
        backgroundColor: SLEEP_DATA.map(function(d) {
          var h = toHours(d.totalAsleep);
          return h >= 7 ? c.primary + 'CC' : h >= 6 ? c.warning + '99' : c.error + '99';
        }),
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        ...baseChartOptions(c).scales,
        y: {
          ...baseChartOptions(c).scales.y,
          min: 0,
          max: 10,
          ticks: { ...baseChartOptions(c).scales.y.ticks, callback: function(v) { return v + 'h'; } }
        }
      },
      plugins: {
        ...baseChartOptions(c).plugins,
        annotation: {
          annotations: {
            target: { type: 'line', yMin: 7.5, yMax: 7.5, borderColor: c.success + '66', borderDash: [6,4], borderWidth: 1 }
          }
        }
      }
    }
  });

  // Bedtime chart
  createChart('bedtimeChart', {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Bedtime',
        data: SLEEP_DATA.map(function(d) {
          var parts = d.bedtime.split(':').map(Number);
          var mins = parts[0] * 60 + parts[1];
          if (mins < 720) mins += 1440; // after midnight
          return { x: d.date, y: mins, score: d.sleepScore };
        }),
        backgroundColor: SLEEP_DATA.map(function(d) {
          return d.sleepScore >= 85 ? c.success + 'CC' : d.sleepScore >= 75 ? c.primary + 'CC' : d.sleepScore >= 65 ? c.warning + 'CC' : c.error + 'CC';
        }),
        pointRadius: 7,
        pointHoverRadius: 9
      }]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        x: {
          ...baseChartOptions(c).scales.x,
          type: 'category',
          labels: labels
        },
        y: {
          ...baseChartOptions(c).scales.y,
          reverse: true,
          min: 1300,
          max: 1740,
          ticks: {
            ...baseChartOptions(c).scales.y.ticks,
            callback: function(v) {
              var m = v % 1440;
              var h = Math.floor(m / 60);
              var min = m % 60;
              var ampm = h >= 12 ? 'PM' : 'AM';
              return (h % 12 || 12) + ':' + String(min).padStart(2, '0') + ' ' + ampm;
            },
            stepSize: 60
          }
        }
      },
      plugins: {
        ...baseChartOptions(c).plugins,
        tooltip: {
          ...baseChartOptions(c).plugins.tooltip,
          callbacks: {
            label: function(ctx) {
              var m = ctx.parsed.y % 1440;
              var h = Math.floor(m / 60);
              var min = m % 60;
              var ampm = h >= 12 ? 'PM' : 'AM';
              return 'Bedtime: ' + (h % 12 || 12) + ':' + String(min).padStart(2, '0') + ' ' + ampm + ' (Score: ' + ctx.raw.score + ')';
            }
          }
        }
      }
    }
  });

  // HRV chart
  createChart('hrvChart', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'HRV (ms)',
        data: SLEEP_DATA.map(function(d) { return +d.hrv.toFixed(1); }),
        borderColor: c.success,
        backgroundColor: c.success + '18',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2
      }]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        ...baseChartOptions(c).scales,
        y: {
          ...baseChartOptions(c).scales.y,
          min: 0,
          ticks: { ...baseChartOptions(c).scales.y.ticks, callback: function(v) { return v + 'ms'; } }
        }
      }
    }
  });

  // HR chart
  createChart('hrChart', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Avg HR',
          data: SLEEP_DATA.map(function(d) { return +d.avgHR.toFixed(1); }),
          borderColor: c.error,
          backgroundColor: c.error + '18',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          borderWidth: 2
        },
        {
          label: 'Min HR',
          data: SLEEP_DATA.map(function(d) { return d.minHR; }),
          borderColor: c.info,
          borderDash: [4, 3],
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      ...baseChartOptions(c),
      plugins: {
        ...baseChartOptions(c).plugins,
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: { color: c.textMuted, font: { family: 'General Sans', size: 11 }, boxWidth: 12, padding: 16 }
        }
      },
      scales: {
        ...baseChartOptions(c).scales,
        y: {
          ...baseChartOptions(c).scales.y,
          ticks: { ...baseChartOptions(c).scales.y.ticks, callback: function(v) { return v + ' bpm'; } }
        }
      }
    }
  });

  // Efficiency chart
  createChart('efficiencyChart', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Efficiency %',
        data: SLEEP_DATA.map(function(d) { return Math.round(d.efficiency * 100); }),
        borderColor: c.info,
        backgroundColor: c.info + '18',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        borderWidth: 2
      }]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        ...baseChartOptions(c).scales,
        y: {
          ...baseChartOptions(c).scales.y,
          min: 60,
          max: 100,
          ticks: { ...baseChartOptions(c).scales.y.ticks, callback: function(v) { return v + '%'; } }
        }
      }
    }
  });

  // Stages stacked bar
  createChart('stagesChart', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        { label: 'Deep', data: SLEEP_DATA.map(function(d) { return toHours(d.deepSleep); }), backgroundColor: c.deep, borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 4, bottomRight: 4 }, borderSkipped: false },
        { label: 'REM', data: SLEEP_DATA.map(function(d) { return toHours(d.remSleep); }), backgroundColor: c.rem, borderSkipped: false },
        { label: 'Light', data: SLEEP_DATA.map(function(d) { return toHours(d.lightSleep); }), backgroundColor: c.lightSleep, borderSkipped: false },
        { label: 'Awake', data: SLEEP_DATA.map(function(d) { return toHours(d.awake); }), backgroundColor: c.awake, borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 }, borderSkipped: false }
      ]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        ...baseChartOptions(c).scales,
        x: { ...baseChartOptions(c).scales.x, stacked: true },
        y: {
          ...baseChartOptions(c).scales.y,
          stacked: true,
          ticks: { ...baseChartOptions(c).scales.y.ticks, callback: function(v) { return v + 'h'; } }
        }
      }
    }
  });

  // Stages pie
  var avgDeep = SLEEP_DATA.reduce(function(s, d) { return s + d.deepSleep; }, 0) / SLEEP_DATA.length;
  var avgRem = SLEEP_DATA.reduce(function(s, d) { return s + d.remSleep; }, 0) / SLEEP_DATA.length;
  var avgLight = SLEEP_DATA.reduce(function(s, d) { return s + d.lightSleep; }, 0) / SLEEP_DATA.length;
  var avgAwake = SLEEP_DATA.reduce(function(s, d) { return s + d.awake; }, 0) / SLEEP_DATA.length;

  createChart('stagesPieChart', {
    type: 'doughnut',
    data: {
      labels: ['Deep', 'REM', 'Light', 'Awake'],
      datasets: [{
        data: [avgDeep, avgRem, avgLight, avgAwake],
        backgroundColor: [c.deep, c.rem, c.lightSleep, c.awake],
        borderWidth: 2,
        borderColor: c.surface
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: c.textMuted, font: { family: 'General Sans', size: 12 }, padding: 20, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          ...baseChartOptions(c).plugins.tooltip,
          callbacks: {
            label: function(ctx) {
              var total = ctx.dataset.data.reduce(function(a, b) { return a + b; }, 0);
              var pct = ((ctx.raw / total) * 100).toFixed(1);
              return ctx.label + ': ' + toHours(ctx.raw) + 'h (' + pct + '%)';
            }
          }
        }
      }
    }
  });

  // Deep sleep trend
  createChart('deepTrendChart', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Deep Sleep',
        data: SLEEP_DATA.map(function(d) { return toHours(d.deepSleep); }),
        backgroundColor: SLEEP_DATA.map(function(d) {
          var h = toHours(d.deepSleep);
          return h >= 1.5 ? c.deep + 'CC' : h >= 1.0 ? c.warning + '99' : c.error + '99';
        }),
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        ...baseChartOptions(c).scales,
        y: {
          ...baseChartOptions(c).scales.y,
          min: 0,
          max: 2.5,
          ticks: { ...baseChartOptions(c).scales.y.ticks, callback: function(v) { return v + 'h'; } }
        }
      }
    }
  });

  // Steps vs Score scatter
  var matchedData = SLEEP_DATA.map(function(sd) {
    var activity = ACTIVITY_DATA.find(function(a) { return a.date === sd.date; });
    return activity ? { steps: activity.steps, score: sd.sleepScore } : null;
  }).filter(Boolean);

  createChart('stepsScatterChart', {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Steps vs Score',
        data: matchedData.map(function(d) { return { x: d.steps, y: d.score }; }),
        backgroundColor: c.primary + 'AA',
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        x: {
          ...baseChartOptions(c).scales.x,
          title: { display: true, text: 'Daily Steps', color: c.textMuted, font: { family: 'General Sans', size: 12 } },
          ticks: { ...baseChartOptions(c).scales.x.ticks, callback: function(v) { return (v / 1000).toFixed(0) + 'k'; } }
        },
        y: {
          ...baseChartOptions(c).scales.y,
          min: 30,
          max: 100,
          title: { display: true, text: 'Sleep Score', color: c.textMuted, font: { family: 'General Sans', size: 12 } }
        }
      }
    }
  });

  // Bedtime vs Score scatter
  var bedtimeScoreData = SLEEP_DATA.map(function(d) {
    var parts = d.bedtime.split(':').map(Number);
    var mins = parts[0] * 60 + parts[1];
    if (mins < 720) mins += 1440;
    return { x: mins, y: d.sleepScore };
  });

  createChart('bedtimeScatterChart', {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Bedtime vs Score',
        data: bedtimeScoreData,
        backgroundColor: c.rem + 'AA',
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      ...baseChartOptions(c),
      scales: {
        x: {
          ...baseChartOptions(c).scales.x,
          title: { display: true, text: 'Bedtime', color: c.textMuted, font: { family: 'General Sans', size: 12 } },
          ticks: {
            ...baseChartOptions(c).scales.x.ticks,
            callback: function(v) {
              var m = v % 1440;
              var h = Math.floor(m / 60);
              return (h % 12 || 12) + (h >= 12 ? 'PM' : 'AM');
            },
            stepSize: 60
          }
        },
        y: {
          ...baseChartOptions(c).scales.y,
          min: 30,
          max: 100,
          title: { display: true, text: 'Sleep Score', color: c.textMuted, font: { family: 'General Sans', size: 12 } }
        }
      }
    }
  });
}

// ===== HELPERS =====
function movingAverage(arr, window) {
  return arr.map(function(val, i) {
    if (i < window - 1) return null;
    var sum = 0;
    for (var j = 0; j < window; j++) sum += arr[i - j];
    return +(sum / window).toFixed(1);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  buildKPIs();
  buildRecommendations();
  buildSleepLog();
  buildInsights();
  buildAllCharts();
});

// Sleep data from wearable (28 days: Feb 10 - Mar 9, 2026)
const SLEEP_DATA = [
  { date: "2026-02-10", bedtime: "00:39", wakeTime: "08:23", sleepScore: 77, readiness: 77, efficiency: 0.89, deepSleep: 5100, lightSleep: 13740, remSleep: 6030, totalAsleep: 24870, awake: 2998, latency: 330, wakeups: 6, avgHR: 70.6, minHR: 64, maxHR: 82, hrv: 26.5, spo2: 96.9, breaths: 13.75, tempDelta: 0.09 },
  { date: "2026-02-11", bedtime: "00:28", wakeTime: "08:06", sleepScore: 78, readiness: 84, efficiency: 0.89, deepSleep: 4830, lightSleep: 14130, remSleep: 5640, totalAsleep: 24600, awake: 2896, latency: 600, wakeups: 7, avgHR: 65.4, minHR: 60, maxHR: 74, hrv: 32.8, spo2: 97.3, breaths: 13.5, tempDelta: -0.23 },
  { date: "2026-02-14", bedtime: "23:40", wakeTime: "08:04", sleepScore: 82, readiness: 84, efficiency: 0.89, deepSleep: 5070, lightSleep: 16440, remSleep: 5430, totalAsleep: 26940, awake: 3304, latency: 450, wakeups: 6, avgHR: 65.5, minHR: 59, maxHR: 77, hrv: 32.6, spo2: 95.4, breaths: 13.375, tempDelta: -0.11 },
  { date: "2026-02-15", bedtime: "23:40", wakeTime: "08:05", sleepScore: 85, readiness: 77, efficiency: 0.92, deepSleep: 4830, lightSleep: 14670, remSleep: 8280, totalAsleep: 27780, awake: 2520, latency: 480, wakeups: 7, avgHR: 71.4, minHR: 60, maxHR: 85, hrv: 24.5, spo2: 96.5, breaths: 13.875, tempDelta: 0.06 },
  { date: "2026-02-16", bedtime: "21:48", wakeTime: "07:29", sleepScore: 81, readiness: 80, efficiency: 0.86, deepSleep: 3390, lightSleep: 21690, remSleep: 4740, totalAsleep: 29820, awake: 4993, latency: 210, wakeups: 9, avgHR: 72.4, minHR: 61, maxHR: 84, hrv: 25.1, spo2: 96.7, breaths: 14.375, tempDelta: 0.18 },
  { date: "2026-02-17", bedtime: "22:23", wakeTime: "07:53", sleepScore: 88, readiness: 86, efficiency: 0.86, deepSleep: 4650, lightSleep: 17730, remSleep: 6990, totalAsleep: 29370, awake: 4860, latency: 750, wakeups: 7, avgHR: 66.4, minHR: 57, maxHR: 82, hrv: 32.1, spo2: 95.8, breaths: 13.625, tempDelta: 0.06 },
  { date: "2026-02-18", bedtime: "22:38", wakeTime: "07:34", sleepScore: 89, readiness: 92, efficiency: 0.90, deepSleep: 6300, lightSleep: 16740, remSleep: 5820, totalAsleep: 28860, awake: 3348, latency: 780, wakeups: 6, avgHR: 63.0, minHR: 57, maxHR: 73, hrv: 37.3, spo2: 96.0, breaths: 13.75, tempDelta: 0.02 },
  { date: "2026-02-19", bedtime: "00:50", wakeTime: "07:59", sleepScore: 72, readiness: 76, efficiency: 0.85, deepSleep: 4500, lightSleep: 11970, remSleep: 5310, totalAsleep: 21780, awake: 3987, latency: 1020, wakeups: 3, avgHR: 65.5, minHR: 57, maxHR: 76, hrv: 34.3, spo2: 97.4, breaths: 14.0, tempDelta: 0.12 },
  { date: "2026-02-20", bedtime: "22:59", wakeTime: "09:39", sleepScore: 89, readiness: 90, efficiency: 0.83, deepSleep: 5070, lightSleep: 19110, remSleep: 7800, totalAsleep: 31980, awake: 6402, latency: 1140, wakeups: 7, avgHR: 68.6, minHR: 60, maxHR: 81, hrv: 29.5, spo2: 97.1, breaths: 13.75, tempDelta: 0.0 },
  { date: "2026-02-21", bedtime: "00:50", wakeTime: "08:34", sleepScore: 75, readiness: 81, efficiency: 0.87, deepSleep: 6210, lightSleep: 12960, remSleep: 5130, totalAsleep: 24300, awake: 3512, latency: 420, wakeups: 8, avgHR: 64.5, minHR: 58, maxHR: 71, hrv: 33.7, spo2: 98.1, breaths: 13.5, tempDelta: -0.01 },
  { date: "2026-02-22", bedtime: "02:42", wakeTime: "08:35", sleepScore: 44, readiness: 54, efficiency: 0.66, deepSleep: 3990, lightSleep: 7200, remSleep: 2760, totalAsleep: 13950, awake: 7206, latency: 690, wakeups: 5, avgHR: 77.1, minHR: 72, maxHR: 84, hrv: 16.3, spo2: 96.4, breaths: 13.625, tempDelta: 0.11 },
  { date: "2026-02-23", bedtime: "23:16", wakeTime: "06:08", sleepScore: 79, readiness: 80, efficiency: 0.92, deepSleep: 5370, lightSleep: 12120, remSleep: 5130, totalAsleep: 22620, awake: 2099, latency: 660, wakeups: 7, avgHR: 69.3, minHR: 61, maxHR: 80, hrv: 27.4, spo2: 96.8, breaths: 13.875, tempDelta: 0.12 },
  { date: "2026-02-25", bedtime: "23:17", wakeTime: "05:35", sleepScore: 70, readiness: 72, efficiency: 0.85, deepSleep: 3900, lightSleep: 11220, remSleep: 4080, totalAsleep: 19200, awake: 3501, latency: 660, wakeups: 4, avgHR: 70.9, minHR: 60, maxHR: 83, hrv: 25.9, spo2: 96.1, breaths: 13.875, tempDelta: 0.22 },
  { date: "2026-02-26", bedtime: "22:43", wakeTime: "06:39", sleepScore: 85, readiness: 66, efficiency: 0.90, deepSleep: 5490, lightSleep: 12780, remSleep: 7380, totalAsleep: 25650, awake: 2938, latency: 570, wakeups: 7, avgHR: 79.1, minHR: 68, maxHR: 88, hrv: 16.0, spo2: 97.9, breaths: 14.125, tempDelta: 0.30 },
  { date: "2026-02-27", bedtime: "22:28", wakeTime: "07:09", sleepScore: 87, readiness: 76, efficiency: 0.88, deepSleep: 5340, lightSleep: 15870, remSleep: 6450, totalAsleep: 27660, awake: 3648, latency: 1170, wakeups: 5, avgHR: 68.5, minHR: 55, maxHR: 83, hrv: 25.0, spo2: 96.4, breaths: 13.625, tempDelta: 0.04 },
  { date: "2026-02-28", bedtime: "01:18", wakeTime: "08:35", sleepScore: 68, readiness: 49, efficiency: 0.84, deepSleep: 5610, lightSleep: 13110, remSleep: 3330, totalAsleep: 22050, awake: 4196, latency: 990, wakeups: 5, avgHR: 87.6, minHR: 74, maxHR: 95, hrv: 12.2, spo2: 96.6, breaths: 14.25, tempDelta: 0.07 },
  { date: "2026-03-01", bedtime: "02:30", wakeTime: "09:56", sleepScore: 68, readiness: 57, efficiency: 0.88, deepSleep: 4260, lightSleep: 15210, remSleep: 4140, totalAsleep: 23610, awake: 3150, latency: 1080, wakeups: 7, avgHR: 80.3, minHR: 68, maxHR: 87, hrv: 18.2, spo2: 97.6, breaths: 13.75, tempDelta: 0.04 },
  { date: "2026-03-02", bedtime: "02:16", wakeTime: "10:39", sleepScore: 76, readiness: 64, efficiency: 0.86, deepSleep: 5100, lightSleep: 15000, remSleep: 5880, totalAsleep: 25980, awake: 4188, latency: 1110, wakeups: 8, avgHR: 73.6, minHR: 63, maxHR: 83, hrv: 22.6, spo2: 96.8, breaths: 14.0, tempDelta: 0.0 },
  { date: "2026-03-03", bedtime: "04:05", wakeTime: "11:05", sleepScore: 63, readiness: 53, efficiency: 0.83, deepSleep: 4290, lightSleep: 11250, remSleep: 5430, totalAsleep: 20970, awake: 4252, latency: 240, wakeups: 4, avgHR: 72.5, minHR: 66, maxHR: 78, hrv: 18.8, spo2: 97.8, breaths: 13.625, tempDelta: -0.14 },
  { date: "2026-03-04", bedtime: "00:16", wakeTime: "08:11", sleepScore: 77, readiness: 74, efficiency: 0.83, deepSleep: 5310, lightSleep: 13110, remSleep: 5280, totalAsleep: 23700, awake: 4800, latency: 1110, wakeups: 5, avgHR: 66.8, minHR: 62, maxHR: 72, hrv: 23.4, spo2: 98.2, breaths: 13.75, tempDelta: -0.30 },
  { date: "2026-03-05", bedtime: "01:11", wakeTime: "08:28", sleepScore: 72, readiness: 70, efficiency: 0.88, deepSleep: 5100, lightSleep: 14190, remSleep: 3660, totalAsleep: 22950, awake: 3266, latency: 630, wakeups: 7, avgHR: 69.0, minHR: 62, maxHR: 77, hrv: 23.1, spo2: 95.6, breaths: 13.875, tempDelta: -0.10 },
  { date: "2026-03-06", bedtime: "02:32", wakeTime: "09:09", sleepScore: 65, readiness: 64, efficiency: 0.85, deepSleep: 4890, lightSleep: 10590, remSleep: 4860, totalAsleep: 20340, awake: 3490, latency: 720, wakeups: 6, avgHR: 71.5, minHR: 65, maxHR: 77, hrv: 21.2, spo2: 97.4, breaths: 14.125, tempDelta: -0.10 },
  { date: "2026-03-08", bedtime: "23:39", wakeTime: "08:40", sleepScore: 84, readiness: 71, efficiency: 0.86, deepSleep: 4650, lightSleep: 16500, remSleep: 6690, totalAsleep: 27840, awake: 4563, latency: 1020, wakeups: 6, avgHR: 65.0, minHR: 56, maxHR: 73, hrv: 31.8, spo2: 97.6, breaths: 13.625, tempDelta: -0.19 },
  { date: "2026-03-09", bedtime: "00:07", wakeTime: "07:22", sleepScore: 73, readiness: 74, efficiency: 0.85, deepSleep: 4950, lightSleep: 12300, remSleep: 4920, totalAsleep: 22170, awake: 3924, latency: 1020, wakeups: 6, avgHR: 65.3, minHR: 57, maxHR: 77, hrv: 31.5, spo2: 96.2, breaths: 14.0, tempDelta: -0.15 }
];

// Daily activity data
const ACTIVITY_DATA = [
  { date: "2026-02-10", activityScore: 90, recoveryScore: 77, sleepScore: 77, calories: 2637, netActivity: 330, distance: 4460, steps: 3069, avgHR: 82.5 },
  { date: "2026-02-11", activityScore: 94, recoveryScore: 84, sleepScore: 78, calories: 3087, netActivity: 792, distance: 12163, steps: 8164, avgHR: 103.4 },
  { date: "2026-02-12", activityScore: 93, recoveryScore: null, sleepScore: null, calories: 2857, netActivity: 501, distance: 7624, steps: 9694, avgHR: 101.3 },
  { date: "2026-02-13", activityScore: 83, recoveryScore: null, sleepScore: null, calories: 2594, netActivity: 305, distance: 4346, steps: 3068, avgHR: 88.1 },
  { date: "2026-02-14", activityScore: 86, recoveryScore: 84, sleepScore: 82, calories: 3306, netActivity: 1058, distance: 18826, steps: 15895, avgHR: 99.3 },
  { date: "2026-02-15", activityScore: 87, recoveryScore: 77, sleepScore: 85, calories: 2161, netActivity: 113, distance: 2030, steps: 1549, avgHR: 82.5 },
  { date: "2026-02-16", activityScore: 94, recoveryScore: 80, sleepScore: 81, calories: 3200, netActivity: 1062, distance: 19395, steps: 1161, avgHR: 74.1 },
  { date: "2026-02-17", activityScore: 94, recoveryScore: 86, sleepScore: 88, calories: 2674, netActivity: 437, distance: 6582, steps: 6804, avgHR: 91.8 },
  { date: "2026-02-18", activityScore: 85, recoveryScore: 92, sleepScore: 89, calories: 2826, netActivity: 518, distance: 8009, steps: 8979, avgHR: 93.0 },
  { date: "2026-02-19", activityScore: 85, recoveryScore: 76, sleepScore: 72, calories: 2810, netActivity: 529, distance: 8863, steps: 6887, avgHR: 102.5 },
  { date: "2026-02-20", activityScore: 84, recoveryScore: 90, sleepScore: 89, calories: 2709, netActivity: 409, distance: 5978, steps: 4666, avgHR: 87.7 },
  { date: "2026-02-21", activityScore: 80, recoveryScore: 81, sleepScore: 75, calories: 3006, netActivity: 641, distance: 11185, steps: 10126, avgHR: 95.3 },
  { date: "2026-02-22", activityScore: 81, recoveryScore: 54, sleepScore: 44, calories: 2712, netActivity: 437, distance: 7388, steps: 8185, avgHR: 94.2 },
  { date: "2026-02-23", activityScore: 72, recoveryScore: 80, sleepScore: 79, calories: 2801, netActivity: 410, distance: 4187, steps: 5002, avgHR: 84.9 },
  { date: "2026-02-24", activityScore: 73, recoveryScore: null, sleepScore: null, calories: 2805, netActivity: 435, distance: 5625, steps: 4525, avgHR: 83.3 },
  { date: "2026-02-25", activityScore: 72, recoveryScore: 72, sleepScore: 70, calories: 2857, netActivity: 487, distance: 6430, steps: 6801, avgHR: 92.5 },
  { date: "2026-02-26", activityScore: 71, recoveryScore: 66, sleepScore: 85, calories: 2699, netActivity: 380, distance: 4869, steps: 4354, avgHR: 90.3 },
  { date: "2026-02-27", activityScore: 81, recoveryScore: 76, sleepScore: 87, calories: 3062, netActivity: 669, distance: 10855, steps: 11697, avgHR: 99.6 },
  { date: "2026-02-28", activityScore: 86, recoveryScore: 49, sleepScore: 68, calories: 2978, netActivity: 633, distance: 10042, steps: 9519, avgHR: 101.1 },
  { date: "2026-03-01", activityScore: 83, recoveryScore: 57, sleepScore: 68, calories: 2543, netActivity: 363, distance: 6221, steps: 5183, avgHR: 97.9 },
  { date: "2026-03-02", activityScore: 95, recoveryScore: 67, sleepScore: 76, calories: 2782, netActivity: 532, distance: 8645, steps: 2922, avgHR: 87.9 },
  { date: "2026-03-03", activityScore: 94, recoveryScore: 53, sleepScore: 63, calories: 2545, netActivity: 290, distance: 3595, steps: 3343, avgHR: 83.0 },
  { date: "2026-03-04", activityScore: 93, recoveryScore: 74, sleepScore: 77, calories: 2873, netActivity: 498, distance: 7074, steps: 6560, avgHR: 99.5 },
  { date: "2026-03-05", activityScore: 93, recoveryScore: 70, sleepScore: 72, calories: 2928, netActivity: 517, distance: 6410, steps: 5654, avgHR: 90.8 },
  { date: "2026-03-06", activityScore: 91, recoveryScore: 64, sleepScore: 65, calories: 2782, netActivity: 480, distance: 7634, steps: 7586, avgHR: 102.7 },
  { date: "2026-03-07", activityScore: 90, recoveryScore: null, sleepScore: null, calories: 2193, netActivity: 139, distance: 2566, steps: 52, avgHR: 75.3 },
  { date: "2026-03-08", activityScore: 93, recoveryScore: 71, sleepScore: 84, calories: 2878, netActivity: 635, distance: 10474, steps: 5729, avgHR: 86.9 },
  { date: "2026-03-09", activityScore: 93, recoveryScore: 74, sleepScore: 73, calories: 2984, netActivity: 643, distance: 10028, steps: 12204, avgHR: 102.4 }
];

// Helper functions
function toHours(seconds) { return +(seconds / 3600).toFixed(1); }
function toMinutes(seconds) { return Math.round(seconds / 60); }
function formatTime(timeStr) { 
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
}
function shortDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function dayOfWeek(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

// Computed metrics
function getAverages() {
  const n = SLEEP_DATA.length;
  return {
    avgScore: +(SLEEP_DATA.reduce((s, d) => s + d.sleepScore, 0) / n).toFixed(0),
    avgDuration: +(SLEEP_DATA.reduce((s, d) => s + d.totalAsleep, 0) / n / 3600).toFixed(1),
    avgDeep: +(SLEEP_DATA.reduce((s, d) => s + d.deepSleep, 0) / n / 3600).toFixed(1),
    avgREM: +(SLEEP_DATA.reduce((s, d) => s + d.remSleep, 0) / n / 3600).toFixed(1),
    avgEfficiency: +(SLEEP_DATA.reduce((s, d) => s + d.efficiency, 0) / n * 100).toFixed(0),
    avgHRV: +(SLEEP_DATA.reduce((s, d) => s + d.hrv, 0) / n).toFixed(1),
    avgLatency: +(SLEEP_DATA.reduce((s, d) => s + d.latency, 0) / n / 60).toFixed(0),
    avgWakeups: +(SLEEP_DATA.reduce((s, d) => s + d.wakeups, 0) / n).toFixed(1)
  };
}

// Bedtime consistency
function getBedtimeVariability() {
  const minutes = SLEEP_DATA.map(d => {
    const [h, m] = d.bedtime.split(':').map(Number);
    let mins = h * 60 + m;
    if (mins < 720) mins += 1440; // treat after-midnight as late
    return mins;
  });
  const mean = minutes.reduce((a, b) => a + b, 0) / minutes.length;
  const variance = minutes.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / minutes.length;
  return { 
    stdMinutes: Math.round(Math.sqrt(variance)),
    avgBedtimeMinutes: Math.round(mean),
    avgBedtime: (() => {
      let m = Math.round(mean) % 1440;
      const h = Math.floor(m / 60);
      const min = m % 60;
      return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    })()
  };
}

// Week-over-week comparison
function getWeekComparison() {
  const sorted = [...SLEEP_DATA].sort((a, b) => a.date.localeCompare(b.date));
  const mid = Math.floor(sorted.length / 2);
  const first = sorted.slice(0, mid);
  const second = sorted.slice(mid);
  const avg = (arr, key) => arr.reduce((s, d) => s + d[key], 0) / arr.length;
  return {
    scoreChange: +(avg(second, 'sleepScore') - avg(first, 'sleepScore')).toFixed(1),
    durationChange: +((avg(second, 'totalAsleep') - avg(first, 'totalAsleep')) / 3600).toFixed(1),
    hrvChange: +(avg(second, 'hrv') - avg(first, 'hrv')).toFixed(1),
    efficiencyChange: +((avg(second, 'efficiency') - avg(first, 'efficiency')) * 100).toFixed(1)
  };
}

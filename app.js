let t = null;

function fmt(template, h, m) {
    const mPad = m < 10 ? '0' + m : '' + m;
    const hPart = h > 0 ? h + 'h' : '';
    return template
        .replace('{h}', hPart)
        .replace('{m}', mPad);
}

async function init() {
    const res = await fetch('i18n.json');
    const i18n = await res.json();

    const raw = (navigator.language || 'en').split('-')[0].toLowerCase();
    const lang = i18n[raw] ? raw : 'en';
    t = i18n[lang];

    document.documentElement.lang = lang;
    document.getElementById('peak-slot').textContent = t.peakSlot;
    document.getElementById('good-slot').textContent = t.goodSlot;

    update();
    setInterval(update, 30000);
}

function getStatus(now) {
    const day = now.getDay();
    const h = now.getHours();
    const m = now.getMinutes();
    const totalMin = h * 60 + m;
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
        const nextMon = new Date(now);
        const daysUntilMon = (8 - day) % 7 || 7;
        nextMon.setDate(now.getDate() + daysUntilMon);
        nextMon.setHours(8, 0, 0, 0);
        const diffMs = nextMon - now;
        const diffH = Math.floor(diffMs / 3600000);
        const diffM = Math.floor((diffMs % 3600000) / 60000);
        return {
            mode: 'weekend',
            label: t.weekend.label,
            sub:   t.weekend.sub,
            next:  fmt(t.weekend.next, diffH, diffM)
        };
    }

    const peakStart = 8 * 60;
    const peakEnd   = 14 * 60;

    if (totalMin >= peakStart && totalMin < peakEnd) {
        const remaining = peakEnd - totalMin;
        return {
            mode: 'peak',
            label: t.peak.label,
            sub:   t.peak.sub,
            next:  fmt(t.peak.next, Math.floor(remaining / 60), remaining % 60)
        };
    } else if (totalMin < peakStart) {
        const minUntil = peakStart - totalMin;
        return {
            mode: 'off-peak',
            label: t.offPeak.label,
            sub:   t.offPeak.sub,
            next:  fmt(t.offPeak.nextShort, Math.floor(minUntil / 60), minUntil % 60)
        };
    } else {
        const nextDay = new Date(now);
        nextDay.setDate(now.getDate() + 1);
        nextDay.setHours(8, 0, 0, 0);
        if (nextDay.getDay() === 6) nextDay.setDate(nextDay.getDate() + 2);
        if (nextDay.getDay() === 0) nextDay.setDate(nextDay.getDate() + 1);
        const diffMs = nextDay - now;
        return {
            mode: 'off-peak',
            label: t.offPeak.label,
            sub:   t.offPeak.sub,
            next:  fmt(t.offPeak.nextLong, Math.floor(diffMs / 3600000),
                Math.floor((diffMs % 3600000) / 60000))
        };
    }
}

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function update() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const et = new Date(utc + (-5) * 3600000);

    const status = getStatus(et);
    document.getElementById('banner').className = 'banner ' + status.mode;
    document.getElementById('title').textContent = status.label;
    document.getElementById('subtitle').textContent = status.sub;
    document.getElementById('next-info').textContent = status.next;
    document.getElementById('clock').textContent =
        pad(et.getHours()) + ':' + pad(et.getMinutes()) + ' ET';
}

init();

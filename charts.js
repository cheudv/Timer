(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function widthOf(c) {
    return c.clientWidth || 600;
  }

  function cssVar(name, fb) {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name);
      return (v && v.trim()) || fb;
    } catch (e) { return fb; }
  }

  function fmtVal(v) {
    if (!v || v <= 0) return '0';
    var s = Math.max(1, Math.round(v / 1000));
    var sec = s % 60;
    var m = Math.floor(s / 60);
    var min = m % 60;
    var h = Math.floor(m / 60);
    if (h) return h + '时' + (min ? min + '分' : '');
    return m ? (sec ? m + '分' + sec + '秒' : m + '分') : sec + '秒';
  }

  var AXIS = cssVar('--c-axis', '#3a3270');
  var TXT = cssVar('--c-txt', '#9b90cf');

  function renderBar(container, items, opts) {
    opts = opts || {};
    var color = opts.color || cssVar('--c-bar', '#b8a7ff');
    var highlight = opts.highlight || cssVar('--c-bar-hi', '#8fe6ff');
    var H = opts.height || 230;
    var W = widthOf(container);
    var padT = 20, padR = 6, padB = 30, padL = 6;
    var plotW = W - padL - padR, plotH = H - padT - padB;

    container.innerHTML = '';
    if (!items.length) return;

    var max = 1;
    for (var i = 0; i < items.length; i++) if (items[i].value > max) max = items[i].value;
    var n = items.length;
    var slot = plotW / n;
    var bw = Math.min(slot * 0.56, 46);

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, width: '100%', height: H });
    svg.appendChild(el('line', { x1: padL, y1: H - padB, x2: W - padR, y2: H - padB, stroke: AXIS, 'stroke-width': 1.5 }));

    for (var j = 0; j < n; j++) {
      var it = items[j];
      var x = padL + slot * j + (slot - bw) / 2;
      var h = (it.value / max) * plotH;
      var y = H - padB - h;
      var fill = it.highlight ? highlight : color;

      var r = el('rect', { x: x, y: y, width: bw, height: Math.max(h, 0), rx: 7, fill: fill });
      if (it.value > 0) {
        var t = el('title');
        t.textContent = it.label + ' · ' + fmtVal(it.value);
        r.appendChild(t);
        var lbl = el('text', {
          x: x + bw / 2, y: y - 7, 'text-anchor': 'middle', 'font-size': 11,
          'font-family': 'Space Grotesk, ui-monospace, monospace', fill: TXT, 'font-weight': 500
        });
        lbl.textContent = fmtVal(it.value);
        svg.appendChild(lbl);
      }
      svg.appendChild(r);

      if (n <= 7 || j % 2 === 0 || j === n - 1) {
        var xl = el('text', {
          x: x + bw / 2, y: H - padB + 18, 'text-anchor': 'middle', 'font-size': 11,
          'font-family': 'Space Grotesk, ui-monospace, monospace', fill: TXT
        });
        xl.textContent = it.label;
        svg.appendChild(xl);
      }
    }
    container.appendChild(svg);
  }

  function renderLine(container, items, opts) {
    opts = opts || {};
    var stroke = opts.stroke || cssVar('--c-line', '#8fe6ff');
    var highlight = opts.highlight || cssVar('--c-line-hi', '#6fd2f0');
    var H = opts.height || 230;
    var W = widthOf(container);
    var padT = 20, padR = 14, padB = 30, padL = 8;
    var plotW = W - padL - padR, plotH = H - padT - padB;

    container.innerHTML = '';
    if (!items.length) return;

    var max = 1;
    for (var i = 0; i < items.length; i++) if (items[i].value > max) max = items[i].value;
    var n = items.length;
    var pts = items.map(function (it, i) {
      return {
        x: padL + (n === 1 ? plotW / 2 : (plotW * i) / (n - 1)),
        y: H - padB - (it.value / max) * plotH,
        label: it.label, value: it.value, highlight: it.highlight
      };
    });

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, width: '100%', height: H });
    svg.appendChild(el('line', { x1: padL, y1: H - padB, x2: W - padR, y2: H - padB, stroke: AXIS, 'stroke-width': 1.5 }));

    if (n > 1) {
      var gid = opts.gid || 'lg';
      var grad = el('linearGradient', { id: gid, x1: '0', y1: '0', x2: '0', y2: '1' });
      grad.appendChild(el('stop', { offset: '0%', 'stop-color': stroke, 'stop-opacity': '0.25' }));
      grad.appendChild(el('stop', { offset: '100%', 'stop-color': stroke, 'stop-opacity': '0' }));
      svg.appendChild(grad);

      var d = 'M ' + pts[0].x + ' ' + (H - padB);
      for (var a = 0; a < n; a++) d += ' L ' + pts[a].x + ' ' + pts[a].y;
      d += ' L ' + pts[n - 1].x + ' ' + (H - padB) + ' Z';
      svg.appendChild(el('path', { d: d, fill: 'url(#' + gid + ')' }));

      svg.appendChild(el('polyline', {
        points: pts.map(function (p) { return p.x + ',' + p.y; }).join(' '),
        fill: 'none', stroke: stroke, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      }));
    }

    pts.forEach(function (p, i) {
      var dot = el('circle', { cx: p.x, cy: p.y, r: 3.5, fill: p.highlight ? highlight : stroke });
      var t = el('title');
      t.textContent = p.label + ' · ' + fmtVal(p.value);
      dot.appendChild(t);
      svg.appendChild(dot);

      if (i === n - 1) {
        var lbl = el('text', {
          x: p.x, y: p.y - 9, 'text-anchor': 'middle', 'font-size': 11,
          'font-family': 'Space Grotesk, ui-monospace, monospace', fill: TXT, 'font-weight': 500
        });
        lbl.textContent = fmtVal(p.value);
        svg.appendChild(lbl);
      }
      if (n <= 7 || i % 2 === 0 || i === n - 1) {
        var xl = el('text', {
          x: p.x, y: H - padB + 18, 'text-anchor': 'middle', 'font-size': 11,
          'font-family': 'Space Grotesk, ui-monospace, monospace', fill: TXT
        });
        xl.textContent = p.label;
        svg.appendChild(xl);
      }
    });

    container.appendChild(svg);
  }

  function renderDonut(container, items, opts) {
    opts = opts || {};
    var size = opts.size || 170;
    container.innerHTML = '';

    var total = 0;
    for (var i = 0; i < items.length; i++) total += items[i].value;
    if (total <= 0) {
      var empty = document.createElement('div');
      empty.className = 'donut-empty';
      empty.textContent = '暂无数据';
      container.appendChild(empty);
      return;
    }

    var r = size / 2 - 14, c = 2 * Math.PI * r, cx = size / 2, cy = size / 2;
    var svg = el('svg', { viewBox: '0 0 ' + size + ' ' + size, width: size, height: size });
    svg.appendChild(el('circle', { cx: cx, cy: cy, r: r, fill: 'none', stroke: cssVar('--c-axis', '#2c2460'), 'stroke-width': 16 }));

    var offset = 0;
    items.forEach(function (it) {
      var frac = it.value / total;
      var arc = el('circle', {
        cx: cx, cy: cy, r: r, fill: 'none', stroke: it.color, 'stroke-width': 16,
        'stroke-dasharray': c * frac + ' ' + c, 'stroke-dashoffset': -offset,
        transform: 'rotate(-90 ' + cx + ' ' + cy + ')'
      });
      var t = el('title');
      t.textContent = it.label + ' · ' + fmtVal(it.value) + '（' + Math.round(frac * 100) + '%）';
      arc.appendChild(t);
      svg.appendChild(arc);
      offset += c * frac;
    });
    container.appendChild(svg);

    var center = document.createElement('div');
    center.className = 'donut-center';
    center.innerHTML = '<strong>' + fmtVal(total) + '</strong><span>累计</span>';
    container.appendChild(center);

    var legend = document.createElement('div');
    legend.className = 'chart-donut-legend';
    items.forEach(function (it) {
      var li = document.createElement('span');
      li.innerHTML = '<i style="background:' + it.color + '"></i>' +
        it.label + '<b>' + Math.round((it.value / total) * 100) + '%</b>';
      legend.appendChild(li);
    });
    container.appendChild(legend);
  }

  window.Charts = { bar: renderBar, line: renderLine, donut: renderDonut, fmt: fmtVal };
})();
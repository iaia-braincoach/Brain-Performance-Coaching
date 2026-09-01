/* Brain Performance Coaching — site behaviour */
(function(){
  var DIMS = [{"id":1,"name":"Focus & Attention","color":"#E63946","summary":"Direct and sustain mental concentration on what matters most — under pressure, fatigue and distraction.","detail":"Determines whether you execute your skills with precision from start to finish — or whether external factors, mistakes, or mental noise pull you away from your task."},{"id":2,"name":"Emotional Regulation","color":"#9B7DD4","summary":"Manage emotional responses so they support — rather than sabotage — performance.","detail":"Stay composed when frustration rises, recover quickly after setbacks, and prevent anxiety or anger from hijacking your execution in critical moments."},{"id":3,"name":"Confidence","color":"#E8B84B","summary":"Trust your preparation and capability regardless of opponent, conditions or recent results.","detail":"The difference between competing freely and decisively, and letting doubt, past failures, or comparison limit what you'll attempt."},{"id":4,"name":"Self-Talk","color":"#4A90D9","summary":"Use internal dialogue intentionally to keep yourself focused, composed and moving forward.","detail":"A mind that reinforces execution and resilience under pressure — versus one that spirals into criticism, catastrophizing or chaos when things get difficult."},{"id":5,"name":"Motivation","color":"#F5864B","summary":"Inner drive and commitment, independent of results, validation or rewards.","detail":"Push consistently through adversity, setbacks and the daily grind — rather than letting effort depend on circumstances, mood or others' expectations."},{"id":6,"name":"Self-Awareness","color":"#6B46C1","summary":"Recognise your mental patterns, emotional triggers and performance tendencies accurately.","detail":"Identify exactly what's working or limiting you mentally — rather than performing on autopilot or only seeing the gap in hindsight."},{"id":7,"name":"State Management","color":"#9DC63D","summary":"Deliberately enter and maintain the optimal mental and physical state for performance.","detail":"Compete in the zone consistently — instead of leaving your activation, focus and readiness to feel random, reactive or outside your control."},{"id":8,"name":"Visualisation","color":"#3DB5C4","summary":"Mentally rehearse performance using vivid, multi-sensory imagery.","detail":"Prime movement patterns, simulate pressure scenarios and pre-program responses — turning mental practice into a competitive advantage."}];

  /* ── Mobile menu ── */
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('mobileMenu');
  var close  = document.getElementById('mobileClose');
  function setMenu(open){
    if(!menu) return;
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if(toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if(toggle) toggle.addEventListener('click', function(){ setMenu(!menu.classList.contains('open')); });
  if(close)  close.addEventListener('click', function(){ setMenu(false); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setMenu(false); });

  /* ── 8-Dimension wheel ── */
  var SVGNS = 'http://www.w3.org/2000/svg';
  var cx = 240, cy = 240, rOuter = 142, rInner = 50, rLabel = rOuter + 36, N = DIMS.length;

  function el(tag, attrs){
    var n = document.createElementNS(SVGNS, tag);
    for(var k in attrs){ if(attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]); }
    return n;
  }
  function arcPath(i, r1, r0){
    var a0 = i / N * Math.PI * 2 - Math.PI / 2;
    var a1 = (i + 1) / N * Math.PI * 2 - Math.PI / 2;
    var x0 = cx + r1 * Math.cos(a0), y0 = cy + r1 * Math.sin(a0);
    var x1 = cx + r1 * Math.cos(a1), y1 = cy + r1 * Math.sin(a1);
    var ix0 = cx + r0 * Math.cos(a0), iy0 = cy + r0 * Math.sin(a0);
    var ix1 = cx + r0 * Math.cos(a1), iy1 = cy + r0 * Math.sin(a1);
    return 'M ' + ix0 + ' ' + iy0 + ' L ' + x0 + ' ' + y0
         + ' A ' + r1 + ' ' + r1 + ' 0 0 1 ' + x1 + ' ' + y1
         + ' L ' + ix1 + ' ' + iy1
         + ' A ' + r0 + ' ' + r0 + ' 0 0 0 ' + ix0 + ' ' + iy0 + ' Z';
  }

  function buildWheel(stage, onSelect){
    var svg = el('svg', { viewBox:'0 0 480 480', 'class':'wheel-svg', role:'img', 'aria-label':'The 8-Dimension Method wheel' });

    var defs = el('defs');
    var f = el('filter', { id:'wheelShadow', x:'-20%', y:'-20%', width:'140%', height:'140%' });
    f.appendChild(el('feDropShadow', { dx:'0', dy:'6', stdDeviation:'6', 'flood-opacity':'0.18' }));
    defs.appendChild(f);
    DIMS.forEach(function(d, i){
      var g = el('radialGradient', { id:'slice-' + i, cx:'50%', cy:'50%', r:'80%' });
      g.appendChild(el('stop', { offset:'0%',   'stop-color':d.color, 'stop-opacity':'0.92' }));
      g.appendChild(el('stop', { offset:'100%', 'stop-color':d.color, 'stop-opacity':'1' }));
      defs.appendChild(g);
    });
    svg.appendChild(defs);

    svg.appendChild(el('circle', { cx:cx, cy:cy, r:rOuter + 4, fill:'none', stroke:'var(--line)', 'stroke-width':'1' }));

    var rotor = el('g', { filter:'url(#wheelShadow)', 'class':'wheel-rotor' });
    var slices = [], paths = [];
    DIMS.forEach(function(d, i){
      var g = el('g', { 'class':'wheel-slice-g', tabindex:'0', role:'button', 'aria-label':d.name });
      var p = el('path', { d:arcPath(i, rOuter, rInner), fill:'url(#slice-' + i + ')', 'class':'wheel-slice', stroke:'rgba(255,255,255,0.85)', 'stroke-width':'1.5' });
      g.appendChild(p);
      g.addEventListener('click', function(){ onSelect(i); });
      g.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onSelect(i); } });
      rotor.appendChild(g);
      slices.push(g); paths.push(p);
    });
    svg.appendChild(rotor);

    var labels = [];
    DIMS.forEach(function(d, i){
      var a = (i + 0.5) / N * Math.PI * 2 - Math.PI / 2;
      var x = cx + rLabel * Math.cos(a), y = cy + rLabel * Math.sin(a);
      var cosA = Math.cos(a), anchor = 'middle';
      if(cosA > 0.25) anchor = 'start'; else if(cosA < -0.25) anchor = 'end';
      var g = el('g', { 'class':'wheel-outside-label', style:'cursor:pointer' });
      var tNum = el('text', { x:x, y:y - 6, 'text-anchor':anchor, 'dominant-baseline':'middle',
        style:'font-family:var(--font-mono);font-size:9px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;fill:var(--muted)' });
      tNum.textContent = '0' + (i + 1);
      var tName = el('text', { x:x, y:y + 8, 'text-anchor':anchor, 'dominant-baseline':'middle',
        style:'font-family:var(--font-display);font-size:14px;font-weight:600;letter-spacing:-0.005em;fill:var(--ink)' });
      tName.textContent = d.name;
      g.appendChild(tNum); g.appendChild(tName);
      g.addEventListener('click', function(){ onSelect(i); });
      svg.appendChild(g);
      labels.push({ g:g, num:tNum, name:tName });
    });

    svg.appendChild(el('circle', { cx:cx, cy:cy, r:rInner, fill:'var(--paper)', stroke:'var(--line)', 'stroke-width':'1' }));
    svg.appendChild(el('circle', { cx:cx, cy:cy, r:rInner - 6, fill:'none', stroke:'var(--brand)', 'stroke-width':'0.6', 'stroke-dasharray':'2 3', opacity:'0.5' }));
    var hub = el('text', { x:cx, y:cy - 6, 'text-anchor':'middle', 'dominant-baseline':'middle', fill:'var(--brand)',
      style:'font-family:var(--font-display);font-size:26px;font-weight:700;letter-spacing:-0.02em' });
    hub.textContent = '8D';
    svg.appendChild(hub);
    var hub2 = el('text', { x:cx, y:cy + 14, 'text-anchor':'middle', 'dominant-baseline':'middle', fill:'var(--muted)',
      style:'font-family:var(--font-mono);font-size:8px;letter-spacing:0.22em;text-transform:uppercase' });
    hub2.textContent = 'METHOD';
    svg.appendChild(hub2);

    stage.innerHTML = '';
    stage.appendChild(svg);
    return { slices:slices, paths:paths, labels:labels };
  }

  document.querySelectorAll('[data-wheel]').forEach(function(stage){
    var detail = document.querySelector('[data-wheel-detail]');
    var refs = null, active = parseInt(stage.getAttribute('data-initial') || '0', 10);

    var dot, cap, title, texts, bold = false;
    if(detail){
      dot   = detail.querySelector('.wheel-detail-dot');
      cap   = detail.querySelector('.wheel-detail-cap');
      title = detail.querySelector('.wheel-detail-title');
      texts = detail.querySelectorAll('.wheel-detail-text');
      bold  = !!detail.querySelector('.wheel-detail-text strong');
    }

    function paint(i){
      active = i;
      var d = DIMS[i];
      if(refs){
        refs.paths.forEach(function(p, k){
          p.setAttribute('d', arcPath(k, k === i ? rOuter + 6 : rOuter, rInner));
        });
        refs.slices.forEach(function(g, k){ g.classList.toggle('active', k === i); });
        refs.labels.forEach(function(l, k){
          var on = k === i;
          l.g.classList.toggle('active', on);
          l.num.style.fill  = on ? DIMS[k].color : 'var(--muted)';
          l.name.style.fill = on ? DIMS[k].color : 'var(--ink)';
        });
      }
      if(detail){
        if(dot)   dot.style.background = d.color;
        if(cap)   cap.textContent = 'Dimension 0' + d.id;
        if(title) title.textContent = d.name;
        if(texts && texts.length){
          if(bold){ texts[0].innerHTML = '<strong style="color:var(--ink)"></strong>'; texts[0].firstChild.textContent = d.summary; }
          else { texts[0].textContent = d.summary; }
          if(texts[1]) texts[1].textContent = d.detail;
        }
      }
    }

    refs = buildWheel(stage, paint);

    var m = (location.hash || '').match(/^#dim-(\d+)$/);
    if(m){ var n = parseInt(m[1], 10) - 1; if(n >= 0 && n < N) active = n; }
    paint(active);
  });
})();

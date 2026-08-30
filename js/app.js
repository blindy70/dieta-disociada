// =========================================================================
// DIETA DISOCIADA — Aplicación web
// Módulos: Hoy (seguimiento), Planificar, Lista de la compra, Buscador,
//          Recetas, Mi progreso (peso), Recordatorios, Notas manuscritas
// Persistencia: localStorage (por dispositivo)
// =========================================================================

(function () {
  'use strict';

  var DATA = window.DIETA_DATA;

  // ---------------------------------------------------------------
  // Utilidades de persistencia
  // ---------------------------------------------------------------
  var STORE_KEY = 'dietaDisociada_v1';

  function defaultState() {
    return {
      plan: { fase: 'clasica', semana: 1, dia: 1 },
      done: {},            // "fase-semana-dia-comida" -> true
      compra: {},          // config de generación {fase, semana, alcance}
      compraDone: {},      // item del carrito tachado
      peso: [],            // [{f, w}]
      notificaciones: { enabled: false, tiempos: {} },
      notas: {}            // id -> texto corregido por usuario
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaultState();
      var s = JSON.parse(raw);
      return Object.assign(defaultState(), s);
    } catch (e) {
      return defaultState();
    }
  }

  var state = load();

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('No se pudo guardar', e);
    }
  }

  // ---------------------------------------------------------------
  // Navegación
  // ---------------------------------------------------------------
  var VIEWS = ['hoy', 'plan', 'compra', 'buscador', 'recetas', 'progreso', 'recordatorios', 'notas'];
  var NAV = [
    ['hoy', 'Hoy'],
    ['plan', 'Planificar'],
    ['compra', 'Compra'],
    ['buscador', 'Buscador'],
    ['recetas', 'Recetas'],
    ['progreso', 'Peso'],
    ['recordatorios', 'Avisos'],
    ['notas', 'Notas']
  ];
  var currentView = 'hoy';

  function nav() {
    var el = document.getElementById('main-nav');
    el.innerHTML = '';
    NAV.forEach(function (p) {
      var b = document.createElement('button');
      b.textContent = p[1];
      b.dataset.view = p[0];
      if (p[0] === currentView) b.classList.add('active');
      b.addEventListener('click', function () { showView(p[0]); });
      el.appendChild(b);
    });
  }

  function showView(v) {
    currentView = v;
    VIEWS.forEach(function (id) {
      document.getElementById('view-' + id).hidden = (id !== v);
    });
    nav();
    render(v);
  }

  // ---------------------------------------------------------------
  // Helpers de datos
  // ---------------------------------------------------------------
  function getFase(id) {
    return DATA.fases.find(function (f) { return f.id === id; });
  }

  function getSemana(fase, semanaId) {
    if (!fase.semanas) return null;
    return fase.semanas.find(function (s) { return s.semana === semanaId; }) || fase.semanas[0];
  }

  // Devuelve el "plan del día" activo según state.plan
  function planActivo() {
    var p = state.plan;
    var fase = getFase(p.fase);
    return { fase: fase, semana: p.semana, dia: p.dia };
  }

  function claveComida(fase, semana, dia, comida) {
    return [fase, semana, dia, comida].join('|');
  }

  function isDone(fase, semana, dia, comida) {
    return !!state.done[claveComida(fase, semana, dia, comida)];
  }

  function toggleDone(fase, semana, dia, comida) {
    var k = claveComida(fase, semana, dia, comida);
    if (state.done[k]) delete state.done[k];
    else state.done[k] = true;
    save();
  }

  // ---------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------
  function render(v) {
    switch (v) {
      case 'hoy': renderHoy(); break;
      case 'plan': renderPlan(); break;
      case 'compra': renderCompra(); break;
      case 'buscador': renderBuscador(); break;
      case 'recetas': renderRecetas(); break;
      case 'progreso': renderProgreso(); break;
      case 'recordatorios': renderRecordatorios(); break;
      case 'notas': renderNotas(); break;
    }
  }

  // ---------- VISTA HOY ----------
  function renderHoy() {
    var el = document.getElementById('view-hoy');
    var pa = planActivo();
    var fase = pa.fase;
    var html = '';

    html += '<div class="card">';
    html += '<span class="phase-tag">' + escapeHtml(fase.nombre) + '</span>';
    if (fase.tipo === 'clasica') {
      var sem = getSemana(fase, pa.semana);
      html += ' <span class="phase-tag">Semana ' + pa.semana + '</span>';
      html += '<h2>' + escapeHtml(sem.titulo) + '</h2>';
      if (sem.nota) html += '<p class="hint">' + escapeHtml(sem.nota) + '</p>';
      html += '<p class="hint">Día ' + pa.dia + ' de 7. <a href="#" data-go="plan">Cambiar día/semana</a></p>';
    } else if (fase.tipo === 'desintoxicante') {
      html += '<h2>Día ' + pa.dia + '</h2>';
      html += '<p class="hint">Secuencia de la dieta desintoxicante. <a href="#" data-go="plan">Cambiar día</a></p>';
    } else {
      html += '<h2>Mantenimiento</h2>';
    }
    html += '</div>';

    // Menú del día
    if (fase.tipo === 'clasica') {
      var sem = getSemana(fase, pa.semana);
      var d = pa.dia;
      var slots = [
        ['desayuno', sem.desayunoBase],
        ['mediaManana', sem.mediaMananaBase],
        ['comida', sem.comidas[d - 1]],
        ['merienda', sem.meriendaBase],
        ['cena', sem.cenas[d - 1]]
      ];
      html += menuCard('Menú del día', slots, pa.fase, pa.semana, d);
      if (sem.frutaCenasMezclables) {
        html += '<div class="card"><h3>Frutas para cenas de fruta</h3><p>' + escapeHtml(sem.frutaCenasMezclables) + '</p></div>';
      }
    } else if (fase.tipo === 'desintoxicante') {
      var dia = fase.dias.find(function (x) { return x.n === pa.dia; }) || fase.dias[0];
      var dslots = [
        ['desayuno', dia.desayuno],
        ['mediaManana', dia.mediaManana],
        ['comida', dia.comida],
        ['merienda', dia.merienda],
        ['cena', dia.cena]
      ].filter(function (s) { return s[1]; });
      html += menuCard('Menú del día', dslots, pa.fase, 0, dia.n);
      if (dia.alternativas_comida) {
        html += alternativasCard(dia.alternativas_comida, pa.fase, 0, dia.n, 'comida');
      }
    } else {
      var m = fase;
      html += '<div class="card"><h2>Reglas de la dieta disociada</h2><ol>';
      m.reglas.forEach(function (r) { html += '<li>' + escapeHtml(r) + '</li>'; });
      html += '</ol></div>';
      html += gruposCard(m.grupos);
    }

    el.innerHTML = html;
    bindMenuActions(el);
  }

  function menuCard(title, slots, fase, semana, dia) {
    var html = '<div class="card"><h2>' + escapeHtml(title) + '</h2>';
    slots.forEach(function (s) {
      if (!s[1]) return;
      var comida = s[0];
      var done = isDone(fase, semana, dia, comida);
      html += '<div class="menu-item">';
      html += '<div class="menu-time">' + escapeHtml(comidaCuenta(comida)) + '</div>';
      html += '<label class="flex-row"><input type="checkbox" data-done="' + fase + '|' + semana + '|' + dia + '|' + comida + '"' + (done ? ' checked' : '') + '>';
      html += '<span class="menu-text' + (done ? ' done' : '') + '">' + escapeHtml(s[1]) + '</span></label>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  }

  function alternativasCard(alts, fase, semana, dia, comida) {
    var html = '<div class="card"><h2>Opciones alternativas</h2><p class="hint">Puedes elegir entre:</p><ul>';
    alts.forEach(function (a) {
      html += '<li>' + escapeHtml(a) + '</li>';
    });
    html += '</ul></div>';
    return html;
  }

  function comidaCuenta(k) {
    var map = {
      desayuno: 'Desayuno',
      mediaManana: 'Media mañana',
      comida: 'Comida',
      merienda: 'Merienda',
      cena: 'Cena'
    };
    return map[k] || k;
  }

  function gruposCard(g) {
    var html = '<div class="card"><h2>Grupos de alimentos</h2><div class="grid-2">';
    html += '<div><h3>Hidratos de carbono</h3><ul>';
    g.hidratos.forEach(function (x) { html += '<li>' + escapeHtml(x) + '</li>'; });
    html += '</ul></div>';
    html += '<div><h3>Proteínas</h3><ul>';
    g.proteinas.forEach(function (x) { html += '<li>' + escapeHtml(x) + '</li>'; });
    html += '</ul></div>';
    html += '<div><h3>Verduras crudas</h3><ul>';
    g.verdurasCrudas.forEach(function (x) { html += '<li>' + escapeHtml(x) + '</li>'; });
    html += '</ul></div>';
    html += '<div><h3>Verduras cocinadas</h3><ul>';
    g.verdurasCocinadas.forEach(function (x) { html += '<li>' + escapeHtml(x) + '</li>'; });
    html += '</ul></div>';
    html += '</div></div>';
    return html;
  }

  // ---------- VISTA PLANIFICAR ----------
  function renderPlan() {
    var el = document.getElementById('view-plan');
    var html = '<div class="card"><h2>Planificar</h2>';
    html += '<div class="field"><label>Fase</label><select id="plan-fase">';
    DATA.fases.forEach(function (f) {
      html += '<option value="' + f.id + '"' + (f.id === state.plan.fase ? ' selected' : '') + '>' + escapeHtml(f.nombre) + '</option>';
    });
    html += '</select></div>';

    var fase = getFase(state.plan.fase);
    if (fase.tipo === 'clasica') {
      html += '<div class="field"><label>Semana</label><select id="plan-semana">';
      fase.semanas.forEach(function (s) {
        html += '<option value="' + s.semana + '"' + (s.semana === state.plan.semana ? ' selected' : '') + '>' + escapeHtml(s.titulo) + '</option>';
      });
      html += '</select></div>';
      html += '<div class="field"><label>Día (1-7)</label><select id="plan-dia">';
      for (var i = 1; i <= 7; i++) {
        html += '<option value="' + i + '"' + (i === state.plan.dia ? ' selected' : '') + '>' + i + '</option>';
      }
      html += '</select></div>';
    } else if (fase.tipo === 'desintoxicante') {
      html += '<div class="field"><label>Día (1-7)</label><select id="plan-dia">';
      for (var j = 1; j <= 7; j++) {
        html += '<option value="' + j + '"' + (j === state.plan.dia ? ' selected' : '') + '>' + j + '</option>';
      }
      html += '</select></div>';
    }

    html += '<button class="btn" id="plan-guardar">Guardar planificación</button>';
    html += ' <span id="plan-msg" class="success-msg"></span>';
    html += '</div>';

    if (fase.detalle) {
      html += '<div class="card"><p class="hint">' + escapeHtml(fase.detalle) + '</p></div>';
    }
    html += '<div class="card"><h2>Vista previa</h2><div id="plan-preview"></div></div>';

    el.innerHTML = html;

    // Preview
    function updatePreview() {
      var fid = document.getElementById('plan-fase').value;
      var f = getFase(fid);
      var pv = document.getElementById('plan-preview');
      if (f.tipo === 'clasica') {
        var semId = parseInt(document.getElementById('plan-semana').value, 10);
        var dayId = parseInt(document.getElementById('plan-dia').value, 10);
        var sem = getSemana(f, semId);
        pv.innerHTML = menuCard('Día ' + dayId + ' — ' + escapeHtml(sem.titulo) + ' (sin marcar)', [
          ['desayuno', sem.desayunoBase],
          ['mediaManana', sem.mediaMananaBase],
          ['comida', sem.comidas[dayId - 1]],
          ['merienda', sem.meriendaBase],
          ['cena', sem.cenas[dayId - 1]]
        ], fid, semId, dayId);
      } else if (f.tipo === 'desintoxicante') {
        var dd = parseInt(document.getElementById('plan-dia').value, 10);
        var d = f.dias.find(function (x) { return x.n === dd; }) || f.dias[0];
        pv.innerHTML = menuCard('Día ' + d.n, [
          ['desayuno', d.desayuno],
          ['mediaManana', d.mediaManana],
          ['comida', d.comida],
          ['merienda', d.merienda],
          ['cena', d.cena]
        ].filter(function (s) { return s[1]; }), fid, 0, d.n);
      } else {
        pv.innerHTML = '<p class="hint">Mantenimiento: revisa reglas y grupos en la vista Hoy.</p>';
      }
      bindMenuActions(pv);
    }

    ['plan-fase', 'plan-semana', 'plan-dia'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) s.addEventListener('change', updatePreview);
    });
    updatePreview();

    document.getElementById('plan-guardar').addEventListener('click', function () {
      var fid = document.getElementById('plan-fase').value;
      state.plan.fase = fid;
      var f = getFase(fid);
      if (f.tipo === 'clasica') {
        state.plan.semana = parseInt(document.getElementById('plan-semana').value, 10);
        state.plan.dia = parseInt(document.getElementById('plan-dia').value, 10);
      } else if (f.tipo === 'desintoxicante') {
        state.plan.dia = parseInt(document.getElementById('plan-dia').value, 10);
      }
      save();
      document.getElementById('plan-msg').textContent = 'Planificación guardada.';
      setTimeout(function () { showView('hoy'); }, 600);
    });
  }

  // ---------- VISTA COMPRA ----------
  function parseIngredientes(texto) {
    if (!texto) return [];
    // separación por comas, puntos y "y" — lo más simple posible
    var tokens = texto
      .replace(/\b\d+\s*(g|gr|kg|ml|unidades?|piezas?|tarrinas?)\b/gi, '')
      .split(/[.,;()]+/)
      .map(function (t) { return t.trim().toLowerCase(); })
      .filter(function (t) { return t.length >= 3; });
    return tokens;
  }

  function textosDelPlan(pa) {
    var fase = pa.fase;
    var textos = [];
    if (fase.tipo === 'clasica') {
      var s = getSemana(fase, pa.semana != null ? pa.semana : state.plan.semana);
      var d = pa.dia || 1;
      textos.push(s.desayunoBase, s.mediaMananaBase, s.comidas[d - 1], s.meriendaBase, s.cenas[d - 1]);
    } else if (fase.tipo === 'desintoxicante') {
      var d2 = fase.dias.find(function (x) { return x.n === (pa.dia || 1); }) || fase.dias[0];
      textos.push(d2.desayuno, d2.mediaManana, d2.comida, d2.merienda, d2.cena);
    }
    return textos.filter(Boolean);
  }

  function renderCompra() {
    var el = document.getElementById('view-compra');
    var html = '<div class="card"><h2>Lista de la compra</h2>';
    html += '<div class="field"><label>Generar para</label><select id="compra-fase">';
    DATA.fases.forEach(function (f) {
      html += '<option value="' + f.id + '"' + (f.id === state.plan.fase ? ' selected' : '') + '>' + escapeHtml(f.nombre) + '</option>';
    });
    html += '</select></div>';

    var fase = getFase(state.plan.fase);
    if (fase.tipo === 'clasica') {
      html += '<div class="field"><label>Semana</label><select id="compra-semana">';
      fase.semanas.forEach(function (s) {
        html += '<option value="' + s.semana + '"' + (s.semana === state.plan.semana ? ' selected' : '') + '>' + escapeHtml(s.titulo) + '</option>';
      });
      html += '</select></div>';
      html += '<div class="field"><label>Días a incluir</label><select id="compra-dias"><option value="dia">Un solo día</option><option value="semana" selected>Toda la semana</option></select></div>';
    } else if (fase.tipo === 'desintoxicante') {
      html += '<div class="field"><label>Días a incluir</label><select id="compra-dias-des"><option value="dia" selected>Un solo día</option><option value="ciclo">Ciclo completo (7 días)</option></select></div>';
    }

    html += '<button class="btn" id="compra-generar">Generar lista</button>';
    html += '<button class="btn secondary" id="compra-limpiar">Vaciar</button>';
    html += '</div>';
    html += '<div class="card"><div id="compra-result"></div></div>';

    el.innerHTML = html;

    var faseSel = document.getElementById('compra-fase');
    faseSel.addEventListener('change', function () {
      // cambio simple de fase: recargamos vista compra
      renderCompra();
    });

    document.getElementById('compra-generar').addEventListener('click', generarLista);
    document.getElementById('compra-limpiar').addEventListener('click', function () {
      state.compra = {};
      state.compraDone = {};
      save();
      renderCompra();
    });
  }

  function generarLista() {
    var fid = document.getElementById('compra-fase').value;
    var fase = getFase(fid);

    // Recolectar textos según selección
    var pa = { fase: fase };
    if (fase.tipo === 'clasica') {
      var semId = parseInt(document.getElementById('compra-semana').value, 10);
      var alcance = document.getElementById('compra-dias').value;
      pa.semana = semId;
      if (alcance === 'semana') {
        var textos = [];
        for (var dd = 1; dd <= 7; dd++) {
          pa.dia = dd;
          textos = textos.concat(textosDelPlan(pa));
        }
        pa.dias = 1 + ' - semana completa';
        pa.textos = textos;
      } else {
        pa.dia = state.plan.dia || 1;
        pa.textos = textosDelPlan(pa);
        pa.dias = 'día ' + pa.dia;
      }
    } else if (fase.tipo === 'desintoxicante') {
      var alc = document.getElementById('compra-dias-des').value;
      if (alc === 'ciclo') {
        var textos2 = [];
        for (var cc = 1; cc <= 7; cc++) {
          pa.dia = cc;
          textos2 = textos2.concat(textosDelPlan(pa));
        }
        pa.dias = 'ciclo completo';
        pa.textos = textos2;
      } else {
        pa.dia = state.plan.dia || 1;
        pa.textos = textosDelPlan(pa);
        pa.dias = 'día ' + pa.dia;
      }
    } else {
      pa.dias = 'mantenimiento';
      pa.textos = [];
    }

    // Generar items únicos
    var items = {};
    pa.textos.forEach(function (t) {
      parseIngredientes(t).forEach(function (ing) {
        if (!items[ing]) items[ing] = 0;
        items[ing]++;
      });
    });

    state.compra = { fase: fid, dias: pa.dias, items: items };
    save();
    pintarCompra(items);
  }

  function pintarCompra(items) {
    var cont = document.getElementById('compra-result');
    var html = '<h2>Lista generada (' + escapeHtml(String(state.compra.dias || '')) + ')</h2>';
    var keys = Object.keys(items || {});
    if (!keys.length) {
      html += '<p class="hint">No se pudieron extraer ingredientes automáticamente. Revisa la semana desde la vista Planificar.</p>';
      cont.innerHTML = html;
      return;
    }
    keys.sort().forEach(function (k) {
      var done = !!state.compraDone[k];
      html += '<div class="checklist-item' + (done ? ' checked' : '') + '">';
      html += '<input type="checkbox" data-item="' + escapeAttr(k) + '"' + (done ? ' checked' : '') + '>';
      html += '<span>' + escapeHtml(k) + '</span>';
      html += '</div>';
    });
    html += '<p class="hint">Marca los ingredientes a medida que los compras. La lista se guarda en este dispositivo.</p>';
    cont.innerHTML = html;
    Array.prototype.forEach.call(cont.querySelectorAll('[data-item]'), function (cb) {
      cb.addEventListener('change', function () {
        var k = cb.dataset.item;
        if (cb.checked) state.compraDone[k] = true;
        else delete state.compraDone[k];
        save();
        var li = cb.closest('.checklist-item');
        if (li) li.classList.toggle('checked', cb.checked);
      });
    });
  }

  // ---------- VISTA BUSCADOR ----------
  function renderBuscador() {
    var el = document.getElementById('view-buscador');
    var html = '<div class="card"><h2>Buscador de alimentos</h2>';
    html += '<input type="text" id="busq-input" placeholder="Escribe un alimento o ingrediente (p.ej. arroz, pollo, piña...)">';
    html += '<p class="hint" style="margin-top:6px">Te dirá si es hidrato, proteína, verdura o fruta y si está permitido.</p>';
    html += '</div>';
    html += '<div class="card"><div id="busq-result"><p class="hint">Empieza a escribir para buscar.</p></div></div>';
    el.innerHTML = html;

    var input = document.getElementById('busq-input');
    input.addEventListener('input', function () {
      buscarAlimentos(input.value);
    });
    input.focus();
  }

  function buscarAlimentos(q) {
    var cont = document.getElementById('busq-result');
    q = (q || '').trim().toLowerCase();
    if (!q) { cont.innerHTML = '<p class="hint">Empieza a escribir para buscar.</p>'; return; }
    var res = DATA.alimentos.filter(function (a) {
      return a.n.toLowerCase().indexOf(q) !== -1 ||
        (a.t.toLowerCase().indexOf(q) !== -1) ||
        (a.t === 'hidrato' && 'hidratos'.indexOf(q) !== -1) ||
        (a.t === 'proteina' && ('proteinas'.indexOf(q) !== -1 || 'proteina'.indexOf(q) !== -1));
    }).slice(0, 40);

    if (!res.length) {
      cont.innerHTML = '<p class="hint">Sin resultados para "' + escapeHtml(q) + '".</p>';
      return;
    }
    var html = '';
    res.forEach(function (a) {
      var tipoLabel = a.t === 'hidrato' ? 'Hidrato' : a.t === 'proteina' ? 'Proteína' : a.t === 'verdura' ? 'Verdura' : 'Fruta';
      var badge = a.t === 'hidrato' ? 'hidrato' : a.t === 'proteina' ? 'proteina' : a.t === 'verdura' ? 'verdura' : 'fruta';
      html += '<div class="search-result">';
      html += '<div><strong>' + escapeHtml(a.n) + '</strong>';
      if (a.det) html += '<div class="cat">' + escapeHtml(a.det) + '</div>';
      html += '</div>';
      html += '<span class="badge ' + badge + '">' + tipoLabel + '</span>';
      html += '</div>';
    });
    cont.innerHTML = html;
  }

  // ---------- VISTA RECETAS ----------
  function renderRecetas() {
    var el = document.getElementById('view-recetas');
    var html = '<div class="card"><h2>Recetas e instrucciones</h2>';
    html += '<p class="hint">Detalle de preparación extraído de los PDFs.</p></div>';
    DATA.recetas.forEach(function (r) {
      html += '<div class="card"><h3>' + escapeHtml(r.n) + '</h3><div class="receta">' + escapeHtml(r.t) + '</div></div>';
    });
    el.innerHTML = html;
  }

  // ---------- VISTA PROGRESO (peso) ----------
  function renderProgreso() {
    var el = document.getElementById('view-progreso');
    var html = '<div class="card"><h2>Mi progreso de peso</h2>';
    html += '<div class="field"><label>Peso (kg)</label><input type="number" id="peso-input" step="0.1" min="20" max="300" placeholder="Ej: 75.5"></div>';
    html += '<button class="btn" id="peso-guardar">Registrar peso</button> <span id="peso-msg"></span>';
    html += '</div>';
    html += '<div class="card"><h2>Evolución</h2><canvas id="weightChart"></canvas></div>';
    html += '<div class="card"><div id="peso-lista"></div></div>';
    el.innerHTML = html;

    document.getElementById('peso-guardar').addEventListener('click', function () {
      var v = parseFloat(document.getElementById('peso-input').value);
      if (!v || isNaN(v)) { document.getElementById('peso-msg').textContent = 'Introduce un peso válido.'; return; }
      var hoy = new Date().toISOString().slice(0, 10);
      state.peso.push({ f: hoy, w: v });
      state.peso.sort(function (a, b) { return a.f < b.f ? -1 : 1; });
      save();
      document.getElementById('peso-input').value = '';
      renderProgreso();
    });

    // Lista
    var lista = document.getElementById('peso-lista');
    if (!state.peso.length) {
      lista.innerHTML = '<p class="hint">Aún no hay registros.</p>';
    } else {
      var lh = '<h3>Historial</h3>';
      state.peso.slice().reverse().forEach(function (p) {
        lh += '<div class="weight-row"><span>' + escapeHtml(p.f) + '</span><strong>' + parseFloat(p.w).toFixed(1) + ' kg</strong></div>';
      });
      lista.innerHTML = lh;
    }

    dibujarGrafico();
  }

  function dibujarGrafico() {
    var cv = document.getElementById('weightChart');
    if (!cv) return;
    var pts = state.peso;
    var ctx = cv.getContext && cv.getContext('2d');
    if (!ctx) return;
    if (!pts.length) { 
      // Mostrar mensaje vacío
      ctx.clearRect(0, 0, cv.width, cv.height);
      return;
    }
    var W = cv.width = cv.offsetWidth || 800;
    var H = cv.height = 260;
    ctx.clearRect(0, 0, W, H);

    var pad = 40;
    var ws = pts.map(function (p) { return p.w; });
    var min = Math.min.apply(null, ws) - 1;
    var max = Math.max.apply(null, ws) + 1;

    function x(i) { return pad + (i * (W - 2 * pad) / Math.max(1, pts.length - 1)); }
    function y(w) { return H - pad - ((w - min) / (max - min)) * (H - 2 * pad); }

    // ejes
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();
    ctx.moveTo(pad, 0); ctx.lineTo(pad, H - pad);
    ctx.moveTo(pad, H - pad); ctx.lineTo(W - pad, H - pad);
    ctx.stroke();

    // línea
    ctx.strokeStyle = '#4a7c59';
    ctx.lineWidth = 2;
    ctx.beginPath();
    pts.forEach(function (p, i) {
      var px = x(i), py = y(p.w);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // puntos + etiquetas
    pts.forEach(function (p, i) {
      var px = x(i), py = y(p.w);
      ctx.fillStyle = '#4a7c59';
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#666';
      ctx.font = '11px sans-serif';
      ctx.fillText(p.w.toFixed(1), px + 4, py - 4);
      ctx.fillText(p.f.slice(5), px - 10, H - pad + 16);
    });
  }

  // ---------- VISTA RECORDATORIOS ----------
  function renderRecordatorios() {
    var el = document.getElementById('view-recordatorios');
    var be = state.notificaciones.enabled;
    var html = '<div class="card"><h2>Alertas y recordatorios</h2>';
    html += '<p class="hint">Se usa la API de notificaciones del navegador. Los avisos solo funcionan con la app abierta.</p>';
    html += '<div class="field"><label class="flex-row"><input type="checkbox" id="notif-enable"' + (be ? ' checked' : '') + '> Activar notificaciones</label></div>';
    ['desayuno', 'comida', 'cena'].forEach(function (k) {
      var hora = state.notificaciones.tiempos[k] || (k === 'desayuno' ? '09:00' : k === 'comida' ? '14:00' : '21:00');
      html += '<div class="field"><label>Hora de ' + escapeHtml(comidaCuenta(k)) + '</label><input type="time" id="notif-' + k + '" value="' + hora + '"></div>';
    });
    html += '<button class="btn" id="notif-guardar">Guardar avisos</button> <span id="notif-msg"></span>';
    html += '</div>';
    el.innerHTML = html;

    document.getElementById('notif-enable').addEventListener('change', function (e) {
      state.notificaciones.enabled = e.target.checked;
      save();
      if (e.target.checked) solicitarPermisoNotificacion();
    });

    document.getElementById('notif-guardar').addEventListener('click', function () {
      ['desayuno', 'comida', 'cena'].forEach(function (k) {
        var inp = document.getElementById('notif-' + k);
        if (inp) state.notificaciones.tiempos[k] = inp.value;
      });
      save();
      document.getElementById('notif-msg').textContent = 'Avisos guardados.';
    });
  }

  function solicitarPermisoNotificacion() {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta notificaciones.');
      state.notificaciones.enabled = false;
      save();
      return;
    }
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(function (perm) {
        if (perm !== 'granted') {
          state.notificaciones.enabled = false;
          save();
        }
      });
    }
  }

  // Comprobar recordatorios (se llama cada minuto si la app está abierta)
  function checkRecordatorios() {
    if (!state.notificaciones.enabled || !('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;
    var now = new Date();
    var hm = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    var lastKey = 'lastNotif_' + hm + '_' + now.getDate();
    if (sessionStorage.getItem(lastKey)) return;
    var t = state.notificaciones.tiempos;
    if (hm === (t.desayuno || '09:00')) { notificar('Desayuno', 'Es hora del desayuno'); }
    else if (hm === (t.comida || '14:00')) { notificar('Comida', 'Es hora de la comida'); }
    else if (hm === (t.cena || '21:00')) { notificar('Cena', 'Es hora de la cena'); }
    if (hm === (t.desayuno || '09:00') || hm === (t.comida || '14:00') || hm === (t.cena || '21:00')) {
      sessionStorage.setItem(lastKey, '1');
    }
  }

  function notificar(titulo, cuerpo) {
    try {
      new Notification(titulo, { body: cuerpo });
    } catch (e) {
      /* sin soporte */
    }
  }

  // ---------- VISTA NOTAS MANUSCRITAS ----------
  function renderNotas() {
    var el = document.getElementById('view-notas');
    var html = '<div class="card"><h2>Notas manuscritas de los PDFs</h2>';
    html += '<p class="hint">Estas anotaciones escritas a mano aparecen en los PDFs. El OCR no las transcribe con fiabilidad; corrígelas tú a mano aquí si quieres conservarlas. Los cambios se guardan en este dispositivo.</p></div>';
    DATA.notas.forEach(function (nota) {
      var id = nota.origen + '-' + nota.pag;
      var texto = state.notas[id] !== undefined ? state.notas[id] : nota.texto;
      html += '<div class="nota"><div class="src">' + escapeHtml(nota.origen) + ' — página ' + nota.pag + '</div>';
      html += '<textarea id="nota-' + id + '" rows="2">' + escapeHtml(texto) + '</textarea>';
      html += '</div>';
    });
    html += '<button class="btn" id="notas-guardar">Guardar correcciones</button> <span id="notas-msg"></span>';
    html += '<div class="card"><h3>Aviso</h3><p class="hint">La página 2 del PDF de Mantenimiento es casi totalmente manuscrita e ilegible por OCR. No se pudo transcribir de forma fiable.</p></div>';
    el.innerHTML = html;

    document.getElementById('notas-guardar').addEventListener('click', function () {
      DATA.notas.forEach(function (nota) {
        var id = nota.origen + '-' + nota.pag;
        var ta = document.getElementById('nota-' + id);
        if (ta) state.notas[id] = ta.value;
      });
      save();
      document.getElementById('notas-msg').textContent = 'Notas guardadas.';
    });
  }

  // ---------- Acciones globales de menús (checkboxes de "hecho") ----------
  function bindMenuActions(root) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-done]'), function (cb) {
      cb.addEventListener('change', function () {
        var parts = cb.dataset.done.split('|');
        toggleDone(parts[0], parseInt(parts[1], 10), parseInt(parts[2], 10), parts[3]);
        // reflejar tachado
        var label = cb.closest('label');
        var span = label ? label.querySelector('.menu-text') : null;
        if (span) span.classList.toggle('done', cb.checked);
      });
    });
    Array.prototype.forEach.call(root.querySelectorAll('[data-go]'), function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        showView(a.dataset.go);
      });
    });
  }

  // ---------------------------------------------------------------
  // Escape de HTML
  // ---------------------------------------------------------------
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  // ---------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------
  function init() {
    nav();
    showView('hoy');
    setInterval(checkRecordatorios, 30000);
  }

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // ya cargado
    setTimeout(init, 0);
  }
})();

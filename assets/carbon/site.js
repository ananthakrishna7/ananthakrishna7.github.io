const themeButton = document.querySelector('[data-theme-toggle]');
if (themeButton) {
  const root = document.documentElement;
  const isLight = () => root.dataset.theme === 'light';
  function updateThemeLabel() {
    const label = isLight() ? themeButton.dataset.labelDark : themeButton.dataset.labelLight;
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
  }
  updateThemeLabel();
  themeButton.hidden = false;

  themeButton.addEventListener('click', () => {
    const theme = isLight() ? 'dark' : 'light';
    root.dataset.theme = theme;
    updateThemeLabel();
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // The current page still switches when storage is unavailable.
    }
  });
}

const japanese = document.documentElement.lang === 'ja';
const copy = japanese ? {
  count: (n, blog) => blog ? `${n} 件の記事` : `${n} 件のリポジトリ`,
  noMatches: '条件に一致する記事はありません。',
  empty: '記事が公開されると、ここにグラフが表示されます。',
  note: '記事同士と、本文で参照している外部ページを線で結びます。',
  posts: '記事',
  references: '外部リンク',
  noReferences: '外部リンクはありません。',
} : {
  count: (n, blog) => `${n} ${blog ? (n === 1 ? 'post' : 'posts') : (n === 1 ? 'repository' : 'repositories')}`,
  noMatches: 'No posts match these filters.',
  empty: 'The graph will appear when there are published posts.',
  note: 'Lines connect posts to the other posts and external pages they link to.',
  posts: 'Posts',
  references: 'External references',
  noReferences: 'No external links for these posts.',
};

function drawField(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const orb = canvas.dataset.field === 'orb';
  const { width, height } = canvas;
  const scale = orb ? 215 : 130;
  const project = ([x, y, z]) => {
    const tiltedY = y * 0.86 - z * 0.51;
    const depth = y * 0.51 + z * 0.86;
    const perspective = 1 + depth * 0.15;
    return [
      width / 2 + scale * (x * 0.94 - tiltedY * 0.34) * perspective,
      height / 2 + scale * (x * 0.34 + tiltedY * 0.94) * perspective,
      depth,
    ];
  };

  function stroke(points, color, lineWidth = 1) {
    ctx.beginPath();
    points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  if (orb) {
    for (let ring = 0; ring < 32; ring++) {
      const latitude = Math.PI * (ring + 1) / 33;
      const points = Array.from({ length: 144 }, (_, step) => {
        const angle = step * 2 * Math.PI / 144;
        const ripple = 1 + 0.12 * Math.sin(5 * angle + 7 * latitude) + 0.055 * Math.sin(11 * angle - 8 * latitude);
        return project([
          ripple * Math.sin(latitude) * Math.cos(angle),
          ripple * Math.sin(latitude) * Math.sin(angle),
          ripple * Math.cos(latitude),
        ]);
      });
      points.forEach(([x, y, depth], index) => {
        const front = depth > 0;
        const alpha = front ? 0.35 + depth * 0.42 : 0.13;
        ctx.fillStyle = index % 7 === 0 ? `rgba(190,149,255,${alpha})` : `rgba(102,183,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, front ? 1.25 : .85, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    const orbits = [
      [0.94, 0.29, -0.47],
      [1.16, 0.37, 0.37],
      [1.37, 0.48, -0.47],
    ];
    orbits.forEach(([radius, squash, angle], index) => {
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, scale * radius, scale * squash, angle, 0, 2 * Math.PI);
      ctx.strokeStyle = index === 1 ? '#be95ff58' : '#78a9ff77';
      ctx.stroke();
    });
    const nodes = [[0.59, 0.24], [0.84, 0.31], [0.26, 0.59], [0.64, 0.73]];
    for (const [u, v] of nodes) {
      const x = u * width;
      const y = v * height;
      ctx.strokeStyle = '#8fcaff';
      ctx.strokeRect(x - 4, y - 4, 8, 8);
      stroke([[x + 6, y], [x + 23, y], [x + 32, y - 9], [x + 56, y - 9]], '#78a9ff75');
    }
    return;
  }

  function surface(u, v) {
    const x = (u - 0.5) * 2.7;
    const y = (v - 0.5) * 2.7;
    return project([x, y, 0.36 * Math.cos(6 * Math.hypot(x, y)) * Math.exp(-0.5 * (x * x + y * y))]);
  }
  for (let line = 0; line <= 27; line++) {
    const steps = Array.from({ length: 51 }, (_, step) => step / 50);
    stroke(steps.map(v => surface(line / 27, v)), '#82cfff8c');
    stroke(steps.map(u => surface(u, line / 27)), '#be95ff6b');
  }
}

function renderGraph(target, entries, allEntries) {
  target.replaceChildren();
  const visible = new Set(entries);
  const normalized = url => url.pathname.replace(/\/(?:index\.html)?$/, '');
  const byPath = new Map(allEntries.map(entry => [normalized(new URL(entry.link.href)), entry]));
  const references = new Map();
  const connections = new Map();

  for (const entry of entries) {
    const origin = new URL(entry.link.href);
    const edges = new Set();
    for (const ref of entry.refs) {
      let url;
      try {
        url = new URL(ref, origin);
      } catch {
        continue;
      }
      if (!['http:', 'https:'].includes(url.protocol)) continue;

      if (url.origin === origin.origin) {
        const other = byPath.get(normalized(url));
        if (other !== entry && visible.has(other)) edges.add(other);
      } else {
        url.hash = '';
        if (!references.has(url.href)) references.set(url.href, { url });
        edges.add(references.get(url.href));
      }
    }
    connections.set(entry, edges);
  }

  const note = document.createElement('p');
  note.className = 'graph-note';
  note.textContent = entries.length ? copy.note : (allEntries.length ? copy.noMatches : copy.empty);
  target.append(note);
  if (!entries.length) return;

  const stage = document.createElement('div');
  stage.className = 'graph-stage';
  target.append(stage);
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  stage.append(canvas);
  const nodeElements = new Map();
  const postColumn = document.createElement('div');
  const referenceColumn = document.createElement('div');

  function addColumn(column, title) {
    column.className = 'graph-column';
    const heading = document.createElement('h3');
    heading.className = 'eyebrow';
    heading.textContent = title;
    column.append(heading);
    stage.append(column);
  }

  function addNode(column, model, label, href, external) {
    const link = document.createElement('a');
    link.className = external ? 'graph-node external' : 'graph-node';
    link.href = href;
    link.textContent = label;
    column.append(link);
    nodeElements.set(model, link);
  }

  addColumn(postColumn, copy.posts);
  addColumn(referenceColumn, copy.references);
  entries.forEach(entry => addNode(postColumn, entry, entry.link.textContent, entry.link.href, false));
  references.forEach(ref => {
    const path = ref.url.pathname.replace(/\/$/, '');
    addNode(referenceColumn, ref, ref.url.hostname + path, ref.url.href, true);
  });
  if (!references.size) {
    const empty = document.createElement('p');
    empty.className = 'meta';
    empty.textContent = copy.noReferences;
    referenceColumn.append(empty);
  }

  // Expose the same relationships to people who navigate by keyboard or screen reader.
  for (const [source, edges] of connections) {
    if (!edges.size) continue;
    const description = document.createElement('span');
    description.className = 'sr-only';
    description.id = `graph-links-${entries.indexOf(source)}`;
    description.textContent = (japanese ? 'リンク先：' : 'Links to: ') +
      [...edges].map(edge => nodeElements.get(edge).textContent).join(', ');
    nodeElements.get(source).setAttribute('aria-describedby', description.id);
    postColumn.append(description);
  }

  function drawEdges() {
    if (!stage.isConnected) return;
    const box = stage.getBoundingClientRect();
    const resolution = window.devicePixelRatio || 1;
    canvas.width = Math.round(box.width * resolution);
    canvas.height = Math.round(box.height * resolution);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(resolution, resolution);
    for (const [source, edges] of connections) {
      const start = nodeElements.get(source).getBoundingClientRect();
      for (const edge of edges) {
        const end = nodeElements.get(edge).getBoundingClientRect();
        const x1 = start.right - box.left;
        const x2 = (edge.url ? end.left : end.right) - box.left;
        const y1 = start.top + start.height / 2 - box.top;
        const y2 = end.top + end.height / 2 - box.top;
        const bend = edge.url ? (x1 + x2) / 2 : x1 + 25;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(bend, y1, bend, y2, x2, y2);
        ctx.strokeStyle = edge.url ? '#be95ff' : '#78a9ff';
        ctx.stroke();
      }
    }
  }
  drawEdges();
  return drawEdges;
}

for (const element of document.querySelectorAll('[data-filter]')) {
  const blog = element.hasAttribute('data-blog');
  const entries = [...element.querySelectorAll('[data-item]')].map(row => ({
    row,
    link: row.querySelector('h2 a'),
    categories: blog ? JSON.parse(row.dataset.category) : [row.dataset.category],
    refs: blog ? JSON.parse(row.dataset.references) : [],
  }));
  const search = element.querySelector('[data-search]');
  const category = element.querySelector('[data-category]');
  const graph = element.querySelector('[data-graph]');
  const buttons = [...element.querySelectorAll('[data-view]')];
  let selectedView = 'list';
  let redraw;

  function refresh() {
    const query = search.value.trim().toLowerCase();
    const visible = entries.filter(({ row, categories }) => {
      const matches = (!category.value || categories.includes(category.value)) &&
        (row.textContent + ' ' + categories.join(' ')).toLowerCase().includes(query);
      row.hidden = !matches;
      return matches;
    });
    element.querySelector('[data-count]').textContent = copy.count(visible.length, blog);
    element.querySelector('[data-empty]').hidden = !entries.length || visible.length > 0 || (blog && selectedView === 'graph');
    if (blog) {
      graph.hidden = selectedView !== 'graph';
      element.querySelector('[data-list]').hidden = !graph.hidden;
      redraw = graph.hidden ? undefined : renderGraph(graph, visible, entries);
    }
  }

  element.querySelector('[data-controls]').hidden = false;
  search.addEventListener('input', refresh);
  category.addEventListener('change', refresh);
  for (const button of buttons) {
    button.addEventListener('click', () => {
      selectedView = button.dataset.view;
      buttons.forEach(option => option.setAttribute('aria-pressed', String(option === button)));
      refresh();
    });
  }
  if (blog) window.addEventListener('resize', () => redraw?.());
}

for (const canvas of document.querySelectorAll('[data-field]')) drawField(canvas);
for (const button of document.querySelectorAll('[data-print]')) {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
}
for (const panel of document.querySelectorAll('[data-thoughts]')) {
  const thoughts = [...panel.querySelectorAll('blockquote')];
  const button = panel.querySelector('button');
  if (!button) continue;

  let current = 0;
  function pickThought() {
    thoughts[current].hidden = true;
    current = (current + 1 + Math.floor(Math.random() * (thoughts.length - 1))) % thoughts.length;
    thoughts[current].hidden = false;
  }
  pickThought();
  button.hidden = false;
  button.addEventListener('click', pickThought);
}

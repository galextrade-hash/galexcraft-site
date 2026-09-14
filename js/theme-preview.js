(() => {
  const root = document.documentElement;

  const groups = [
    { key: 'palette', label: 'Palette', options: [
      { value: '', label: 'Apricot' },
      { value: 'terracotta', label: 'Terracotta' },
      { value: 'pastel', label: 'Pastel gold' },
    ]},
    { key: 'fonts', label: 'Typography', options: [
      { value: '', label: 'Classic serif' },
      { value: 'editorial', label: 'Bold editorial' },
      { value: 'minimal', label: 'Soft minimal' },
    ]},
    { key: 'density', label: 'Spacing', options: [
      { value: '', label: 'Airy' },
      { value: 'cozy', label: 'Cozy' },
    ]},
  ];

  const STORAGE_KEY = 'gc-theme-preview';
  const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  function apply() {
    groups.forEach(g => {
      if (state[g.key]) root.setAttribute(`data-${g.key}`, state[g.key]);
      else root.removeAttribute(`data-${g.key}`);
    });
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  const panel = document.createElement('div');
  panel.id = 'themePreviewPanel';

  const toggle = document.createElement('button');
  toggle.className = 'tp-toggle';
  toggle.textContent = '−';
  toggle.addEventListener('click', () => {
    panel.classList.toggle('is-collapsed');
    toggle.textContent = panel.classList.contains('is-collapsed') ? '+' : '−';
  });
  panel.appendChild(toggle);

  const body = document.createElement('div');
  body.className = 'tp-body';

  const heading = document.createElement('h6');
  heading.textContent = 'Design preview';
  body.appendChild(heading);

  groups.forEach(g => {
    const row = document.createElement('div');
    row.className = 'tp-row';

    const label = document.createElement('span');
    label.className = 'tp-label';
    label.textContent = g.label;
    row.appendChild(label);

    const opts = document.createElement('div');
    opts.className = 'tp-options';

    g.options.forEach(o => {
      const btn = document.createElement('button');
      btn.textContent = o.label;
      btn.dataset.group = g.key;
      btn.dataset.value = o.value;
      if ((state[g.key] || '') === o.value) btn.classList.add('is-active');
      btn.addEventListener('click', () => {
        state[g.key] = o.value;
        save();
        apply();
        opts.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b === btn));
      });
      opts.appendChild(btn);
    });

    row.appendChild(opts);
    body.appendChild(row);
  });

  panel.appendChild(body);
  document.body.appendChild(panel);
  apply();
})();

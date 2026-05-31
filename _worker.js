// ─── Form configuration ────────────────────────────────────────────────────
// Add new forms here. They auto-deploy on push.
const FORMS = {
  'grilovacka-hodnoceni': {
    title: 'Hodnocení grilovačky 2026',
    subtitle: 'Díky, že jsi přišel/la! Dej nám zpětnou vazbu, ať příště víme, co zlepšit.',
    adminKey: 'gril2026',
    fields: [
      {
        name: 'hodnoceni',
        label: 'Celkové hodnocení',
        type: 'select',
        required: true,
        options: [
          '1 - Nespokojen',
          '2 - Spíš ne',
          '3 - Dobrý',
          '4 - Velmi dobrý',
          '5 - Skvělý',
        ],
      },
      {
        name: 'co_se_libilo',
        label: 'Co se ti nejvíc líbilo?',
        type: 'textarea',
        required: true,
        placeholder: 'Napiš, co tě nejvíc bavilo...',
      },
      {
        name: 'co_zlepsit',
        label: 'Co bys příště zlepšil/a?',
        type: 'textarea',
        required: true,
        placeholder: 'Napiš, co bychom měli příště udělat jinak...',
      },
    ],
  },
}

// ─── Worker entry ──────────────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname.replace(/^\/|\/$/g, '')
    const [slug, ...rest] = path.split('/')

    // POST /api/submit/<formName>
    if (slug === 'api' && rest[0] === 'submit' && request.method === 'POST') {
      return handleSubmit(rest[1], request, env)
    }

    // GET /api/results/<formName>
    if (slug === 'api' && rest[0] === 'results') {
      return handleResults(rest[1], request, env)
    }

    // GET / – list available forms
    if (!slug || slug === 'index.html') {
      return new Response(renderIndex(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    // GET /<formName> – render form
    const form = FORMS[slug]
    if (form) {
      return new Response(renderForm(slug, form), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    // 404
    return new Response('Not found', { status: 404 })
  },
}

// ─── Submit handler ────────────────────────────────────────────────────────
async function handleSubmit(formName, request, env) {
  if (!formName || !FORMS[formName]) {
    return json({ error: 'Form not found' }, 404)
  }

  let data
  const ct = request.headers.get('content-type') || ''
  if (ct.includes('application/json')) {
    data = await request.json()
  } else {
    const fd = await request.formData()
    data = Object.fromEntries(fd)
  }

  // Validate required fields
  for (const field of FORMS[formName].fields) {
    if (field.required && !data[field.name]) {
      return json({ error: `Pole "${field.label}" je povinné.` }, 400)
    }
  }

  const id = crypto.randomUUID()
  const timestamp = Date.now()
  const submission = { id, timestamp, form: formName }

  for (const field of FORMS[formName].fields) {
    submission[field.name] = (data[field.name] || '').trim()
  }

  try {
    await env.FORM_SUBMISSIONS.put(
      `submission:${formName}:${timestamp}:${id}`,
      JSON.stringify(submission)
    )
    return json({ success: true })
  } catch (err) {
    return json({ error: 'Failed to save submission' }, 500)
  }
}

// ─── Results handler ───────────────────────────────────────────────────────
async function handleResults(formName, request, env) {
  if (!formName || !FORMS[formName]) {
    return new Response('Form not found', { status: 404 })
  }

  const form = FORMS[formName]
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  // No key or wrong key → show login
  if (key !== form.adminKey) {
    return html(renderLogin(formName))
  }

  try {
    const list = await env.FORM_SUBMISSIONS.list({ prefix: `submission:${formName}:` })
    const submissions = []
    for (const k of list.keys) {
      const val = await env.FORM_SUBMISSIONS.get(k.name)
      if (val) submissions.push(JSON.parse(val))
    }
    submissions.sort((a, b) => b.timestamp - a.timestamp)
    return html(renderResults(form, submissions))
  } catch (err) {
    return html(renderError(err), 500)
  }
}

// ─── Renderers ─────────────────────────────────────────────────────────────

function renderIndex() {
  const links = Object.entries(FORMS)
    .map(([slug, f]) => `<li><a href="/${slug}">${esc(f.title)}</a></li>`)
    .join('')
  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Forms</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px}
  .box{background:#fff;border-radius:16px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.1)}
  h1{font-size:22px;color:#111827;margin-bottom:16px}
  ul{list-style:none;padding:0}
  li{margin-bottom:8px}
  a{color:#6366f1;text-decoration:none;font-size:16px}
  a:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="box">
  <h1>📋 Forms</h1>
  ${links ? `<ul>${links}</ul>` : '<p>No forms yet.</p>'}
</div>
</body></html>`
}

function renderForm(slug, form) {
  const fieldsHtml = form.fields.map((f) => {
    const required = f.required ? 'required' : ''
    const reqClass = f.required ? 'required' : ''
    let input = ''

    if (f.type === 'select') {
      const opts = f.options
        .map((o) => `<option value="${esc(o)}">${esc(o)}</option>`)
        .join('')
      input = `<select id="${f.name}" name="${f.name}" ${required}>
        <option value="">${esc(f.placeholder || '-- Vyber --')}</option>
        ${opts}
      </select>`
    } else {
      input = `<textarea id="${f.name}" name="${f.name}" ${required}
        placeholder="${esc(f.placeholder || '')}"></textarea>`
    }

    return `<div class="field">
      <label for="${f.name}" class="${reqClass}">${esc(f.label)}</label>
      ${input}
    </div>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${esc(form.title)}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .container{background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.1);padding:40px;max-width:560px;width:100%}
    h1{font-size:24px;color:#111827;margin-bottom:8px}
    .subtitle{color:#6b7280;font-size:14px;margin-bottom:32px}
    .field{margin-bottom:24px}
    label{display:block;font-size:15px;font-weight:600;color:#374151;margin-bottom:8px}
    .required::after{content:" *";color:#ef4444}
    select,textarea{width:100%;padding:12px 16px;border:1.5px solid #d1d5db;border-radius:10px;font-size:15px;color:#111827;background:#fff;transition:border-color .2s;font-family:inherit}
    select:focus,textarea:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,0.15)}
    textarea{min-height:100px;resize:vertical}
    select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:40px}
    button{width:100%;padding:14px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}
    button:hover{background:#4f46e5}
    button:disabled{background:#9ca3af;cursor:not-allowed}
    .form-error{background:#fef2f2;border:1px solid #fecaca;color:#dc2626;padding:12px 16px;border-radius:10px;font-size:14px;margin-bottom:24px;display:none}
    .success{display:none;text-align:center;padding:40px 20px}
    .success svg{width:64px;height:64px;color:#22c55e;margin-bottom:16px}
    .success h2{font-size:22px;color:#111827;margin-bottom:8px}
    .success p{color:#6b7280;font-size:15px}
    .back{margin-top:24px;text-align:center}
    .back a{color:#6366f1;font-size:14px;text-decoration:none}
    .back a:hover{text-decoration:underline}
  </style>
</head>
<body>
<div class="container">
  <div id="form-wrapper">
    <h1>${esc(form.title)}</h1>
    <p class="subtitle">${esc(form.subtitle)}</p>
    <div id="form-error" class="form-error"></div>
    <form id="form" action="/api/submit/${slug}" method="POST">
      ${fieldsHtml}
      <button type="submit" id="submit-btn">Odeslat</button>
    </form>
  </div>
  <div id="success-wrapper" class="success">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    <h2>Díky za odpověď!</h2>
    <p>Tvá zpětná vazba je uložená. 🔥</p>
  </div>
</div>
<script>
  const form=document.getElementById('form'),fw=document.getElementById('form-wrapper'),sw=document.getElementById('success-wrapper'),fe=document.getElementById('form-error'),sb=document.getElementById('submit-btn')
  form.addEventListener('submit',async e=>{e.preventDefault();fe.style.display='none';sb.disabled=!0;sb.textContent='Odesílám...'
    try{const r=await fetch(form.action,{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(form))),headers:{'Content-Type':'application/json'}})
    if(r.ok){fw.style.display='none';sw.style.display='block'}
    else{const j=await r.json();fe.textContent=j.error||'Chyba.';fe.style.display='block';sb.disabled=!1;sb.textContent='Odeslat'}}
    catch(e){fe.textContent='Chyba připojení.';fe.style.display='block';sb.disabled=!1;sb.textContent='Odeslat'}})
</script>
</body></html>`
}

function renderLogin(formName) {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Admin přístup</title>
  <style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px}
  .box{background:#fff;border-radius:16px;padding:40px;max-width:400px;width:100%;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.1)}
  h1{font-size:20px;color:#111827;margin-bottom:16px}
  input{width:100%;padding:12px 16px;border:1.5px solid #d1d5db;border-radius:10px;font-size:15px;margin-bottom:16px;box-sizing:border-box}
  button{width:100%;padding:14px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer}
  button:hover{background:#4f46e5}</style>
</head>
<body>
  <div class="box">
    <h1>🔐 Admin - ${esc(FORMS[formName]?.title || 'Výsledky')}</h1>
    <form method="GET">
      <input type="password" name="key" placeholder="Admin klíč" required>
      <button type="submit">Přejít do výsledků</button>
    </form>
  </div>
</body></html>`
}

function renderResults(form, submissions) {
  const fieldLabels = form.fields.map((f) => esc(f.label))

  const colHeaders = ['Datum', ...fieldLabels].map((l) => `<th>${l}</th>`).join('')

  const rows = submissions.map((s) => {
    const d = new Date(s.timestamp)
    const dateStr = d.toLocaleDateString('cs-CZ', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
    const cells = [dateStr, ...form.fields.map((f) => esc(s[f.name] || ''))]
      .map((c) => `<td>${c}</td>`)
      .join('')
    return `<tr>${cells}</tr>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Výsledky - ${esc(form.title)}</title>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6;padding:20px;margin:0}
    .container{max-width:960px;margin:0 auto}
    h1{font-size:24px;color:#111827;margin-bottom:8px}
    .sub{color:#6b7280;font-size:14px;margin-bottom:24px}
    .summary{display:flex;gap:16px;margin-bottom:24px;flex-wrap:wrap}
    .card{background:#fff;border-radius:12px;padding:20px;flex:1;min-width:150px;box-shadow:0 4px 24px rgba(0,0,0,0.1);text-align:center}
    .card-value{font-size:28px;font-weight:700;color:#6366f1}
    .card-label{font-size:13px;color:#6b7280;margin-top:4px}
    table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1)}
    th{background:#6366f1;color:#fff;padding:12px 16px;text-align:left;font-size:14px;font-weight:600}
    td{padding:12px 16px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#374151}
    tr:last-child td{border-bottom:none}tr:hover td{background:#f9fafb}
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 ${esc(form.title)}</h1>
    <p class="sub">Celkem ${submissions.length} odpovědí</p>
    <div class="summary">
      <div class="card"><div class="card-value">${submissions.length}</div><div class="card-label">Počet odpovědí</div></div>
    </div>
    <table><thead><tr>${colHeaders}</tr></thead>
      <tbody>${rows || '<tr><td colspan="99" style="text-align:center;color:#9ca3af;padding:40px">Zatím žádné odpovědi</td></tr>'}</tbody>
    </table>
  </div>
</body></html>`
}

function renderError(err) {
  return `<!DOCTYPE html><html lang="cs"><head><meta charset="UTF-8"><title>Chyba</title><style>body{font-family:sans-serif;background:#fef2f2;padding:40px}h1{color:#dc2626}pre{background:#fff;padding:16px;border-radius:8px}</style></head><body><h1>Chyba</h1><pre>${esc(err.message || err)}</pre></body></html>`
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function html(body, status = 200) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

function esc(text) {
  if (!text) return ''
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

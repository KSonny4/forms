// ─── Form configuration ────────────────────────────────────────────────────
// Add new forms here. They auto-deploy on push to main.
const FORMS = {
  'grilovacka-hodnoceni': {
    title: 'Hodnocení grilovačky 2026',
    subtitle:
      'Díky, že jsi přišel/la! Dej nám zpětnou vazbu, ať příště víme, co zlepšit.',
    adminKey: 'gril2026',
    successMessage: 'Tvá zpětná vazba je uložená. 🔥',
    fields: [
      {
        name: 'hodnoceni',
        label: 'Celkové hodnocení (1 = nejlepší, 5 = nejhorší)',
        type: 'rating',
        required: true,
        defaultValue: '1 - Skvělý',
        options: [
          '1 - Skvělý',
          '2 - Velmi dobrý',
          '3 - Dobrý',
          '4 - Spíš ne',
          '5 - Nespokojen',
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
      {
        name: 'jmeno',
        label: 'Jméno (nepovinné)',
        type: 'text',
        required: false,
        placeholder: 'Napiš své jméno...',
      },
      {
        name: 'kontakt',
        label: 'Kontakt (nepovinný)',
        type: 'email',
        required: false,
        placeholder: 'tvuj@email.cz',
      },
    ],
  },
  'psycare_web': {
    title: 'Vyber vizuální směr pro nový web PsyCare',
    subtitle: [
      'Vybíráme vizuální směr pro nový web PsyCare. Nejde o to, co je nejhezčí — potřebujeme vybrat směr, který působí důvěryhodně, srozumitelně a ne moc psychedelicky.',
      'Web slouží hlavně pro: média, pořadatele akcí, dobrovolníky.',
      'Všechny čtyři návrhy už máme nakódované a běží naživo — liší se barvami, zaoblením, stíny a celkovým dojmem.',
    ],
    adminKey: 'psycare2026',
    successMessage: 'Díky za hlas! 🔥',
    fields: [
      {
        name: 'hlas',
        label: 'Který směr preferuješ? (můžeš vybrat 1–4)',
        type: 'checkbox',
        required: true,
        options: ['field', 'festival', 'press', 'deck'],
      },
      {
        name: 'jmeno',
        label: 'Jméno',
        type: 'text',
        required: true,
        placeholder: 'Napiš své jméno...',
      },
      {
        name: 'kontakt',
        label: 'Kontakt',
        type: 'email',
        required: true,
        placeholder: 'tvuj@email.cz',
      },
      {
        name: 'komentar',
        label: 'Komentář / postřehy',
        type: 'textarea',
        required: false,
        placeholder: 'Napiš, co se ti líbí nebo nelíbí...',
      },
    ],
  },
}

const FORM_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f3f4f6;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .container {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 560px;
    width: 100%;
  }

  h1 {
    font-size: 24px;
    color: #111827;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .subtitle {
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .subtitle p {
    margin-bottom: 8px;
  }

  .subtitle p:last-child {
    margin-bottom: 0;
  }

  .field {
    margin-bottom: 24px;
  }

  label {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }

  .required::after {
    content: " *";
    color: #ef4444;
  }

  select, textarea, input[type="text"], input[type="email"] {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #d1d5db;
    border-radius: 10px;
    font-size: 15px;
    color: #111827;
    background: #ffffff;
    transition: border-color 0.2s;
    font-family: inherit;
  }

  select:focus, textarea:focus, input[type="text"]:focus, input[type="email"]:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 40px;
  }

  button {
    width: 100%;
    padding: 14px;
    background: #6366f1;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #4f46e5;
  }

  button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  .form-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 24px;
    display: none;
  }

  .success {
    display: none;
    text-align: center;
    padding: 40px 20px;
  }

  .success svg {
    width: 64px;
    height: 64px;
    color: #22c55e;
    margin-bottom: 16px;
  }

  .success h2 {
    font-size: 22px;
    color: #111827;
    margin-bottom: 8px;
  }

  .success p {
    color: #6b7280;
    font-size: 15px;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border: 1.5px solid #d1d5db;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    font-weight: 400;
    font-size: 15px;
    color: #374151;
  }

  .checkbox-label:hover {
    border-color: #6366f1;
    background: #f5f5ff;
  }

  .checkbox-group input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #6366f1;
    flex-shrink: 0;
  }

  .rating-group {
    display: flex;
    gap: 12px;
    padding-top: 4px;
  }

  .rating-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 16px 8px;
    border: 2px solid #d1d5db;
    border-radius: 12px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    text-align: center;
  }

  .rating-card:hover {
    border-color: #818cf8;
    background: #f5f5ff;
  }

  .rating-card input[type="radio"] {
    display: none;
  }

  .rating-card:has(input:checked) {
    border-color: #6366f1;
    background: #eef2ff;
  }

  .rating-value {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
  }

  .rating-label {
    font-size: 11px;
    color: #6b7280;
    line-height: 1.2;
  }

  .rating-card:has(input:checked) .rating-value {
    color: #6366f1;
  }

  .rating-card:has(input:checked) .rating-label {
    color: #6366f1;
    font-weight: 600;
  }
`

const RESULTS_STYLES = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f3f4f6;
    padding: 20px;
    margin: 0;
  }

  .container { max-width: 960px; margin: 0 auto; }

  h1 {
    font-size: 24px;
    color: #111827;
    margin-bottom: 8px;
  }

  .sub {
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 24px;
  }

  .summary {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .card {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    flex: 1;
    min-width: 150px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .card-value {
    font-size: 28px;
    font-weight: 700;
    color: #6366f1;
  }

  .card-label {
    font-size: 13px;
    color: #6b7280;
    margin-top: 4px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  }

  th {
    background: #6366f1;
    color: #ffffff;
    padding: 12px 16px;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
    color: #374151;
  }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #f9fafb; }

  .admin-bar {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .admin-bar button,
  .admin-bar a {
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    transition: background 0.2s;
  }

  .btn-export {
    background: #22c55e;
    color: #ffffff;
  }

  .btn-export:hover {
    background: #16a34a;
  }

  .btn-delete {
    background: #ef4444;
    color: #ffffff;
  }

  .btn-delete:hover {
    background: #dc2626;
  }

  .btn-delete:disabled {
    background: #fca5a5;
    cursor: not-allowed;
  }

  .btn-delete-sm {
    background: none;
    border: 1.5px solid #fca5a5;
    color: #ef4444;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-delete-sm:hover {
    background: #fef2f2;
  }

  td:first-child {
    width: 40px;
    text-align: center;
  }

  td:last-child {
    width: 60px;
    text-align: center;
  }

  th:first-child {
    width: 40px;
    text-align: center;
  }

  th:last-child {
    width: 60px;
    text-align: center;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #6366f1;
    cursor: pointer;
  }

  .selected-count {
    font-size: 13px;
    color: #6b7280;
  }
`

const LOGIN_STYLES = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
  }

  .box {
    background: #ffffff;
    border-radius: 16px;
    padding: 40px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 20px;
    color: #111827;
    margin-bottom: 16px;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #d1d5db;
    border-radius: 10px;
    font-size: 15px;
    margin-bottom: 16px;
    box-sizing: border-box;
  }

  button {
    width: 100%;
    padding: 14px;
    background: #6366f1;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  button:hover { background: #4f46e5; }
`

// ─── Worker entry ──────────────────────────────────────────────────────────

export default {
  async fetch(request, environment, context) {
    const url = new URL(request.url)
    const path = url.pathname.replace(/^\/|\/$/g, '')
    const [slug, ...rest] = path.split('/')

    // POST /api/submit/<formName>
    if (slug === 'api' && rest[0] === 'submit' && request.method === 'POST') {
      return handleSubmit(rest[1], request, environment)
    }

    // GET /api/results/<formName>
    if (slug === 'api' && rest[0] === 'results') {
      return handleResults(rest[1], request, environment)
    }

    // GET /api/export/<formName> — CSV download
    if (slug === 'api' && rest[0] === 'export') {
      return handleExport(rest[1], request, environment)
    }

    // POST /api/delete/<formName> — delete submissions
    if (slug === 'api' && rest[0] === 'delete' && request.method === 'POST') {
      return handleDelete(rest[1], request, environment)
    }

    // Root path — 404 (no form listing)
    if (!slug || slug === 'index.html') {
      return notFound()
    }

    // GET /<formName> — render form
    const formConfiguration = FORMS[slug]
    if (formConfiguration) {
      return htmlResponse(renderForm(slug, formConfiguration))
    }

    return notFound()
  },
}

// ─── Submit handler ────────────────────────────────────────────────────────

async function handleSubmit(formName, request, environment) {
  const formConfiguration = FORMS[formName]

  if (!formName || !formConfiguration) {
    return jsonResponse({ error: 'Form not found' }, 404)
  }

  const requestData = await parseRequestBody(request)

  for (const field of formConfiguration.fields) {
    const value = requestData[field.name]

    if (!field.required) {
      continue
    }

    if (field.type === 'checkbox') {
      if (!Array.isArray(value) || value.length === 0) {
        return jsonResponse(
          { error: `Pole "${field.label}" je povinné.` },
          400
        )
      }
    } else if (!value || !value.toString().trim()) {
      return jsonResponse(
        { error: `Pole "${field.label}" je povinné.` },
        400
      )
    }
  }

  const submissionId = crypto.randomUUID()
  const timestamp = Date.now()
  const submission = {
    id: submissionId,
    timestamp,
    form: formName,
  }

  for (const field of formConfiguration.fields) {
    const rawValue = requestData[field.name]

    if (field.type === 'checkbox') {
      submission[field.name] = rawValue
        ? JSON.stringify(Array.isArray(rawValue) ? rawValue : [rawValue])
        : '[]'
    } else {
      submission[field.name] = (rawValue || '').toString().trim()
    }
  }

  try {
    await environment.FORM_SUBMISSIONS.put(
      `submission:${formName}:${timestamp}:${submissionId}`,
      JSON.stringify(submission)
    )
    return jsonResponse({ success: true })
  } catch (error) {
    return jsonResponse({ error: 'Failed to save submission' }, 500)
  }
}

async function parseRequestBody(request) {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return request.json()
  }

  const formData = await request.formData()
  const result = {}

  for (const [key, value] of formData) {
    const cleanKey = key.replace('[]', '')

    if (key.endsWith('[]')) {
      if (!result[cleanKey]) {
        result[cleanKey] = []
      }
      result[cleanKey].push(value)
    } else {
      result[cleanKey] = value
    }
  }

  return result
}

// ─── Results handler ───────────────────────────────────────────────────────

async function handleResults(formName, request, environment) {
  const formConfiguration = FORMS[formName]

  if (!formName || !formConfiguration) {
    return notFound()
  }

  const url = new URL(request.url)
  const adminKey = url.searchParams.get('key')

  if (adminKey !== formConfiguration.adminKey) {
    return htmlResponse(renderLoginPage(formName))
  }

  try {
    const keyList = await environment.FORM_SUBMISSIONS.list({
      prefix: `submission:${formName}:`,
    })

    const submissions = []

    for (const key of keyList.keys) {
      const rawValue = await environment.FORM_SUBMISSIONS.get(key.name)
      if (rawValue) {
        const submission = JSON.parse(rawValue)
        submission.kvKey = key.name
        submissions.push(submission)
      }
    }

    submissions.sort(
      (first, second) => second.timestamp - first.timestamp
    )

    return htmlResponse(renderResultsPage(formConfiguration, formName, formConfiguration.adminKey, submissions))
  } catch (error) {
    return htmlResponse(renderErrorPage(error), 500)
  }
}

// ─── Export handler ────────────────────────────────────────────────────────

async function handleExport(formName, request, environment) {
  const formConfiguration = FORMS[formName]

  if (!formName || !formConfiguration) {
    return jsonResponse({ error: 'Form not found' }, 404)
  }

  const url = new URL(request.url)
  const adminKey = url.searchParams.get('key')

  if (adminKey !== formConfiguration.adminKey) {
    return jsonResponse({ error: 'Neopravneny pristup' }, 401)
  }

  try {
    const keyList = await environment.FORM_SUBMISSIONS.list({
      prefix: `submission:${formName}:`,
    })

    const submissions = []

    for (const key of keyList.keys) {
      const rawValue = await environment.FORM_SUBMISSIONS.get(key.name)
      if (rawValue) {
        submissions.push(JSON.parse(rawValue))
      }
    }

    submissions.sort(
      (first, second) => second.timestamp - first.timestamp
    )

    // Build CSV
    const csvHeader = ['Datum', ...formConfiguration.fields.map((f) => f.label)]
    const csvRows = submissions.map((submission) => {
      const date = new Date(submission.timestamp).toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      const cells = formConfiguration.fields.map((field) => {
        const rawValue = submission[field.name]

        if (field.type === 'checkbox' && rawValue) {
          try {
            const parsed = JSON.parse(rawValue)
            return Array.isArray(parsed) ? parsed.join('; ') : rawValue
          } catch {
            return rawValue
          }
        }

        return rawValue || ''
      })

      return [date, ...cells]
    })

    const csvLines = [csvHeader, ...csvRows]
      .map((row) =>
        row
          .map((cell) => {
            const str = String(cell)
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
              return '"' + str.replace(/"/g, '""') + '"'
            }
            return str
          })
          .join(',')
      )
      .join('\n')

    const filename = `${formName}-${Date.now()}.csv`

    return new Response('\uFEFF' + csvLines, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    return jsonResponse({ error: 'Failed to export' }, 500)
  }
}

// ─── Delete handler ────────────────────────────────────────────────────────

async function handleDelete(formName, request, environment) {
  const formConfiguration = FORMS[formName]

  if (!formName || !formConfiguration) {
    return jsonResponse({ error: 'Form not found' }, 404)
  }

  try {
    const body = await request.json()
    const adminKey = body.key
    const kvKeys = body.kvKeys

    if (adminKey !== formConfiguration.adminKey) {
      return jsonResponse({ error: 'Neopravneny pristup' }, 401)
    }

    if (!Array.isArray(kvKeys) || kvKeys.length === 0) {
      return jsonResponse({ error: 'No keys provided' }, 400)
    }

    const deletePromises = kvKeys.map((kvKey) =>
      environment.FORM_SUBMISSIONS.delete(kvKey)
    )

    await Promise.all(deletePromises)

    return jsonResponse({ success: true, deleted: kvKeys.length })
  } catch (error) {
    return jsonResponse({ error: 'Failed to delete' }, 500)
  }
}

// ─── Field renderer ────────────────────────────────────────────────────────

function buildFieldHtml(fieldConfiguration) {
  const requiredAttribute = fieldConfiguration.required ? 'required' : ''
  const requiredClass = fieldConfiguration.required ? 'required' : ''
  const fieldName = fieldConfiguration.name
  const fieldLabel = esc(fieldConfiguration.label)

  let inputHtml = ''

  if (fieldConfiguration.type === 'select') {
    const placeholder = esc(fieldConfiguration.placeholder || '-- Vyber --')
    const optionsHtml = fieldConfiguration.options
      .map((option) => `<option value="${esc(option)}">${esc(option)}</option>`)
      .join('')

    inputHtml = `
      <select id="${fieldName}" name="${fieldName}" ${requiredAttribute}>
        <option value="">${placeholder}</option>
        ${optionsHtml}
      </select>`
  } else if (fieldConfiguration.type === 'checkbox') {
    const optionsHtml = fieldConfiguration.options
      .map(
        (option) => `
        <label class="checkbox-label">
          <input type="checkbox" name="${fieldName}[]" value="${esc(option)}" />
          ${esc(option)}
        </label>`
      )
      .join('')

    inputHtml = `<div class="checkbox-group">${optionsHtml}</div>`
  } else if (fieldConfiguration.type === 'rating') {
    const defaultOption = fieldConfiguration.defaultValue || ''
    const optionsHtml = fieldConfiguration.options
      .map((option) => {
        const [value, ...labelParts] = option.split(' - ')
        const label = labelParts.join(' - ')
        const checked = option === defaultOption ? 'checked' : ''
        return `
        <label class="rating-card">
          <input type="radio" name="${fieldName}" value="${esc(option)}" ${requiredAttribute} ${checked} />
          <span class="rating-value">${esc(value)}</span>
          <span class="rating-label">${esc(label)}</span>
        </label>`
      })
      .join('')

    inputHtml = `<div class="rating-group">${optionsHtml}</div>`
  } else if (fieldConfiguration.type === 'email') {
    const placeholder = esc(fieldConfiguration.placeholder || '')

    inputHtml = `
      <input
        type="email"
        id="${fieldName}"
        name="${fieldName}"
        ${requiredAttribute}
        placeholder="${placeholder}" />`
  } else if (fieldConfiguration.type === 'text') {
    const placeholder = esc(fieldConfiguration.placeholder || '')

    inputHtml = `
      <input
        type="text"
        id="${fieldName}"
        name="${fieldName}"
        ${requiredAttribute}
        placeholder="${placeholder}" />`
  } else {
    const placeholder = esc(fieldConfiguration.placeholder || '')

    inputHtml = `
      <textarea
        id="${fieldName}"
        name="${fieldName}"
        ${requiredAttribute}
        placeholder="${placeholder}"></textarea>`
  }

  return `
    <div class="field">
      <label for="${fieldName}" class="${requiredClass}">${fieldLabel}</label>
      ${inputHtml}
    </div>`
}

function buildSubtitleHtml(lines) {
  if (Array.isArray(lines)) {
    return lines
      .map((line) => `<p>${esc(line)}</p>`)
      .join('')
  }

  if (lines.includes('\n')) {
    return lines
      .split('\n')
      .filter(Boolean)
      .map((line) => `<p>${esc(line)}</p>`)
      .join('')
  }

  if (lines.length > 0) {
    return `<p>${esc(lines)}</p>`
  }

  return ''
}

// ─── Form submission script ────────────────────────────────────────────────

function buildSubmissionScript(formSlug) {
  return `
    const form = document.getElementById('form')
    const formWrapper = document.getElementById('form-wrapper')
    const successWrapper = document.getElementById('success-wrapper')
    const errorContainer = document.getElementById('form-error')
    const submitButton = document.getElementById('submit-btn')

    form.addEventListener('submit', async function (event) {
      event.preventDefault()

      errorContainer.style.display = 'none'
      submitButton.disabled = true
      submitButton.textContent = 'Odesílám...'

      try {
        const formData = new FormData(form)
        const payload = {}

        for (const [key, value] of formData) {
          const cleanKey = key.replace('[]', '')

          if (key.endsWith('[]')) {
            if (!payload[cleanKey]) {
              payload[cleanKey] = []
            }
            payload[cleanKey].push(value)
          } else {
            payload[cleanKey] = value
          }
        }

        const response = await fetch('/api/submit/${formSlug}', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          formWrapper.style.display = 'none'
          successWrapper.style.display = 'block'
        } else {
          const json = await response.json()
          errorContainer.textContent = json.error || 'Chyba pri odesilani.'
          errorContainer.style.display = 'block'
          submitButton.disabled = false
          submitButton.textContent = 'Odeslat'
        }
      } catch (error) {
        errorContainer.textContent = 'Chyba pripojeni. Zkontroluj internet a zkus znovu.'
        errorContainer.style.display = 'block'
        submitButton.disabled = false
        submitButton.textContent = 'Odeslat'
      }
    })`
}

// ─── Page renderers ────────────────────────────────────────────────────────

function renderForm(formSlug, formConfiguration) {
  const fieldsHtml = formConfiguration.fields
    .map((field) => buildFieldHtml(field))
    .join('')

  const subtitleHtml = buildSubtitleHtml(formConfiguration.subtitle)
  const script = buildSubmissionScript(formSlug)
  const successMessage = formConfiguration.successMessage || 'Díky za odpověď!'

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(formConfiguration.title)}</title>
  <style>${FORM_STYLES}</style>
</head>
<body>
  <div class="container">
    <div id="form-wrapper">
      <h1>${esc(formConfiguration.title)}</h1>
      <div class="subtitle">${subtitleHtml}</div>

      <div id="form-error" class="form-error"></div>

      <form id="form">
        ${fieldsHtml}

        <button type="submit" id="submit-btn">Odeslat</button>
      </form>
    </div>

    <div id="success-wrapper" class="success">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h2>${successMessage}</h2>
    </div>
  </div>

  <script>${script}</script>
</body>
</html>`
}

function renderLoginPage(formName) {
  const formConfiguration = FORMS[formName]
  const title = formConfiguration
    ? formConfiguration.title
    : 'Výsledky'

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin pristup</title>
  <style>${LOGIN_STYLES}</style>
</head>
<body>
  <div class="box">
    <h1>🔐 Admin — ${esc(title)}</h1>
    <form method="GET">
      <input type="password" name="key" placeholder="Admin klic" required>
      <button type="submit">Prejit do vysledku</button>
    </form>
  </div>
</body>
</html>`
}

function renderResultsPage(formConfiguration, formSlug, adminKey, submissions) {
  const fieldLabels = formConfiguration.fields.map((field) =>
    esc(field.label)
  )

  const columnHeaders = ['', 'Datum', ...fieldLabels, '']
    .map((label) => `<th>${label}</th>`)
    .join('')

  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  function formatCell(displayValue) {
    return esc(displayValue)
  }

  function fieldDisplay(field, submission) {
    const rawValue = submission[field.name]
    if (!rawValue) return ''

    if (field.type === 'checkbox') {
      try {
        const parsed = JSON.parse(rawValue)
        return Array.isArray(parsed) ? parsed.join(', ') : rawValue
      } catch {
        return rawValue
      }
    }

    return rawValue
  }

  const rowsHtml = submissions
    .map((submission) => {
      const date = new Date(submission.timestamp)
      const formattedDate = date.toLocaleDateString('cs-CZ', dateOptions)
      const kvKey = esc(submission.kvKey || '')

      const dataCells = formConfiguration.fields
        .map((field) => `<td>${formatCell(fieldDisplay(field, submission))}</td>`)
        .join('')

      return `<tr>
        <td><input type="checkbox" class="row-checkbox" value="${kvKey}" /></td>
        <td>${esc(formattedDate)}</td>
        ${dataCells}
        <td><button class="btn-delete-sm" data-kv-key="${kvKey}">Smazat</button></td>
      </tr>`
    })
    .join('')

  const emptyRow = `
    <tr>
      <td colspan="99" style="text-align: center; color: #9ca3af; padding: 40px">
        Zatim zadne odpovedi
      </td>
    </tr>`

  const exportUrl = `/api/export/${formSlug}?key=${encodeURIComponent(adminKey)}`

  const deleteScript = `
    const ADMIN_KEY = ${JSON.stringify(adminKey)}
    const FORM_SLUG = ${JSON.stringify(formSlug)}

    function getSelectedKeys() {
      return Array.from(document.querySelectorAll('.row-checkbox:checked'))
        .map(function (cb) { return cb.value })
        .filter(Boolean)
    }

    function updateSelectedCount() {
      var count = getSelectedKeys().length
      var el = document.getElementById('selected-count')
      if (el) el.textContent = count > 0 ? count + ' vybrano' : ''
      var bulkBtn = document.getElementById('bulk-delete-btn')
      if (bulkBtn) bulkBtn.disabled = count === 0
    }

    document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox')) updateSelectedCount()
    })

    document.getElementById('bulk-delete-btn').addEventListener('click', function () {
      var keys = getSelectedKeys()
      if (keys.length === 0) return
      if (!confirm('Opravdu smazat ' + keys.length + ' odpovedi?')) return
      deleteKeys(keys)
    })

    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-delete-sm')) {
        var key = e.target.getAttribute('data-kv-key')
        if (key && confirm('Opravdu smazat tuto odpoved?')) deleteKeys([key])
      }
    })

    function deleteKeys(keys) {
      var btn = document.getElementById('bulk-delete-btn')
      btn.disabled = true
      btn.textContent = 'Mazu...'

      fetch('/api/delete/' + FORM_SLUG, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: ADMIN_KEY, kvKeys: keys })
      })
      .then(function (r) { return r.json() })
      .then(function (data) {
        if (data.success) {
          location.reload()
        } else {
          alert('Chyba: ' + (data.error || 'neznama'))
          btn.disabled = false
          btn.textContent = 'Smazat vybrane'
        }
      })
      .catch(function () {
        alert('Chyba pripojeni')
        btn.disabled = false
        btn.textContent = 'Smazat vybrane'
      })
    }
  `

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vysledky — ${esc(formConfiguration.title)}</title>
  <style>${RESULTS_STYLES}</style>
</head>
<body>
  <div class="container">
    <h1>📊 ${esc(formConfiguration.title)}</h1>
    <p class="sub">Celkem ${submissions.length} odpovedi</p>

    <div class="summary">
      <div class="card">
        <div class="card-value">${submissions.length}</div>
        <div class="card-label">Pocet odpovedi</div>
      </div>
    </div>

    <div class="admin-bar">
      <a href="${esc(exportUrl)}" class="btn-export">Export CSV</a>
      <button id="bulk-delete-btn" class="btn-delete" disabled>Smazat vybrane</button>
      <span id="selected-count" class="selected-count"></span>
    </div>

    <table>
      <thead>
        <tr>${columnHeaders}</tr>
      </thead>
      <tbody>
        ${submissions.length > 0 ? rowsHtml : emptyRow}
      </tbody>
    </table>
  </div>

  <script>${deleteScript}</script>
</body>
</html>`
}

function renderErrorPage(error) {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Chyba</title>
  <style>
    body { font-family: sans-serif; background: #fef2f2; padding: 40px; }
    h1 { color: #dc2626; }
    pre { background: #ffffff; padding: 16px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>Chyba</h1>
  <pre>${esc(error.message || error)}</pre>
</body>
</html>`
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function htmlResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

function notFound() {
  return new Response('Not found', { status: 404 })
}

function esc(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

# forms.pkubelka.cz — Generic multi-form system

Reusable form system with Cloudflare Pages + KV. Supports unlimited forms via path-based routing.

## How it works

- **`_worker.js`** — handles all routing (no static files needed)
- Form configs are defined in the `FORMS` object inside `_worker.js`
- Each form gets its own URL path: `forms.pkubelka.cz/{nazev-formulare}`
- Submissions stored in KV as `submission:{formName}:{timestamp}:{uuid}`
- Admin results at `forms.pkubelka.cz/api/results/{formName}?key={adminKey}`

## Adding a new form

Edit `_worker.js` and add a new entry to the `FORMS` object:

```js
'jina-akce': {
  title: 'Název formuláře',
  subtitle: 'Popis...',
  adminKey: 'tajny-klic',
  fields: [
    {
      name: 'jmeno',
      label: 'Vaše jméno',
      type: 'text',        // 'textarea' or 'select'
      required: true,
      placeholder: '...',
    },
    {
      name: 'hodnoceni',
      label: 'Hodnocení',
      type: 'select',
      required: true,
      options: ['1 - Špatné', '2 - Ujde', '3 - Dobré', '4 - Super'],
    },
  ],
},
```

Push to `main` → auto-deploy.

## Setup

1. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**
2. Select this repository
3. Project name: `forms` (or whatever)
4. **Deploy**
5. Go to **Settings → Functions → KV namespace bindings**
6. Add binding: **Variable name = `FORM_SUBMISSIONS`**, pick a KV namespace
7. **Settings → Custom domains** → add `forms.pkubelka.cz`

## URL structure

| URL | Popis |
|-----|-------|
| `/` | Seznam všech formulářů |
| `/grilovacka-hodnoceni` | Konkrétní formulář |
| `/api/submit/grilovacka-hodnoceni` | API endpoint (POST) |
| `/api/results/grilovacka-hodnoceni?key=xxx` | Admin výsledky |

## Tech

- [Cloudflare Pages (_worker.js)](https://developers.cloudflare.com/pages/functions/)
- [Cloudflare KV](https://developers.cloudflare.com/kv/)

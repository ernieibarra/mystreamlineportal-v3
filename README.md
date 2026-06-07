# NewGen Leadership Team Portal

React/Vite website for `mystreamlineportal.com`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Netlify Email Function

Both website forms post to:

```text
/.netlify/functions/send-team-email
```

The function lives at:

```text
netlify/functions/send-team-email.js
```

It sends all notifications to `team@newgenreservices.com` and ignores any frontend `to` value.

Set these Netlify environment variables before using live email:

```text
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=NewGen Portal <portal@mystreamlineportal.com>
```

`EMAIL_FROM` must be a sender address verified with the email provider. Do not add SMTP passwords, API keys, or private tokens to frontend code.

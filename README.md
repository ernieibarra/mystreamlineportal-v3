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

## Netlify Forms

The site uses Netlify Forms. No Resend, SendGrid, SMTP, or custom email API is required.

Active form name:

```text
newgen-intake-form
```

The React intake form submits URL-encoded form data to Netlify. A hidden static version of the intake form is included in `index.html` so Netlify can detect it during production deploy.

Appointments are handled by Calendly at:

```text
https://calendly.com/life-ernieibarra/30min
```

After deployment, configure email notifications in Netlify:

1. Open the Netlify site dashboard.
2. Go to Forms.
3. Confirm `newgen-intake-form` appears after a deploy.
4. Open the form and add an email notification.
5. Set the notification recipient to `team@newgenreservices.com`.

Do not add SMTP passwords, API keys, or private tokens to frontend code.

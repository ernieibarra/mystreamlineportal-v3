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

Active form names:

```text
newgen-intake-form
newgen-appointment-form
```

The React forms submit URL-encoded form data to Netlify. Hidden static versions of both forms are included in `index.html` so Netlify can detect them during production deploy.

After deployment, configure email notifications in Netlify:

1. Open the Netlify site dashboard.
2. Go to Forms.
3. Confirm `newgen-intake-form` and `newgen-appointment-form` appear after a deploy.
4. Open each form and add an email notification.
5. Set the notification recipient to `team@newgenreservices.com`.

Do not add SMTP passwords, API keys, or private tokens to frontend code.

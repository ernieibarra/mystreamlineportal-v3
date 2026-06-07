const TEAM_EMAIL = 'team@newgenreservices.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}

function getSubject(formType) {
  if (formType === 'client intake form') {
    return 'New Client Intake Submission'
  }

  if (formType === 'appointment request') {
    return 'New Appointment Request'
  }

  return 'New Website Form Submission'
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'Not provided'
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ')
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }

  return String(value)
}

function escapeHtml(value) {
  return formatValue(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatFieldLabel(key) {
  return key
    .replaceAll('_', ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function buildEmailBody(formType, payload, submittedAt) {
  const entries = Object.entries(payload || {})
  const textFields = entries
    .map(([key, value]) => `${formatFieldLabel(key)}: ${formatValue(value)}`)
    .join('\n')

  const htmlFields = entries
    .map(
      ([key, value]) => `
        <tr>
          <th>${escapeHtml(formatFieldLabel(key))}</th>
          <td>${escapeHtml(value).replaceAll('\n', '<br>')}</td>
        </tr>
      `,
    )
    .join('')

  return {
    text: [
      `Form type: ${formType || 'Unknown'}`,
      `Submission date/time: ${submittedAt}`,
      '',
      'Submitted fields:',
      textFields || 'No fields submitted.',
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.5;">
        <h2 style="margin: 0 0 16px; color: #061734;">NewGen Website Form Submission</h2>
        <p><strong>Form type:</strong> ${escapeHtml(formType || 'Unknown')}</p>
        <p><strong>Submission date/time:</strong> ${escapeHtml(submittedAt)}</p>
        <table style="border-collapse: collapse; width: 100%; margin-top: 18px;">
          <tbody>
            ${
              htmlFields ||
              '<tr><td style="padding: 12px; border: 1px solid #e5e7eb;">No fields submitted.</td></tr>'
            }
          </tbody>
        </table>
      </div>
      <style>
        th {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          color: #061734;
          padding: 10px 12px;
          text-align: left;
          vertical-align: top;
          width: 32%;
        }

        td {
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          vertical-align: top;
        }
      </style>
    `,
  }
}

async function sendWithResend({ subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM

  /*
    TODO: Add these Netlify environment variables before using live email:
    - RESEND_API_KEY: API key from Resend.
    - EMAIL_FROM: Verified sender address, such as NewGen Portal <portal@mystreamlineportal.com>.

    The recipient is intentionally forced to TEAM_EMAIL in this function.
    Do not accept recipient addresses from the frontend.
  */
  if (!apiKey || !fromEmail) {
    throw new Error('Email provider is not configured. Missing RESEND_API_KEY or EMAIL_FROM.')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: TEAM_EMAIL,
      subject,
      text,
      html,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Email provider failed with status ${response.status}: ${errorBody}`)
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true })
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed. Use POST.' })
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { formType, payload } = body

    if (!formType || typeof formType !== 'string') {
      return jsonResponse(400, { error: 'Missing or invalid formType.' })
    }

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return jsonResponse(400, { error: 'Missing or invalid payload.' })
    }

    const submittedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'long',
      timeZone: 'America/Los_Angeles',
    })
    const subject = getSubject(formType)
    const emailBody = buildEmailBody(formType, payload, submittedAt)

    await sendWithResend({
      subject,
      text: emailBody.text,
      html: emailBody.html,
    })

    return jsonResponse(200, {
      ok: true,
      message: 'Form submission email sent.',
    })
  } catch (error) {
    console.error('send-team-email failed:', error)

    return jsonResponse(500, {
      error: 'Unable to send form submission email.',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

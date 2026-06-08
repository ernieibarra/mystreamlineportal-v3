import { useEffect, useMemo, useState } from 'react'
import logo from './assets/newgen-logo.png'
import buildings from './assets/buildings.png'
import './App.css'

const TEAM_EMAIL = 'team@newgenreservices.com'
const CRM_URL = 'https://crm.mystreamlineportal.com'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Intake Form', path: '/intakeform' },
  { label: 'Team Resources', path: '/resources' },
  { label: 'Training Center', path: '/training' },
  { label: 'Appointments', path: '/appointments' },
  { label: 'CRM Login', path: '/crm' },
]

const quickAccess = [
  {
    title: 'Start Intake Form',
    text: 'Submit new client information quickly and securely.',
    button: 'Submit Intake',
    path: '/intakeform',
    icon: 'document',
  },
  {
    title: 'Team Resources',
    text: 'Access scripts, guides, templates, and important documents.',
    button: 'View Resources',
    path: '/resources',
    icon: 'folder',
  },
  {
    title: 'Training Center',
    text: 'Hone your skills with trainings, videos, and development tools.',
    button: 'Start Training',
    path: '/training',
    icon: 'training',
  },
  {
    title: 'Book Appointment',
    text: 'Schedule strategy calls, appointments, or team meetings.',
    button: 'Book Now',
    path: '/appointments',
    icon: 'calendar',
  },
  {
    title: 'CRM Login',
    text: 'Access the CRM system to manage leads and clients.',
    button: 'Open CRM',
    path: '/crm',
    icon: 'lock',
  },
]

const resourceCards = [
  ['Scripts', 'Call flows, objection handling, and client conversation tools.'],
  ['Client Guides', 'Helpful education pieces and client-facing reference material.'],
  ['Product Documents', 'Carrier, product, and compliance documents for team use.'],
  ['Templates', 'Email, text, worksheet, and workflow templates.'],
  ['Important Links', 'Frequently used systems, calculators, and support links.'],
  ['Team Announcements', 'Updates, reminders, and leadership communication.'],
]

const trainingCards = [
  ['New Agent Onboarding', 'Start here for core systems, expectations, and first-week priorities.'],
  ['Product Training', 'Build product fluency with structured carrier and solution modules.'],
  ['Appointment Setting', 'Improve outreach, follow-up, and calendar-setting skills.'],
  ['Field Training', 'Practice client meetings, discovery, and presentation flow.'],
  ['Leadership Development', 'Develop recruiting, coaching, and team-building habits.'],
  ['Weekly Team Training', 'Access weekly calls, notes, and team development sessions.'],
]

function navigateTo(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function LinkButton({ path, children, variant = 'primary', className = '' }) {
  return (
    <button
      className={`btn ${variant} ${className}`}
      onClick={() => navigateTo(path)}
      type="button"
    >
      {children}
    </button>
  )
}

function PortalIcon({ type }) {
  return (
    <span className={`portal-icon ${type}`} aria-hidden="true">
      {type === 'document' && (
        <svg viewBox="0 0 32 32">
          <path d="M9 4h11l5 5v19H9z" />
          <path d="M20 4v6h5" />
          <path d="M13 15h8M13 20h5" />
          <path d="M20 24l5-5 3 3-5 5-4 1z" />
        </svg>
      )}
      {type === 'folder' && (
        <svg viewBox="0 0 32 32">
          <path d="M4 10h10l3 4h11v12H4z" />
          <path d="M4 10v-3h9l3 3" />
        </svg>
      )}
      {type === 'training' && (
        <svg viewBox="0 0 32 32">
          <path d="M3 12l13-6 13 6-13 6z" />
          <path d="M8 15v6c4 3 12 3 16 0v-6" />
          <path d="M27 13v8" />
        </svg>
      )}
      {type === 'calendar' && (
        <svg viewBox="0 0 32 32">
          <path d="M6 8h20v19H6z" />
          <path d="M6 14h20M11 5v6M21 5v6" />
          <path d="M11 19h3M18 19h3M11 23h3M18 23h3" />
        </svg>
      )}
      {type === 'lock' && (
        <svg viewBox="0 0 32 32">
          <path d="M8 14h16v13H8z" />
          <path d="M12 14v-4a4 4 0 0 1 8 0v4" />
          <path d="M16 19v4" />
        </svg>
      )}
    </span>
  )
}

function Header({ currentPath }) {
  const [open, setOpen] = useState(false)

  function handleNavigate(path) {
    setOpen(false)
    navigateTo(path)
  }

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => handleNavigate('/')}>
        <img src={logo} alt="NewGen Leadership" />
      </button>
      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
        {navLinks.map((link) => (
          <button
            className={currentPath === link.path ? 'active' : ''}
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            type="button"
          >
            {link.label}
          </button>
        ))}
      </nav>
      <LinkButton path="/crm" className="header-cta">
        CRM Login
      </LinkButton>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src={logo} alt="NewGen Leadership" />
        <p>NewGen Leadership Team Portal</p>
      </div>
      <FooterColumn title="Quick Links" links={['Home', 'Intake Form', 'Team Resources']} />
      <FooterColumn title="Tools & Systems" links={['Training Center', 'Appointments', 'CRM Login']} />
      <FooterColumn title="Company" links={['Leadership', 'Team Portal', 'mystreamlineportal.com']} />
      <div className="footer-column">
        <h3>Contact</h3>
        <a href={`mailto:${TEAM_EMAIL}`}>{TEAM_EMAIL}</a>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map((link) => (
        <span key={link}>{link}</span>
      ))}
    </div>
  )
}

function CardGrid({ items, actionLabel = 'Open Resource' }) {
  return (
    <div className="card-grid">
      {items.map(([title, text], index) => (
        <article className="portal-card" key={title}>
          <div className="card-icon">{String(index + 1).padStart(2, '0')}</div>
          <h3>{title}</h3>
          <p>{text}</p>
          <button className={index < 2 ? 'btn small primary' : 'btn small ghost'} type="button">
            {index < 2 ? actionLabel : 'Coming Soon'}
          </button>
        </article>
      ))}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">NewGen Leadership</p>
          <h1>
            Built for <span>Leaders.</span> Powered by <span>Systems.</span>
          </h1>
          <p className="hero-copy">
            Everything our team needs in one place to manage client intake, access
            training, resources, and CRM tools so we can stay organized, move faster,
            and make a bigger impact.
          </p>
          <div className="hero-actions">
            <LinkButton path="/intakeform">Submit Intake</LinkButton>
            <LinkButton path="/resources" variant="secondary">
              View Resources
            </LinkButton>
          </div>
          <div className="trust-badges">
            <span><PortalIcon type="lock" /> Secure</span>
            <span><PortalIcon type="folder" /> Team Focused</span>
            <span><PortalIcon type="calendar" /> Results Driven</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src={buildings} alt="" />
          <div className="hero-monogram">NL</div>
        </div>
      </section>

      <section className="section quick-section">
        <div className="section-heading">
          <p className="eyebrow dark">Quick Access</p>
          <h2>Everything You Need, All in One Place</h2>
        </div>
        <div className="quick-grid">
          {quickAccess.map((item) => (
            <article className="portal-card quick-card" key={item.title}>
              <PortalIcon type={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <LinkButton
                path={item.path}
                variant={item.path === '/crm' ? 'navy small' : 'small gold'}
              >
                {item.button}
                <span className="button-arrow" aria-hidden="true">→</span>
              </LinkButton>
            </article>
          ))}
        </div>
      </section>

      <section className="team-banner">
        <div>
          <p className="eyebrow">Team Mission</p>
          <h2>We're all in this together.</h2>
          <p>One team. One mission. Helping more people and building a legacy.</p>
        </div>
        <blockquote>Alone we can do so little; together we can do so much.</blockquote>
      </section>
    </>
  )
}

function TextInput({ label, name, type = 'text', required = false }) {
  return (
    <label>
      <span>{label}</span>
      <input name={name} type={type} required={required} />
    </label>
  )
}

function TextArea({ label, name }) {
  return (
    <label className="full">
      <span>{label}</span>
      <textarea name={name} rows="4" />
    </label>
  )
}

function SelectInput({ label, name, options, required = false }) {
  return (
    <label>
      <span>{label}</span>
      <select name={name} required={required}>
        <option value="">Select one</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function CheckboxInput({ label, name }) {
  return (
    <label className="checkbox">
      <input name={name} type="checkbox" />
      <span>{label}</span>
    </label>
  )
}

async function submitNetlifyForm(formName, formData) {
  formData.set('form-name', formName)

  if (!formData.has('bot-field')) {
    formData.set('bot-field', '')
  }

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })

  if (!response.ok) {
    throw new Error('Netlify could not accept the form submission.')
  }
}

function ManagedForm({ children, formName, formType, submitLabel }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      await submitNetlifyForm(formName, new FormData(event.currentTarget))
      event.currentTarget.reset()
      setStatus('success')
      setMessage(`Thank you. Your ${formType} was submitted successfully.`)
    } catch (error) {
      setStatus('error')
      setMessage(
        `${error.message} Please try again or contact ${TEAM_EMAIL}.`,
      )
    }
  }

  return (
    <form
      action="/"
      className="form-panel"
      data-netlify="true"
      method="POST"
      name={formName}
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input name="form-name" type="hidden" value={formName} />
      <input name="formType" type="hidden" value={formType} />
      <p className="hidden-field">
        <label>
          Do not fill this out if you are human:
          <input name="bot-field" />
        </label>
      </p>
      {children}
      <button className="btn primary form-submit" disabled={status === 'loading'} type="submit">
        {status === 'loading' ? 'Submitting...' : submitLabel}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  )
}

function IntakeFormPage() {
  return (
    <PageShell
      eyebrow="Public Intake"
      title="Client Intake Form"
      text="Submit client information through a secure backend email workflow for NewGen Leadership review."
    >
      <ManagedForm
        formName="newgen-intake-form"
        formType="client intake form"
        submitLabel="Submit Intake"
      >
        <FormSection title="Proposed Insured">
          <TextInput label="First Name" name="proposedInsuredFirstName" required />
          <TextInput label="Middle Initial" name="proposedInsuredMiddleInitial" />
          <TextInput label="Last Name" name="proposedInsuredLastName" required />
          <TextInput label="Sex" name="sex" />
          <SelectInput
            label="Marital Status"
            name="maritalStatus"
            options={['Married', 'Single', 'Divorced']}
          />
          <TextInput label="Date of Birth" name="dateOfBirth" type="date" required />
          <TextInput label="Birthplace" name="birthplace" />
          <TextInput label="Spoken Language" name="spokenLanguage" />
          <TextInput label="Home Phone" name="homePhone" type="tel" />
          <TextInput label="Cell Phone" name="cellPhone" type="tel" required />
          <TextInput label="Email" name="email" type="email" required />
          <TextInput label="Address" name="address" />
          <TextInput label="Apt / Suite" name="aptSuite" />
          <TextInput label="City" name="city" />
          <TextInput label="State" name="state" />
          <TextInput label="ZIP code" name="zipCode" />
          <TextInput label="Years at Address" name="yearsAtAddress" />
          <TextInput label="ID Type" name="idType" />
          <TextInput label="ID Number" name="idNumber" />
          <TextInput label="ID Expiration" name="idExpiration" type="date" />
          <TextInput label="State Issued" name="stateIssue" />
          <SelectInput
            label="U.S. Citizen"
            name="usCitizen"
            options={['Yes', 'No', 'Permanent Resident']}
          />
          <TextInput
            label="If not a U.S. citizen, immigration status or visa type"
            name="visaStatus"
          />
          <SelectInput
            label="Height (ft)"
            name="heightFeet"
            options={['4', '5', '6', '7']}
          />
          <SelectInput
            label="Height (in)"
            name="heightInches"
            options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']}
          />
          <TextInput label="Weight" name="weight" />
          <CheckboxInput
            label="Member of Armed Forces including Reserves"
            name="armedForces"
          />
          <CheckboxInput label="Deployment Order outside USA" name="deploymentOrder" />
          <TextArea label="If yes, provide Armed Forces details" name="armedForcesDetails" />
        </FormSection>

        <FormSection title="Employment">
          <TextInput label="Employer" name="employer" />
          <TextInput label="Occupation / Duties" name="occupationDuties" />
          <TextInput label="Work Address" name="workAddress" />
          <TextInput label="Years at Employer" name="yearsAtEmployer" />
          <TextInput label="Current Annual Income" name="annualIncomeCurrent" />
          <TextInput label="Previous Annual Income" name="annualIncomePrevious" />
          <TextInput label="Net Worth" name="netWorth" />
          <TextInput label="Work Phone" name="workPhone" type="tel" />
          <SelectInput label="Retirement Plan" name="retirementPlan" options={['Yes', 'No']} />
        </FormSection>

        <FormSection title="Medical">
          <SelectInput
            label="Do you smoke or use drugs?"
            name="smokeOrDrugs"
            options={['Yes', 'No']}
          />
          <TextInput label="If yes, type and when used last" name="smokeDrugDetails" />
          <SelectInput label="Surgeries" name="surgeries" options={['Yes', 'No']} />
          <TextInput label="If yes, please explain surgeries" name="surgeriesExplain" />
          <SelectInput label="Illnesses" name="illnesses" options={['Yes', 'No']} />
          <TextInput label="If yes, please explain illnesses" name="illnessesExplain" />
          <SelectInput
            label="Health Score (1-5)"
            name="healthScore"
            options={['1', '2', '3', '4', '5']}
          />
          <TextInput label="Personal Physician" name="physicianName" />
          <TextInput label="Physician Phone" name="physicianPhone" type="tel" />
          <TextInput label="Physician Address" name="physicianAddress" />
          <TextInput label="Date of Last Visit" name="lastVisitDate" type="date" />
          <TextInput label="Reason for Last Visit" name="lastVisitReason" />
          <TextInput label="Results of Last Visit" name="lastVisitResults" />
          <SelectInput label="Medications?" name="medicationsYesNo" options={['Yes', 'No']} />
          <SelectInput
            label="Authorize Health & Medical Information Release to Agent?"
            name="authorizeReleaseToAgent"
            options={['Yes', 'No']}
          />
        </FormSection>

        <FormSection title="Medications">
          <TextInput label="Medication Name" name="medication1Name" />
          <TextInput label="Frequency" name="medication1Frequency" />
          <TextInput label="Usage" name="medication1Usage" />
          <TextInput label="Dosage (mg)" name="medication1Dosage" />
          <TextInput label="Additional Medication Name" name="medication2Name" />
          <TextInput label="Frequency" name="medication2Frequency" />
          <TextInput label="Usage" name="medication2Usage" />
          <TextInput label="Dosage (mg)" name="medication2Dosage" />
          <TextArea label="Additional medication notes" name="medicationNotes" />
        </FormSection>

        <FormSection title="Beneficiaries">
          <TextInput label="Name" name="beneficiary1Name" />
          <TextInput label="Relation" name="beneficiary1Relation" />
          <TextInput label="Date of Birth" name="beneficiary1Dob" type="date" />
          <TextInput label="Share %" name="beneficiary1Share" />
          <SelectInput
            label="Type"
            name="beneficiary1Type"
            options={['Primary', 'Contingent']}
          />
          <TextInput label="Phone" name="beneficiary1Phone" type="tel" />
          <TextInput label="Email" name="beneficiary1Email" type="email" />
          <TextInput label="Additional Beneficiary Name" name="beneficiary2Name" />
          <TextInput label="Relation" name="beneficiary2Relation" />
          <TextInput label="Date of Birth" name="beneficiary2Dob" type="date" />
          <TextInput label="Share %" name="beneficiary2Share" />
          <SelectInput
            label="Type"
            name="beneficiary2Type"
            options={['Primary', 'Contingent']}
          />
          <TextInput label="Phone" name="beneficiary2Phone" type="tel" />
          <TextInput label="Email" name="beneficiary2Email" type="email" />
        </FormSection>

        <FormSection title="Authorization">
          <label className="checkbox full">
            <input name="authorizationConfirmed" type="checkbox" required />
            <span>
              Client authorizes the release and review of health and medical
              information to the agent for intake and coverage evaluation.
            </span>
          </label>
          <TextInput label="Signature/name" name="signatureName" required />
          <TextInput label="Date" name="authorizationDate" type="date" required />
        </FormSection>
      </ManagedForm>
    </PageShell>
  )
}

function FormSection({ title, children }) {
  return (
    <fieldset>
      <legend>{title}</legend>
      <div className="form-grid">{children}</div>
    </fieldset>
  )
}

function ResourcesPage() {
  return (
    <PageShell
      eyebrow="Team Resources"
      title="Leadership Resource Library"
      text="A polished home for scripts, guides, templates, documents, announcements, and important links."
    >
      <CardGrid items={resourceCards} />
    </PageShell>
  )
}

function TrainingPage() {
  return (
    <PageShell
      eyebrow="Training Center"
      title="Build Skill. Build Leaders."
      text="Access development paths for agents, field work, appointment setting, products, and leadership growth."
    >
      <CardGrid items={trainingCards} actionLabel="Start Training" />
    </PageShell>
  )
}

function AppointmentsPage() {
  return (
    <PageShell
      eyebrow="Appointments"
      title="Book an Appointment"
      text="Schedule strategy calls, client appointments, or team meetings."
    >
      <div className="booking-layout">
        <aside className="booking-card">
          <h3>Booking Desk</h3>
          <p>
            Requests are routed to {TEAM_EMAIL}. Final calendar automation should run
            through a secure backend or approved scheduling provider.
          </p>
          <span>Strategy Calls</span>
          <span>Client Appointments</span>
          <span>Team Meetings</span>
        </aside>
        <ManagedForm
          formName="newgen-appointment-form"
          formType="appointment request"
          submitLabel="Request Appointment"
        >
          <FormSection title="Appointment Details">
            <TextInput label="Name" name="name" required />
            <TextInput label="Email" name="email" type="email" required />
            <TextInput label="Phone" name="phone" type="tel" />
            <SelectInput
              label="Appointment type"
              name="appointmentType"
              options={['Strategy Call', 'Client Appointment', 'Team Meeting']}
              required
            />
            <TextInput label="Preferred date" name="preferredDate" type="date" required />
            <TextInput label="Preferred time" name="preferredTime" type="time" required />
            <TextArea label="Notes" name="notes" />
          </FormSection>
        </ManagedForm>
      </div>
    </PageShell>
  )
}

function CrmPage() {
  return (
    <PageShell
      eyebrow="Protected System"
      title="NewGen CRM Access"
      text="Secure internal access for authorized team members only."
    >
      <section className="crm-panel">
        <img src={logo} alt="NewGen Leadership" />
        <div>
          <h3>CRM Login</h3>
          <p>
            The CRM lives on the Hostinger server. Update the CRM_URL constant in
            App.jsx when the final protected address is ready.
          </p>
        </div>
        <a className="btn primary" href={CRM_URL} rel="noreferrer" target="_blank">
          Open CRM
        </a>
        <p className="warning">Authorized users only. Do not share CRM access credentials.</p>
      </section>
    </PageShell>
  )
}

function PageShell({ eyebrow, title, text, children }) {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </section>
      <section className="section">{children}</section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <PageShell
      eyebrow="Portal"
      title="Page Not Found"
      text="The page you requested is not part of the NewGen Leadership portal."
    >
      <LinkButton path="/">Return Home</LinkButton>
    </PageShell>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const page = useMemo(() => {
    switch (path) {
      case '/':
        return <HomePage />
      case '/intakeform':
        return <IntakeFormPage />
      case '/resources':
        return <ResourcesPage />
      case '/training':
        return <TrainingPage />
      case '/appointments':
        return <AppointmentsPage />
      case '/crm':
        return <CrmPage />
      default:
        return <NotFoundPage />
    }
  }, [path])

  return (
    <>
      <Header currentPath={path} />
      {page}
      <Footer />
    </>
  )
}

export default App

import { useEffect, useMemo, useState } from 'react'
import logo from './assets/newgen-logo.png'
import buildings from './assets/buildings.png'
import './App.css'

const TEAM_EMAIL = 'team@newgenreservices.com'
const CRM_URL = 'https://crm.mystreamlineportal.com'
const TEAM_SIGNUP_URL = 'https://tevahtech.com/signup/A2152'
const CALENDLY_URL = 'https://calendly.com/life-ernieibarra/30min'

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

const driveResources = {
  onboardingSchool: {
    name: 'Onboarding School',
    type: 'Google Docs',
    url: 'https://drive.google.com/file/d/1BEa4mMUfmQWg4ZbBzgkHqFK6H0ebUVeY2K4E8fia2VA/view',
  },
  orientationPart1: {
    name: 'Orientation Class Part I',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1bYiN4HQ9hjUkkx3ruodMksEycoFE0gJ0/view',
  },
  orientationPart2: {
    name: 'Orientation Class Part II',
    type: 'Unknown',
    url: 'https://drive.google.com/file/d/1bAGnSOEAgXgbkXd3PxMBhHPZfD6nV4CG/view',
  },
  orientationInProgress: {
    name: 'Orientation Class In Progress',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/19c9PYRPneNUbvB2Qv5PlPqrEUnSuAOhm/view',
  },
  onboarding1: {
    name: 'Onboarding 1 In Progress',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1XPzWpJzy3qRqpHwEu6zuCRu4p4JsqUOY/view',
  },
  onboarding2: {
    name: 'Onboarding 2 Updated',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1O6R10JmcQ6cWLsIntrU6ky7piYSQPsNU/view',
  },
  onboarding3: {
    name: 'Onboarding 3 In Progress',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1rYeibhcCV5OOut4uqMJFJC_SIh4bQg5W/view',
  },
  week1: {
    name: 'Week 1 Onboarding',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/108sRmbCJmuScQKp8Ux0OCjxLnxFbOLu1/view',
  },
  week2: {
    name: 'Week 2 Onboarding',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1X8z33KZ5Fl5L3ORD2NxXyFlr3rJt_HOX/view',
  },
  week3: {
    name: 'Week 3 Onboarding',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1EPAA-ANot7roGMofWssRhYes3UmnqtGP/view',
  },
  systemManual: {
    name: 'System Manual',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1CpSUiHXkmewOysNm5YDtciTpSC6ocsnX/view',
  },
  fexCheat: {
    name: 'FEX Product Cheat Sheet',
    type: 'Unknown',
    url: 'https://drive.google.com/file/d/15bemD1NzZfqe5rKgVQddd4c_UBQzqq7v/view',
  },
  emdManual: {
    name: 'EMD Manual',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1fnNiu2un8iJmE2A_jSerSrK1FwKPqTxl/view',
  },
  fieldSalesManual: {
    name: 'Field Training Sales Manual',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/10VzJ3kXrsHK9CVV_QJsQnOe04YiHjGY2/view',
  },
  objectionHandling: {
    name: 'Objection Handling',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1SJQ2fyd11oOXiXBkSvcjPo6ZNC77y8A0/view',
  },
  leadsManual: {
    name: 'Leads Manual',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1VoxtPgViZqqb6vyXW8JNgCmkyJWmDNry/view',
  },
  annualFund: {
    name: 'Annual Fund Calculator',
    type: 'Spreadsheet',
    url: 'https://drive.google.com/file/d/1V8q4OMHucJv63QpvuY60W0MsV9U6zfS3e0WNvVf2aB8/view',
  },
  leadsSetup: {
    name: 'Leads Setup',
    type: 'Unknown',
    url: 'https://drive.google.com/file/d/1dF-gM9YjURvWA9dp12v54_qwAzwIchu3EOx9jsPyBYI/view',
  },
  leadsTexts: {
    name: 'Leads Texts',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1zlHTp8kJTyAP7jXmaaoS5k8mDpkmsYAe/view',
  },
  bmpPresentation: {
    name: 'BMP Client Presentation',
    type: 'Unknown',
    url: 'https://drive.google.com/file/d/1RN5P4raB6EylsXalRzmmOKA5TKPC7qATvWJcKxj4D4I/view',
  },
  updatedFieldTraining: {
    name: 'Updated Field Training Presentation',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1LTMO119J2iBrRSKNSjt7ktpwbpGWL48n/view',
  },
  fieldTrainingPresentation: {
    name: 'Field Training Presentation',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1dmn5EdzjPVJZbxQ7TXeWpIfuZryJUOy2/view',
  },
  financialQuestionnaire: {
    name: 'Financial Questionnaire',
    type: 'Spreadsheet',
    url: 'https://drive.google.com/file/d/1bKzuNX8vrGqmb9ydKAaQmNLXy3o9wGKQ/view',
  },
  bucketsDime: {
    name: '4 Buckets + Dime',
    type: 'Unknown',
    url: 'https://drive.google.com/file/d/1hsg1VAeCTJpI74Q5bUfi8DLaNj02VAiS/view',
  },
  recruitingBuilding: {
    name: 'Recruiting Building Manual',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1ZW_2JuPUJipDBp1muROZCQIytcw75Cx6/view',
  },
  recruitingInterview: {
    name: 'Recruiting Interview',
    type: 'PowerPoint',
    url: 'https://drive.google.com/file/d/1PKjEDmOkX-eUGKcA_PukYjf59JIHKI14/view',
  },
  industry: {
    name: 'The Industry',
    type: 'Unknown',
    url: 'https://drive.google.com/file/d/1og6OeaHi_kTNs9RPaVB5ExUepCenMToYRe_h3hTyOtQ/view',
  },
  accountabilityTracker: {
    name: 'CFT Accountability Tracker',
    type: 'Spreadsheet',
    url: 'https://drive.google.com/file/d/1GLJICpqbhvmz_2Th8mnwnL-O17pl5YSan8mq13kKLL8/view',
  },
  systemProgressions: {
    name: 'System Progressions GFI',
    type: 'Spreadsheet',
    url: 'https://drive.google.com/file/d/14UAtS3CNSBay3-Rj0Wpew-tY1R5qfNtV/view',
  },
  policyPipeline: {
    name: 'EMD Policy Pipeline Master Copy',
    type: 'Spreadsheet',
    url: 'https://drive.google.com/file/d/1ergWDxILkr8fN8R15N0m85bBTGI2mz1I/view',
  },
  policyPipelineClient: {
    name: 'EMD Policy Pipeline Master Copy Client',
    type: 'Spreadsheet',
    url: 'https://drive.google.com/file/d/115mg4074YR3pA7CDRswTecFghrkjSv6X/view',
  },
  moversShakers: {
    name: 'Movers and Shakers',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1nBJBA1n-UvIaRu2Un_YjHy-LZ6YvgHgYTiAQVK2lEA8/view',
  },
  friendshipFarm: {
    name: 'Friendship Farm',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1Koz4p1q2ayNK4ruv0WpapDRiVb_BRtB3joQEDx_r0Xo/view',
  },
  businessCard: {
    name: 'Business Card',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1QGCOKnX7HSzg1h1ALNtdX1Lxa1n-IsnsyTSlcBj1fEo/view',
  },
  businessPerson: {
    name: 'Business Person Script',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1kIHfmQ4LZlAELLR_NZeysbb9oHmqf4RQoqaBQBS1KoY/view',
  },
  instagram: {
    name: 'Instagram',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1S4NT9vi2gx02h_TKzuIvqQQbaeF_M7ErSNBZnheTbCk/view',
  },
  linkedin: {
    name: 'LinkedIn',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1B_Yj0kmQ_WVc40BLTe1PuGzr13uwRJZIi3aszPPGvVE/view',
  },
  runningPromotion: {
    name: 'Running for Promotion',
    type: 'Word',
    url: 'https://drive.google.com/file/d/17usb5MMspXJ32zUQoySNdlLgO8NDoTHQbEUGNR9FTeM/view',
  },
  facebookGroup: {
    name: 'Facebook Group',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1gXXzzl65VvntuyAYgyq7H-SW1BHUWQGog-3YYejhS7Y/view',
  },
  expandingBusiness: {
    name: 'Expanding My Business',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1eD6QsDErCc62ylFZgkZ-wchVii2_rhmVJx83vcsDaxY/view',
  },
  coldMarket: {
    name: 'Cold Market',
    type: 'Word',
    url: 'https://drive.google.com/file/d/17jXXZZKMJFIzbwR4ET2u0rQrnDQ8LCoLbiO5NbaV6CY/view',
  },
  closeFriend: {
    name: 'Close Friend',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1_mzKMu-lAqdZ5MELNAk6z_FgnncLOoeSUPKR11Kt85g/view',
  },
  lukeWarm: {
    name: 'Luke Warm Market',
    type: 'Word',
    url: 'https://drive.google.com/file/d/1hGqGzqPWyXpm6jNxo56wvpn--7E-P3H8TF2_3Fx0y9w/view',
  },
  tevahLicensing: {
    name: 'TEVAH Licensing',
    type: 'Shortcut',
    url: 'https://drive.google.com/file/d/1AF3Ld-6lld67FMM21OFkW_0jxHCNRaDi/view',
  },
  books: {
    name: 'Books',
    type: 'Shortcut',
    url: 'https://drive.google.com/file/d/1COz999NIixCQik2FQV32po_7eHZm04HW/view',
  },
}

const trainingSections = [
  {
    title: 'New Agent Onboarding',
    items: [
      driveResources.onboardingSchool,
      driveResources.orientationPart1,
      driveResources.orientationPart2,
      driveResources.orientationInProgress,
      driveResources.onboarding1,
      driveResources.onboarding2,
      driveResources.onboarding3,
      driveResources.week1,
      driveResources.week2,
      driveResources.week3,
      driveResources.systemManual,
    ],
  },
  {
    title: 'Product Training',
    items: [
      driveResources.fexCheat,
      driveResources.emdManual,
      driveResources.fieldSalesManual,
      driveResources.objectionHandling,
      driveResources.leadsManual,
      driveResources.annualFund,
    ],
  },
  {
    title: 'Appointment Setting',
    items: [driveResources.leadsSetup, driveResources.leadsTexts, driveResources.leadsManual],
  },
  {
    title: 'Field Training',
    items: [
      driveResources.bmpPresentation,
      driveResources.updatedFieldTraining,
      driveResources.fieldTrainingPresentation,
      driveResources.financialQuestionnaire,
      driveResources.bucketsDime,
      driveResources.annualFund,
    ],
  },
  {
    title: 'Leadership Development',
    items: [
      driveResources.recruitingBuilding,
      driveResources.recruitingInterview,
      driveResources.industry,
    ],
  },
  {
    title: 'Weekly Team Training',
    items: [
      driveResources.accountabilityTracker,
      driveResources.systemProgressions,
      driveResources.policyPipeline,
      driveResources.policyPipelineClient,
    ],
  },
]

const resourceSections = [
  {
    title: 'Recruiting Scripts',
    items: [
      driveResources.moversShakers,
      driveResources.friendshipFarm,
      driveResources.businessCard,
      driveResources.businessPerson,
      driveResources.instagram,
      driveResources.linkedin,
      driveResources.runningPromotion,
      driveResources.facebookGroup,
      driveResources.expandingBusiness,
      driveResources.coldMarket,
      driveResources.closeFriend,
      driveResources.lukeWarm,
    ],
  },
  {
    title: 'Client Guides / Tools',
    items: [
      driveResources.fexCheat,
      driveResources.bmpPresentation,
      driveResources.financialQuestionnaire,
      driveResources.annualFund,
      driveResources.bucketsDime,
    ],
  },
  {
    title: 'Other',
    items: [driveResources.tevahLicensing, driveResources.books],
  },
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

function ExternalButton({ href, children, variant = 'primary', className = '' }) {
  return (
    <a className={`btn ${variant} ${className}`} href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
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

function ResourceCard({ resource, section }) {
  return (
    <article className="resource-card">
      <div className="resource-card-top">
        <span className="type-badge">{resource.type || 'Unknown'}</span>
        <span className="section-badge">{section}</span>
      </div>
      <h3>{resource.name}</h3>
      <a className="btn small primary" href={resource.url} rel="noreferrer" target="_blank">
        Open Resource
      </a>
    </article>
  )
}

function ResourceSection({ title, items, children }) {
  return (
    <section className="resource-section">
      <div className="resource-section-heading">
        <h2>{title}</h2>
        <span>{items.length} resources</span>
      </div>
      {children}
      <div className="resource-grid">
        {items.map((resource) => (
          <ResourceCard key={`${title}-${resource.name}`} resource={resource} section={title} />
        ))}
      </div>
    </section>
  )
}

function ResourceHub({ sections, onboardingAction = false }) {
  return (
    <div className="resource-hub">
      {sections.map((section, index) => (
        <ResourceSection items={section.items} key={section.title} title={section.title}>
          {onboardingAction && index === 0 ? (
            <div className="resource-callout">
              <div>
                <h3>Ready to start onboarding?</h3>
                <p>Join the team first, then work through the onboarding resources below.</p>
              </div>
              <ExternalButton href={TEAM_SIGNUP_URL} variant="primary">
                Join My Team
              </ExternalButton>
            </div>
          ) : null}
        </ResourceSection>
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
            <ExternalButton href={TEAM_SIGNUP_URL} variant="secondary">
              Join My Team
            </ExternalButton>
            <LinkButton path="/appointments" variant="secondary">
              Book an Appointment
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
    const formElement = event.currentTarget
    setStatus('loading')
    setMessage('')

    try {
      await submitNetlifyForm(formName, new FormData(formElement))
      formElement.reset()
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
      text="Google Drive resources for recruiting scripts, client tools, licensing, and team reference materials."
    >
      <ResourceHub sections={resourceSections} />
    </PageShell>
  )
}

function TrainingPage() {
  return (
    <PageShell
      eyebrow="Training Center"
      title="Build Skill. Build Leaders."
      text="Structured Google Drive training resources for onboarding, products, appointment setting, field training, leadership, and weekly systems."
    >
      <ResourceHub onboardingAction sections={trainingSections} />
    </PageShell>
  )
}

function AppointmentsPage() {
  return (
    <PageShell
      eyebrow="Appointments"
      title="Book an Appointment"
      text="Choose an available time below and Calendly will handle confirmation, reminders, and calendar availability."
    >
      <section className="calendly-panel">
        <div className="calendly-header">
          <div>
            <h3>Choose Your Time</h3>
            <p>Calendly will show live availability and send booking confirmations.</p>
          </div>
          <ExternalButton href={CALENDLY_URL} variant="primary">
            Open Calendly
          </ExternalButton>
        </div>
        <iframe
          className="calendly-frame"
          src={CALENDLY_URL}
          title="Book an appointment with NewGen Leadership"
        />
      </section>
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

import { useEffect, useMemo, useState } from 'react'
import logo from './assets/newgen-logo.png'
import buildings from './assets/buildings.png'
import './App.css'

const TEAM_EMAIL = 'team@newgenreservices.com'
const CRM_URL = 'https://crm.mystreamlineportal.com'
const TEAM_SIGNUP_URL = 'https://tevahtech.com/signup/A2152'
const CALENDLY_URL = 'https://calendly.com/life-ernieibarra/30min'
const beneficiarySlots = Array.from({ length: 6 }, (_, index) => index + 1)
const childSlots = Array.from({ length: 6 }, (_, index) => index + 1)
const projectionYears = Array.from({ length: 30 }, (_, index) => index + 1)

const coiTable = [
  { age: 30, preferredPlus: 0.53, standard: 0.77, preferred: 0.62 },
  { age: 31, preferredPlus: 0.53, standard: 0.77, preferred: 0.62 },
  { age: 32, preferredPlus: 0.53, standard: 0.78, preferred: 0.62 },
  { age: 33, preferredPlus: 0.53, standard: 0.81, preferred: 0.62 },
  { age: 34, preferredPlus: 0.53, standard: 0.84, preferred: 0.62 },
  { age: 35, preferredPlus: 0.57, standard: 0.88, preferred: 0.65 },
  { age: 36, preferredPlus: 0.61, standard: 0.93, preferred: 0.69 },
  { age: 37, preferredPlus: 0.66, standard: 0.98, preferred: 0.73 },
  { age: 38, preferredPlus: 0.73, standard: 1.05, preferred: 0.79 },
  { age: 39, preferredPlus: 0.81, standard: 1.13, preferred: 0.86 },
  { age: 40, preferredPlus: 0.9, standard: 1.24, preferred: 0.95 },
  { age: 41, preferredPlus: 0.97, standard: 1.32, preferred: 1.01 },
  { age: 42, preferredPlus: 1.03, standard: 1.41, preferred: 1.07 },
  { age: 43, preferredPlus: 1.08, standard: 1.51, preferred: 1.15 },
  { age: 44, preferredPlus: 1.13, standard: 1.63, preferred: 1.24 },
  { age: 45, preferredPlus: 1.19, standard: 1.75, preferred: 1.33 },
  { age: 46, preferredPlus: 1.27, standard: 1.85, preferred: 1.41 },
  { age: 47, preferredPlus: 1.37, standard: 1.97, preferred: 1.51 },
  { age: 48, preferredPlus: 1.49, standard: 2.09, preferred: 1.61 },
  { age: 49, preferredPlus: 1.63, standard: 2.25, preferred: 1.74 },
  { age: 50, preferredPlus: 1.78, standard: 2.42, preferred: 1.87 },
  { age: 51, preferredPlus: 1.95, standard: 2.6, preferred: 2.02 },
  { age: 52, preferredPlus: 2.07, standard: 2.78, preferred: 2.15 },
  { age: 53, preferredPlus: 2.19, standard: 2.97, preferred: 2.3 },
  { age: 54, preferredPlus: 2.31, standard: 3.17, preferred: 2.45 },
  { age: 55, preferredPlus: 2.45, standard: 3.4, preferred: 2.63 },
  { age: 56, preferredPlus: 2.63, standard: 3.68, preferred: 2.84 },
  { age: 57, preferredPlus: 2.83, standard: 3.97, preferred: 3.07 },
  { age: 58, preferredPlus: 3.02, standard: 4.29, preferred: 3.31 },
  { age: 59, preferredPlus: 3.21, standard: 4.63, preferred: 3.57 },
  { age: 60, preferredPlus: 3.39, standard: 5, preferred: 3.85 },
  { age: 61, preferredPlus: 3.57, standard: 5.41, preferred: 4.16 },
  { age: 62, preferredPlus: 3.79, standard: 5.87, preferred: 4.5 },
  { age: 63, preferredPlus: 4.09, standard: 6.37, preferred: 4.88 },
  { age: 64, preferredPlus: 4.43, standard: 6.94, preferred: 5.3 },
  { age: 65, preferredPlus: 4.84, standard: 7.61, preferred: 5.81 },
  { age: 66, preferredPlus: 5.32, standard: 8.37, preferred: 6.38 },
  { age: 67, preferredPlus: 5.85, standard: 9.24, preferred: 7.04 },
  { age: 68, preferredPlus: 6.48, standard: 10.25, preferred: 7.8 },
  { age: 69, preferredPlus: 7.19, standard: 11.39, preferred: 8.67 },
  { age: 70, preferredPlus: 7.98, standard: 12.66, preferred: 9.63 },
  { age: 71, preferredPlus: 8.9, standard: 14.12, preferred: 10.74 },
  { age: 72, preferredPlus: 9.92, standard: 15.75, preferred: 11.97 },
  { age: 73, preferredPlus: 11.07, standard: 17.59, preferred: 13.37 },
  { age: 74, preferredPlus: 12.35, standard: 19.64, preferred: 14.92 },
  { age: 75, preferredPlus: 13.77, standard: 21.91, preferred: 16.64 },
  { age: 76, preferredPlus: 15.34, standard: 24.42, preferred: 18.55 },
  { age: 77, preferredPlus: 17.12, standard: 27.27, preferred: 20.7 },
  { age: 78, preferredPlus: 19.08, standard: 30.39, preferred: 23.07 },
  { age: 79, preferredPlus: 21.27, standard: 33.87, preferred: 25.71 },
  { age: 80, preferredPlus: 23.66, standard: 37.68, preferred: 28.61 },
  { age: 81, preferredPlus: 26.39, standard: 42.01, preferred: 31.9 },
  { age: 82, preferredPlus: 30.04, standard: 47.54, preferred: 36.18 },
  { age: 83, preferredPlus: 34.12, standard: 53.7, preferred: 40.94 },
  { age: 84, preferredPlus: 38.74, standard: 60.62, preferred: 46.32 },
  { age: 85, preferredPlus: 26.84, standard: 37.43, preferred: 30.66 },
  { age: 86, preferredPlus: 33.15, standard: 45.74, preferred: 37.57 },
  { age: 87, preferredPlus: 41.24, standard: 55.59, preferred: 45.77 },
  { age: 88, preferredPlus: 51.36, standard: 67.64, preferred: 55.81 },
  { age: 89, preferredPlus: 64.61, standard: 82.65, preferred: 68.39 },
]

const perUnitChargeByRateClass = {
  preferredPlus: 2.14,
  standard: 2.45,
  preferred: 2.33,
}

const calculatorDefaults = {
  annualPremium: 150000,
  creditingRate: 7,
  deathBenefitOption: 'increasing',
  faceAmount: 2000000,
  issueAge: 45,
  loanCreditSpread: 0.5,
  loanOverrides: {},
  loanPercent: 75,
  loanRate: 5,
  policyFeeMonthly: 7.5,
  premiumOverrides: {},
  premiumLoadYearOne: 9,
  premiumLoadRenewal: 5,
  rateClass: 'preferredPlus',
  yearOnePremium: 200000,
  yearsOfFunding: 10,
}

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Intake Form', path: '/intakeform' },
  { label: 'Team Resources', path: '/resources' },
  { label: 'Training Center', path: '/training' },
  { label: 'Virtual Office', path: '/office' },
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
    title: 'Virtual Office',
    text: 'Join live team rooms for training, conferences, and collaboration.',
    button: 'Open Office',
    path: '/office',
    icon: 'office',
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

const officeRooms = [
  {
    name: 'Yesenia Ibarra',
    description: 'Direct room for Yesenia Ibarra.',
    meetingId: '875 3289 2436',
    url: 'https://us06web.zoom.us/j/87532892436?pwd=RaR9o5Axu0aDx9N3krc4lals1hiZmM.1',
  },
  {
    name: 'Ernie Ibarra',
    description: 'Direct room for Ernie Ibarra.',
    meetingId: '879 0134 2910',
    url: 'https://us06web.zoom.us/j/87901342910?pwd=r6ARquNqPFbsAbdBWfcv3qWk1tWzJ4.1',
  },
  {
    name: 'Conference Room 1',
    description: 'Team meeting room for calls and collaboration.',
    meetingId: '831 6988 9359',
    url: 'https://us06web.zoom.us/j/83169889359?pwd=zo15GFIMEveJOlfwT1AxY2V6MJOXfY.1',
  },
  {
    name: 'Conference Room 2',
    description: 'Second team meeting room for parallel sessions.',
    meetingId: '859 5640 7860',
    url: 'https://us06web.zoom.us/j/85956407860?pwd=NfNyu031f1DYMy5Z7GaExfgwY9CVO9.1',
  },
  {
    name: 'Training',
    description: 'Training room for onboarding, practice, and development.',
    meetingId: '898 5994 4597',
    url: 'https://us06web.zoom.us/j/89859944597?pwd=tbJtQOPF69g7R6PGF5OkBr62WX1NWZ.1',
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

function normalizePath(path) {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1)
  }

  return path
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

function toNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function hasOverrideValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== ''
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

function formatDecimal(value, digits = 2) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function formatPercent(value, digits = 2) {
  return `${formatDecimal(value * 100, digits)}%`
}

function getCoiRate(age, rateClass) {
  const exactRate = coiTable.find((row) => row.age === age)

  if (exactRate) {
    return exactRate[rateClass]
  }

  if (age < coiTable[0].age) {
    return coiTable[0][rateClass]
  }

  return coiTable[coiTable.length - 1][rateClass]
}

function calculateIulProjection(inputs) {
  const config = {
    annualPremium: toNumber(inputs.annualPremium),
    creditingRate: toNumber(inputs.creditingRate) / 100,
    deathBenefitOption: inputs.deathBenefitOption,
    faceAmount: toNumber(inputs.faceAmount),
    issueAge: toNumber(inputs.issueAge),
    loanPercent: toNumber(inputs.loanPercent) / 100,
    loanRate: toNumber(inputs.loanRate) / 100,
    loanCreditSpread: toNumber(inputs.loanCreditSpread) / 100,
    policyFeeMonthly: toNumber(inputs.policyFeeMonthly),
    loanOverrides: inputs.loanOverrides || {},
    premiumOverrides: inputs.premiumOverrides || {},
    premiumLoadRenewal: toNumber(inputs.premiumLoadRenewal) / 100,
    premiumLoadYearOne: toNumber(inputs.premiumLoadYearOne) / 100,
    rateClass: inputs.rateClass,
    yearsOfFunding: Math.max(0, Math.floor(toNumber(inputs.yearsOfFunding))),
    yearOnePremium: toNumber(inputs.yearOnePremium),
  }
  const perUnitRate = perUnitChargeByRateClass[config.rateClass] || 0
  let cashValue = 0
  let policyLoans = 0

  const rows = projectionYears.map((year) => {
    const age = config.issueAge + year - 1
    const previousCashValue = cashValue
    const defaultPremium =
      year === 1
        ? config.yearOnePremium > 0 ? config.yearOnePremium : config.annualPremium
        : year <= config.yearsOfFunding ? config.annualPremium : 0
    const premium = hasOverrideValue(config.premiumOverrides[year])
      ? toNumber(config.premiumOverrides[year])
      : defaultPremium
    const policyLoanTaken = hasOverrideValue(config.loanOverrides[year])
      ? toNumber(config.loanOverrides[year])
      : premium * config.loanPercent

    policyLoans += policyLoanTaken

    const loanInterest = policyLoans * config.loanRate
    const loanCreditOffset = policyLoans * Math.max(0, config.loanRate + config.loanCreditSpread)
    const coiRate = getCoiRate(age, config.rateClass)
    const coi =
      config.deathBenefitOption === 'increasing'
        ? (config.faceAmount / 1000) * coiRate
        : Math.max(0, (config.faceAmount - previousCashValue) / 1000) * coiRate
    const policyFees = config.policyFeeMonthly * 12
    const perUnitCharge = year <= 15 ? (config.faceAmount / 1000) * perUnitRate : 0
    const policyCosts = coi + policyFees + perUnitCharge
    const totalCost = loanInterest + policyCosts
    const premiumLoad = year === 1 ? config.premiumLoadYearOne : config.premiumLoadRenewal
    const basisBeforeGrowth =
      previousCashValue + premium * (1 - premiumLoad) - coi - policyFees - perUnitCharge
    const policyGrowth = basisBeforeGrowth * config.creditingRate
    const net = policyGrowth - policyCosts - loanInterest + loanCreditOffset

    cashValue = basisBeforeGrowth * (1 + config.creditingRate)

    const netEquity = cashValue - policyLoans
    const loanToCashValue = cashValue ? policyLoans / cashValue : 0
    const deathBenefit =
      config.deathBenefitOption === 'increasing'
        ? config.faceAmount + cashValue
        : config.faceAmount
    const netDeathBenefit = deathBenefit - policyLoans
    const loanToDeathBenefit = deathBenefit ? policyLoans / deathBenefit : 0
    const breakEvenCreditingRate =
      basisBeforeGrowth > 0 ? (policyCosts + loanInterest - loanCreditOffset) / basisBeforeGrowth : 0

    return {
      age,
      breakEvenCreditingRate,
      cashValue,
      coi,
      deathBenefit,
      loanInterest,
      loanCreditOffset,
      net,
      netDeathBenefit,
      netEquity,
      loanToCashValue,
      loanToDeathBenefit,
      perUnitCharge,
      policyFees,
      policyCosts,
      policyGrowth,
      policyLoanTaken,
      policyLoans,
      premium,
      premiumOverridden: hasOverrideValue(config.premiumOverrides[year]),
      loanOverridden: hasOverrideValue(config.loanOverrides[year]),
      totalCost,
      year,
    }
  })

  const totals = rows.reduce(
    (summary, row) => ({
      loanCreditOffset: summary.loanCreditOffset + row.loanCreditOffset,
      loanInterest: summary.loanInterest + row.loanInterest,
      netGain: summary.netGain + row.net,
      policyCosts: summary.policyCosts + row.policyCosts,
      policyGrowth: summary.policyGrowth + row.policyGrowth,
      policyLoansTaken: summary.policyLoansTaken + row.policyLoanTaken,
      premiumFunded: summary.premiumFunded + row.premium,
      totalCost: summary.totalCost + row.totalCost,
    }),
    {
      loanInterest: 0,
      loanCreditOffset: 0,
      netGain: 0,
      policyCosts: 0,
      policyGrowth: 0,
      policyLoansTaken: 0,
      premiumFunded: 0,
      totalCost: 0,
    },
  )
  const finalYear = rows[rows.length - 1]

  return {
    finalYear,
    perUnitRate,
    rows,
    totals: {
      ...totals,
      earnedPerDollarCharged: totals.totalCost ? totals.policyGrowth / totals.totalCost : 0,
    },
  }
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
      {type === 'office' && (
        <svg viewBox="0 0 32 32">
          <path d="M5 27V8l11-4 11 4v19" />
          <path d="M10 13h4M18 13h4M10 18h4M18 18h4" />
          <path d="M13 27v-5h6v5" />
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
      <FooterColumn title="Tools & Systems" links={['Training Center', 'Virtual Office', 'Appointments', 'CRM Login']} />
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

function TextInput({ label, name, type = 'text', required = false, autoComplete, inputMode, pattern }) {
  return (
    <label>
      <span>{label}</span>
      <input
        autoComplete={autoComplete}
        inputMode={inputMode}
        name={name}
        pattern={pattern}
        required={required}
        type={type}
      />
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
      <div className="submit-panel" id="submit-intake">
        <p>Finished? Submit the full intake once all applicable sections are complete.</p>
        <button className="btn primary form-submit" disabled={status === 'loading'} type="submit">
          {status === 'loading' ? 'Submitting...' : submitLabel}
        </button>
      </div>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  )
}

function IntakeFormPage() {
  const [includeSpouse, setIncludeSpouse] = useState(false)
  const [childCount, setChildCount] = useState('0')
  const visibleChildSlots = childSlots.slice(0, Number(childCount))
  const intakeSections = [
    { id: 'proposed-insured', label: 'Proposed Insured' },
    { id: 'family-members', label: 'Family Members' },
    ...(includeSpouse ? [{ id: 'spouse-intake', label: 'Spouse Intake' }] : []),
    ...(visibleChildSlots.length > 0 ? [{ id: 'children-intake', label: 'Children Intake' }] : []),
    { id: 'employment', label: 'Employment' },
    { id: 'medical', label: 'Medical' },
    { id: 'medications', label: 'Medications' },
    { id: 'beneficiaries', label: 'Beneficiaries' },
    { id: 'authorization', label: 'Authorization' },
    { id: 'submit-intake', label: 'Submit' },
  ]

  return (
    <PageShell
      eyebrow="Public Intake"
      title="Client Intake Form"
      text="Submit client information through a secure backend email workflow for NewGen Leadership review."
    >
      <section className="intake-toolbar" id="intake-sections" aria-label="Intake form navigation">
        <div>
          <p className="eyebrow">Form navigation</p>
          <h2>Jump to the section you need.</h2>
          <p>
            Complete what applies. Spouse and children sections appear only when you add them.
          </p>
        </div>
        <nav className="intake-jump-nav">
          {intakeSections.map((section, index) => (
            <a href={`#${section.id}`} key={section.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <ManagedForm
        formName="newgen-intake-form"
        formType="client intake form"
        submitLabel="Submit Intake"
      >
        <FormSection
          description="Start with the primary person applying or being reviewed."
          id="proposed-insured"
          title="Proposed Insured"
        >
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
          <TextInput
            autoComplete="off"
            inputMode="numeric"
            label="Social Security Number"
            name="socialSecurityNumber"
            pattern="[0-9-]*"
            type="password"
          />
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

        <FormSection
          description="Turn on spouse or child intake sections here so everything stays in one submission."
          id="family-members"
          title="Family Members"
        >
          <label className="checkbox full option-toggle">
            <input
              checked={includeSpouse}
              name="includeSpouse"
              onChange={(event) => setIncludeSpouse(event.target.checked)}
              type="checkbox"
              value="Yes"
            />
            <span>Add spouse intake information</span>
          </label>
          <label>
            <span>Children to include</span>
            <select
              name="childIntakeCount"
              onChange={(event) => setChildCount(event.target.value)}
              value={childCount}
            >
              {['0', '1', '2', '3', '4', '5', '6'].map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </label>
        </FormSection>

        {includeSpouse && (
          <FormSection
            description="Add spouse details only when this file includes spouse coverage or review."
            id="spouse-intake"
            title="Spouse Intake"
          >
            <TextInput label="First Name" name="spouseFirstName" />
            <TextInput label="Middle Initial" name="spouseMiddleInitial" />
            <TextInput label="Last Name" name="spouseLastName" />
            <TextInput label="Sex" name="spouseSex" />
            <TextInput label="Date of Birth" name="spouseDateOfBirth" type="date" />
            <TextInput
              autoComplete="off"
              inputMode="numeric"
              label="Social Security Number"
              name="spouseSocialSecurityNumber"
              pattern="[0-9-]*"
              type="password"
            />
            <TextInput label="Birthplace" name="spouseBirthplace" />
            <TextInput label="Spoken Language" name="spouseSpokenLanguage" />
            <TextInput label="Cell Phone" name="spouseCellPhone" type="tel" />
            <TextInput label="Email" name="spouseEmail" type="email" />
            <TextInput label="Address" name="spouseAddress" />
            <TextInput label="City" name="spouseCity" />
            <TextInput label="State" name="spouseState" />
            <TextInput label="ZIP code" name="spouseZipCode" />
            <TextInput label="ID Type" name="spouseIdType" />
            <TextInput label="ID Number" name="spouseIdNumber" />
            <TextInput label="ID Expiration" name="spouseIdExpiration" type="date" />
            <TextInput label="State Issued" name="spouseStateIssue" />
            <SelectInput
              label="U.S. Citizen"
              name="spouseUsCitizen"
              options={['Yes', 'No', 'Permanent Resident']}
            />
            <TextInput label="Height (ft)" name="spouseHeightFeet" />
            <TextInput label="Height (in)" name="spouseHeightInches" />
            <TextInput label="Weight" name="spouseWeight" />
            <TextInput label="Employer" name="spouseEmployer" />
            <TextInput label="Occupation / Duties" name="spouseOccupationDuties" />
            <TextInput label="Current Annual Income" name="spouseAnnualIncomeCurrent" />
            <TextInput label="Personal Physician" name="spousePhysicianName" />
            <TextInput label="Physician Phone" name="spousePhysicianPhone" type="tel" />
            <TextInput label="Date of Last Visit" name="spouseLastVisitDate" type="date" />
            <TextArea label="Medical notes / medications" name="spouseMedicalNotes" />
          </FormSection>
        )}

        {visibleChildSlots.length > 0 && (
          <FormSection
            description="Add details for each child included in this intake."
            id="children-intake"
            title="Children Intake"
          >
            {visibleChildSlots.map((slot) => (
              <div className="beneficiary-card full" key={slot}>
                <h3>Child {slot}</h3>
                <div className="form-grid nested-grid">
                  <TextInput label="First Name" name={`child${slot}FirstName`} />
                  <TextInput label="Middle Initial" name={`child${slot}MiddleInitial`} />
                  <TextInput label="Last Name" name={`child${slot}LastName`} />
                  <TextInput label="Sex" name={`child${slot}Sex`} />
                  <TextInput label="Date of Birth" name={`child${slot}DateOfBirth`} type="date" />
                  <TextInput
                    autoComplete="off"
                    inputMode="numeric"
                    label="Social Security Number"
                    name={`child${slot}SocialSecurityNumber`}
                    pattern="[0-9-]*"
                    type="password"
                  />
                  <TextInput label="Birthplace" name={`child${slot}Birthplace`} />
                  <SelectInput
                    label="U.S. Citizen"
                    name={`child${slot}UsCitizen`}
                    options={['Yes', 'No', 'Permanent Resident']}
                  />
                  <TextInput label="Height (ft)" name={`child${slot}HeightFeet`} />
                  <TextInput label="Height (in)" name={`child${slot}HeightInches`} />
                  <TextInput label="Weight" name={`child${slot}Weight`} />
                  <TextInput label="School / Occupation" name={`child${slot}SchoolOccupation`} />
                  <TextInput label="Phone" name={`child${slot}Phone`} type="tel" />
                  <TextInput label="Email" name={`child${slot}Email`} type="email" />
                  <TextArea label="Medical notes / medications" name={`child${slot}MedicalNotes`} />
                </div>
              </div>
            ))}
          </FormSection>
        )}

        <FormSection
          description="Income and employment details for the proposed insured."
          id="employment"
          title="Employment"
        >
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

        <FormSection
          description="Health and physician information for the proposed insured."
          id="medical"
          title="Medical"
        >
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

        <FormSection
          description="List current medications and any important notes."
          id="medications"
          title="Medications"
        >
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

        <FormSection
          description="Add up to six beneficiaries. Leave unused slots blank."
          id="beneficiaries"
          title="Beneficiaries"
        >
          {beneficiarySlots.map((slot) => (
            <div className="beneficiary-card full" key={slot}>
              <h3>Beneficiary {slot}</h3>
              <div className="form-grid nested-grid">
                <TextInput label="Name" name={`beneficiary${slot}Name`} />
                <TextInput label="Relation" name={`beneficiary${slot}Relation`} />
                <TextInput label="Date of Birth" name={`beneficiary${slot}Dob`} type="date" />
                <TextInput label="Share %" name={`beneficiary${slot}Share`} />
                <SelectInput
                  label="Type"
                  name={`beneficiary${slot}Type`}
                  options={['Primary', 'Contingent']}
                />
                <TextInput label="Phone" name={`beneficiary${slot}Phone`} type="tel" />
                <TextInput label="Email" name={`beneficiary${slot}Email`} type="email" />
              </div>
            </div>
          ))}
        </FormSection>

        <FormSection
          description="Review authorization and sign before submitting."
          id="authorization"
          title="Authorization"
        >
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

function FormSection({ title, id, description, children }) {
  return (
    <fieldset className="form-section-block" id={id}>
      <legend>
        <span>{title}</span>
        <a href="#intake-sections">Top</a>
      </legend>
      {description && <p className="section-help">{description}</p>}
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

function VirtualOfficePage() {
  return (
    <PageShell
      eyebrow="Virtual Office"
      title="Join a Team Room"
      text="Use these Zoom rooms as the live office lobby for team meetings, training, and focused conversations."
    >
      <section className="office-panel">
        <div className="office-grid">
          {officeRooms.map((room) => (
            <article className="office-card" key={room.name}>
              <span className="type-badge">Zoom Room</span>
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <span className="meeting-id">Meeting ID: {room.meetingId}</span>
              <ExternalButton href={room.url} variant="small primary">
                Join Room
              </ExternalButton>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

function CalculatorField({
  help,
  label,
  min,
  name,
  onChange,
  step = '1',
  type = 'number',
  value,
}) {
  return (
    <label className="calculator-field">
      <span>{label}</span>
      <input
        min={min}
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        step={step}
        type={type}
        value={value}
      />
      {help && <small>{help}</small>}
    </label>
  )
}

function CalculatorSelect({ help, label, name, onChange, options, value }) {
  return (
    <label className="calculator-field">
      <span>{label}</span>
      <select name={name} onChange={(event) => onChange(name, event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {help && <small>{help}</small>}
    </label>
  )
}

function SummaryMetric({ label, value, featured = false }) {
  return (
    <article className={featured ? 'calculator-metric featured' : 'calculator-metric'}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function ProjectionOverrideInput({ label, onChange, value, year }) {
  return (
    <label className="projection-override">
      <span>{label}</span>
      <input
        aria-label={`${label} for year ${year}`}
        inputMode="decimal"
        min="0"
        onChange={(event) => onChange(year, event.target.value)}
        placeholder="Default"
        type="number"
        value={value || ''}
      />
    </label>
  )
}

function CalculatorPage() {
  const [inputs, setInputs] = useState(calculatorDefaults)
  const projection = useMemo(() => calculateIulProjection(inputs), [inputs])
  const { finalYear, totals } = projection

  function handleInputChange(name, value) {
    setInputs((current) => ({ ...current, [name]: value }))
  }

  function resetCalculator() {
    setInputs(calculatorDefaults)
  }

  function updateYearOverride(type, year, value) {
    const key = type === 'premium' ? 'premiumOverrides' : 'loanOverrides'

    setInputs((current) => {
      const nextOverrides = { ...current[key] }

      if (value === '') {
        delete nextOverrides[year]
      } else {
        nextOverrides[year] = value
      }

      return { ...current, [key]: nextOverrides }
    })
  }

  function clearYearOverrides() {
    setInputs((current) => ({
      ...current,
      loanOverrides: {},
      premiumOverrides: {},
    }))
  }

  return (
    <PageShell
      eyebrow="Team Calculator"
      title="IUL Passthrough Calculator"
      text="A native website calculator based on the team spreadsheet. This page is hidden from portal navigation and updates instantly as assumptions change."
    >
      <section className="calculator-layout" aria-label="IUL passthrough calculator">
        <aside className="calculator-inputs">
          <div className="calculator-card-heading">
            <p className="eyebrow dark">Inputs</p>
            <h2>Illustration Assumptions</h2>
            <p>Edit the calculator fields below. Results are illustrations only, not guarantees.</p>
          </div>
          <div className="calculator-form-grid">
            <CalculatorField
              help="Year 1 is usually higher. Use 0 to match the annual premium."
              label="Year-1 premium"
              min="0"
              name="yearOnePremium"
              onChange={handleInputChange}
              value={inputs.yearOnePremium}
            />
            <CalculatorField
              help="How much goes in each year after year 1."
              label="Annual premium funded"
              min="0"
              name="annualPremium"
              onChange={handleInputChange}
              value={inputs.annualPremium}
            />
            <CalculatorField
              help="How many years the money passes through."
              label="Years of funding"
              min="0"
              name="yearsOfFunding"
              onChange={handleInputChange}
              value={inputs.yearsOfFunding}
            />
            <CalculatorField
              help="100% means taking the full premium back as a policy loan."
              label="Policy loan taken back (%)"
              min="0"
              name="loanPercent"
              onChange={handleInputChange}
              step="0.01"
              value={inputs.loanPercent}
            />
            <CalculatorField
              help="Participating policy loan rate charged."
              label="Policy loan rate (%)"
              min="0"
              name="loanRate"
              onChange={handleInputChange}
              step="0.01"
              value={inputs.loanRate}
            />
            <CalculatorField
              help="Loaned portion credit above loan charge. Use 0.50 for a 50 bps offset."
              label="Loan-credit spread (%)"
              min="0"
              name="loanCreditSpread"
              onChange={handleInputChange}
              step="0.01"
              value={inputs.loanCreditSpread}
            />
            <CalculatorField
              help="Illustrated crediting rate, not guaranteed."
              label="Crediting rate (%)"
              min="0"
              name="creditingRate"
              onChange={handleInputChange}
              step="0.01"
              value={inputs.creditingRate}
            />
            <CalculatorField
              help="Base face amount / death benefit."
              label="Face amount / death benefit"
              min="0"
              name="faceAmount"
              onChange={handleInputChange}
              value={inputs.faceAmount}
            />
            <CalculatorField
              label="Issue age"
              min="0"
              name="issueAge"
              onChange={handleInputChange}
              value={inputs.issueAge}
            />
            <CalculatorField
              label="Policy fee per month"
              min="0"
              name="policyFeeMonthly"
              onChange={handleInputChange}
              step="0.01"
              value={inputs.policyFeeMonthly}
            />
            <CalculatorSelect
              help="COI rates are based on the sheet's lookup table."
              label="Rate class"
              name="rateClass"
              onChange={handleInputChange}
              options={[
                { label: 'Preferred Plus', value: 'preferredPlus' },
                { label: 'Standard Nontobacco', value: 'standard' },
                { label: 'Preferred Nontobacco', value: 'preferred' },
              ]}
              value={inputs.rateClass}
            />
            <CalculatorField
              label="Premium load - Year 1 (%)"
              min="0"
              name="premiumLoadYearOne"
              onChange={handleInputChange}
              step="0.01"
              value={inputs.premiumLoadYearOne}
            />
            <CalculatorField
              label="Premium load - Years 2+ (%)"
              min="0"
              name="premiumLoadRenewal"
              onChange={handleInputChange}
              step="0.01"
              value={inputs.premiumLoadRenewal}
            />
            <CalculatorSelect
              help="Increasing matches the sheet's default illustration."
              label="Death benefit option"
              name="deathBenefitOption"
              onChange={handleInputChange}
              options={[
                { label: 'Increasing', value: 'increasing' },
                { label: 'Level', value: 'level' },
              ]}
              value={inputs.deathBenefitOption}
            />
            <div className="calculator-readonly">
              <span>Per-unit expense charge</span>
              <strong>{formatCurrency(projection.perUnitRate)}</strong>
              <small>Per $1,000 of face, first 15 policy years.</small>
            </div>
          </div>
          <button className="btn navy calculator-reset" onClick={resetCalculator} type="button">
            Reset Defaults
          </button>
        </aside>

        <div className="calculator-results">
          <div className="calculator-results-hero">
            <p className="eyebrow">Bottom Line</p>
            <h2>Arbitrage Review Dashboard</h2>
            <p>
              Track cash value growth, policy drag, loan drag, loan-credit offset,
              and safety ratios instead of relying on a single illustration number.
            </p>
          </div>
          <div className="calculator-metrics">
            <SummaryMetric
              featured
              label="Net economic spread"
              value={formatCurrency(totals.netGain)}
            />
            <SummaryMetric
              label="Cash value growth"
              value={formatCurrency(totals.policyGrowth)}
            />
            <SummaryMetric
              label="Policy drag"
              value={formatCurrency(totals.policyCosts)}
            />
            <SummaryMetric
              label="Loan drag"
              value={formatCurrency(totals.loanInterest)}
            />
            <SummaryMetric
              label="Loan-credit offset"
              value={formatCurrency(totals.loanCreditOffset)}
            />
            <SummaryMetric
              label="Loan / cash value"
              value={formatPercent(finalYear.loanToCashValue)}
            />
            <SummaryMetric
              label="Loan / death benefit"
              value={formatPercent(finalYear.loanToDeathBenefit)}
            />
            <SummaryMetric
              label="Break-even crediting rate"
              value={formatPercent(finalYear.breakEvenCreditingRate)}
            />
            <SummaryMetric label="Cash value at year 30" value={formatCurrency(finalYear.cashValue)} />
            <SummaryMetric label="Policy loans at year 30" value={formatCurrency(finalYear.policyLoans)} />
            <SummaryMetric label="Net equity at year 30" value={formatCurrency(finalYear.netEquity)} />
            <SummaryMetric label="Death benefit at year 30" value={formatCurrency(finalYear.deathBenefit)} />
            <SummaryMetric
              label="Net death benefit at year 30"
              value={formatCurrency(finalYear.netDeathBenefit)}
            />
          </div>
        </div>
      </section>

      <section className="arbitrage-framework" aria-label="Arbitrage review framework">
        <article>
          <span>A</span>
          <h3>Cash Value Growth</h3>
          <p>Index crediting and policy growth after the current assumptions are applied.</p>
        </article>
        <article>
          <span>B</span>
          <h3>Policy Drag</h3>
          <p>COI, administrative fees, monthly fees, and per-unit charges as the policy ages.</p>
        </article>
        <article>
          <span>C</span>
          <h3>Loan Drag</h3>
          <p>Loan interest charged against an increasing policy loan balance.</p>
        </article>
        <article>
          <span>D</span>
          <h3>Safety Constraints</h3>
          <p>Loan-to-cash-value, net equity, and net death benefit should stay visible.</p>
        </article>
      </section>

      <section className="calculator-table-card" aria-label="30-year projection table">
        <div className="calculator-table-heading">
          <div className="calculator-card-heading">
            <p className="eyebrow dark">Projection</p>
            <h2>30-Year Ledger</h2>
            <p>
              Edit the yellow override fields to change funding or policy loan
              amounts for a specific year. Leave blank to use the global assumptions.
            </p>
          </div>
          <button className="btn navy small" onClick={clearYearOverrides} type="button">
            Clear Year Overrides
          </button>
        </div>
        <div className="calculator-table-wrap">
          <table className="calculator-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Age</th>
                <th>Funding Override</th>
                <th>Loan Override</th>
                <th>Premium Funded</th>
                <th>Policy Loan Taken</th>
                <th>Loan Interest</th>
                <th>Loan Credit Offset</th>
                <th>COI</th>
                <th>Policy Costs</th>
                <th>Total Cost</th>
                <th>Policy Growth</th>
                <th>Net</th>
                <th>Cash Value</th>
                <th>Policy Loans</th>
                <th>Net Equity</th>
                <th>Death Benefit</th>
                <th>Net Death Benefit</th>
                <th>Loan / Cash Value</th>
                <th>Break-even Rate</th>
              </tr>
            </thead>
            <tbody>
              {projection.rows.map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>{row.age}</td>
                  <td>
                    <ProjectionOverrideInput
                      label="Funding"
                      onChange={(year, value) => updateYearOverride('premium', year, value)}
                      value={inputs.premiumOverrides[row.year]}
                      year={row.year}
                    />
                  </td>
                  <td>
                    <ProjectionOverrideInput
                      label="Loan"
                      onChange={(year, value) => updateYearOverride('loan', year, value)}
                      value={inputs.loanOverrides[row.year]}
                      year={row.year}
                    />
                  </td>
                  <td>{formatCurrency(row.premium)}</td>
                  <td>{formatCurrency(row.policyLoanTaken)}</td>
                  <td>{formatCurrency(row.loanInterest)}</td>
                  <td>{formatCurrency(row.loanCreditOffset)}</td>
                  <td>{formatCurrency(row.coi)}</td>
                  <td>{formatCurrency(row.policyCosts)}</td>
                  <td>{formatCurrency(row.totalCost)}</td>
                  <td>{formatCurrency(row.policyGrowth)}</td>
                  <td>{formatCurrency(row.net)}</td>
                  <td>{formatCurrency(row.cashValue)}</td>
                  <td>{formatCurrency(row.policyLoans)}</td>
                  <td>{formatCurrency(row.netEquity)}</td>
                  <td>{formatCurrency(row.deathBenefit)}</td>
                  <td>{formatCurrency(row.netDeathBenefit)}</td>
                  <td>{formatPercent(row.loanToCashValue)}</td>
                  <td>{formatPercent(row.breakEvenCreditingRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="calculator-notes">
        <p>
          Notes: This model is for strategy review and stress testing, not a carrier
          guarantee. Actual index crediting, caps, participation rates, policy charges,
          and loan mechanics can differ from any illustration.
        </p>
        <p>
          Keep premiums under the 7-pay limit or the policy may become a MEC. Monitor
          lapse margin, loan-to-cash-value, net equity, and net death benefit before
          treating any spread as durable.
        </p>
      </section>
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
  const [path, setPath] = useState(normalizePath(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname))
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
      case '/office':
        return <VirtualOfficePage />
      case '/calculator':
        return <CalculatorPage />
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

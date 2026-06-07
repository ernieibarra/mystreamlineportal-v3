import React, { useMemo, useState } from 'react';

const beneficiaryTemplate = {
  name: '',
  relation: '',
  dob: '',
  share: '',
  type: 'Primary',
  phone: '',
  email: '',
};

const medicationTemplate = {
  name: '',
  frequency: '',
  usage: '',
  dosage: '',
};

const maritalStatusOptions = ['Married', 'Single', 'Divorced'];
const citizenshipOptions = ['Yes', 'No', 'Permanent Resident'];
const yesNoOptions = ['Yes', 'No'];
const beneficiaryTypeOptions = ['Primary', 'Contingent'];
const heightFeetOptions = ['4', '5', '6', '7'];
const heightInchesOptions = Array.from({ length: 12 }, (_, i) => String(i));
const healthScoreOptions = ['1', '2', '3', '4', '5'];

const initialData = {
  proposedInsured: {
    firstName: '',
    middleInitial: '',
    lastName: '',
    sex: '',
    maritalStatus: '',
    dateOfBirth: '',
    birthplace: '',
    address: '',
    aptSuite: '',
    city: '',
    state: '',
    zipCode: '',
    yearsAtAddress: '',
    homePhone: '',
    cellPhone: '',
    email: '',
    armedForces: false,
    deploymentOrder: false,
    armedForcesDetails: '',
    idType: 'Driver License',
    idNumber: '',
    idExpiration: '',
    stateIssue: '',
    usCitizen: '',
    visaStatus: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    spokenLanguage: '',
  },
  employment: {
    employer: '',
    occupationDuties: '',
    workAddress: '',
    yearsAtEmployer: '',
    annualIncomeCurrent: '',
    annualIncomePrevious: '',
    netWorth: '',
    retirementPlan: '',
    workPhone: '',
  },
  medical: {
    smokeOrDrugs: '',
    smokeDrugDetails: '',
    surgeries: '',
    surgeriesExplain: '',
    illnesses: '',
    illnessesExplain: '',
    healthScore: '',
    physicianName: '',
    physicianPhone: '',
    physicianAddress: '',
    lastVisitDate: '',
    lastVisitReason: '',
    lastVisitResults: '',
    medicationsYesNo: '',
    authorizeReleaseToAgent: '',
    medications: [{ ...medicationTemplate }],
  },
  beneficiaries: [{ ...beneficiaryTemplate }],
};

const steps = [
  { key: 'proposedInsured', title: 'Proposed Insured' },
  { key: 'employment', title: 'Employment' },
  { key: 'medical', title: 'Medical' },
  { key: 'beneficiaries', title: 'Beneficiaries' },
  { key: 'review', title: 'Review' },
];

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function StepPill({ title, active, complete }) {
  return (
    <div className={`step-pill ${active ? 'active' : ''} ${complete ? 'complete' : ''}`}>
      <div className="step-dot">{complete ? '✓' : ''}</div>
      <div>{title}</div>
    </div>
  );
}

function SelectField({ value, onChange, options, placeholder = 'Select an option' }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748b', margin: 0 }}>{label}</p>
      <p style={{ margin: '6px 0 0', color: '#1e293b' }}>{value || '—'}</p>
    </div>
  );
}

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialData);

  const progress = useMemo(() => ((stepIndex + 1) / steps.length) * 100, [stepIndex]);
  const currentStep = steps[stepIndex];

  const updateSection = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateBeneficiary = (index, key, value) => {
    setFormData((prev) => {
      const beneficiaries = [...prev.beneficiaries];
      beneficiaries[index] = { ...beneficiaries[index], [key]: value };
      return { ...prev, beneficiaries };
    });
  };

  const addBeneficiary = () => setFormData((prev) => ({ ...prev, beneficiaries: [...prev.beneficiaries, { ...beneficiaryTemplate }] }));
  const removeBeneficiary = (index) => setFormData((prev) => ({ ...prev, beneficiaries: prev.beneficiaries.filter((_, i) => i !== index) }));

  const updateMedication = (index, key, value) => {
    setFormData((prev) => {
      const medications = [...prev.medical.medications];
      medications[index] = { ...medications[index], [key]: value };
      return {
        ...prev,
        medical: {
          ...prev.medical,
          medications,
        },
      };
    });
  };

  const addMedication = () => setFormData((prev) => ({
    ...prev,
    medical: { ...prev.medical, medications: [...prev.medical.medications, { ...medicationTemplate }] },
  }));
  const removeMedication = (index) => setFormData((prev) => ({
    ...prev,
    medical: { ...prev.medical, medications: prev.medical.medications.filter((_, i) => i !== index) },
  }));

  const nextStep = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/send-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `New Streamline Intake - ${formData.proposedInsured.firstName} ${formData.proposedInsured.lastName}`,
          data: formData,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Unable to send intake form.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send intake form.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-shell">
        <div className="success-card">
          <img src="/logo.jpg" alt="Logo" className="logo" />
          <div className="success-icon">✓</div>
          <h1>Thank you. Your intake form has been submitted.</h1>
          <p>We received your information and a member of our team will review it shortly.</p>
          <button className="primary-button" onClick={() => {
            setFormData(initialData);
            setSubmitted(false);
            setStepIndex(0);
          }}>
            Start a New Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="app-grid">
        <aside className="sidebar-card">
          <img src="/logo.jpg" alt="Logo" className="logo" />
          <h1>Streamline Portal</h1>
          <p className="muted">Simple intake flow for life insurance applications.</p>
          <div className="progress-wrap">
            <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
            <small>Step {stepIndex + 1} of {steps.length}</small>
          </div>
          <div className="step-list">
            {steps.map((step, idx) => (
              <StepPill key={step.key} title={step.title} active={idx === stepIndex} complete={idx < stepIndex} />
            ))}
          </div>
          <div className="info-box">This site is designed to email the completed form directly without storing submissions in a database.</div>
        </aside>

        <main className="content-card">
          <div className="section-header">
            <h2>{currentStep.title}</h2>
            <p>Complete each section, then continue to the next step.</p>
          </div>

          {currentStep.key === 'proposedInsured' && (
            <section className="section-grid">
              <div className="three-col">
                <Field label="First Name"><input value={formData.proposedInsured.firstName} onChange={(e) => updateSection('proposedInsured', 'firstName', e.target.value)} /></Field>
                <Field label="Middle Initial"><input value={formData.proposedInsured.middleInitial} onChange={(e) => updateSection('proposedInsured', 'middleInitial', e.target.value)} /></Field>
                <Field label="Last Name"><input value={formData.proposedInsured.lastName} onChange={(e) => updateSection('proposedInsured', 'lastName', e.target.value)} /></Field>
              </div>
              <div className="four-col">
                <Field label="Sex"><input value={formData.proposedInsured.sex} onChange={(e) => updateSection('proposedInsured', 'sex', e.target.value)} /></Field>
                <Field label="Marital Status"><SelectField value={formData.proposedInsured.maritalStatus} onChange={(value) => updateSection('proposedInsured', 'maritalStatus', value)} options={maritalStatusOptions} placeholder="Select marital status" /></Field>
                <Field label="Date of Birth"><input type="date" value={formData.proposedInsured.dateOfBirth} onChange={(e) => updateSection('proposedInsured', 'dateOfBirth', e.target.value)} /></Field>
                <Field label="Birthplace"><input value={formData.proposedInsured.birthplace} onChange={(e) => updateSection('proposedInsured', 'birthplace', e.target.value)} /></Field>
              </div>
              <div className="three-col">
                <Field label="Spoken Language"><input value={formData.proposedInsured.spokenLanguage} onChange={(e) => updateSection('proposedInsured', 'spokenLanguage', e.target.value)} /></Field>
                <Field label="Home Phone"><input value={formData.proposedInsured.homePhone} onChange={(e) => updateSection('proposedInsured', 'homePhone', e.target.value)} /></Field>
                <Field label="Cell Phone"><input value={formData.proposedInsured.cellPhone} onChange={(e) => updateSection('proposedInsured', 'cellPhone', e.target.value)} /></Field>
              </div>
              <div className="two-col">
                <Field label="Email"><input type="email" value={formData.proposedInsured.email} onChange={(e) => updateSection('proposedInsured', 'email', e.target.value)} /></Field>
                <Field label="Years at Address"><input value={formData.proposedInsured.yearsAtAddress} onChange={(e) => updateSection('proposedInsured', 'yearsAtAddress', e.target.value)} /></Field>
              </div>
              <div className="four-col">
                <Field label="Address"><input value={formData.proposedInsured.address} onChange={(e) => updateSection('proposedInsured', 'address', e.target.value)} /></Field>
                <Field label="Apt / Suite"><input value={formData.proposedInsured.aptSuite} onChange={(e) => updateSection('proposedInsured', 'aptSuite', e.target.value)} /></Field>
                <Field label="City"><input value={formData.proposedInsured.city} onChange={(e) => updateSection('proposedInsured', 'city', e.target.value)} /></Field>
                <Field label="State / Zip"><div className="split-two"><input value={formData.proposedInsured.state} onChange={(e) => updateSection('proposedInsured', 'state', e.target.value)} /><input value={formData.proposedInsured.zipCode} onChange={(e) => updateSection('proposedInsured', 'zipCode', e.target.value)} /></div></Field>
              </div>
              <div className="four-col">
                <Field label="ID Type"><input value={formData.proposedInsured.idType} onChange={(e) => updateSection('proposedInsured', 'idType', e.target.value)} /></Field>
                <Field label="ID Number"><input value={formData.proposedInsured.idNumber} onChange={(e) => updateSection('proposedInsured', 'idNumber', e.target.value)} /></Field>
                <Field label="Expiration"><input type="date" value={formData.proposedInsured.idExpiration} onChange={(e) => updateSection('proposedInsured', 'idExpiration', e.target.value)} /></Field>
                <Field label="State Issued"><input value={formData.proposedInsured.stateIssue} onChange={(e) => updateSection('proposedInsured', 'stateIssue', e.target.value)} /></Field>
              </div>
              <div className="four-col">
                <Field label="U.S. Citizen"><SelectField value={formData.proposedInsured.usCitizen} onChange={(value) => updateSection('proposedInsured', 'usCitizen', value)} options={citizenshipOptions} placeholder="Select status" /></Field>
                <Field label="Height (ft)"><SelectField value={formData.proposedInsured.heightFeet} onChange={(value) => updateSection('proposedInsured', 'heightFeet', value)} options={heightFeetOptions} placeholder="Feet" /></Field>
                <Field label="Height (in)"><SelectField value={formData.proposedInsured.heightInches} onChange={(value) => updateSection('proposedInsured', 'heightInches', value)} options={heightInchesOptions} placeholder="Inches" /></Field>
                <Field label="Weight"><input value={formData.proposedInsured.weight} onChange={(e) => updateSection('proposedInsured', 'weight', e.target.value)} /></Field>
              </div>
              <Field label="If not a U.S. citizen, immigration status or visa type"><input value={formData.proposedInsured.visaStatus} onChange={(e) => updateSection('proposedInsured', 'visaStatus', e.target.value)} /></Field>
              <div className="two-col check-grid">
                <label className="check-card"><input type="checkbox" checked={formData.proposedInsured.armedForces} onChange={(e) => updateSection('proposedInsured', 'armedForces', e.target.checked)} /> Member of Armed Forces including Reserves</label>
                <label className="check-card"><input type="checkbox" checked={formData.proposedInsured.deploymentOrder} onChange={(e) => updateSection('proposedInsured', 'deploymentOrder', e.target.checked)} /> Deployment Order outside USA</label>
              </div>
              <Field label="If yes, provide details"><textarea rows="4" value={formData.proposedInsured.armedForcesDetails} onChange={(e) => updateSection('proposedInsured', 'armedForcesDetails', e.target.value)} /></Field>
            </section>
          )}

          {currentStep.key === 'employment' && (
            <section className="section-grid">
              <div className="two-col">
                <Field label="Employer"><input value={formData.employment.employer} onChange={(e) => updateSection('employment', 'employer', e.target.value)} /></Field>
                <Field label="Occupation / Duties"><input value={formData.employment.occupationDuties} onChange={(e) => updateSection('employment', 'occupationDuties', e.target.value)} /></Field>
              </div>
              <Field label="Work Address"><input value={formData.employment.workAddress} onChange={(e) => updateSection('employment', 'workAddress', e.target.value)} /></Field>
              <div className="five-col">
                <Field label="Years at Employer"><input value={formData.employment.yearsAtEmployer} onChange={(e) => updateSection('employment', 'yearsAtEmployer', e.target.value)} /></Field>
                <Field label="Current Annual Income"><input value={formData.employment.annualIncomeCurrent} onChange={(e) => updateSection('employment', 'annualIncomeCurrent', e.target.value)} /></Field>
                <Field label="Previous Annual Income"><input value={formData.employment.annualIncomePrevious} onChange={(e) => updateSection('employment', 'annualIncomePrevious', e.target.value)} /></Field>
                <Field label="Net Worth"><input value={formData.employment.netWorth} onChange={(e) => updateSection('employment', 'netWorth', e.target.value)} /></Field>
                <Field label="Work Phone"><input value={formData.employment.workPhone} onChange={(e) => updateSection('employment', 'workPhone', e.target.value)} /></Field>
              </div>
              <Field label="Retirement Plan"><SelectField value={formData.employment.retirementPlan} onChange={(value) => updateSection('employment', 'retirementPlan', value)} options={yesNoOptions} placeholder="Select yes or no" /></Field>
            </section>
          )}

          {currentStep.key === 'medical' && (
            <section className="section-grid">
              <div className="two-col">
                <Field label="Do you smoke or use drugs?"><SelectField value={formData.medical.smokeOrDrugs} onChange={(value) => updateSection('medical', 'smokeOrDrugs', value)} options={yesNoOptions} placeholder="Select yes or no" /></Field>
                <Field label="If yes, type and when used last"><input value={formData.medical.smokeDrugDetails} onChange={(e) => updateSection('medical', 'smokeDrugDetails', e.target.value)} /></Field>
              </div>
              <div className="three-col">
                <Field label="Surgeries"><SelectField value={formData.medical.surgeries} onChange={(value) => updateSection('medical', 'surgeries', value)} options={yesNoOptions} placeholder="Select yes or no" /></Field>
                <Field label="Illnesses"><SelectField value={formData.medical.illnesses} onChange={(value) => updateSection('medical', 'illnesses', value)} options={yesNoOptions} placeholder="Select yes or no" /></Field>
                <Field label="Health Score (1-5)"><SelectField value={formData.medical.healthScore} onChange={(value) => updateSection('medical', 'healthScore', value)} options={healthScoreOptions} placeholder="Select score" /></Field>
              </div>
              {formData.medical.surgeries === 'Yes' && (
                <Field label="If yes, please explain surgeries"><input value={formData.medical.surgeriesExplain} onChange={(e) => updateSection('medical', 'surgeriesExplain', e.target.value)} /></Field>
              )}
              {formData.medical.illnesses === 'Yes' && (
                <Field label="If yes, please explain illnesses"><input value={formData.medical.illnessesExplain} onChange={(e) => updateSection('medical', 'illnessesExplain', e.target.value)} /></Field>
              )}
              <div className="three-col">
                <Field label="Personal Physician"><input value={formData.medical.physicianName} onChange={(e) => updateSection('medical', 'physicianName', e.target.value)} /></Field>
                <Field label="Physician Phone"><input value={formData.medical.physicianPhone} onChange={(e) => updateSection('medical', 'physicianPhone', e.target.value)} /></Field>
                <Field label="Date of Last Visit"><input type="date" value={formData.medical.lastVisitDate} onChange={(e) => updateSection('medical', 'lastVisitDate', e.target.value)} /></Field>
              </div>
              <Field label="Physician Address"><input value={formData.medical.physicianAddress} onChange={(e) => updateSection('medical', 'physicianAddress', e.target.value)} /></Field>
              <div className="two-col">
                <Field label="Reason for Last Visit"><input value={formData.medical.lastVisitReason} onChange={(e) => updateSection('medical', 'lastVisitReason', e.target.value)} /></Field>
                <Field label="Results of Last Visit"><input value={formData.medical.lastVisitResults} onChange={(e) => updateSection('medical', 'lastVisitResults', e.target.value)} /></Field>
              </div>
              <div className="two-col">
                <Field label="Medications?"><SelectField value={formData.medical.medicationsYesNo} onChange={(value) => updateSection('medical', 'medicationsYesNo', value)} options={yesNoOptions} placeholder="Select yes or no" /></Field>
                <Field label="Authorize Health & Medical Information Release to Agent?"><SelectField value={formData.medical.authorizeReleaseToAgent} onChange={(value) => updateSection('medical', 'authorizeReleaseToAgent', value)} options={yesNoOptions} placeholder="Select yes or no" /></Field>
              </div>
              <div className="stack-wrap">
                <div className="row-between"><h3>Medications</h3><button type="button" className="secondary-button" onClick={addMedication}>Add Medication</button></div>
                {formData.medical.medications.map((medication, index) => (
                  <div className="nested-card" key={index}>
                    <div className="row-between"><strong>Medication {index + 1}</strong>{formData.medical.medications.length > 1 && <button type="button" className="link-button" onClick={() => removeMedication(index)}>Remove</button>}</div>
                    <div className="four-col">
                      <Field label="Name"><input value={medication.name} onChange={(e) => updateMedication(index, 'name', e.target.value)} /></Field>
                      <Field label="Frequency"><input value={medication.frequency} onChange={(e) => updateMedication(index, 'frequency', e.target.value)} /></Field>
                      <Field label="Usage"><input value={medication.usage} onChange={(e) => updateMedication(index, 'usage', e.target.value)} /></Field>
                      <Field label="Dosage (mg)"><input value={medication.dosage} onChange={(e) => updateMedication(index, 'dosage', e.target.value)} /></Field>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {currentStep.key === 'beneficiaries' && (
            <section className="section-grid">
              <div className="stack-wrap">
                {formData.beneficiaries.map((beneficiary, index) => (
                  <div className="nested-card" key={index}>
                    <div className="row-between"><h3>Beneficiary {index + 1}</h3>{formData.beneficiaries.length > 1 && <button type="button" className="link-button" onClick={() => removeBeneficiary(index)}>Remove</button>}</div>
                    <div className="four-col">
                      <Field label="Name"><input value={beneficiary.name} onChange={(e) => updateBeneficiary(index, 'name', e.target.value)} /></Field>
                      <Field label="Relation"><input value={beneficiary.relation} onChange={(e) => updateBeneficiary(index, 'relation', e.target.value)} /></Field>
                      <Field label="Date of Birth"><input type="date" value={beneficiary.dob} onChange={(e) => updateBeneficiary(index, 'dob', e.target.value)} /></Field>
                      <Field label="Share %"><input value={beneficiary.share} onChange={(e) => updateBeneficiary(index, 'share', e.target.value)} /></Field>
                    </div>
                    <div className="three-col">
                      <Field label="Type"><SelectField value={beneficiary.type} onChange={(value) => updateBeneficiary(index, 'type', value)} options={beneficiaryTypeOptions} placeholder="Select type" /></Field>
                      <Field label="Phone"><input value={beneficiary.phone} onChange={(e) => updateBeneficiary(index, 'phone', e.target.value)} /></Field>
                      <Field label="Email"><input type="email" value={beneficiary.email} onChange={(e) => updateBeneficiary(index, 'email', e.target.value)} /></Field>
                    </div>
                  </div>
                ))}
                <button type="button" className="secondary-button" onClick={addBeneficiary}>Add Beneficiary</button>
              </div>
            </section>
          )}

          {currentStep.key === 'review' && (
            <section className="section-grid">
              <div className="review-card">
                <h3>Proposed Insured</h3>
                <div className="two-col">
                  <Detail label="Full Name" value={[formData.proposedInsured.firstName, formData.proposedInsured.middleInitial, formData.proposedInsured.lastName].filter(Boolean).join(' ')} />
                  <Detail label="Marital Status" value={formData.proposedInsured.maritalStatus} />
                  <Detail label="Date of Birth" value={formData.proposedInsured.dateOfBirth} />
                  <Detail label="Birthplace" value={formData.proposedInsured.birthplace} />
                  <Detail label="Email" value={formData.proposedInsured.email} />
                  <Detail label="Cell Phone" value={formData.proposedInsured.cellPhone} />
                  <Detail label="Home Phone" value={formData.proposedInsured.homePhone} />
                  <Detail label="Spoken Language" value={formData.proposedInsured.spokenLanguage} />
                  <Detail label="Citizen Status" value={formData.proposedInsured.usCitizen} />
                  <Detail label="Height / Weight" value={`${formData.proposedInsured.heightFeet || '—'} ft ${formData.proposedInsured.heightInches || '—'} in / ${formData.proposedInsured.weight || '—'} lbs`} />
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Detail label="Address" value={[formData.proposedInsured.address, formData.proposedInsured.aptSuite, formData.proposedInsured.city, formData.proposedInsured.state, formData.proposedInsured.zipCode].filter(Boolean).join(', ')} />
                  </div>
                </div>
              </div>

              <div className="review-card">
                <h3>Employment</h3>
                <div className="two-col">
                  <Detail label="Employer" value={formData.employment.employer} />
                  <Detail label="Occupation / Duties" value={formData.employment.occupationDuties} />
                  <div style={{ gridColumn: '1 / -1' }}><Detail label="Work Address" value={formData.employment.workAddress} /></div>
                  <Detail label="Years at Employer" value={formData.employment.yearsAtEmployer} />
                  <Detail label="Work Phone" value={formData.employment.workPhone} />
                  <Detail label="Current Annual Income" value={formData.employment.annualIncomeCurrent} />
                  <Detail label="Previous Annual Income" value={formData.employment.annualIncomePrevious} />
                  <Detail label="Net Worth" value={formData.employment.netWorth} />
                  <Detail label="Retirement Plan" value={formData.employment.retirementPlan} />
                </div>
              </div>

              <div className="review-card">
                <h3>Medical</h3>
                <div className="two-col">
                  <Detail label="Smoke / Drugs" value={formData.medical.smokeOrDrugs} />
                  <Detail label="Health Score" value={formData.medical.healthScore} />
                  <Detail label="Surgeries" value={formData.medical.surgeries} />
                  <Detail label="Surgery Details" value={formData.medical.surgeriesExplain} />
                  <Detail label="Illnesses" value={formData.medical.illnesses} />
                  <Detail label="Illness Details" value={formData.medical.illnessesExplain} />
                  <Detail label="Physician" value={formData.medical.physicianName} />
                  <Detail label="Physician Phone" value={formData.medical.physicianPhone} />
                  <div style={{ gridColumn: '1 / -1' }}><Detail label="Physician Address" value={formData.medical.physicianAddress} /></div>
                  <Detail label="Last Visit Date" value={formData.medical.lastVisitDate} />
                  <Detail label="Last Visit Reason" value={formData.medical.lastVisitReason} />
                  <div style={{ gridColumn: '1 / -1' }}><Detail label="Last Visit Results" value={formData.medical.lastVisitResults} /></div>
                  <Detail label="Medications?" value={formData.medical.medicationsYesNo} />
                  <Detail label="Release Authorized?" value={formData.medical.authorizeReleaseToAgent} />
                </div>

                <div className="stack-wrap" style={{ marginTop: 18 }}>
                  <h4 style={{ margin: 0 }}>Medications</h4>
                  {formData.medical.medications.filter((m) => m.name || m.frequency || m.usage || m.dosage).length ? (
                    formData.medical.medications.filter((m) => m.name || m.frequency || m.usage || m.dosage).map((medication, index) => (
                      <div className="nested-card" key={index}>
                        <strong>Medication {index + 1}</strong>
                        <div className="two-col" style={{ marginTop: 12 }}>
                          <Detail label="Name" value={medication.name} />
                          <Detail label="Frequency" value={medication.frequency} />
                          <Detail label="Usage" value={medication.usage} />
                          <Detail label="Dosage" value={medication.dosage} />
                        </div>
                      </div>
                    ))
                  ) : <p className="muted">No medications listed.</p>}
                </div>
              </div>

              <div className="review-card">
                <h3>Beneficiaries</h3>
                <div className="stack-wrap">
                  {formData.beneficiaries.filter((b) => b.name || b.relation || b.dob || b.share || b.phone || b.email).length ? (
                    formData.beneficiaries.filter((b) => b.name || b.relation || b.dob || b.share || b.phone || b.email).map((beneficiary, index) => (
                      <div className="nested-card" key={index}>
                        <strong>Beneficiary {index + 1}</strong>
                        <div className="two-col" style={{ marginTop: 12 }}>
                          <Detail label="Name" value={beneficiary.name} />
                          <Detail label="Relation" value={beneficiary.relation} />
                          <Detail label="DOB" value={beneficiary.dob} />
                          <Detail label="Share" value={beneficiary.share} />
                          <Detail label="Type" value={beneficiary.type} />
                          <Detail label="Phone" value={beneficiary.phone} />
                          <div style={{ gridColumn: '1 / -1' }}><Detail label="Email" value={beneficiary.email} /></div>
                        </div>
                      </div>
                    ))
                  ) : <p className="muted">No beneficiaries listed.</p>}
                </div>
              </div>

              {error && <div className="error-box">{error}</div>}
            </section>
          )}

          <div className="footer-actions">
            <button className="secondary-button" onClick={prevStep} disabled={stepIndex === 0 || submitting}>Previous</button>
            {stepIndex < steps.length - 1 ? (
              <button className="primary-button" onClick={nextStep}>Next</button>
            ) : (
              <button className="primary-button" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Intake Form'}</button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

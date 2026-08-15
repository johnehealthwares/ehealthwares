import type { Metadata } from 'next';
import { EMRTestimonials } from './EMRTestimonials';
import { EMRContactForm } from './EMRContactForm';
import { EMRInteractions } from './EMRInteractions';
import { EMRFaq } from './EMRFaq';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ehealthwares.com';

export const metadata: Metadata = {
  title: 'EMR Software — Electronic Medical Records Platform',
  description:
    'eHealthwares EMR is a secure electronic medical records platform for hospitals and clinics — patient records, clinical documentation, e-prescriptions, lab & radiology integration, HL7/FHIR interoperability, and billing in one system.',
  alternates: { canonical: '/products/emr' },
  keywords: [
    'EMR software',
    'electronic medical records',
    'EMR system for hospitals',
    'EMR for clinics',
    'e-prescriptions',
    'HL7 integration',
    'FHIR API',
    'medical records management',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/products/emr`,
    siteName: 'eHealthwares',
    title: 'eHealthwares EMR — Electronic Medical Records Platform',
    description:
      'Patient records, clinical documentation, e-prescriptions, lab & radiology integration, HL7/FHIR interoperability, and billing in one secure EMR platform.',
    images: [{ url: '/logo-rect.png', width: 512, height: 512, alt: 'eHealthwares EMR' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eHealthwares EMR — Electronic Medical Records Platform',
    description:
      'Patient records, clinical documentation, e-prescriptions, lab & radiology integration, HL7/FHIR interoperability, and billing in one secure EMR platform.',
    images: ['/logo-rect.png'],
  },
};

const FAQ_ITEMS_LEFT = [
  {
    q: 'What is eHealthwares EMR used for?',
    a: 'eHealthwares EMR is an electronic medical records platform that helps hospitals and clinics manage patient records, clinical documentation, appointments, e-prescriptions, lab and radiology results, billing, and staff — all in one secure system.',
  },
  {
    q: 'Is patient data secure?',
    a: 'Yes. Patient data is stored with encrypted connections (HTTPS), JWT-based authentication, role-based access controls, and full audit logging so every action on a record is tracked and accountable.',
  },
  {
    q: 'Does EMR integrate with other healthcare systems?',
    a: 'Yes. eHealthwares EMR exchanges data with other systems using HL7 messaging and FHIR APIs — connecting labs, pharmacies, radiology (DICOM/PACS), and national health registries.',
  },
  {
    q: 'How does e-prescribing work?',
    a: 'Clinicians issue digital prescriptions with full dosage details, medication history, drug interaction checks, and formulary support. Prescriptions flow directly to connected pharmacies.',
  },
  {
    q: 'Can we migrate our existing patient records?',
    a: 'Yes. Our team supports structured migration of patient demographics, encounter history, medications, and documents from spreadsheets and legacy systems into the EMR.',
  },
  {
    q: 'Does it support laboratory and radiology workflows?',
    a: 'Yes. Lab orders, sample tracking, and results, as well as radiology orders and imaging reports, flow directly into the patient record with result routing and clinician notifications.',
  },
];

const FAQ_ITEMS_RIGHT = [
  {
    q: 'Who is eHealthwares EMR designed for?',
    a: 'It is built for hospitals, clinics, specialist practices, and multi-facility healthcare organizations — from small clinics to hospital groups.',
  },
  {
    q: 'What roles and permissions does the system support?',
    a: 'The EMR supports configurable roles such as System Admin, Facility Administrator, Doctor, Nurse, and Receptionist — each with granular module and action permissions.',
  },
  {
    q: 'Can multiple facilities share one deployment?',
    a: 'Yes. The Enterprise plan supports multi-facility management — assign staff, configure schedules, and track patients and billing per facility from a single deployment.',
  },
  {
    q: 'Can I access records from any device?',
    a: 'Yes. eHealthwares EMR works on desktop, tablet, and mobile, and can be installed as a Progressive Web App for fast, offline-capable access at the point of care.',
  },
  {
    q: 'How is billing handled?',
    a: 'Billing is fully integrated — generate invoices, track payment status, manage claims, and monitor revenue with per-facility financial dashboards.',
  },
  {
    q: 'What about training and support?',
    a: 'Every deployment includes clinician and admin onboarding, training materials, and ongoing support. Enterprise customers receive dedicated success management.',
  },
];

const SOFTWARE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'eHealthwares EMR',
  url: `${SITE_URL}/products/emr`,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  description:
    'A secure electronic medical records platform for hospitals and clinics — patient records, clinical documentation, e-prescriptions, lab & radiology integration, HL7/FHIR interoperability, and billing in one system.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Contact eHealthwares for a tailored quote',
  },
  provider: {
    '@type': 'Organization',
    name: 'eHealthwares',
    url: SITE_URL,
  },
};

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [...FAQ_ITEMS_LEFT, ...FAQ_ITEMS_RIGHT].map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const BREADCRUMB_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Products',
      item: `${SITE_URL}/products-services`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'EMR',
      item: `${SITE_URL}/products/emr`,
    },
  ],
};

export default function EMRPage() {
  return (
    <div className="emr">
      {/* ================================================================ HEADER ================================================================ */}
      <header id="mainHeader">
        <div className="hdr">
          <a href="#home" className="logo">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V6h16v12z" />
              <path d="M8 8h8v2H8zm0 4h8v2H8zm0 4h5v2H8z" />
              <path d="M17 7h1v1h-1z" />
            </svg>
            <span className="logo-name">eHealthwares EMR</span>
          </a>
          <nav className="desk-nav">
            <a href="#about-us">About</a>
            <a href="#services">Services</a>
            <a href="#features">Features</a>
            <a href="#pricing">Plans</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="hdr-btns">
            <a href="/sign-in" className="btn btn-outline">
              Sign In
            </a>
            <a href="#contact" className="btn btn-primary">
              Contact Us
            </a>
          </div>
          <div className="mob-icon" id="mobToggle">
            <i className="fas fa-bars" id="mobIcon" />
          </div>
        </div>
        <div className="mob-nav" id="mobNav">
          <a href="#about-us">About</a>
          <a href="#services">Services</a>
          <a href="#features">Features</a>
          <a href="#pricing">Plans</a>
          <a href="#faq">FAQ</a>
          <div className="mob-btns">
            <a href="/sign-in" className="btn btn-outline">
              Sign In
            </a>
            <a href="#contact" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </header>

      {/* ================================================================ HERO ================================================================ */}
      <section className="hero" id="home">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="hero-dots" />

        <div className="med-icons" aria-hidden="true">
          <i className="fas fa-heartbeat med-icon mi1" />
          <i className="fas fa-stethoscope med-icon mi2" />
          <i className="fas fa-pills med-icon mi3" />
          <i className="fas fa-notes-medical med-icon mi4" />
          <i className="fas fa-calendar-alt med-icon mi5" />
          <i className="fas fa-user-md med-icon mi6" />
          <i className="fas fa-hospital med-icon mi7" />
          <i className="fas fa-file-medical med-icon mi8" />
          <i className="fas fa-prescription-bottle-alt med-icon mi9" />
          <i className="fas fa-syringe med-icon mi10" />
        </div>

        <div className="float-cards" aria-hidden="true">
          <div className="fcard fc1">
            <div
              className="fcard-icon"
              style={{ background: 'linear-gradient(135deg,#2563EB,#0F2A43)' }}
            >
              <i className="fas fa-calendar-check" />
            </div>
            <span>1,240 Consultations Today</span>
          </div>
          <div className="fcard fc2">
            <div
              className="fcard-icon"
              style={{ background: 'linear-gradient(135deg,#1D4ED8,#2563EB)' }}
            >
              <i className="fas fa-users" />
            </div>
            <span>8,500 Active Patient Records</span>
          </div>
          <div className="fcard fc3">
            <div
              className="fcard-icon"
              style={{ background: 'linear-gradient(135deg,#2563EB,#1D4ED8)' }}
            >
              <i className="fas fa-chart-line" />
            </div>
            <span>Revenue +18% ↑</span>
          </div>
          <div className="fcard fc4">
            <div
              className="fcard-icon"
              style={{ background: 'linear-gradient(135deg,#0F2A43,#2563EB)' }}
            >
              <i className="fas fa-network-wired" />
            </div>
            <span>HL7 / FHIR Ready</span>
          </div>
          <div className="fcard fc5">
            <div
              className="fcard-icon"
              style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)' }}
            >
              <i className="fas fa-flask" />
            </div>
            <span>Lab Connected</span>
          </div>
        </div>

        <div className="ecg-band" aria-hidden="true">
          <svg
            className="ecg-svg"
            viewBox="0 0 2800 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <polyline
              points="0,27 100,27 120,6 138,48 156,6 174,48 192,27 280,27 300,12 320,42 340,12 360,42 380,27 460,27 480,6 498,48 516,6 534,48 552,27 640,27 660,12 680,42 700,12 720,42 740,27 820,27 840,6 858,48 876,6 894,48 912,27 1000,27 1020,12 1040,42 1060,12 1080,42 1100,27 1180,27 1200,6 1218,48 1236,6 1254,48 1272,27 1360,27 1380,12 1400,42 1420,12 1440,42 1460,27 1540,27 1560,6 1578,48 1596,6 1614,48 1632,27 1720,27 1740,12 1760,42 1780,12 1800,42 1820,27 1900,27 1920,6 1938,48 1956,6 1974,48 1992,27 2080,27 2100,12 2120,42 2140,12 2160,42 2180,27 2260,27 2280,6 2298,48 2316,6 2334,48 2352,27 2440,27 2460,12 2480,42 2500,12 2520,42 2540,27 2620,27 2640,6 2658,48 2676,6 2694,48 2712,27 2800,27"
              stroke="rgba(38,123,190,0.75)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Electronic Medical Records
          </div>
          <h1 className="hero-title">
            <span className="grad-text">eHealthwares EMR</span> — The Smarter Way
            <br />
            to Manage Patient Records
          </h1>
          <p className="hero-sub">
            eHealthwares EMR brings patient records, clinical documentation, appointments,
            e-prescriptions, lab &amp; radiology results, and billing into one secure platform —
            built for modern healthcare providers.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn btn-primary">
              <i className="fas fa-arrow-right" style={{ marginRight: 8, fontSize: '.82rem' }} />
              Get Started
            </a>
            <a href="#services" className="btn btn-solid">
              Explore Features
            </a>
          </div>
        </div>

        <div className="scroll-cue">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ================================================================ TICKER ================================================================ */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span className="ticker-item">
            <i className="fas fa-notes-medical" /> Patient Records
          </span>
          <span className="ticker-item">
            <i className="fas fa-file-medical" /> Clinical Documentation
          </span>
          <span className="ticker-item">
            <i className="fas fa-calendar-check" /> Appointment Scheduling
          </span>
          <span className="ticker-item">
            <i className="fas fa-prescription" /> e-Prescriptions
          </span>
          <span className="ticker-item">
            <i className="fas fa-flask" /> Lab Integration
          </span>
          <span className="ticker-item">
            <i className="fas fa-x-ray" /> Radiology Workflows
          </span>
          <span className="ticker-item">
            <i className="fas fa-file-invoice-dollar" /> Billing &amp; Invoicing
          </span>
          <span className="ticker-item">
            <i className="fas fa-network-wired" /> HL7 / FHIR Interoperability
          </span>
          <span className="ticker-item">
            <i className="fas fa-user-shield" /> Role-Based Access
          </span>
          <span className="ticker-item">
            <i className="fas fa-chart-pie" /> Analytics &amp; Reporting
          </span>
          {/* duplicate for seamless loop */}
          <span className="ticker-item">
            <i className="fas fa-notes-medical" /> Patient Records
          </span>
          <span className="ticker-item">
            <i className="fas fa-file-medical" /> Clinical Documentation
          </span>
          <span className="ticker-item">
            <i className="fas fa-calendar-check" /> Appointment Scheduling
          </span>
          <span className="ticker-item">
            <i className="fas fa-prescription" /> e-Prescriptions
          </span>
          <span className="ticker-item">
            <i className="fas fa-flask" /> Lab Integration
          </span>
          <span className="ticker-item">
            <i className="fas fa-x-ray" /> Radiology Workflows
          </span>
          <span className="ticker-item">
            <i className="fas fa-file-invoice-dollar" /> Billing &amp; Invoicing
          </span>
          <span className="ticker-item">
            <i className="fas fa-network-wired" /> HL7 / FHIR Interoperability
          </span>
          <span className="ticker-item">
            <i className="fas fa-user-shield" /> Role-Based Access
          </span>
          <span className="ticker-item">
            <i className="fas fa-chart-pie" /> Analytics &amp; Reporting
          </span>
        </div>
      </div>

      {/* ================================================================ STATS ================================================================ */}
      <div className="stats-bar">
        <div className="container stats-container">
          <div className="stat-item">
            <div className="stat-number" data-target="150" data-suffix="+">
              0+
            </div>
            <p>Healthcare Providers</p>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-target="30" data-suffix="+">
              0+
            </div>
            <p>Hospitals &amp; Clinics</p>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-target="12" data-suffix="+">
              0+
            </div>
            <p>Clinical Specialties</p>
          </div>
        </div>
      </div>

      {/* Wave: white → light */}
      <div className="wave" style={{ background: '#ffffff' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#f0f5fb" />
        </svg>
      </div>

      {/* ================================================================ ABOUT ================================================================ */}
      <section className="mission-vision" id="about-us">
        <div className="container">
          <div className="sec-head">
            <div className="chip">
              <i className="fas fa-heart" style={{ fontSize: '.68rem' }} /> Our Purpose
            </div>
            <h2 className="sec-title">
              Built for <span className="grad-text">Healthcare</span>
            </h2>
            <p className="sec-sub">
              We believe clinical work should be supported by technology — not slowed down by it.
            </p>
          </div>
          <div className="mv-container">
            <div className="mv-card reveal-left">
              <h3>Mission</h3>
              <p>
                To give healthcare providers a single, secure source of clinical truth — so care
                teams can spend less time on paperwork and more time with patients.
              </p>
            </div>
            <div className="mv-card reveal-right delay-200">
              <h3>Vision</h3>
              <p>
                To make electronic health records work for every clinician, connecting hospitals,
                clinics, labs, and pharmacies into one seamless care ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wave: white → light */}
      <div className="wave" style={{ background: '#ffffff' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,10 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" fill="#f0f5fb" />
        </svg>
      </div>

      {/* ================================================================ SERVICES ================================================================ */}
      <section className="services" id="services">
        <div className="container">
          <div className="sec-head">
            <div className="chip">
              <i className="fas fa-layer-group" style={{ fontSize: '.68rem' }} /> What We Offer
            </div>
            <h2 className="sec-title">
              Everything Your <span className="grad-text">Practice Needs</span>
            </h2>
            <p className="sec-sub">
              A unified EMR platform replacing scattered tools and paper records — purpose-built
              for healthcare providers.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card border-purple f-purple reveal delay-0">
              <div className="icon">
                <i className="fas fa-notes-medical" style={{ fontSize: '1.6rem' }} />
              </div>
              <div>Patient Records &amp; Charting</div>
              <p>
                Access complete, structured patient records with clinical notes, medical history,
                allergies, medications, and encounter summaries in one place.
              </p>
            </div>
            <div className="service-card border-pink f-pink reveal delay-200">
              <div className="icon">
                <i className="fas fa-file-medical" style={{ fontSize: '1.6rem' }} />
              </div>
              <div>Clinical Documentation</div>
              <p>
                Capture SOAP notes, progress notes, and assessments with smart templates built for
                every specialty.
              </p>
            </div>
            <div className="service-card border-green f-green reveal delay-400">
              <div className="icon">
                <i className="fas fa-calendar-check" style={{ fontSize: '1.6rem' }} />
              </div>
              <div>Appointment Scheduling</div>
              <p>
                Manage patient appointments from a smart calendar with scheduling, reminders, and
                patient self-booking.
              </p>
            </div>
            <div className="service-card border-blue f-blue reveal delay-0">
              <div className="icon">
                <i className="fas fa-prescription-bottle-alt" style={{ fontSize: '1.6rem' }} />
              </div>
              <div>e-Prescriptions</div>
              <p>
                Issue and track digital prescriptions with full dosage details, drug interaction
                checks, and pharmacy integration.
              </p>
            </div>
            <div className="service-card border-purple f-purple reveal delay-200">
              <div className="icon">
                <i className="fas fa-flask" style={{ fontSize: '1.6rem' }} />
              </div>
              <div>Lab &amp; Radiology Integration</div>
              <p>
                Receive lab and imaging results directly in the patient record, with order
                tracking and result routing.
              </p>
            </div>
            <div className="service-card border-green f-green reveal delay-400">
              <div className="icon">
                <i className="fas fa-file-invoice-dollar" style={{ fontSize: '1.6rem' }} />
              </div>
              <div>Billing &amp; Invoicing</div>
              <p>
                Generate invoices, track payments, and monitor revenue with per-facility financial
                reporting.
              </p>
            </div>
            <div className="service-card border-blue f-blue reveal delay-0">
              <div className="icon">
                <i className="fas fa-network-wired" style={{ fontSize: '1.6rem' }} />
              </div>
              <div>Interoperability</div>
              <p>
                Exchange data with other systems via HL7 and FHIR — connect labs, pharmacies, and
                national registries.
              </p>
            </div>
            <div className="service-card border-yellow f-yellow reveal delay-200">
              <div className="icon">
                <i className="fas fa-chart-pie" style={{ fontSize: '1.6rem' }} />
              </div>
              <div>Analytics &amp; Reporting</div>
              <p>
                Turn clinical and operational data into dashboards and reports for better
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wave: light → white */}
      <div className="wave" style={{ background: '#f0f5fb' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ================================================================ FEATURES ================================================================ */}
      <section className="features" id="features">
        <div className="container">
          <div className="sec-head">
            <div className="chip">
              <i className="fas fa-star" style={{ fontSize: '.68rem' }} /> Key Features
            </div>
            <h2 className="sec-title">
              Built to <span className="grad-text">Scale With You</span>
            </h2>
            <p className="sec-sub">
              Powerful capabilities that grow with your organization — from single clinics to
              multi-facility hospital groups.
            </p>
          </div>
          <div className="features-list">
            <div className="feature-item reveal delay-0">
              <div className="feature-number">01</div>
              <div className="feature-content">
                <h3>Unified Clinical Dashboard</h3>
                <p>
                  View today&apos;s appointments, patient activity, pending results, revenue KPIs,
                  and outstanding invoices — all from one smart dashboard.
                </p>
              </div>
            </div>
            <div className="feature-item reveal delay-100">
              <div className="feature-number">02</div>
              <div className="feature-content">
                <h3>Interoperability &amp; Data Exchange</h3>
                <p>
                  Connect with labs, pharmacies, radiology, and registries using HL7 messaging,
                  FHIR APIs, and DICOM integration.
                </p>
              </div>
            </div>
            <div className="feature-item reveal delay-200">
              <div className="feature-number">03</div>
              <div className="feature-content">
                <h3>Role-Based Access &amp; Data Security</h3>
                <p>
                  Fine-grained permissions for doctors, nurses, and admins with encrypted
                  connections, JWT authentication, and audit logging.
                </p>
              </div>
            </div>
            <div className="feature-item reveal delay-300">
              <div className="feature-number">04</div>
              <div className="feature-content">
                <h3>e-Prescriptions &amp; Formulary</h3>
                <p>
                  Issue digital prescriptions per patient with dosage details, medication history,
                  interaction checks, and formulary management.
                </p>
              </div>
            </div>
            <div className="feature-item reveal delay-400">
              <div className="feature-number">05</div>
              <div className="feature-content">
                <h3>Lab &amp; Radiology Workflow Integration</h3>
                <p>
                  Order lab tests and imaging studies, track specimens and modality worklists, and
                  route results back into the record automatically.
                </p>
              </div>
            </div>
            <div className="feature-item reveal delay-500">
              <div className="feature-number">06</div>
              <div className="feature-content">
                <h3>Multi-Facility Management</h3>
                <p>
                  Run multiple clinics or hospital departments from one deployment. Assign staff,
                  configure workflows, and track billing per facility.
                </p>
              </div>
            </div>
            <div className="feature-item reveal delay-600">
              <div className="feature-number">07</div>
              <div className="feature-content">
                <h3>Analytics &amp; Decision Support</h3>
                <p>
                  Clinical dashboards, operational analytics, and utilization reports that help
                  leaders make informed decisions.
                </p>
              </div>
            </div>
            <div className="feature-item reveal delay-700">
              <div className="feature-number">08</div>
              <div className="feature-content">
                <h3>Offline-Capable PWA &amp; Multi-Device Access</h3>
                <p>
                  Work on desktop, tablet, or mobile — with offline-capable access at the point of
                  care and no software to install.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave: white → light */}
      <div className="wave" style={{ background: '#ffffff' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,20 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#f0f5fb" />
        </svg>
      </div>

      {/* ================================================================ PRICING ================================================================ */}
      <section className="pricing" id="pricing">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
        <div className="container">
          <div className="sec-head">
            <div className="chip">
              <i className="fas fa-layer-group" style={{ fontSize: '.68rem' }} /> Plans
            </div>
            <h2 className="sec-title">
              A Plan That <span className="grad-text">Fits Your Organization</span>
            </h2>
            <p className="sec-sub">
              Every organization is different — so is our pricing. Tell us about your facility and
              get a personalized quote.
            </p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card pricing-card-left reveal delay-0">
              <h3>Clinic</h3>
              <div className="plan-tagline">For clinics &amp; private practices</div>
              <p className="card-desc">Up to 5 staff · Patient records · Core clinical tools</p>
              <ul>
                <li>
                  <i className="fas fa-check-circle" /> Patient records &amp; charting
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Appointment scheduling
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Clinical documentation
                </li>
                <li>
                  <i className="fas fa-check-circle" /> e-Prescriptions
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Dashboard &amp; reports
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Multi-device access &amp; PWA
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Data security &amp; audit logs
                </li>
              </ul>
              <a href="#contact" className="btn btn-outline btn-block">
                Contact Us for Pricing
              </a>
            </div>
            <div className="pricing-card reveal delay-200 popular">
              <div className="popular-badge">
                <i className="far fa-star" /> Most Popular
              </div>
              <h3>Hospital</h3>
              <div className="plan-tagline">For hospitals &amp; departments</div>
              <p className="card-desc">Up to 50 staff · Billing · Lab &amp; radiology · Interop</p>
              <ul>
                <li>
                  <i className="fas fa-check-circle" /> Everything in Clinic
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Billing &amp; invoicing
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Lab &amp; radiology integration
                </li>
                <li>
                  <i className="fas fa-check-circle" /> HL7 / FHIR interoperability
                </li>
                <li>
                  <i className="fas fa-check-circle" /> e-Prescriptions &amp; formulary
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Role-based permissions
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Priority support
                </li>
              </ul>
              <a href="#contact" className="btn btn-primary btn-block">
                Contact Us for Pricing
              </a>
            </div>
            <div className="pricing-card pricing-card-right reveal delay-400">
              <h3>Enterprise</h3>
              <div className="plan-tagline">For multi-facility organizations</div>
              <p className="card-desc">
                Unlimited staff · Multi-facility · Custom integrations · Dedicated team
              </p>
              <ul>
                <li>
                  <i className="fas fa-check-circle" /> Everything in Hospital
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Multi-facility management
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Custom HL7 / FHIR integrations
                </li>
                <li>
                  <i className="fas fa-check-circle" /> National registry connectivity
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Advanced analytics
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Onboarding &amp; training
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Dedicated success manager
                </li>
              </ul>
              <a href="#contact" className="btn btn-outline btn-block">
                Contact Us for Pricing
              </a>
            </div>
          </div>
          <div className="pricing-cta reveal">
            <div className="pricing-cta-glow" />
            <h3>
              Curious what eHealthwares EMR costs for <em>your</em> organization?
            </h3>
            <p>
              Tell us about your facility and we&apos;ll tailor a plan and price just for you —
              including a <strong>free pilot period</strong>, no credit card required.
            </p>
            <div className="pricing-cta-actions">
              <a href="/contact" className="btn btn-white">
                <i className="fas fa-calendar-check" style={{ marginRight: 8 }} /> Book a Demo
              </a>
              <a href="#contact" className="btn btn-ghost">
                Send Us a Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Wave: light → white */}
      <div className="wave" style={{ background: '#f0f5fb' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C480,0 960,60 1440,20 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ================================================================ TESTIMONIALS ================================================================ */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="sec-head">
            <div className="chip">
              <i className="fas fa-quote-left" style={{ fontSize: '.68rem' }} /> Testimonials
            </div>
            <h2 className="sec-title">
              Trusted by <span className="grad-text">Healthcare Professionals</span>
            </h2>
            <p className="sec-sub">
              Hear from doctors and hospital teams already using eHealthwares EMR every day.
            </p>
          </div>
          <EMRTestimonials />
        </div>
      </section>

      {/* Wave: white → light */}
      <div className="wave" style={{ background: '#ffffff' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,60 1440,10 L1440,60 L0,60 Z" fill="#f0f5fb" />
        </svg>
      </div>

      {/* ================================================================ FAQ ================================================================ */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="sec-head">
            <div className="chip">
              <i className="fas fa-question-circle" style={{ fontSize: '.68rem' }} /> FAQ
            </div>
            <h2 className="sec-title">
              Frequently Asked <span className="grad-text">Questions</span>
            </h2>
            <p className="sec-sub">Everything you need to know about eHealthwares EMR.</p>
          </div>
          <EMRFaq items={[...FAQ_ITEMS_LEFT, ...FAQ_ITEMS_RIGHT]} />
        </div>
      </section>

      {/* Wave: light → white */}
      <div className="wave" style={{ background: '#f0f5fb' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,20 C360,60 1080,0 1440,35 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ================================================================ CONTACT ================================================================ */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="sec-head">
            <div className="chip">
              <i className="fas fa-envelope" style={{ fontSize: '.68rem' }} /> Contact
            </div>
            <h2 className="sec-title">
              Get In <span className="grad-text">Touch</span>
            </h2>
            <p className="sec-sub">
              Ready to modernize your practice? We&apos;re here to help you get started.
            </p>
          </div>
          <div className="contact-wrapper">
            <div className="contact-text">
              <h3>Let&apos;s Talk</h3>
              <p className="contact-desc">
                For any inquiries, please feel free to reach out. We&apos;re here to help you set
                up eHealthwares EMR for your organization.
              </p>
              <div className="contact-details">
                <div className="info-item">
                  <div className="icon-circle">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div>
                    <h5>Location</h5>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-circle">
                    <i className="fas fa-envelope" />
                  </div>
                  <div>
                    <h5>Email Us</h5>
                    <p>info@ehealthwares.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-circle">
                    <i className="fas fa-phone-alt" />
                  </div>
                  <div>
                    <h5>Call Us</h5>
                    <p>+234-80-2222-4166</p>
                  </div>
                </div>
              </div>
            </div>
            <EMRContactForm />
          </div>
        </div>
      </section>

      {/* ================================================================ FOOTER ================================================================ */}
      <footer>
        <div className="container footer-container">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V6h16v12z" />
                <path d="M8 8h8v2H8zm0 4h8v2H8zm0 4h5v2H8z" />
              </svg>
              <span className="footer-logo-name">eHealthwares EMR</span>
            </div>
            <p>Making healthcare management smarter, faster, and more human.</p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li>
                <a href="#about-us">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Plans</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About eHealthwares</a>
              </li>
              <li>
                <a href="/products-services">Products &amp; Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get In Touch</h4>
            <ul>
              <li>
                <a href="mailto:info@ehealthwares.com">
                  <i className="fas fa-envelope" style={{ fontSize: '.8rem' }} /> info@ehealthwares.com
                </a>
              </li>
              <li>
                <a href="tel:+2348022224166">
                  <i className="fas fa-phone-alt" style={{ fontSize: '.8rem' }} /> +234-80-2222-4166
                </a>
              </li>
            </ul>
            <div style={{ marginTop: 20 }}>
              <a href="#contact" className="btn btn-primary" style={{ height: 40, padding: '0 20px', fontSize: '.85rem' }}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <p>Copyright © {new Date().getFullYear()} eHealthwares. All rights reserved.</p>
            <div className="legal-links">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/products-services">Products &amp; Services</a>
            </div>
          </div>
        </div>
      </footer>

      <EMRInteractions />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
    </div>
  );
}

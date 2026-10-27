import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { trackEvent } from './analytics'
import img_router from './assets/website-images/router-wifi-hero.jpg'
import img_wifi from './assets/website-images/wifi-connected-devices.jpg'
import img_fiber from './assets/website-images/fiber-optic-cables.jpg'
import img_setup from './assets/website-images/modem-cable-setup.jpg'
import img_network from './assets/website-images/home-internet-cable.jpg'
import img_install from './assets/website-images/internet-installation.jpg'
import img_extender from './assets/website-images/wifi-extender.jpg'
import img_node from './assets/website-images/wifi-network-node.jpg'
import img_installer from './assets/website-images/router-installation-technician.jpg'
import img_routerSetup from './assets/website-images/ethernet-router-setup.jpg'
import img_cables from './assets/website-images/ethernet-cables.jpg'
import img_mesh from './assets/website-images/mesh-wifi-devices.jpg'

type Route = '/' | '/about' | '/services' | '/faq' | '/contact' | '/privacy' | '/terms' | '/disclaimer' | '/advertising-disclosure' | '/refund-policy'
type LegalType = 'privacy' | 'terms' | 'disclaimer' | 'advertising-disclosure' | 'refund-policy'

const SITE_URL = 'https://streamlinx.support'
const BRAND = 'StreamLinx'
const PHONE = '(833) 581-5253'
const PHONE_HREF = 'tel:+18335815253'
const ADDRESS_LINES = ['29 Plaza Way Apt 4118', 'Plymouth MA 02360']

const businessDescription = `${BRAND} is an independent third-party service assistance provider. We are not affiliated with, authorized by, or endorsed by any internet, cable, or telecom service provider.`
const disclaimer = `${BRAND} is an independent third-party service assistance provider. We are not affiliated with, authorized by, or endorsed by any internet, broadband, or cable TV service provider. Brand names, if mentioned, are used strictly for informational purposes only.`

const images = {
  router: img_router, wifi: img_wifi, fiber: img_fiber, setup: img_setup, network: img_network, install: img_install, extender: img_extender, node: img_node, installer: img_installer, routerSetup: img_routerSetup, cables: img_cables, mesh: img_mesh,
}

// Any image dropped into src/assets/partners is picked up automatically.
const partnerLogos = Object.entries(import.meta.glob('./assets/partners/*.{svg,png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([file, src]) => ({ src, name: file.split('/').pop()!.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') }))

const navItems: { label: string; href: Route }[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': { title: `Internet, Wi-Fi & Cable TV Help | ${BRAND}`, description: 'Fast, reliable help with internet, broadband, Wi-Fi, and cable TV. Call today to talk with a friendly advisor.' },
  '/about': { title: `About Us | ${BRAND}`, description: `Learn about ${BRAND} and how we help households with internet, broadband, Wi-Fi, and cable TV.` },
  '/services': { title: `Internet, Broadband, Wi-Fi & Cable Guidance | ${BRAND}`, description: 'Explore help with internet service, Wi-Fi setup, connectivity, and cable TV.' },
  '/faq': { title: `Frequently Asked Questions | ${BRAND}`, description: `Answers to common questions about internet, Wi-Fi, and cable TV from ${BRAND}.` },
  '/contact': { title: `Contact ${BRAND} | Call ${PHONE}`, description: `Call ${PHONE} or contact ${BRAND} for help with internet, broadband, Wi-Fi, and cable TV.` },
  '/privacy': { title: `Privacy Policy | ${BRAND}`, description: `Read how ${BRAND} handles information collected through its independent service assistance website.` },
  '/terms': { title: `Terms and Conditions | ${BRAND}`, description: `Read the terms and conditions for using the ${BRAND} website.` },
  '/disclaimer': { title: `Disclaimer | ${BRAND}`, description: `Read the independent third-party service assistance disclaimer for ${BRAND}.` },
  '/refund-policy': { title: `Refund Policy | ${BRAND}`, description: `Read the ${BRAND} refund policy, including how to request a refund for any fee paid to us.` },
  '/advertising-disclosure': { title: `Advertisement Disclosure | ${BRAND}`, description: `Read how ${BRAND} advertises its independent third-party service assistance and what the ads do and do not mean.` },
}

function Logo() {
  return <span className="logo" aria-label={`${BRAND} home`}>
    <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="18" fill="#17243B" /><path d="M14 24c9-10 18-10 18 0s9 10 18 0" fill="none" stroke="#8CB5FF" strokeWidth="5" strokeLinecap="round" /><path d="M14 38c9-10 18-10 18 0s9 10 18 0" fill="none" stroke="#3978F6" strokeWidth="5" strokeLinecap="round" /><circle cx="50" cy="50" r="4" fill="#fff" /></svg>
    <span className="logo-word">Stream<b>Linx</b></span>
  </span>
}
function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }
function Link({ href, children, className = '', onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('/')) {
      event.preventDefault(); window.history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate'))
      const hash = href.split('#')[1]
      window.setTimeout(() => hash ? document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) : window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
    }
    onClick?.()
  }
  return <a className={className} href={href} onClick={handleClick}>{children}</a>
}
function WaveLine({ compact = false }: { compact?: boolean }) { return <svg className={`wave-line ${compact ? 'wave-line-compact' : ''}`} viewBox="0 0 280 80" fill="none" aria-hidden="true"><path d="M1 51C34 51 37 17 68 17s27 45 61 45 31-46 65-46 35 31 85 31" stroke="currentColor" strokeWidth="1.4" /><path d="M1 62C34 62 37 28 68 28s27 45 61 45 31-46 65-46 35 31 85 31" stroke="currentColor" strokeOpacity=".34" /></svg> }
function Eyebrow({ children }: { children: ReactNode }) { return <p className="eyebrow">{children}</p> }
function Image({ src, alt, className = '', loading = 'lazy' }: { src: string; alt: string; className?: string; loading?: 'lazy' | 'eager' }) { return <img src={src} alt={alt} className={className} loading={loading} decoding="async" {...(loading === 'eager' ? { fetchPriority: 'high' as const } : {})} /> }
// Every call-to-action is a tap-to-call link that shows the phone number in its text.
function CallButton({ variant = 'primary', where = 'cta' }: { variant?: 'primary' | 'text' | 'light'; where?: string }) {
  return <a href={PHONE_HREF} className={`button button-${variant}`} aria-label={`Call ${PHONE}`} onClick={() => trackEvent('phone_click', { location: where })}><span className="btn-num">{PHONE}</span><Arrow /></a>
}
function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) { return <div className="section-heading"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{body && <p>{body}</p>}</div> }

function Header() {
  const [open, setOpen] = useState(false); const path = window.location.pathname as Route
  useEffect(() => { const close = () => setOpen(false); window.addEventListener('popstate', close); return () => window.removeEventListener('popstate', close) }, [])
  return <header className="site-header"><div className="header-inner"><Link href="/" className="brand-link" onClick={() => setOpen(false)}><Logo /></Link><button className={`menu-toggle ${open ? 'is-open' : ''}`} aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}><span /><span /><span /><b>{open ? 'Close' : 'Menu'}</b></button><nav id="site-nav" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation"><div className="nav-links">{navItems.map(item => <Link key={item.href} href={item.href} className={path === item.href ? 'active' : ''} onClick={() => setOpen(false)}>{item.label}</Link>)}</div><CallButton where="header" /></nav></div></header>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Logo /><p>{businessDescription}</p><p className="footer-details"><strong>Legal business name:</strong> {BRAND}<br /><strong>Phone:</strong> <a href={PHONE_HREF}>{PHONE}</a><br /><strong>Address:</strong> {ADDRESS_LINES.join(', ')}</p></div><div className="footer-nav"><Eyebrow>Explore</Eyebrow><Link href="/">Home</Link><Link href="/about">About Us</Link><Link href="/services">Services</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></div><div className="footer-nav"><Eyebrow>Legal</Eyebrow><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms and Conditions</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/advertising-disclosure">Advertisement Disclosure</Link></div><div className="footer-contact"><Eyebrow>Independent guidance</Eyebrow><a href={PHONE_HREF} className="footer-phone" onClick={() => trackEvent('phone_click', { location: 'footer' })}>{PHONE} <Arrow /></a><p>{disclaimer}</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {BRAND}</span><span>Not an ISP. No brand affiliation.</span></div></footer>
}
function PageFrame({ children }: { children: ReactNode }) { return <><Header /><main>{children}</main><Footer /></> }

function PartnerStrip() {
  if (!partnerLogos.length) return null
  // The list is rendered twice so the CSS loop never shows a gap.
  const row = (hidden: boolean) => <ul className="logo-track" aria-hidden={hidden || undefined}>{partnerLogos.map(logo => <li key={logo.src}><img src={logo.src} alt={hidden ? '' : logo.name} loading="lazy" decoding="async" /></li>)}</ul>
  return <section className="logo-loop section-pad" aria-label="Logo showcase"><Eyebrow>Popular providers</Eyebrow><div className="logo-loop-window">{row(false)}{row(true)}</div></section>
}

function HomePage() {
  return <PageFrame><section className="compliance-hero section-pad"><div className="compliance-hero-copy reveal"><Eyebrow>Internet, Wi-Fi &amp; cable TV</Eyebrow><h1>Better Internet &amp; Cable Starts Here</h1><p>We provide expert help for your home internet, broadband, Wi-Fi, and cable TV. Call now, talk to a friendly advisor, and get connected with confidence.</p><div className="hero-actions"><CallButton where="hero" /><CallButton variant="text" where="hero_2" /></div><p className="compliance-micro">Call now. Our advisors are ready to help.</p></div><div className="compliance-hero-visual reveal reveal-delay"><div className="hero-device-image"><Image src={images.router} alt="Illustration of a Wi-Fi router" loading="eager" /><span className="device-tag">Home connectivity</span></div><div className="hero-signal-card"><span>GUIDANCE / 01</span><strong>Clearer questions.<br />Better next steps.</strong><WaveLine compact /></div><div className="hero-wave"><WaveLine /></div></div></section>

    <section className="assistance-overview section-pad"><div className="assistance-overview-head"><SectionHeading eyebrow="What we do" title="Services built around your connection." body={`${BRAND} provides hands-on help with:`} /><div className="assistance-stamp"><span>SL</span><small>SERVICE<br />GUIDANCE</small></div></div><div className="assistance-grid"><article><span>01</span><Image src={images.wifi} alt="Illustration of a wireless signal" /><h3>Home internet &amp; broadband</h3><p>Find the right fit for streaming, working from home, and gaming at your address.</p></article><article><span>02</span><Image src={images.fiber} alt="Illustration of a connection line" /><h3>Wi-Fi &amp; connectivity</h3><p>Fix slow speeds, dead zones, and dropped connections around your home.</p></article><article><span>03</span><Image src={images.setup} alt="Illustration of a home network" /><h3>Setup &amp; installation</h3><p>Get help with new service, moving, and setting up your modem and router.</p></article><article><span>04</span><Image src={images.network} alt="Illustration of connected nodes" /><h3>Cable TV</h3><p>Answers about channels, equipment, and getting the most from your TV service.</p></article></div></section>

    <section className="not-do section-pad"><div className="not-do-copy"><Eyebrow>Why {BRAND}</Eyebrow><h2>Service you can count on.</h2><p>We provide the help, you enjoy the connection. Whether you are moving, upgrading, or troubleshooting, we make it easy.</p><Link href="/faq" className="under-link">Read the FAQ <Arrow /></Link></div><div className="not-do-list"><p><strong>Friendly advisors</strong> who listen and explain clearly.</p><p><strong>Help for every room</strong> from the router to the living-room TV.</p><p><strong>Quick answers</strong> over the phone, no forms required.</p><p><strong>Plain language</strong> with no confusing jargon.</p></div></section>

    <PartnerStrip />

    <section className="signal-band section-pad"><div className="signal-image"><Image src={images.install} alt="Illustration of a home network" /><span>Connection questions, made clearer.</span></div><div className="signal-copy"><Eyebrow>Start with context</Eyebrow><h2>Ready for a better connection?</h2><p>Call today and our advisors will provide the help you need with internet, Wi-Fi, broadband, and cable TV.</p><CallButton where="signal_band" /></div></section>
    <FAQSection /><ContactFinale />
  </PageFrame>
}

function AboutPage() {
  return <PageFrame><section className="page-hero section-pad"><div className="page-hero-image"><Image src={images.installer} alt="Illustration of a home network" loading="eager" /><span className="image-caption">Guidance for the next question</span></div><div className="page-hero-card"><Eyebrow>About Us</Eyebrow><h1>A clear place to start.</h1><p>We help households get dependable internet, Wi-Fi, and cable TV with friendly, plain-language support.</p><CallButton where="about_hero" /></div></section><section className="about-purpose section-pad"><div className="about-purpose-aside"><span className="large-number">01</span><span className="vertical-label">OUR ROLE</span></div><div className="about-purpose-copy"><Eyebrow>About Us</Eyebrow><h2>About {BRAND}</h2><p>{BRAND} provides internet, broadband, Wi-Fi, and cable TV help services for households. Our advisors answer questions, explain options, and help you get the most from your connection.</p><p>We believe getting online should be simple. That is why we focus on clear answers, honest conversations, and support that respects your time.</p></div></section><section className="about-collage section-pad"><div className="collage-copy"><Eyebrow>Who we are</Eyebrow><h2>Where to find us.</h2><p><strong>{BRAND}</strong><br />{ADDRESS_LINES[0]}<br />{ADDRESS_LINES[1]}<br /><a href={PHONE_HREF}>{PHONE}</a></p></div><Image src={images.routerSetup} alt="Illustration of a router setup" className="collage-large" /><Image src={images.cables} alt="Illustration of network cables" className="collage-small" /></section><section className="about-disclaimer section-pad"><div><Eyebrow>Before you decide</Eyebrow><h2>Questions? We are one call away.</h2></div><CallButton variant="text" where="about_footer" /></section><ContactFinale /></PageFrame>
}

function ServicesPage() {
  return <PageFrame><section className="services-hero section-pad"><div className="services-hero-copy"><Eyebrow>Our services</Eyebrow><h1>Internet, Wi-Fi &amp; cable TV help.</h1><p>We provide help with home internet, Wi-Fi, and cable TV, all in one place.</p><CallButton where="services_hero" /></div><div className="services-hero-image"><Image src={images.extender} alt="Illustration of a Wi-Fi extender" loading="eager" /><div className="services-hero-caption">General guidance only.</div></div></section><section className="service-cards section-pad"><article id="internet" className="service-card"><div className="service-card-image"><Image src={images.wifi} alt="Wireless router with connected home devices" /></div><div className="service-card-body"><Eyebrow>Internet &amp; broadband</Eyebrow><h2>Understand the basics.</h2><p>Get answers about internet service for your home, including what is available at your address.</p><CallButton variant="text" where="services_internet" /></div></article><article id="wifi" className="service-card"><div className="service-card-image"><Image src={images.mesh} alt="Mesh Wi-Fi devices for a home network" /></div><div className="service-card-body"><Eyebrow>Wi-Fi &amp; connectivity</Eyebrow><h2>Make the setup easier.</h2><p>Get help with routers, cables, devices, and everyday connectivity in every room of your home.</p><CallButton variant="text" where="services_wifi" /></div></article><article id="cable" className="service-card"><div className="service-card-image"><Image src={images.setup} alt="Modem and cable connections" /></div><div className="service-card-body"><Eyebrow>Cable TV</Eyebrow><h2>Navigate the process with context.</h2><p>Get help with cable TV channels, equipment, and everyday questions.</p><CallButton variant="text" where="services_cable" /></div></article></section><section className="location-note section-pad"><div className="location-note-art"><Image src={images.node} alt="Illustration of a network node" /><div className="art-overlay" /></div><div className="location-note-copy"><Eyebrow>What to expect</Eyebrow><h2>Service options depend on your location.</h2><p>Call us and we will help you see what is available at your address.</p><CallButton variant="text" where="services_note" /></div></section><FAQSection compact /><ContactFinale /></PageFrame>
}

const faqs: readonly (readonly [string, string])[] = [
  ['Are you a cable or internet service provider?', `No. ${BRAND} is an independent third-party assistance platform, launched in 2026, and is not affiliated with any provider.`],
  ['Do you sell internet, cable, or streaming plans?', 'No. We offer guidance and assistance only, and we do not offer plans or subscriptions from any provider.'],
  ['Do you charge for your services?', 'Yes. We charge a separate service fee for the assistance we deliver, and we tell you about it before you agree. It is separate from anything your provider charges.'],
  ['Will I still be billed by my service provider?', 'Yes. Your provider keeps billing you under your own agreement with them. Nothing about that changes when you work with us.'],
  ['Do you need my account passwords or sensitive information?', 'No. We never ask for your provider passwords, PINs, or security answers. Please do not share them with anyone claiming to be us.'],
  ['Which providers can you help with?', 'We may refer to several providers, such as Xfinity® or Verizon®, only to describe the kind of question you have. We have no affiliation with any of them.'],
  ['Are your services refundable?', 'Yes, subject to our Refund Policy. Refund requests can be submitted within 7 to 15 days of service purchase, depending on the type of assistance provided. Please read our Refund Policy for full eligibility details.'],
  ['How can I reach you?', `Call ${PHONE}, use the contact form, or write to ${ADDRESS_LINES.join(', ')}. When you call, you will hear: "${`Thank you for calling ${BRAND}, an independent service assistance platform.`}"`],
]
function FAQSection({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(0)
  const list = compact ? faqs.slice(0, 5) : faqs
  return <section className={`faq section-pad ${compact ? 'faq-compact' : ''}`}><div className="faq-heading"><Eyebrow>Questions, answered carefully</Eyebrow><h2>Good to know before you decide.</h2><p>Clear information is a better starting point than a big promise.</p>{compact && <Link href="/faq" className="under-link">See all questions <Arrow /></Link>}</div><div className="faq-list">{list.map(([question, answer], index) => <div className={`faq-item ${open === index ? 'is-open' : ''}`} key={question}><button aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span>{question}</span><i aria-hidden="true">+</i></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>
}
function FaqPage() {
  return <PageFrame><section className="legal-hero section-pad"><div><Eyebrow>FAQ</Eyebrow><h1>Frequently Asked Questions</h1><p>Quick answers about internet, Wi-Fi, and cable TV help.</p></div><div className="legal-number">?</div></section><FAQSection /><ContactFinale /></PageFrame>
}
function ContactFinale() { return <section className="contact-finale"><div className="finale-wave"><WaveLine /></div><div className="finale-copy"><Eyebrow>Need a clearer next step?</Eyebrow><h2>Talk to an internet advisor today.</h2><p>Call now and get expert service for your internet, Wi-Fi, and cable TV needs.</p><CallButton variant="light" where="finale" /></div><div className="finale-mark"><span>S</span><small>SL / 01</small></div></section> }

function ContactPage() { return <PageFrame><section className="contact-reframe section-pad"><div className="contact-reframe-top"><div className="contact-intro"><Eyebrow>Contact</Eyebrow><h1>Let’s make the next question clearer.</h1><p>Call or send a message about your internet, broadband, Wi-Fi, or cable TV needs.</p></div><div className="contact-callout"><span>Call us today</span><a href={PHONE_HREF} onClick={() => trackEvent('phone_click', { location: 'contact_callout' })}><strong>{PHONE}</strong></a><small>Legal business name: {BRAND}<br />Address: {ADDRESS_LINES.join(', ')}</small><WaveLine compact /></div></div><div className="contact-workbench"><div className="workbench-aside"><Eyebrow>What to include</Eyebrow><h2>A little context goes a long way.</h2><p>Share the kind of service question you have, the devices or rooms involved, and your ZIP or postal code if you want to discuss location-dependent options.</p><div className="workbench-note"><strong>Keep it specific.</strong><span>Include the service area, device, room, or process you would like to understand.</span></div></div><ContactForm /></div></section></PageFrame> }
function ContactForm() { const [status, setStatus] = useState<'idle' | 'error' | 'not-configured'>('idle'); const [error, setError] = useState(''); const [values, setValues] = useState({ name: '', email: '', phone: '', postal: '', message: '', consent: false }); const update = (key: keyof typeof values, value: string | boolean) => setValues(current => ({ ...current, [key]: value })); const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!values.name.trim() || !values.email.trim() || !values.message.trim() || !values.consent) { setStatus('error'); setError('Please add your name, email, message, and consent before continuing.'); return } if (!/^\S+@\S+\.\S+$/.test(values.email)) { setStatus('error'); setError('Please enter a valid email address.'); return } trackEvent('form_submission_attempt', { form: 'contact', backend: 'not_configured' }); setStatus('not-configured'); setError('') }; return <form className="contact-form" onSubmit={submit} noValidate><div className="form-heading"><Eyebrow>Your details</Eyebrow><h2>Share a little context.</h2><p>This form is not connected to a backend yet and does not send or store personal information. To reach us now, call {PHONE}.</p></div><div className="form-grid"><label><span>Name *</span><input value={values.name} onChange={e => update('name', e.target.value)} required autoComplete="name" /></label><label><span>Email *</span><input type="email" value={values.email} onChange={e => update('email', e.target.value)} required autoComplete="email" /></label><label><span>Phone (optional)</span><input value={values.phone} onChange={e => update('phone', e.target.value)} autoComplete="tel" /></label><label><span>ZIP / postal code (optional)</span><input value={values.postal} onChange={e => update('postal', e.target.value)} autoComplete="postal-code" /></label><label className="field-full"><span>Message *</span><textarea value={values.message} onChange={e => update('message', e.target.value)} required rows={5} placeholder="What would you like to understand?" /></label></div><label className="consent"><input type="checkbox" checked={values.consent} onChange={e => update('consent', e.target.checked)} /><span>I understand this form is not connected to a live inbox yet, and I consent to using the information only for this on-page demonstration.</span></label>{status === 'error' && <div className="form-feedback feedback-error" role="alert">{error}</div>}{status === 'not-configured' && <div className="form-feedback feedback-note" role="status"><strong>Your message is ready for the next step.</strong><span>Nothing was sent or stored because a backend is not configured. Please call {PHONE}.</span></div>}<button className="button button-primary" type="submit"><span>Review my inquiry</span><Arrow /></button><CallButton variant="text" where="contact_form" /></form> }

const launchDisclosure = `${BRAND} is an independent third-party service assistance startup, launched in 2026, and is not affiliated with, endorsed by, or sponsored by any cable, internet, or streaming service provider.`
const callGreeting = `Thank you for calling ${BRAND}, an independent service assistance platform.`
const contactBlock = `${BRAND}, ${ADDRESS_LINES.join(', ')}, phone ${PHONE}.`

const legalContent: Record<LegalType, { label: string; title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  privacy: { label: 'Legal', title: 'Privacy Policy', intro: `This policy explains what information ${BRAND} collects, why we use it, and the choices you have. ${launchDisclosure}`, sections: [
    { heading: 'Who we are', body: `${BRAND} is a newly launched assistance platform that helps people understand and work through questions about cable, internet, and streaming services. ${contactBlock}` },
    { heading: 'Information we may collect', body: 'When you call us or send a request, you may share your name, phone number, email address, postal code, and a description of what you need help with. Our contact form is not currently connected to a backend, so nothing typed into it is sent or stored.' },
    { heading: 'Information we never ask for', body: 'We do not ask for your service provider account passwords, PINs, security answers, or full payment card details in order to guide you. If anyone asks you for these in our name, please do not share them and contact us right away.' },
    { heading: 'How we use information', body: 'We use what you share to respond to your request, provide the assistance you asked for, handle our own service fees and refund requests, improve this website, and meet legal obligations. We do not sell your personal information.' },
    { heading: 'Sharing', body: 'We share information only with service providers that help us run the website and our business, such as hosting, analytics, and communication tools, or when the law requires it. These parties may only use the information to perform services for us.' },
    { heading: 'Cookies and analytics', body: 'This website may use cookies and similar tools to understand how many people visit, which pages they read, and how often phone numbers are selected. You can block or delete cookies in your browser settings.' },
    { heading: 'Security and retention', body: 'This website is served over HTTPS. We keep information only as long as needed for the purposes above or as required by law, and we take reasonable steps to protect it.' },
    { heading: 'Your choices', body: `You may ask to see, correct, or delete the information we hold about you by calling ${PHONE} or writing to ${ADDRESS_LINES.join(', ')}.` },
  ] },
  terms: { label: 'Legal', title: 'Terms and Conditions', intro: `By using this website or contacting us, you agree to these terms. ${launchDisclosure}`, sections: [
    { heading: 'Independent disclosure', body: launchDisclosure },
    { heading: 'What we do', body: 'We assist, guide, and support people with questions about cable, internet, and streaming services. We do not provide internet, cable, or streaming service, and we do not offer plans or subscriptions from any provider.' },
    { heading: 'Our service fees', body: 'We charge a separate service fee for the assistance we deliver. The fee is disclosed to you before you agree to it, and it is in addition to, and separate from, anything your provider charges you.' },
    { heading: 'Provider billing', body: 'Your service provider continues to bill you directly under your own agreement with them. Nothing we do changes your provider account, pricing, or billing. Questions about those matters belong with your provider.' },
    { heading: 'Provider names and trademarks', body: 'Provider names, such as Xfinity®, Verizon®, or AT&T®, may appear only to describe the services people ask us about. All trademarks belong to their respective owners, and no partnership or sponsorship is implied.' },
    { heading: 'Your responsibilities', body: 'Please give accurate information and never share provider passwords or sensitive credentials with us. You remain responsible for decisions you make about your own accounts and services.' },
    { heading: 'Refunds', body: 'Refund requests are handled under our Refund Policy, which is part of these terms.' },
    { heading: 'Limits of our assistance', body: 'Availability, speeds, equipment, and pricing are set by providers and vary by location. We cannot promise a particular result or outcome from any provider.' },
    { heading: 'Limitation of liability', body: `To the extent permitted by law, ${BRAND} is not liable for indirect or consequential losses arising from the use of this website or our assistance.` },
    { heading: 'Contact', body: `${contactBlock} ${callGreeting}` },
  ] },
  disclaimer: { label: 'Disclaimer', title: 'Disclaimer', intro: launchDisclosure, sections: [
    { heading: 'Independent third-party startup', body: launchDisclosure },
    { heading: 'Not a service provider', body: `${BRAND} is not an internet service provider. We do not sell internet, cable, or streaming plans, and we do not manage, change, or bill any provider account.` },
    { heading: 'Informational use of names', body: 'Provider names, if mentioned, are used descriptively and for reference only, and carry the ™ or ® mark where shown. All trademarks belong to their respective owners.' },
    { heading: 'General assistance only', body: 'The information on this website and shared on calls is general in nature. It is not a promise of any technical result, price, speed, or availability, which depend on the provider and your location.' },
    { heading: 'Fees', body: 'Our service fee is separate from, and in addition to, any charge from your service provider.' },
    { heading: 'Phone calls', body: callGreeting },
  ] },
  'refund-policy': { label: 'Legal', title: 'Refund Policy', intro: `Refund requests can be submitted within 7 to 15 days of service purchase, depending on the type of assistance provided. ${launchDisclosure}`, sections: [
    { heading: 'Independent disclosure', body: launchDisclosure },
    { heading: 'What this policy covers', body: `This policy applies only to the separate service fee paid to ${BRAND} for our assistance. It does not cover charges from your cable, internet, or streaming provider, because we do not sell those services.` },
    { heading: 'Request window', body: 'Refund requests can be submitted within 7 to 15 days of service purchase, depending on the type of assistance provided. Requests made after the window that applies to your service may not be eligible.' },
    { heading: 'Eligibility', body: 'Eligibility depends on the type of service you purchased and on whether the assistance has already been delivered. Assistance that has been fully delivered may not qualify for a refund, while service that has not yet started is more likely to qualify. Each request is reviewed on its own facts, and approval is not automatic.' },
    { heading: 'How to submit a request', body: `Call ${PHONE} or write to ${ADDRESS_LINES.join(', ')}. Please include your name, the phone number or email used, the date of purchase, and a short description of the assistance you received.` },
    { heading: 'Review and payment', body: 'We review requests promptly and tell you the outcome. Approved refunds are returned to the original payment method, and your bank or card issuer may need several business days to post them.' },
    { heading: 'Provider charges', body: 'Refunds, credits, or billing questions about your provider account must be taken up with that provider directly.' },
  ] },
  'advertising-disclosure': { label: 'Advertisement Disclosure', title: 'Advertisement Disclosure', intro: `${BRAND} advertises online to let people know about its assistance service. ${launchDisclosure}`, sections: [
    { heading: 'Who is advertising', body: `${BRAND} pays to advertise on search engines and other online platforms. Our advertisements promote our own assistance service and not the service of any cable, internet, or streaming provider.` },
    { heading: 'Independent disclosure', body: launchDisclosure },
    { heading: 'What our phone number does', body: `The number ${PHONE} reaches ${BRAND}. ${callGreeting} It does not connect you to any provider. If you need help with your provider account, contact that provider directly.` },
    { heading: 'Fees', body: 'We charge a separate service fee for our assistance, disclosed before you agree. It is in addition to what your provider charges you.' },
    { heading: 'Provider names and logos', body: 'We do not use provider logos in our advertisements. Provider names, where mentioned, are descriptive references only and belong to their respective owners.' },
    { heading: 'Questions', body: contactBlock },
  ] },
}
function LegalPage({ type }: { type: LegalType }) { const data = legalContent[type]; const num = String(Object.keys(legalContent).indexOf(type) + 1).padStart(2, '0'); return <PageFrame><section className="legal-hero section-pad"><div><Eyebrow>{data.label}</Eyebrow><h1>{data.title}</h1><p>{data.intro}</p></div><div className="legal-number">{num}</div></section><section className="legal-content section-pad"><div className="legal-index"><Eyebrow>On this page</Eyebrow>{data.sections.map((section, index) => <a key={section.heading} href={`#legal-${index}`}>{String(index + 1).padStart(2, '0')} {section.heading}</a>)}</div><div className="legal-body">{data.sections.map((section, index) => <article id={`legal-${index}`} key={section.heading}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{section.heading}</h2><p>{section.body}</p></div></article>)}</div></section></PageFrame> }
function NotFound() { return <PageFrame><section className="not-found section-pad"><Eyebrow>404</Eyebrow><h1>That page moved on.</h1><p>Let’s get you back to a clear starting point.</p><Link href="/" className="button button-primary">Return home<Arrow /></Link></section></PageFrame> }

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/'

function App() {
  const [path, setPath] = useState<Route>(normalize(window.location.pathname) as Route)
  useEffect(() => { const onPopState = () => setPath(normalize(window.location.pathname) as Route); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState) }, [])
  useEffect(() => {
    const meta = routeMeta[path] || routeMeta['/']; document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    const url = `${SITE_URL}${path === '/' ? '/' : `${path}/`}`
    const canonical = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }))
    canonical.setAttribute('href', url)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    window.scrollTo(0, 0)
  }, [path])
  if (path === '/') return <HomePage />
  if (path === '/about') return <AboutPage />
  if (path === '/services') return <ServicesPage />
  if (path === '/faq') return <FaqPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/privacy' || path === '/terms' || path === '/disclaimer' || path === '/advertising-disclosure' || path === '/refund-policy') return <LegalPage type={path.slice(1) as LegalType} />
  return <NotFound />
}
export default App

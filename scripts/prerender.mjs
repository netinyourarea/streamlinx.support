import fs from 'node:fs'
import path from 'node:path'

const siteUrl = 'https://streamlinx.support'
const brand = 'StreamLinx'
const dist = path.resolve('dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const independent = `${brand} is an independent third-party service assistance provider. We are not affiliated with, authorized by, or endorsed by any internet, broadband, or cable TV service provider.`
const routes = {
  '/': { title: `Internet, Wi-Fi & Cable TV Help | ${brand}`, description: 'Fast, reliable help with internet, broadband, Wi-Fi, and cable TV. Call today to talk with a friendly advisor.', h1: 'Better Internet & Cable Starts Here', body: 'Fast, reliable help for your home internet, broadband, Wi-Fi, and cable TV. Call (833) 581-5253.' },
  '/about/': { title: `About Us | ${brand}`, description: `Learn about ${brand} and how we help households with internet, broadband, Wi-Fi, and cable TV.`, h1: 'About Us', body: 'We help households get dependable internet, Wi-Fi, and cable TV with friendly, plain-language support.' },
  '/services/': { title: `Internet, Broadband, Wi-Fi & Cable Guidance | ${brand}`, description: 'Explore help with internet service, Wi-Fi setup, connectivity, and cable TV.', h1: 'Internet, Broadband, Wi-Fi & Cable Guidance', body: 'Explore broad guidance areas for internet and broadband questions, Wi-Fi and connectivity concerns, and general cable TV information. Call for help with any of them.' },
  '/faq/': { title: `Frequently Asked Questions | ${brand}`, description: `Answers to common questions about internet, Wi-Fi, and cable TV from ${brand}.`, h1: 'Frequently Asked Questions', body: 'Quick answers about internet, Wi-Fi, and cable TV help.' },
  '/contact/': { title: `Contact ${brand} | Call (833) 581-5253`, description: `Call (833) 581-5253 or contact ${brand} for help with internet, broadband, Wi-Fi, and cable TV services.`, h1: 'Contact Us', body: 'Phone: (833) 581-5253. Address: 29 Plaza Way Apt 4118, Plymouth MA 02360.' },
  '/privacy/': { title: `Privacy Policy | ${brand}`, description: `Read how ${brand} handles information collected through its independent service assistance website.`, h1: 'Privacy Policy', body: independent },
  '/terms/': { title: `Terms and Conditions | ${brand}`, description: `Read the terms and conditions for using the ${brand} website.`, h1: 'Terms and Conditions', body: independent },
  '/disclaimer/': { title: `Disclaimer | ${brand}`, description: `Read the independent third-party service assistance disclaimer for ${brand}.`, h1: 'Disclaimer', body: independent },
  '/refund-policy/': { title: `Refund Policy | ${brand}`, description: `Read the ${brand} refund policy, including how to request a refund for any fee paid to us.`, h1: 'Refund Policy', body: 'This policy explains how refunds work for fees paid directly to ' + brand + '.' },
  '/advertising-disclosure/': { title: `Advertisement Disclosure | ${brand}`, description: `Read how ${brand} advertises its independent third-party service assistance and what the ads do and do not mean.`, h1: 'Advertisement Disclosure', body: independent },
}

const esc = s => s.replace(/&/g, '&amp;')

function render(route, data) {
  const canonical = `${siteUrl}${route}`
  const title = esc(data.title)
  const description = esc(data.description)
  let html = template.replace('<div id="root"></div>', `<div id="root"><div class="seo-prerendered"><h1>${esc(data.h1)}</h1><p>${esc(data.body)}</p></div></div>`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
  return html
}

for (const [route, data] of Object.entries(routes)) {
  const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html')
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, render(route, data))
}
console.log(`Prerendered ${Object.keys(routes).length} SEO routes.`)

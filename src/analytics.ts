type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

const analyticsWindow = window as AnalyticsWindow

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  analyticsWindow.gtag?.('event', name, params)
  analyticsWindow.dataLayer?.push({ event: name, ...params })
}

function loadScript(src: string, id: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.async = true
  script.src = src
  script.id = id
  document.head.appendChild(script)
}

export function initializeAnalytics() {
  const ga4Id = import.meta.env.VITE_GA4_ID as string | undefined
  const gtmId = import.meta.env.VITE_GTM_ID as string | undefined
  if (ga4Id) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`, 'ga4-script')
    window.setTimeout(() => {
      analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
      analyticsWindow.gtag = analyticsWindow.gtag || ((...args: unknown[]) => analyticsWindow.dataLayer?.push(args))
      analyticsWindow.gtag('js', new Date())
      analyticsWindow.gtag('config', ga4Id, { anonymize_ip: true })
    }, 0)
  }
  if (gtmId) {
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
    analyticsWindow.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`, 'gtm-script')
  }
  if (ga4Id || gtmId) {
    const milestones = new Set<number>()
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      const percent = Math.round((window.scrollY / max) * 100)
      ;[25, 50, 75, 90].forEach(milestone => {
        if (percent >= milestone && !milestones.has(milestone)) { milestones.add(milestone); trackEvent('scroll_depth', { percent: milestone }) }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
  }
}

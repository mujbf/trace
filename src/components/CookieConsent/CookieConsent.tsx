'use client'

import { useEffect } from 'react'

export function CookieConsent() {
  useEffect(() => {
    const initCookieConsent = async () => {
      // Load CSS via link tag
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css'
      document.head.appendChild(link)

      // Import library
      const CookieConsent = await import('vanilla-cookieconsent')

      CookieConsent.run({
        categories: {
          necessary: {
            enabled: true,
            readOnly: true,
          },
          analytics: {},
          marketing: {},
        },

        language: {
          default: 'en',
          translations: {
            en: {
              consentModal: {
                title: 'We use cookies',
                description:
                  'We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                showPreferencesBtn: 'Manage preferences',
              },
              preferencesModal: {
                title: 'Cookie preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                savePreferencesBtn: 'Save preferences',
                closeIconLabel: 'Close modal',
                sections: [
                  {
                    title: 'Strictly necessary cookies',
                    description:
                      'These cookies are essential for the proper functioning of the website.',
                    linkedCategory: 'necessary',
                  },
                  {
                    title: 'Analytics cookies',
                    description:
                      'These cookies help us understand how visitors interact with our website.',
                    linkedCategory: 'analytics',
                  },
                  {
                    title: 'Marketing cookies',
                    description:
                      'These cookies are used to track visitors across websites for advertising purposes.',
                    linkedCategory: 'marketing',
                  },
                ],
              },
            },
          },
        },
      })
    }

    initCookieConsent()
  }, [])

  return null
}

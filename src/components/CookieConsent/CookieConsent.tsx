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

      // Import library - use the correct import pattern
      const CookieConsentModule = await import('vanilla-cookieconsent')

      // The library exports everything under default in some environments
      const CookieConsent = CookieConsentModule.default || CookieConsentModule

      CookieConsent.run({
        // Add required guiOptions - Changed to bottom right position
        guiOptions: {
          consentModal: {
            layout: 'box', // Changed from 'cloud inline' to 'box'
            position: 'bottom right', // Changed from 'bottom center' to 'bottom right'
            equalWeightButtons: true,
            flipButtons: false,
          },
          preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false,
          },
        },

        // Categories configuration
        categories: {
          necessary: {
            enabled: true,
            readOnly: true,
          },
          analytics: {},
          marketing: {},
        },

        // Language configuration
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
                    title: 'Cookie Usage',
                    description: 'We use cookies to improve your experience on our website.',
                  },
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

        // Optional callback functions
        onFirstConsent: ({ cookie }) => {
          console.log('First consent given:', cookie)
        },
        onConsent: ({ cookie }) => {
          console.log('Consent updated:', cookie)
        },
        onChange: ({ changedCategories, changedServices }) => {
          console.log('Preferences changed:', { changedCategories, changedServices })
        },
      })
    }

    initCookieConsent()
  }, [])

  return null
}

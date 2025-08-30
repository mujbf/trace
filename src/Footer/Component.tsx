import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Twitter, Linkedin, Instagram } from 'lucide-react'

// Centralized style definitions
const footerStyles = {
  // Text styles
  sectionHeading: 'manrope-regular text-gray-400 text-sm uppercase tracking-wider',
  navLink:
    'w-fit manrope-light text-base leading-[150%] relative text-light-100 hover:text-primary-400 transition-all duration-300 ease-in-out hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary-300 after:to-primary-100 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full active:scale-95 active:text-primary-400',
  legalLink:
    'manrope-light text-sm leading-[150%] relative text-light-100 hover:text-primary-400 transition-all duration-300 ease-in-out hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary-300 after:to-primary-100 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full active:scale-95 active:text-primary-400',
  bodyText: 'manrope-light text-base leading-[150%] text-light-100',
  copyrightText: 'manrope-light text-sm leading-[150%] text-light-100 text-center',

  // Layout styles
  container: 'w-full max-w-7xl px-4 md:px-0 py-12',
  mainGrid: 'grid grid-cols-1 md:grid-cols-3 gap-8 mb-8',
  column: 'flex flex-col space-y-4',
  nav: 'flex flex-col space-y-3',
  bottomSection: 'border-t border-gray-800 pt-8',
  bottomFlex:
    'flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0',
  legalLinksContainer: 'flex flex-col md:flex-row gap-4 md:gap-6',
  socialContainer: 'flex items-center space-x-4',
  copyrightContainer: 'mt-8 pt-4 border-t border-gray-800',

  // Component styles
  logo: 'h-8 w-auto',
  socialButton:
    'group relative w-10 h-10 rounded-full manrope-medium text-dark-100 bg-white border border-dark-20 overflow-hidden transition-all duration-300 ease-out hover:text-light-100 hover:bg-primary-700 hover:border-primary-800 hover:scale-105 hover:shadow-lg hover:shadow-primary-700/25 flex items-center justify-center',
  socialIcon:
    'relative z-10 w-4 h-4 transition-transform duration-300 ease-out group-hover:scale-105',

  // Spacing
  contactInfo: 'flex flex-col space-y-3 manrope-light text-base leading-[150%] text-light-100',
  contactDetails: 'space-y-1 manrope-light text-base leading-[150%] text-light-100',
} as const

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  // Define social media links
  const socialLinks = [
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Instagram, label: 'Instagram' },
  ]

  // Define legal links
  const legalLinks = [
    { href: '/sitemap', label: 'Sitemap' },
    { href: '/terms-and-conditions', label: 'Terms and Conditions' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ]

  return (
    <footer className="w-full mt-auto bg-dark-100 text-white flex justify-center">
      <div className={footerStyles.container}>
        {/* Main Footer Content */}
        <div className={footerStyles.mainGrid}>
          {/* Logo Section */}
          <div className={footerStyles.column}>
            <Link href="/" className="flex items-center">
              {/* You can replace this with your actual logo component */}
              <img src="assets/logo.png" alt="TRACE" className={footerStyles.logo} />
            </Link>
          </div>

          {/* Quicklinks Section */}
          <div className={footerStyles.column}>
            <h3 className={footerStyles.sectionHeading}>Quicklinks</h3>
            <nav className={footerStyles.nav}>
              <Link href="/" className={footerStyles.navLink}>
                Home
              </Link>
              <Link href="/about" className={footerStyles.navLink}>
                About
              </Link>
              <Link href="/pillars" className={footerStyles.navLink}>
                Pillars
              </Link>
              <Link href="/partner-with-us" className={footerStyles.navLink}>
                Partner with us
              </Link>
              <Link href="/blog" className={footerStyles.navLink}>
                Blog
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div className={footerStyles.column}>
            <h3 className={footerStyles.sectionHeading}>Contact</h3>
            <div className={footerStyles.contactInfo}>
              <p className="font-medium">TRACE Expert City</p>
              <address className="not-italic">
                Maradana,
                <br />
                Colombo 10.
              </address>
              <div className={footerStyles.contactDetails}>
                <p className={footerStyles.navLink}>+94 11 234 5678</p>
                <a href="mailto:info@trace.lk" className={footerStyles.navLink}>
                  info@trace.lk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={footerStyles.bottomSection}>
          <div className={footerStyles.bottomFlex}>
            {/* Legal Links */}
            <div className={footerStyles.legalLinksContainer}>
              {legalLinks.map((link, index) => (
                <Link key={index} href={link.href} className={footerStyles.legalLink}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className={footerStyles.socialContainer}>
              <span className="text-gray-400 text-sm mr-2">Follow Us</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={footerStyles.socialButton}
                  >
                    <Icon className={footerStyles.socialIcon} />

                    {/* Fluid background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-primary-700 opacity-0 group-hover:opacity-20 transform scale-75 group-hover:scale-100 transition-all duration-700 ease-out"></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Copyright */}
          <div className={footerStyles.copyrightContainer}>
            <p className={footerStyles.copyrightText}>© TRACE 2025 | Site by Magic Unbound</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

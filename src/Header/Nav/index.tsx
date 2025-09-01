'use client'

import React, { useState, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X } from 'lucide-react'
import { PrimaryButton } from '@/components/Button/button'

export const HeaderNav: React.FC<{ data?: HeaderType }> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Custom navigation links
  const customNavItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/pillars', label: 'Pillars' },
    { href: '/partner-with-us', label: 'Partner with Us' },
    { href: '/blog', label: 'Blog' },
  ]

  const contactItem = { href: '/contact', label: 'Contact' }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm'
          : 'bg-white/0 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 md:px-20">
        <div
          className={`flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled ? 'h-14 lg:h-20' : 'h-16 lg:h-24'
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="assets/logo.png"
                alt="TRACE"
                className={`w-auto transition-all duration-300 ease-out ${
                  isScrolled ? 'h-8' : 'h-12'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {customNavItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="manrope-light text-base md:text-lg leading-[150%] relative text-dark-100 hover:text-primary-700 transition-all duration-300 ease-in-out hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary-600 after:to-primary-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full active:scale-95 active:text-primary-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side - Contact */}
          <div className="hidden md:flex items-center">
            <Link href={contactItem.href}>
              <PrimaryButton>Contact Us</PrimaryButton>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="relative p-2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:bg-gray-100/50 rounded-lg backdrop-blur-sm"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? 'opacity-0 rotate-90 scale-75'
                      : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100/50 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-4 pb-4 space-y-2">
              {customNavItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="transform transition-all duration-300 ease-out"
                  style={{
                    transitionDelay: `${i * 50}ms`,
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                  }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-dark-100 hover:text-primary-700 hover:bg-primary-50/80 rounded-xl manrope-light text-base transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-primary-200/50 hover:scale-[1.02] active:scale-95"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}

              <div
                className="pt-3 transform transition-all duration-300 ease-out"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  transitionDelay: `${customNavItems.length * 50}ms`,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
              >
                <Link
                  href={contactItem.href}
                  className="group relative w-full bg-white/90 border border-dark-20 text-dark-100 px-5 py-3 rounded-full manrope-medium text-base hover:bg-primary-700 hover:border-primary-800 hover:text-light-100 transition-all duration-300 text-center block backdrop-blur-sm overflow-hidden hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-primary-700/25"
                >
                  <span className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
                    {contactItem.label}
                  </span>

                  {/* Mobile button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>

                  {/* Mobile button shimmer */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

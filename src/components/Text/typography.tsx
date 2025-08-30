import React from 'react'
import { cn } from '@/utilities/ui'

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

// Title Component
export function Title({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'space-grotesk-light text-3xl md:text-5xl lg:text-6xl leading-[120%] tracking-tighter',
        className,
      )}
    >
      {children}
    </h1>
  )
}

// Heading Component
export function Heading({ children, className }: TypographyProps) {
  return (
    <h2 className={cn('space-grotesk-light text-6xl leading-[120%] tracking-tighter', className)}>
      {children}
    </h2>
  )
}

// SubHeading Component
export function SubHeading({ children, className }: TypographyProps) {
  return <h3 className={cn('manrope-semibold text-2xl leading-[150%]', className)}>{children}</h3>
}

// SubHeading2 Component
export function SubHeading2({ children, className }: TypographyProps) {
  return (
    <h3 className={cn('manrope-semibold text-lg md:text-xl leading-[150%]', className)}>
      {children}
    </h3>
  )
}

// Body Component
export function Body({ children, className }: TypographyProps) {
  return <p className={cn('manrope-light text-lg leading-[150%]', className)}>{children}</p>
}

// NavItem Component
export function NavItem({ children, className }: TypographyProps) {
  return <p className={cn('manrope-light text-base leading-[150%]', className)}>{children}</p>
}
